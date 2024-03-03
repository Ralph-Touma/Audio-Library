require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const crypto = require('crypto');
const config = require('./config');

const categoryService = require('./Category/category-service');
const albumService = require('./Album/album-service');
const songService = require('./Song/song-service');
const errorHandler = require('./middlewares/error-handler');
const userRoutes = require('./User/user-routes');
const categoryRoutes = require('./Category/category-routes');
const albumRoutes = require('./Album/album-routes');
const songRoutes = require('./Song/song-routes');

const app = express();

const sessionSecret = crypto.randomBytes(64).toString('hex');
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
}));

app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/albums', albumRoutes);
app.use('/songs', songRoutes);




mongoose.connect(config.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(errorHandler);

async function testCase() {
  try {
const popCategory = await categoryService.addCategory({ name: 'Pop', description: 'A popular music genre' });
const jazzCategory = await categoryService.addCategory({ name: 'Jazz', description: 'A genre originating from New Orleans' });


    const myAlbum = await albumService.addAlbum({
      name: 'My Album',
      description: 'An album with pop songs',
      category: popCategory._id
    });

    await songService.addSong({ name: 'Song 1', singer: 'Singer 1', category: popCategory._id, album: myAlbum._id });
    await songService.addSong({ name: 'Song 2', singer: 'Singer 2', category: popCategory._id, album: myAlbum._id });
    const song3 = await songService.addSong({ name: 'Song 3', singer: 'Singer 3', category: popCategory._id, album: myAlbum._id });

    await albumService.updateAlbum(myAlbum._id, { showNbTracks: 3 });

    const tempAlbum = await albumService.addAlbum({
      name: 'Temp Album',
      description: 'A temporary album with jazz songs',
      category: jazzCategory._id
    });

    await songService.addSong({ name: 'Jazz Song 1', singer: 'Jazz Singer 1', category: jazzCategory._id, album: tempAlbum._id });
    await songService.addSong({ name: 'Jazz Song 2', singer: 'Jazz Singer 2', category: jazzCategory._id, album: tempAlbum._id });
    await songService.addSong({ name: 'Jazz Song 3', singer: 'Jazz Singer 3', category: jazzCategory._id, album: tempAlbum._id });

    await albumService.deleteAlbum(tempAlbum._id);

    await songService.deleteSong(song3._id);

    console.log('Test case executed successfully');
  } catch (error) {
    console.error('Test case execution failed:', error);
  }
}

testCase().catch(err => console.error('Failed to run test case:', err));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
