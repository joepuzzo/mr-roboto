let Sensor = require("johnny-five").Sensor;
let EventEmitter = require('events');

class Encoder extends EventEmitter {

  /**
   * @Constructor
   */
  constructor( options = {} ){

    if( !options.pin1 || !options.pin2 ){
      throw new Error( "must provide two pins for encoder");
    }

    super();

    // Define defaults
    let defaults = {
      freq: 1000
    };

    // Merge defaults with options
    let settings = Object.assign( {}, defaults, options );

    // Create five sensors
    this.channelA = new Sensor({
      pin: settings.pin1,
      type: "digital",
      board: settings.board
    });
    this.channelB = new Sensor({
      pin: settings.pin2,
      type: "digital",
      board: settings.board
    });

    //Register for sensor events
    this.channelA.board.digitalRead( this.channelA.pin, ( val ) => {
      //console.log("READ", val, `from pin ${this.channelA.pin}`);
      this._updateA( val );
    });
    this.channelB.board.digitalRead( this.channelB.pin, ( val ) => {
      //console.log("READ", val, `from pin ${this.channelB.pin}`);
      this._updateB( val );
    });

    // Setup instance variables
    this.valA  = 0;
    this.valB  = 0;
    this.prevA = 0;
    this.prevB = 0;
    this.count   = 0;
    this.prevCount= 0;
    this.board = this.channelA.board;

    // Set velocity sample interval
    let freqInterval = setInterval( () => {
      // Calculate the change in pulses
      let deltaC   = Math.abs( this.count - this.prevCount );
      let pulses = deltaC / ( settings.freq / 1000 );
      this.emit( "data", {
        pulses: pulses,
        count: this.count,
        direction: this.count > this.prevCount ? "forward" : "reverse"
      });
      this.prevCount = this.count;
    }, settings.freq );

    // Add cleanup code
    this.board.on("exit", () => {
      clearInterval( freqInterval );
    })

  }

  _updateA( val ) {
    this.valA = val;
    // If state change on A to high
    if( this.prevA == 0 && this.valA == 1 ) {
      // If B is low and A is high
      if( this.valB == 0 ) {
        this.count++;
      } else {
        this.count--;
      }
      this._countCheck();
    }
    this.prevA = this.valA;
  }

  _updateB( val ) {
    this.valB = val;
    // If state change on B to low
    if( this.prevB == 1 && this.valB == 0 ) {
      // If A is low and B is low
      if( this.valA == 0 ) {
        this.count++;
      } else {
        this.count--;
      }
      this._countCheck();
    }
    this.prevB = this.valB;
  }

  _countCheck(){
    if( this.count == Number.MAX_SAFE_INTEGER ) {
      this.count = Number.MAX_SAFE_INTEGER - this.prevCount;
      this.prevCount = 0;
    }
    if( this.count == -Number.MAX_SAFE_INTEGER ) {
      this.count = -Number.MAX_SAFE_INTEGER - this.prevCount;
      this.prevCount = 0;
    }
  }

}

module.exports = Encoder;
