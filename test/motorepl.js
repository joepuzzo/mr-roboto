var five = require("johnny-five");
let Encoder = require("../lib/encoder");
let SerialPort = require("serialport").SerialPort;

var board, motor1, motor2;

board = new five.Board( { 
    port: new SerialPort( '/dev/ttyACM0', {
      baudrate: 115200, 
      bufferSize: 256
    })
});

board.on("ready", function() {

  // Create motors
  let motors = new five.Motors([
    { pin: 3 },
    { pin: 10 },
   ]);

  motor1 = motors[0];
  motor2 = motors[1];


  this.repl.inject({ motor1: motor1, motor2: motor2, motors: motors }); 

  let enco1 = new Encoder({
    pin1: 2,
    pin2: 4
  });

  let enco2 = new Encoder({
    pin1: 12,
    pin2: 13
  });

  /*enco1.on( "data", ( data ) => {
    iconsole.log( "ENCO1:", data );
  })

  enco2.on( "data", ( data ) => {
    console.log( "ENCO2:", data );
  })*/

  board.on("exit", ()=> { 
    potentiometer.removeAllListeners("change");
    console.log("Motors stopping");
    motors.stop();
    console.log("Motors stopped!");
    setTimeout( () => {
      console.log("DONE!");
      process.exit();
    }, 1000 )
  })

});
