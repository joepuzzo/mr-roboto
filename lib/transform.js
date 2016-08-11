let Controller = require('node-pid-controller');

class Transform {
  /**
   * @Constructor
   */
  constructor( options = {} ) {

    // Define defaults
    let defaults = {
      k_p: 1, 
      k_i: 1, 
      k_d: 1, 
      dt: 1
    };

    // Merge defaults with options
    let settings = Object.assign( {}, defaults, options );
    this.settings = settings;

    // Create a pid controller
    this.controller = new Controller( settings );
    this.controller.setTarget( 0 );

  }

  /**
   * Transform function
   * transforms gyro output to motor input
   * @param  {Number} angle - the pitch angle of the robot
   * @return {Number} input - the input value -1 to 1 
   */
  transform( angle ){
    
    // Put the angle through the pid controller
    let mangle = this.controller.update( angle )

    // Use the modified angle and transform to motor input
    let input = mangle / 90; 

    console.log( "Actual:", angle, "Computed:", mangle, "Input:", input );

    return input;

  }
}

module.exports = Transform;
