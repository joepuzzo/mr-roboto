var five = require("johnny-five");
let Encoder = require("../lib/encoder");

var board, motor;

board = new five.Board();

board.on("ready", function() {

  // Create a new `motor` hardware instance.
  motor = new five.Motor({
    pin: 3
  });

  // Create a new `potentiometer` hardware instance.
  potentiometer = new five.Sensor({
    pin: "A3",
  });

  let enco = new Encoder({
    pin1: 2,
    pin2: 4
  });

  // "data" get the current reading from the potentiometer
  potentiometer.on("data", move );

});

function move( value ) {
    var speed     = 0;
    var maxrevspeed  = 74;
    var minrevspeed  = 185;
    var maxforspeed  = 254;
    var minforspeed  = 191;
    var maxpot    = 1024;
    var halfpot   = maxpot / 2;
    var off_range = 100;

    //console.log( "value:", value );

    // Pot is in first half
    if( value < halfpot - off_range ) {
      speed = Math.floor( value / ( halfpot - off_range ) * ( minrevspeed - maxrevspeed ) );
      motor.forward( maxrevspeed + speed );
      //console.log( "SpeedReverse:", maxrevspeed + speed );
    }
    // Pot is in second half
    else if( value > halfpot + off_range ) {
      value = halfpot - ( value % halfpot);
      speed = Math.floor( value / ( halfpot - off_range ) * ( maxforspeed - minforspeed) );
      motor.forward( maxforspeed - speed );
      //console.log( "SpeedForward:", maxforspeed - speed );
    }
    else {
      speed = 0;
      motor.stop();
      //console.log( "STOP!");
    }

}
