var five = require("johnny-five");
let Encoder = require("../lib/encoder");
let PWM = require("../lib/pwm");
let SerialPort = require("serialport").SerialPort;

var board, motor1, motor2, motors, pwm;
var speed = 0;
board = new five.Board({
  repl: false,
  port: new SerialPort( '/dev/ttyACM0', {
    baudrate: 115200, 
    bufferSize: 256
  })
});

board.on("ready", function() {

  //console.log( "Sample Interval:",this.io.getSamplingInterval() );
  //this.samplingInterval( 19 );
  //console.log( "Sample Interval:",this.io.getSamplingInterval() );
  //console.log( board.port );

  // Create a new `potentiometer` hardware instance.
  potentiometer = new five.Sensor({
    pin: "A3",
  });

  // Create motors
  motors = new five.Motors([
    { pin: 3 },
    { pin: 10 },
   ]);

  motor1 = motors[0];
  motor2 = motors[1];

  // Create pwm
  pwm = new PWM({ 
      maxReverse: 75, 
      minReverse: 185, 
      maxForward: 254, 
      minForward: 191
  }); 

  let gyro = new five.Gyro({
    controller: "MPU6050", 
    pins: ['A4', 'A5']
  });

  let enco1 = new Encoder({
    pin1: 2,
    pin2: 4
  });

  let enco2 = new Encoder({
    pin1: 12,
    pin2: 13
  });


  enco1.on( "data", ( data ) => {
    console.log( "ENCO1:", data, "Speed:", speed );
  })

  enco2.on( "data", ( data ) => {
    console.log( "ENCO2:", data );
  })


  // "data" get the current reading from the potentiometer
  potentiometer.on("change", move );

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

function move( value ) {

    // local variables
    var maxpot    = 1024;
    var halfpot   = maxpot / 2;
    var off_range = 100;

    //console.log( "value:", value );

    // Pot is in first half
    if( value < halfpot - off_range ) {
      speed = 1 - ( value / halfpot );
      motors.forward( pwm.getPWM( speed, "reverse" ) );
      //console.log( "SpeedReverse:", speed ); 
    }
    // Pot is in second half
    else if( value > halfpot + off_range ) {
      value = halfpot - ( value % halfpot);
      speed = 1 - ( value / halfpot );
      motors.forward( pwm.getPWM( speed, "forward" ) );
      //console.log( "SpeedForward:", speed );
    }
    else {
      motors.stop();
      //console.log( "STOP!");
    }

}
