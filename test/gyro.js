var five = require("johnny-five");
let SerialPort = require("serialport").SerialPort;

var board = new five.Board({ 
  port: new SerialPort( '/dev/ttyACM0', {
      baudrate: 115200, 
      bufferSize: 256
    })
});

board.on("ready", function() {
  var gyro = new five.Gyro({
    controller: "MPU6050", 
    pins: ['A4', 'A5'], 
    sensitivity: 200
  });

  gyro.on("data", function() {
    //console.log("gyro");
    //console.log("  x            : ", this.x);
    //console.log("  y            : ", this.y);
    //console.log("  z            : ", this.z);
    console.log("  pitch        : ", this.pitch.angle );
    //console.log("  roll         : ", this.roll);
    //console.log("  yaw          : ", this.yaw);
    //console.log("  rate         : ", this.rate);
    //console.log("  isCalibrated : ", this.isCalibrated);
    //console.log("--------------------------------------");
  });
});

