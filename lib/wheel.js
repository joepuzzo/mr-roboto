let Encoder = require("./encoder");

class Wheel {
  /**
   * @Constructor
   */
  constructor( options = {} ) {

    // Define defaults
    let defaults = {
    };

    // Merge defaults with options
    let settings = Object.assign( {}, defaults, options );

    // Create a new encoder
    this.encoder = new Encoder( settings.encoderSettings );

    // Create a new `motor` hardware instance.
    this.motor = new five.Motor( settings.motorSettings );

  }
}

module.exports = Wheel;
