var _ = require('underscore');

const SMALL_TEST_INPUT = [ 16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4];
const SMALL_TEST_ANSWER = 8;

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
const TEST_ANSWER = 19208;

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

// Split an array into chunks
// where the Joltage gap == delta
function splitOnDelta(delta, array) {
    let subArrays = [];
    let splitStart = 0;

    for (var i = 0; i < array.length - 1; i++) {
        if ((array[i + 1] - array[i]) == delta) {
            let subArr = array.slice(splitStart, i + 1);
            if (i + 1 == array.length - 1)
                subArr.push(_.last(array));
            splitStart = i + 1;
            subArrays.push(subArr);
        }
    }

    return subArrays;
}

function subPaths(array) {
    const PATH_KEY = (path) => path.join(':');
    let pathsSeen = new Set();
    
    function removeJumps(subArr) {
        pathsSeen.add(PATH_KEY(subArr));

        // Can we remove an adapter w/o creating
        // a gap of more than 3 jolts?
        // --> if so, we have a new path!
        for (var i = 1; i < subArr.length - 1; i++) {
            if ((subArr[i+1] - subArr[i-1]) <= 3) {
                let newPath = _.without(subArr, subArr[i]);
                removeJumps(newPath);
            }
        }
    }

    removeJumps(array);

    return pathsSeen;
}
// p = subPaths([4, 5, 6, 7, 8]); //?
// p.size == 7 //?

function testInput(input) {
    // Sort adapters, and add device (highest+3) and outlet joltage (0)
    input.sort((a, b) => a - b);
    input.unshift(0);
    input.push(_.last(input) + 3);

    // We can split the problem into a bunch of sub-graphs
    // that are separated by 3-jolt jumps.
    // Since a 3 jolt jump only has 1 path, we can just find
    // the unique paths of each sub-graph, and multiply
    // them all together at the end.
    let splits = splitOnDelta(3, input);

    let totalPaths = _.reduce(splits, function (memo, split) {
        return memo * subPaths(split).size;
    }, 1);

    return totalPaths;
}

testInput(FULL_INPUT); //?