
const albumModel = require('./album-model'); 

class AlbumService {
  async getAlbums() {
  
    return albumModel.find({});
  }

  async addAlbum(albumObject) {
    const album = new albumModel(albumObject);
    
    return album.save();
  }

  async updateAlbum(albumId, updateObject) {
    const album = await albumModel.findByIdAndUpdate(albumId, updateObject, { new: true });
    if (!album) {
      throw new Error('Album not found'); 
    }
    return album;
  }

  async getAlbumById(albumId) {
    const album = await albumModel.findById(albumId);
    if (!album) {
      throw new Error('Album not found'); 
    }
    return album;
  }

  async deleteAlbum(albumId) {
    const album = await albumModel.findByIdAndDelete(albumId);
    if (!album) {
      throw new Error('Album not found'); 
    }
    return album;
  }
}

module.exports = new AlbumService();
