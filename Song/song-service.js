const songModel = require('./song-model');

class SongService {
  async getSongs() {
    return songModel.find({});
  }

  async addSong(songObject) {
    const song = new songModel(songObject);
    return song.save();
  }

  async updateSong(songId, updateObject) {
    const song = await songModel.findByIdAndUpdate(songId, updateObject, { new: true });
    if (!song) {
      throw new Error('Song not found');
    }
    return song;
  }

  async getSongById(songId) {
    const song = await songModel.findById(songId);
    if (!song) {
      throw new Error('Song not found');
    }
    return song;
  }

  async deleteSong(songId) {
    const song = await songModel.findByIdAndDelete(songId);
    if (!song) {
      throw new Error('Song not found');
    }
    return song;
  }
async getSongsByAlbumAndCategory(albumId, categoryId) {
  return this.songModel.find({ album: albumId, category: categoryId })
                        .sort({ createdAt: -1 });
}


}

module.exports = new SongService();
