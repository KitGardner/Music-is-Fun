import Song from "../Models/Song.js";
import store from "../store.js";

// @ts-ignore
//TODO Change YOURNAME to your actual name
let _sandBoxUrl = "//bcw-sandbox.herokuapp.com/api/Kit/songs";

class SongsService {
  constructor() {
    // NOTE this will get your songs on page load
  }

  setActiveSong(id) {
    let selectedSong = store.state.songs.find(s => s._id == id);

    if (!selectedSong) {
      throw new Error("Could not find the chosen song to set as active");
    }

    store.state.activeSong = selectedSong;
  }
  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  async getMusicByQuery(query) {
    // NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?&term=" + query;
    let response = await fetch(url);
    let data = await response.json();
    console.log("THE SONG DATA", data.results);
    let songs = data.results.map(songData => new Song(songData));
    store.state.songs = songs;
  }

  /**
   * Retrieves the saved list of songs from the sandbox
   */
  async getMySongs() {
    let response = await fetch(_sandBoxUrl);
    let data = await response.json();
    let mySongs = data.data.map(s => new Song(s));
    store.state.mySongs = mySongs;
    console.log("MY SONGS", data.data);
  }

  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async addSong(id) {
    //TODO you only have an id, you will need to find it in the store before you can post it
    // NOTE There is something wrong with how I set the id that is causing freshly added songs to not mesh with the other service. Perhaps I can change the Id after the insert?
    let pickedSong = store.state.songs.find(s => s._id == id);

    if (!pickedSong) {
      throw new Error("Could not find the song in the search results")
    }

    console.log(pickedSong);


    let result = await fetch(_sandBoxUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pickedSong)
    });

    if (result.status != 200) {
      throw new Error("There was an error talking to the server. Your song was not saved.")
    }

    console.log(result);

    let songData = await result.json();
    pickedSong._id = songData.data._id;
    store.state.mySongs.push(pickedSong);
    //TODO After posting it what should you do?

  }

  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async removeSong(id) {
    //TODO Send the id to be deleted from the server then update the store
    let result = await fetch(_sandBoxUrl + `/${id}`, {
      method: "DELETE"
    });

    console.log(result);

    if (result.status != 200) {
      throw new Error("There was an error with removing that song from your playlist")
    }

    let deletedSongIndex = store.state.mySongs.findIndex(s => s._id == id);
    store.state.mySongs.splice(deletedSongIndex, 1);
  }
}

const service = new SongsService();
export default service;
