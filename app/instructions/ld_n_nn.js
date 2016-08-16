class LD_n_nn {
  constructor(mn) {
    this.length   = 3;
    this.duration = 12;

    this.n = mn;
  }

  execute(memory, cpu) {
    cpu.setRegister(this.n, memory.readDword(cpu.getRegister("PC")+1));
  }
}

module.exports = LD_n_nn;