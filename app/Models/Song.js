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
    <div class="row mb-2" style="background-color: lightblue; border-style: outset;">
    <div class="col-2 p-2">
      <img src="${this.albumArt}" alt="" height="100" width="100">
    </div>
    <div class="col-10 my-2">
      <h5>${this.artist} - ${this.title}</h5>
      <audio controls src="${this.preview}">
      </audio>
      <img src="https://placehold.it/50x50" onclick="app.songsController.addSong('${this._id}')" />
    </div>
  </div>
        `;
  }

  get playlistTemplate() {
    return `
    <h5>${this.artist} - ${this.title}</h5>
    <button onclick="app.songsController.removeSong('${this._id}')">&times;</button>
        `;
  }
}
