const Song = require('./song-model');
const Album = require('../Album/album-model'); 

class SongController {
    async addSong(req, res, next) {
        try {
            const { name, singer, album } = req.body;
            const albumExists = await Album.findById(album);
            if (!albumExists) {
                throw new Error('Album does not exist');
            }

            const song = new Song({
                name,
                singer,
                album
            });
            await song.save();
            res.status(201).json(song);
        } catch (error) {
            next(error);
        }
    }

    async deleteSong(req, res, next) {
        try {
            const song = await Song.findByIdAndDelete(req.params.id);
            if (!song) {
                throw new Error('Song not found');
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new SongController();
