class XOR_A {
  constructor(mn) {
    this.length   = 1;
    this.duration = 4;

    this.n = mn;
  }

  execute(memory, cpu) {
    cpu.setRegister("A", cpu.getRegister(this.n) ^ memory.readDword(cpu.getRegister("PC")+1));
  }
}

module.exports = XOR_A;