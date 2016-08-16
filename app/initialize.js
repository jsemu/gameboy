let Memory        = require('memory');
let CPU           = require('cpu');
let Util          = require('util');
let MemoryViewer  = require('memory_viewer');

document.addEventListener('DOMContentLoaded', () => {
  let memory  = new Memory();
  let cpu     = new CPU(memory);
  let viewer  = new MemoryViewer(memory, cpu, document.getElementById("memory"));

  memory.load("DMG_ROM.bin", 0).then(() => {
    viewer.setup();
  });
});
