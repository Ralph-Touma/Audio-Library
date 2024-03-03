const express = require('express');
const albumController = require('./album-controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, albumController.createAlbum);
router.get('/:id', auth, albumController.getAlbumById); 
router.put('/:id', auth, albumController.updateAlbum);
router.delete('/:id', auth, albumController.deleteAlbum);


router.get('/', albumController.getAlbums);

module.exports = router;
