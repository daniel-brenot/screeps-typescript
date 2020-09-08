/**
 * Creates a ring of coords around the x/y coordinates
 * and executes a given callback for each one.
 * Function stops when callback returns true for the number
 * of times specified by iter
 * */
export function ring(x: number, y: number, iter, cb: (x, y) => boolean) {
  // Cap loops level at 10 to prevent infinite loop
  for (let level = 1; level < 3; level++) {
    x -= 1;
    y -= 1;
    // Dont modify original values so we can keep going back to first point
    let x2 = x;
    let y2 = y;
    let len = (level * 2);
    for (let rot = 0; rot < 4; rot++) {
      for (let i = 0; i < len; i++) {
        // Do the thing
        if (cb(x2, y2) && --iter === 0) return;
        switch (rot) {
          case 0: x2++;
            break;
          case 1: y2++;
            break;
          case 2: x2--;
            break;
          case 3: y2--;
            break;
        }
      }
    }
  }
}
