let five = require("johnny-five");
let Transform = require("../lib/transform.js");
let SerialPort = require("serialport").SerialPort;

let t = new Transform({
  k_p: 0.85, 
  k_i: 0, 
  k_d: 0.85,
  dt: .019
});

var board = new five.Board({ 
  port: new SerialPort( '/dev/ttyACM0', {
      baudrate: 115200, 
      bufferSize: 256
    })
});

board.on("ready", function() {

  var gyro = new five.Gyro({
    controller: "MPU6050", 
    pins: ['A4', 'A5']
  });

  gyro.on("change", function() {
    console.log( "Value:", t.transform( this.pitch.angle ) );
  });
});

