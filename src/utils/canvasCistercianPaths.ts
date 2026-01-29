import type { Digit } from "./types"
// tens  units
// thousands hundreds

export const VIEWBOX = {
  width: 400,
  height: 600,
  minX: -200,
  minY: -300, 
  //original values
  //40, 60, -20, -30
  //canvas too small
}

export const STAFF = [0, 30, 0, -30]

export const UNIT_DIGITS = {
  0: [], // No lines for zero
  1: [[0, 30, 20, 30]],
  2: [[0, 10, 20, 10]],
  3: [[0, 30, 20, 10]],
  4: [[0, 10, 20, 30]], 
  5: [
    [0, 30, 20, 30],
    [0, 10, 20, 30], 
  ],
  6: [[20, 30, 20, 10]],
  7: [
    [0, 30, 20, 30],
    [20, 30, 20, 10],
  ],
  8: [
    [0, 10, 20, 10],
    [20, 30, 20, 10],
  ],
  9: [
    [0, 30, 20, 30],
    [0, 10, 20, 10],
    [20, 30, 20, 10],
  ],
}

const transformCoords = (lines:number [][],position: 'units' | 'tens' | 'hundreds' | 'thousands') :number [][]=> {
    switch(position) {
        case 'units':
            return lines.map((line) => [...line])
        case 'tens':
            return lines.map(([x1, y1, x2, y2]) => [x1 * -1 , y1, x2 * -1, y2])
        case 'hundreds':
            return lines.map(([x1, y1, x2, y2]) => [x1 , y1 * -1, x2, y2 * -1])
        case 'thousands':
            return lines.map(([x1, y1, x2, y2])=>[x1 * -1 , y1 * -1, x2 * -1, y2 * -1])
        default:
        return lines.map((line) => [...line]);
    }
}

export const paseNumers = (num: number) => {
  const units = num % 10 as Digit;
  const tens = Math.floor((num / 10) % 10) as Digit;
  const hundreds = Math.floor((num / 100) % 10) as Digit;
  const thousands = Math.floor((num / 1000) % 10) as Digit;
  return { units, tens, hundreds, thousands };
}


export const getAllLines = (num: number) => {
  const { units, tens, hundreds, thousands } = paseNumers(num);

  const allLines = [];
  allLines.push([0, 30, 0, -30]); //stave

  if (units !== 0) {
    allLines.push(...transformCoords(UNIT_DIGITS[units], 'units'));
  }

  if (tens !== 0) {
    allLines.push(...transformCoords(UNIT_DIGITS[tens], 'tens'));
  }

  if (hundreds !== 0) {
    allLines.push(...transformCoords(UNIT_DIGITS[hundreds], 'hundreds'));
  }

  if (thousands !== 0) {
    allLines.push(...transformCoords(UNIT_DIGITS[thousands], 'thousands'));
  }

  return allLines;
}