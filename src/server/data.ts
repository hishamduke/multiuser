export let myArray: number[][] = Array.from({ length: 50 }, () =>
  Array(80).fill(0)
);

export function updateMyarray(newarray: number[][]) {
  myArray = newarray;
}
