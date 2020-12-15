var _ = require('underscore');

const TEST_INPUT = {
    buses: [7, 13, 'x', 'x', 59, 'x', 31, 19]
};
const TEST_ANSWER = 1068781;

// Time T such that:
// let t = TEST_ANSWER;
// (t + 0) % 7 == 0; //?
// (t + 1) % 13 == 0; //?
// (t + 4) % 59 == 0; //?
// (t + 6) % 31 == 0; //?
// (t + 7) % 19 == 0; //?
// ===========================

// for (var t = (59 - 4); true; t += 59) {
//     if (
//         (t + 0) % 7 == 0 &&
//         (t + 1) % 13 == 0 &&
//         // (t + 4) % 59 == 0 &&
//         (t + 6) % 31 == 0 &&
//         (t + 7) % 19 == 0
//     )
//         break;
// }
// t == TEST_ANSWER //?

const FULL_INPUT = {
    buses: [29, 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 41, 'x', 'x', 'x', 37, 'x', 'x', 'x', 'x', 'x', 653, 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 13, 'x', 'x', 'x', 17, 'x', 'x', 'x', 'x', 'x', 23, 'x', 'x', 'x', 'x', 'x', 'x', 'x', 823, 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 19]
};

let buses = _.map(FULL_INPUT.buses, function (val, idx) {
    return { busId: val, timeDelta: idx }; //?
});
buses = _.filter(buses, (i) => i.busId !== 'x'); //?
buses = _.sortBy(buses, 'timeDelta'); //?
// let highest = buses[buses.length - 1]; //?

let rems = [],
    divisors = [];
for (var bus of buses) {
    bus //?
    let rem = bus.busId - (bus.timeDelta % bus.busId); //?
    `x % ${bus.busId} = ${rem}` //?
    rems.push(rem);
    divisors.push(bus.busId);
}
rems; //?
divisors; //?
['{','}'].join(rems.join(', ')); //?
['{','}'].join(divisors.join(', ')); //?
Wolfram Say: 230903629977901

/*
[ { busId: 13, timeDelta: 42 },
  { busId: 17, timeDelta: 46 },
  { busId: 19, timeDelta: 79 },
  { busId: 23, timeDelta: 52 },
  { busId: 29, timeDelta: 0 },
  { busId: 37, timeDelta: 23 },
  { busId: 41, timeDelta: 19 },
  { busId: 653, timeDelta: 29 },
  { busId: 823, timeDelta: 60 } ]
  */
/*
{ busId: 13, timeDelta: 42 },
{ busId: 17, timeDelta: 46 },
{ busId: 19, timeDelta: 79 },
{ busId: 23, timeDelta: 52 },
{ busId: 29, timeDelta: 0 },
{ busId: 37, timeDelta: 23 },
{ busId: 41, timeDelta: 19 },
{ busId: 653, timeDelta: 29 },
{ busId: 823, timeDelta: 60 } ]
*/

100000000000000 % 823; //?

// 0  8  16  24  32  40  48  % 8 = 0
// 0 6 12 18 24 30 36 42 48  % 6 = 0



// if (! % 653)
    // skip to the next # that could be % 823 or % 653

// for (var t = (823 - 60); true; t += 823) {
//     // console.log(t);
//     if (
//         (t + 60) % 823 == 0 &&
//         (t + 29) % 653 == 0 &&
//         (t + 19) % 41 == 0 &&
//         (t + 23) % 37 == 0 &&
//         (t + 0) % 29 == 0 &&
//         (t + 52) % 23 == 0 &&
//         (t + 79) % 19 == 0 &&
//         (t + 46) % 17 == 0 &&
//         (t + 42) % 13 == 0
//     )
//         break;
// }
// console.log(t) //?

// Dividend = Divisor * Quotient + Remainder

// x = 5
// % 2

// (10 + 3) % 5 == 0
// 10 % 5 + 3 == 0

// A = (X + 60) * 823

// x % 823 + 60 = 0

// a % 823 = 823 - 60
// a = 823 * 7; //?

// // (a + 60) % 823 = 0
// (823 - 60) % 823; //?
// (763 + 60) % 823 //?
// 763 % 823; //?
// //         (x + 60) % 823 == 0
// //         (x) % 823 == 763

// //         (x + 60) % 823 == 0
// x % 823 = 763
// //         (x + 29) % 653 == 
// x % 653 = 634
// //         (x + 19) % 41 == 
// x % 41 = 22
// //         (x + 23) % 37 == 
// x % 37 = 14
// //         (x + 0) % 29 == 
// x % 29 = 0
// //         (x + 52(6)) % 23 == 
// x % 23 = 17
// //         (x + 79) % 19 == 
// x % 19 = 16
// //         (x + 46) % 17 == 
// x % 17 = 5
// //         (x + 42) % 13 
// x % 13 = 10

// x = 1150533085224390 // via https://www.wolframalpha.com/input/?i=1150533085224390&assumption=%22ClashPrefs%22+-%3E+%7B%22Math%22%7D



// 17, x, 13, 19
// t % 17 = 0
// t + 2 % 13 = 0 >> t % 13 = 11