const express = require('express');
const songController = require('./song-controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, songController.addSong);
router.delete('/:id', auth, songController.deleteSong);
router.get('/byAlbum/:albumId/:categoryId', auth, async (req, res) => {
    try {
      const { albumId, categoryId } = req.params;
      const songs = await songService.getSongsByAlbumAndCategory(albumId, categoryId);
      res.json(songs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


module.exports = router;
