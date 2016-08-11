let five = require("johnny-five");
let Transform = require("../lib/transform.js");
let SerialPort = require("serialport").SerialPort;
let PWM = require("../lib/pwm");

let t = new Transform({
  k_p: 1, 
  k_i: 0, 
  k_d: .02,
  dt: .019
});

var board = new five.Board({ 
  port: new SerialPort( '/dev/ttyACM0', {
      baudrate: 115200, 
      bufferSize: 256
    })
});

board.on("ready", function() {

  // Create motors
  motors = new five.Motors([
    { pin: 3 },
    { pin: 10 },
  ]);

  // Create pwm
  pwm = new PWM({ 
      maxReverse: 75, 
      minReverse: 141, //185, 
      maxForward: 254, 
      minForward: 91 //191
  }); 

  var gyro = new five.Gyro({
    controller: "MPU6050", 
    pins: ['A4', 'A5'],
    sensitivity: 200
  });

  gyro.on("change", function(){
    let speed = t.transform( this.pitch.angle )
    motors.forward( pwm.getPWM( Math.abs( speed ), speed > 0 ? "forward" : "reverse" ) );
  });

});

