import Song from "./Models/Song.js";

class Store {
  /**
   * Provides access to application state data
   */
  state = {
    songs: [],
    mySongs: []
  };
}

const store = new Store();
export default store;
