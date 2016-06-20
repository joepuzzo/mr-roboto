global.IS_TEST_MODE = true;

// Built-ins
global.Emitter = require("events").EventEmitter;

// Internal
global.five = require("johnny-five");

// Third Party (library)
global.converter = require("color-convert");
global.SerialPort = require("serialport");
global.Firmata = require("firmata");

// Third Party (test)
global.mocks  = require("mock-firmata");
global.sinon  = require("sinon");
global.expect = require("chai").expect;

global.MockFirmata = mocks.Firmata;
global.MockSerialPort = mocks.SerialPort;

global.Board = five.Board;
global.Boards = five.Boards;

function newBoard(pins) {

  if (pins) {
    pins.forEach(function(pin) {
      Object.assign(pin, {
        mode: 1,
        value: 0,
        report: 1,
        analogChannel: 127
      });
    });
  }

  var io = new MockFirmata({
    pins: pins
  });

  io.SERIAL_PORT_IDs.DEFAULT = 0x08;

  var board = new Board({
    io: io,
    debug: false,
    repl: false
  });

  io.emit("connect");
  io.emit("ready");

  board.digitalRead = function(pin, callback) {
    board.addListener("digital-read-" + pin, callback);
  };

  return board;
}

global.newBoard = newBoard;


var digits = {
  all: function(x) {
    return this.integral(Number(String(x).replace(/\./g, "")));
  },
  integral: function(x) {
    return Math.max(Math.floor(Math.log10(Math.abs(x))), 0) + 1;
  },
  fractional: function(x) {
    return this.all(x) - this.integral(x);
  },
};

global.digits = digits;
