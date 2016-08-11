
class PWM {
  /**
   * @Constructor
   */
  constructor( options = {} ) {

    // Define defaults
    let defaults = {
      minForward: 0, 
      maxForward: 127, 
      minReverse: 128, 
      maxReverse: 255, 
    };

    // Merge defaults with options
    let settings = Object.assign( {}, defaults, options );

    // Calculate the forward and reverse ranges
    this.fRange = Math.abs( settings.maxForward - settings.minForward ); 
    this.rRange = Math.abs( settings.maxReverse - settings.minReverse );

    // Set the settings as member variable
    this.settings = settings; 

  }

  /**
   * getPWM 
   * returns a pwm value given a speed 0 - 1
   * @param  {Number} speed - the speed you want the motor to turn
   * @param  {String} direction - the direction you want the motor to move
   * @return {Number} pwm - the pwm value 
   */
   getPWM( speed, direction ) { 
     if( speed > 1 ) {
       speed = 1;
     } 
     if( speed < 0 ) { 
       speed = 0;
     }
     let pwm;
     let settings = this.settings; 
     // Get the pwm speed
     if( direction === "reverse" ) { 
       // Calculate value within the range
       pwm = speed * this.rRange; 
       // Calculate the value from 0 - 255 
       if( settings.maxReverse > settings.minReverse ) { 
         pwm = settings.minReverse + pwm; 
       } else { 
         pwm = settings.minReverse - pwm;
       }  
     } else { 
       // Calculate value within the range
       pwm = speed * this.fRange; 
       // Calculate the value from 0 - 255 
       if( settings.maxForward > settings.minForward ) { 
         pwm = settings.minForward + pwm; 
       } else { 
         pwm = settings.minForward - pwm;
       } 
     }
     return Math.round( pwm );
   }
}

module.exports = PWM;
