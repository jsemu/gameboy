let Util = require('util');

class JR_NZ_r8 {
  constructor() {
    this.length   = 2;
    this.duration = 12; // or 8?!
  }

  execute(memory, cpu) {
    if(!cpu.getZ()) {
      let relJump = Util.unsignedToSigned(memory.readWord(cpu.getRegister("PC")+1));
      cpu.queueJump(relJump-1);
    }
  }
}

module.exports = JR_NZ_r8;

