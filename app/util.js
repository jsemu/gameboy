class Util {
  constructor() {
  }

  makeDword(lower, higher) {
    return (lower << 8) + higher;
  }

  lowerWord(dword) {
    return dword & 0x00FF;
  }

  higherWord(dword) {
    return (dword & 0xFF00) >> 8;
  }

  hex(dec) {
    let n = dec.toString(16);
    return "0x" + ("00".substring(0, 2 - n.length) + n);
  }

  hex16(dec) {
   let n = dec.toString(16);
    return "0x" + ("0000".substring(0, 4 - n.length) + n); 
  }

  unsignedToSigned(n) {
    if(n >= 0b10000000) {
      return -(255 - n);
    } else {
      return n;
    }
  }
}

module.exports = new Util();