let Util = require('util');

class Memory {
  constructor() {
    this.onChangeCallbacks = [];

    this.memory = [];
    for(let i = 0; i <= 0xFFFF; i++) {
      this.memory[i] = 0x00;
    }
  }

  onChange(callback) {
    this.onChangeCallbacks.push(callback);
  }

  readWord(address) {
    return this.memory[address];
  }

  writeWord(address, value) {
    this.memory[address] = value;

    for(let callback of this.onChangeCallbacks) {
      callback(address, value);
    }
  }

  readDword(address) {
    return Util.makeDword(this.readWord(address+1), this.readWord(address+0));
  }

  load(uri, offset) {
    return new Promise((resolve, reject) => {
      fetch(uri).then((result) => {
        return result.arrayBuffer();
      }).then((buffer) => {
        let ar = new Uint8Array(buffer);
        for(let i = 0; i < ar.length; i++) {
          this.writeWord(i+offset, ar[i]);
        }

        resolve();
      });
    });
  }
}

module.exports = Memory;