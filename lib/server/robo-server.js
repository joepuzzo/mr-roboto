
let EventEmitter = require('events');
let IO = require('socket.io');
let Server = require('http');

class RoboServer extends EventEmitter {
  /*
   * @Constructor
   */
  constructor( options = {} ) {

    super();

    // Define defaults
    let defaults = {
    };

    // Merge defaults with options
    let settings = Object.assign( {}, defaults, options );

    // Create the server
    this.server = Server.createServer();

    // Create the socket.io server
    this.io = new IO( this.server );

    // Setup events
    this.io.on('connection', (socket) => {

      socket.on('hello', function (data) {
        console.log(data);
        socket.emit('world!');
      });

    });

    // Start the server
    this.server.listen('3000');

  }
}

module.exports = RoboServer;
