let five = require("johnny-five");
let Wheel = require('./wheel');

class Robot {

  /**
   * Robot constructor
   * @param {options} options - options for this robot
   */
  constructor( options = {} ){

    // Define defaults
    let defaults = {
      boardSettings: {
        repl: false
      }
    }

    // Merge defaults with options
    let settings = Object.assign( {}, defaults, options );

    // Create the Johnny Five board
    this.board = new five.Board( settings.boardSettings );

    // Setup robot when board is ready
    this.board.on("ready", () => {
      this._setup();
      console.log( "MrRoboto is ready!");
    });

  }

  /**
   *
   */
  _setup() {

  }

}

module.exports = Robot;
