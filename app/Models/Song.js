export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt = data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this._id = data.trackId || data._id;
  }

  get Template() {
    return `
    <div class="col-lg-4 col-sm-12">
      <div class="row m-1 song-card">
        <div class="col-3 py-2">
          <img src="${this.albumArt}" class="embed-responsive embed-responsive-1by1 " alt="" onclick="app.songsController.setActiveSong('${this._id}', 'songs')">
        </div>
        <div class="col-9">
          <div class="row song-data-row">
            <div class="col-12 title" onclick="app.songsController.setActiveSong('${this._id}', 'songs')">
              <h5>${this.artist} - ${this.title}</h5>
            </div>
          </div>
          <div class="row song-data-row d-flex align-items-center">
            <div class="col-12 d-flex justify-content-between align-items-center">
              <p class="inline title">Buy Now $${this.price}</p>
              <i class="fa fa-heart heart" onclick="app.songsController.addSong('${this._id}')"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
        `;
  }

  get PlaylistTemplate() {
    return `
      <div class="col-lg-3 col-md-12 playlist-card">
        <div class="row">
          <div class="col d-flex justify-content-between">
            <h4 class="inline" onclick="app.songsController.setActiveSong('${this._id}', 'mySongs')">${this.artist}</h4>
              <i class="fa fa-minus-circle pt-2 heart" onclick="app.songsController.removeSong('${this._id}')"></i>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <h5 onclick="app.songsController.setActiveSong('${this._id}', 'mySongs')">${this.title}</h5>
          </div>
        </div>
      </div>`;
  }

  get ActiveSongTemplate() {
    return `
    <div class="row">
          <div class="col-12 py-4 d-flex justify-content-center">
            <img src="${this.albumArt}" alt="" height="200" width="200">
          </div>
        </div>
        <div class="row">
          <div class="col-12 title text-center">
            <h3>${this.artist}</h3>
            <p>${this.title}</p>
            <audio controls src="${this.preview}"></audio>
          </div>
        </div>
    `;
  }
}
