let Util = require('util');

class CB {
  constructor() {
    this.length   = 2;
    this.duration = 8;
  }

  execute(memory, cpu) {
    let subcode = memory.readWord(cpu.getRegister("PC")+1);

    switch(subcode) {
      case 0x7C:

        let va = 0b10000000 & cpu.getRegister("H");

        if(va == 0) {
          cpu.setZ(true);
        } else {
          cpu.setZ(false);
        }

        cpu.setN(false);
        cpu.setH(true);
      break;
    }
  }
}

module.exports = CB;