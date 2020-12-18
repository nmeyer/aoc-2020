const { range } = require('underscore');
const _ = require('underscore');

const TEST_INPUT = [
    0, 3, 6
    // 3, 1, 2
];
const TURNS = 30000000;
// const TURNS    = 10000000;
// 2020th number spoken
const TEST_ANSWER = 436;

const FULL_INPUT = [
    16, 11, 15, 0, 1, 7
];

// Shard the history for #s into 10 buckets
// Runs about 100 times faster than ONE history array!
const HISTORY_BUCKETS = 10;
let HISTORY = [
    // history_0 = [],
    // history_1 = [],
    // history_3 = [], 
];
_.map(_.range(HISTORY_BUCKETS), (i) => HISTORY[i] = []);

let lastSpoken = null;
let turn = 1;

function speak(num) {
    let history = HISTORY[num % HISTORY_BUCKETS];
    let lastTurn = history[num];
    
    if (lastTurn) {
        lastTurn.push(turn);
    }
    else {
        lastTurn = [turn];
    }
    history[num] = lastTurn;
    
    lastSpoken = num;
    turn++;
}

function whatIsNext() {
    let history = HISTORY[lastSpoken % HISTORY_BUCKETS];
    let lastTurn = history[lastSpoken];

    // If new #, or we had only seen it once:
    let len = lastTurn.length;
    if (len < 2)
        return 0;
    
    return (lastTurn[len-1] - lastTurn[len-2]); //?
}

function run(input) {
    for (let i of input) {
        speak(i);
    }

    while (turn < (TURNS + 1)) {
        speak(whatIsNext());
    }

    return lastSpoken;
}

// let answer = run(TEST_INPUT); //?
// answer == TEST_ANSWER; //?
let answer = run(FULL_INPUT); //?
console.log(answer);