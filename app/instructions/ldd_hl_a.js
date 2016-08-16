class LDD_HL_A {
  constructor() {
    this.length   = 1;
    this.duration = 8;
  }

  execute(memory, cpu) {
    // cpu.setRegister("A", cpu.getRegister(this.n) ^ memory.readDword(cpu.getRegister("PC")+1));
    memory.writeWord(cpu.getRegister("HL"), cpu.getRegister("A"));
    cpu.setRegister("HL", cpu.getRegister("HL") - 1);
  }
}

module.exports = LDD_HL_A;