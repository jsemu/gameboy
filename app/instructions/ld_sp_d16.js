let Util = require('util');

class LD_SP_d16 {
  constructor() {
    this.length   = 3;
    this.duration = 12;
  }

  execute(memory, cpu) {
    let v = memory.readDword(cpu.getRegister("PC")+1);
    cpu.setRegister("SP", v);
  }
}

module.exports = LD_SP_d16;