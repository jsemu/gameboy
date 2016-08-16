let Util = require('util');

class CPU {
  constructor(mem) {
    this.registerNames = ["A", "F", "B", "C", "D", "E", "H", "L", "SP", "PC"];

    this.registers = {};
    for(name of this.registerNames) { this.registers[name] = 0 >>> 0; };

    this.registerChangeCallbacks = [];

    this.memory = mem;

    this.instructions = [];
    
    this.instructions[0x20] = new (require('instructions/jr_nz_r8'))();
    this.instructions[0x21] = new (require('instructions/ld_n_nn'))("HL");
    this.instructions[0x31] = new (require('instructions/ld_sp_d16'))();
    this.instructions[0x32] = new (require('instructions/ldd_hl_a'))();
    this.instructions[0xaf] = new (require('instructions/xor_a'))("A");
    this.instructions[0xcb] = new (require('instructions/cb'));

    this.requiredJumps = [];
  }

  getRegister(name) {
    let regs = name.split("");

    if(this.registerNames.includes(name)) { 
      return this.registers[name]
    } else if(regs.length == 2) {
      let lower   = this.getRegister(regs[0]);
      let higher  = this.getRegister(regs[1]);

      return Util.makeDword(lower, higher);
    } else {
      throw `wtf yo, you can't have a register named: ${name}`;
    }
  }

  onRegisterChange(callback) {
    this.registerChangeCallbacks.push(callback);
  }

  setRegister(name, value) {
    let regs = name.split("");


    if(this.registerNames.includes(name)) {
      this.registers[name] = value;
    } else if(regs.length == 2) {
      let lower   = Util.lowerWord(value);
      let higher  = Util.higherWord(value)

      this.setRegister(regs[0], higher);
      this.setRegister(regs[1], lower);
    } else {
      throw `wtf yo, you can't have a register named: ${name}`;
    }

    for(let callback of this.registerChangeCallbacks) {
      callback(name, value);
    }
  }

  queueJump(n) {
    this.requiredJumps.push(n);
  }

  setZ(v) {
    if(v == true) {
      this.setRegister("F", this.getRegister("F") | 0b10000000);
     } else {
      this.setRegister("F", this.getRegister("F") & 0b01111111);
     }
  }

  getZ() {
    let rr = (this.getRegister("F") & 0b10000000);
    return (rr  == 0b10000000);
  }

  setN(v) {
    this.setRegister("F", v ? this.getRegister("F") | 0b01000000 : this.getRegister("F") & 0b10111111);
  }

  setH(v) {
    this.setRegister("F", v ? this.getRegister("F") | 0b00100000 : this.getRegister("F") & 0b11011111);
  }

  setC(v) {
    this.setRegister("F", v ? this.getRegister("F") | 0b00010000 : this.getRegister("F") & 0b11101111);
  }

  step() {
    let opcode = this.memory.readWord(this.getRegister("PC"));
    
    if(!(opcode in this.instructions)) {
      throw `Unrecognised instruction: ${Util.hex(opcode)}`;
    }

    let instruction = this.instructions[opcode];
    instruction.execute(this.memory, this);

    this.setRegister("PC", this.getRegister("PC") + instruction.length);

    while(this.requiredJumps.length > 0) {
      this.setRegister("PC", this.getRegister("PC")+this.requiredJumps.pop());
    }
  }

  run() {
    while(true) { this.step(); }
  }
}

module.exports = CPU;