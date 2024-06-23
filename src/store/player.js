import { makeAutoObservable } from "mobx";

class Player {
  isLoading = true;
  isPlaying = false;
  trackIsOn = false;
  currTime = {
    min: "",
    sec: "",
  }
  time = {
    min: "0",
    sec: "00"
  }
  constructor() {
    makeAutoObservable(this);
  }

  setIsLoading(state) {
    this.isLoading = state;
  }

  setIsPlaying(state) {
    this.isPlaying = state;
  }

  setTrackIsOn(state) {
    this.trackIsOn = state;
  }

  setCurrTime(state) {
    this.currTime = state;
  }

  setTime(state) {
    this.time = state;
  }
}

const player = new Player();

export default player;