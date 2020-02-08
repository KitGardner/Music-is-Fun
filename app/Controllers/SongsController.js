import store from "../store.js";
import SongService from "../Services/SongsService.js";

//Private
/**Draws the Search results to the page */
function _drawResults() {
  let songs = store.state.songs;

  let template = "";

  songs.forEach(song => {
    template += song.Template;
  })

  document.getElementById("songs").innerHTML = template;
}
/**Draws the Users saved songs to the page */
function _drawPlaylist() {
  let mySongs = store.state.mySongs;
  console.log(mySongs);

  let template = "";

  mySongs.forEach(song => {
    template += song.PlaylistTemplate;
  })

  document.getElementById("playlist").innerHTML = template;
}

//Public
export default class SongsController {
  constructor() {
    // TODO load your playlist
    this.getMySongs();
  }

  /**Takes in the form submission event and sends the query to the service */
  async search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    try {
      await SongService.getMusicByQuery(e.target.query.value);
      _drawResults();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  async addSong(id) {
    console.log("I was called with the Id of " + id);
    try {
      await SongService.addSong(id);
      _drawPlaylist();
    } catch (error) {
      console.error(error);
    }

  }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  async removeSong(id) {
    console.log("I was called with the id of " + id);
    try {
      await SongService.removeSong(id);
      _drawPlaylist();
    } catch (error) {
      console.error(error);

    }
  }

  async getMySongs() {
    try {
      await SongService.getMySongs();
      _drawPlaylist();
    } catch (error) {
      console.error(error);
    }
  }
}
