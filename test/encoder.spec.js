let Encoder = require("../lib/encoder");

describe('encoder', function () {
  this.timeout( 10000 );

  let board, sandbox, clock;;

  beforeEach( function( ) {
    board = newBoard();
    sandbox = sinon.sandbox.create();
    clock = sandbox.useFakeTimers();
  })

  describe('default encoder', function () {
    let encoder;

    beforeEach( function() {
      encoder = new Encoder( {
        pin1: 2,
        pin2: 4,
        board: board
      });
    })

    it('should call updateA when value is read from pin1', function () {
      let spy = sandbox.spy( encoder, "_updateA");
      board.emit("digital-read-" + encoder.channelA.pin, 0);
      expect( spy.called ).to.equal( true );
    });

    it('should call updateB when value is read from pin2', function ( ) {
      let spy = sandbox.spy( encoder, "_updateB");
      board.emit("digital-read-" + encoder.channelB.pin, 0);
      expect( spy.called ).to.equal( true );
    });

    it('should properly handle overflow going forward', function ( done ) {
      encoder.count = Number.MAX_SAFE_INTEGER - 2000;
      encoder.prevCount = Number.MAX_SAFE_INTEGER - 2000;
      encoder.on("data", (data) => {
          expect( data.pulses ).to.be.within( 498, 500 );
      });
      for( let i = 0; i < 4000; i++ ) {
        clock.tick(1);
        board.emit("digital-read-" + encoder.channelB.pin, ( i - 1 ) % 2 );
        clock.tick(1);
        board.emit("digital-read-" + encoder.channelA.pin, i % 2 );
      }
      done();
    })

    it('should properly handle overflow going reverse', function ( done ) {
      encoder.count = -Number.MAX_SAFE_INTEGER + 2000;
      encoder.prevCount = -Number.MAX_SAFE_INTEGER + 2000;
      encoder.on("data", (data) => {
          expect( data.pulses ).to.be.within( 498, 500 );
      });
      for( let i = 0; i < 4000; i++ ) {
        clock.tick(1);
        board.emit("digital-read-" + encoder.channelA.pin, i % 2 );
        clock.tick(1);
        board.emit("digital-read-" + encoder.channelB.pin, ( i - 1 ) % 2 );
      }
      done();
    })

  })

  afterEach( function( ) {
    board.emit("exit");
    sandbox.restore();
  })

})
