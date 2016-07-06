let PWM = require("../lib/pwm");

describe('pwm', function () {

  describe('defaults', function(){ 
    
    let pwm = new PWM(); 

    it( 'should contain the default reverse range', function(){ 
      expect( pwm.rRange ).to.equal(127);
    })

    it( 'should contain the default forward range', function(){ 
      expect( pwm.fRange ).to.equal(127);
    })

    it( 'should contain the default max forward', function(){ 
      expect( pwm.settings.maxForward ).to.equal(127);
    })

    it( 'should contain the default min forward', function(){ 
      expect( pwm.settings.minForward ).to.equal(0);
    })

    it( 'should contain the default max reverse', function(){ 
      expect( pwm.settings.maxReverse ).to.equal(255);
    })

    it( 'should contain the default min reverse', function(){ 
      expect( pwm.settings.minReverse ).to.equal(128);
    })

    it( 'should return correct max forward pwm value', function(){ 
      expect( pwm.getPWM(1, "forward") ).to.equal(127);
    })

    it( 'should return correct min forward pwm value', function(){ 
      expect( pwm.getPWM(0, "forward") ).to.equal(0);
    })

    it( 'should return correct max reverse pwm value', function(){ 
      expect( pwm.getPWM(1, "reverse") ).to.equal(255);
    })

    it( 'should return correct min reverse pwm value', function(){ 
      expect( pwm.getPWM(0, "reverse") ).to.equal(128);
    })

    it( 'should return correct half forward pwm value', function(){ 
      expect( pwm.getPWM(0.5, "forward") ).to.equal(64);
    })

    it( 'should return correct half reverse pwm value', function(){ 
      expect( pwm.getPWM(0.5, "reverse") ).to.equal(192);
    })
    
  }); 

  describe('min greater than max', function(){ 

    let pwm = new PWM({ 
      maxReverse: 75, 
      minReverse: 185, 
      maxForward: 254, 
      minForward: 191
    }); 

    it( 'should contain the default reverse range', function(){ 
      expect( pwm.rRange ).to.equal(110);
    })

    it( 'should contain the default forward range', function(){ 
      expect( pwm.fRange ).to.equal(63);
    })

    it( 'should return correct max forward pwm value', function(){ 
      expect( pwm.getPWM(1, "forward") ).to.equal(254);
    })

    it( 'should return correct min forward pwm value', function(){ 
      expect( pwm.getPWM(0, "forward") ).to.equal( 191 );
    })

    it( 'should return correct max reverse pwm value', function(){ 
      expect( pwm.getPWM(1, "reverse") ).to.equal(75);
    })

    it( 'should return correct min reverse pwm value', function(){ 
      expect( pwm.getPWM(0, "reverse") ).to.equal(185);
    })

    it( 'should return correct half forward pwm value', function(){ 
      expect( pwm.getPWM(0.5, "forward") ).to.equal(223);
    })

    it( 'should return correct half reverse pwm value', function(){ 
      expect( pwm.getPWM(0.5, "reverse") ).to.equal(130);
    })


  })
  
})
