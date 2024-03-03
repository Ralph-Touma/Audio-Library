const Album = require('./album-model');

class AlbumController {
    async createAlbum(req, res, next) {
        try {
            const { name, description, createdBy } = req.body;
            const album = new Album({
                name,
                description,
                createdBy, 
                showNbTracks: 0, 
            });
            await album.save();
            res.status(201).json(album);
        } catch (error) {
            next(error);
        }
    }

    async getAlbums(req, res, next) {
        try {
            const albums = await Album.find();
            res.status(200).json(albums);
        } catch (error) {
            next(error);
        }
    }

    async getAlbumById(req, res, next) {
        try {
            const album = await Album.findById(req.params.id);
            if (!album) {
                throw new Error('Album not found');
            }
            res.status(200).json(album);
        } catch (error) {
            next(error);
        }
    }

    async updateAlbum(req, res, next) {
        try {
            const updateData = req.body;
            const album = await Album.findByIdAndUpdate(req.params.id, updateData, { new: true });
            if (!album) {
                throw new Error('Album not found');
            }
            res.status(200).json(album);
        } catch (error) {
            next(error);
        }
    }

    async deleteAlbum(req, res, next) {
        try {
            const album = await Album.findByIdAndDelete(req.params.id);
            if (!album) {
                throw new Error('Album not found');
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AlbumController();
