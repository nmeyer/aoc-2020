let { List } = require('immutable');

// -- Round 3 (Game 1)--
// List [ 12, 6, 1, 25, 47, 43, 4, 35, 10, 13, 23, 39, 22, 28, 44, 42, 32, 31, 24, 50, 34, 29, 14, 41, 36 ]
// List [ 11, 16, 20, 17, 26, 30, 18, 5, 2, 38, 7, 27, 21, 9, 19, 15, 8, 45, 37, 40, 33, 46, 3, 49, 48 ]
// Player 1 draws 12
// Player 2 draws 11
// sub game happens...
// there's a LOOP
// So Player 1 wins...
// So 12, 11 should be at end of Player 1s deck

// ...what actually happened?

// -- Round 4 (Game 1)--
// List [ 6, 1, 25, 47, 43, 4, 35, 10, 13, 23, 39, 22, 28, 44, 42, 32, 31, 24, 50, 34, 29, 14, 41, 36, 12, 11 ]
// List [ 16, 20, 17, 26, 30, 18, 5, 2, 38, 7, 27, 21, 9, 19, 15, 8, 45, 37, 40, 33, 46, 3, 49, 48 ]

let winner = List([34, 10, 27, 24, 21, 3, 42, 14, 31, 6, 18, 5, 39, 37, 30, 16, 35, 23, 33, 22, 49, 45, 48, 44, 36, 17, 25, 9, 26, 12, 15, 2, 20, 19, 50, 40, 47, 28, 46, 38, 32, 13, 43, 8, 29, 1, 41, 7, 11, 4]);
winner.size; //?

let answer = winner
    .reverse()
    .reduce(function (r, card, i) {
        console.log(`${card} * ${i+1} = ${card * (i + 1)}`);
        console.log(r + (card * (i + 1)));
        return r + (card * (i + 1)); //?
    }, 0);

console.log(answer); //?