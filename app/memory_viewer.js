let Util = require('util');

class MemoryViewer {
  constructor(mem, cpu, viewerEl) {
    this.memory = mem;
    this.cpu = cpu;
    this.viewer = viewerEl;

    this.updateRegistersTimeout = null;

    this.memory.onChange((address, value) => {
      // let cell = document.querySelector(`[data-address='${address}']`);
      // cell.innerText = Util.hex(value);
    });

    this.cpu.onRegisterChange((register, value) => {
      if(register == "PC") {
        let oldEl = document.querySelector(".pc");
        if(oldEl) { oldEl.classList.remove("pc"); }

        document.querySelector(`[data-address='${value}']`).classList.add("pc");
      }
    });

    this.setup();
  }

  setup() {
    this.viewer.innerHTML = "";

    for(let x = 0; x < 0xFFFF; x += 16) {
      let row = document.createElement("div");

      row.innerHTML = `<div>${Util.hex16(x)}</div>`;

      for(let y = 0; y <= 0xF; y++) {
        let cell = document.createElement("span");
        cell.innerText = Util.hex(this.memory.readWord(x+y));
        cell.setAttribute("data-address", x+y);
        row.appendChild(cell);
      }

      this.viewer.appendChild(row);
    }

    document.querySelector("button#step").addEventListener("click", e => this.cpu.step())
    document.querySelector("button#run").addEventListener("click", e => this.cpu.run())
  }
}

module.exports = MemoryViewer;