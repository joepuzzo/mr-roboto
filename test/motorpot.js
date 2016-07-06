var five = require("johnny-five");
let Encoder = require("../lib/encoder");

var board, motor1, motor2;

board = new five.Board({repl: false});

board.on("ready", function() {

  // Create motors
  let motors = new five.Motors([
    { pin: 3 },
    { pin: 10 },
   ]);

  motor1 = motors[0];
  motor2 = motors[1];

  // Create a new `potentiometer` hardware instance.
  potentiometer = new five.Sensor({
    pin: "A3",
    threshold: 3
  });

  //this.repl.inject({ motor1: motor1, motor2: motor2 }); 
  //this.repl.inject({ motor1: motors[0], motor2: motors[1] }); 

  let enco1 = new Encoder({
    pin1: 2,
    pin2: 4
  });

  /*let enco2 = new Encoder({
    pin1: 12,
    pin2: 13
  });*/


  enco1.on( "data", ( data ) => {
    console.log( "ENCO1:", data );
  })

  /*enco2.on( "data", ( data ) => {
    console.log( "ENCO2:", data );
  })*/


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
    //console.log("MOVING!");
    var speed     = 0;
    var maxrevspeed  = 104; //74
    var minrevspeed  = 185;
    var maxforspeed  = 224; //254
    var minforspeed  = 191;
    var maxpot    = 1024;
    var halfpot   = maxpot / 2;
    var off_range = 100;

    //console.log( "value:", value );

    // Pot is in first half
    if( value < halfpot - off_range ) {
      speed = Math.floor( value / ( halfpot - off_range ) * ( minrevspeed - maxrevspeed ) );
      motor1.forward( maxrevspeed + speed );
      motor2.forward( maxrevspeed + speed );
      //console.log( "SpeedReverse:", maxrevspeed + speed );
    }
    // Pot is in second half
    else if( value > halfpot + off_range ) {
      value = halfpot - ( value % halfpot);
      speed = Math.floor( value / ( halfpot - off_range ) * ( maxforspeed - minforspeed) );
      motor1.forward( maxforspeed - speed );
      motor2.forward( maxforspeed - speed );
      //console.log( "SpeedForward:", maxforspeed - speed );
    }
    else {
      speed = 0;
      motor1.stop();
      motor2.stop();
      //console.log( "STOP!");
    }

}
