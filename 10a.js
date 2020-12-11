var _ = require('underscore');

const TEST_INPUT = [
    28,
    33,
    18,
    42,
    31,
    14,
    46,
    20,
    48,
    47,
    24,
    23,
    49,
    45,
    19,
    38,
    39,
    11,
    1,
    32,
    25,
    35,
    8,
    17,
    7,
    9,
    4,
    2,
    34,
    10,
    3
];

const FULL_INPUT = [
    99,
    128,
    154,
    160,
    61,
    107,
    75,
    38,
    15,
    11,
    129,
    94,
    157,
    84,
    121,
    14,
    119,
    48,
    30,
    10,
    55,
    108,
    74,
    104,
    91,
    45,
    134,
    109,
    164,
    66,
    146,
    44,
    116,
    89,
    79,
    32,
    149,
    1,
    136,
    58,
    96,
    7,
    60,
    23,
    31,
    3,
    65,
    110,
    90,
    37,
    43,
    115,
    122,
    52,
    113,
    123,
    161,
    50,
    95,
    150,
    120,
    101,
    126,
    151,
    114,
    127,
    73,
    82,
    162,
    140,
    51,
    144,
    36,
    4,
    163,
    85,
    42,
    59,
    67,
    64,
    86,
    49,
    2,
    145,
    135,
    22,
    24,
    33,
    137,
    16,
    27,
    70,
    133,
    130,
    20,
    21,
    83,
    143,
    100,
    41,
    76,
    17
];

// 1-jolt difference = 22 * 3-jolt differences = 10 ======== 220
const TEST_ANSWER = 220;

function testInput(input) {
    let currJoltage = 0;
    let adapters = new Set(input);
    let chain = [0];

    while (adapters.size > 0) {
        let nextJoltage = pickNextAdapter(currJoltage, adapters); //?
        chain.push(nextJoltage);
        chain //?
        adapters.delete(nextJoltage);
        adapters.has(nextJoltage) //?
        currJoltage = nextJoltage;
        currJoltage //?
    }
    // And add on our device... (+3 jolts)
    chain.push(chain[chain.length - 1] + 3); //?

    numWithDelta(1, chain) //?
    numWithDelta(2, chain) //?
    numWithDelta(3, chain) //?


    return (numWithDelta(1, chain) * numWithDelta(3, chain)); //?
}


function numWithDelta(delta, array) {
    let count = 0;
    for (var i = 0; i < array.length - 1; i++) {
        if ((array[i+1] - array[i]) == delta)
            count++;
    }
    return count; //?
}

function pickNextAdapter(currJoltage, adapters) {
    if (adapters.has(currJoltage + 1)) {
        return currJoltage + 1;
    }
    else if (adapters.has(currJoltage + 2)) {
        return currJoltage + 2;
    }
    else if (adapters.has(currJoltage + 3)) {
        return currJoltage + 3;
    }
    else {
        console.error('No valid adapter found for: ' + currJoltage);
    }
}

testInput(TEST_INPUT) == TEST_ANSWER; //?
// testInput(FULL_INPUT) //?