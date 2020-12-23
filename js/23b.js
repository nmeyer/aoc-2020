// LINKED-LIST solution from scratch
// Because I haven't done that in forever.

// Note: LINKED-LISTS IN JAVASCRIPT SUCK. POINTERS ARE GREAT.

const { Map } = require('immutable');

const TEST_INPUT = '389125467';
const FULL_INPUT = '364289715';

const HIGHEST_LABEL = 1000000;
const MOVES = 10000000;

function Cup(label) {
    this.label = label; //?
}

function parse(input) {

    // Keep an index of cup label -> cup node
    let labelToCup = new Array(HIGHEST_LABEL + 1);

    // Linked-List of Cups from back to front
    let firstCup = new Cup(parseInt(input[0]));
    labelToCup[firstCup.label] = firstCup;
    let prevCup = firstCup;

    // for (let i = 1; i < input.length; i++) {
    // for (let i = 1; i < 20; i++) {
    for (let i = 1; i < HIGHEST_LABEL; i++) {
        let label = (i < 9 ? parseInt(input[i]) : i+1); // we're setting 9 twice!!!
        // console.log(label);

        let cup = new Cup(label);
        labelToCup[label] = cup;

        // Link up the cups
        prevCup.next = cup;
        prevCup = cup;
    }
    
    // Wrap-around last cup to front:
    prevCup.next = firstCup;

    // console.log(labelToCup);

    return {
        firstCup,
        labelToCup
    };
}

function nextDest(current, invalid) {
    let dest = current.label; //?
    invalid; //?
    do {
        dest -= 1;
        if (dest == 0)
            dest = HIGHEST_LABEL;
    } while (invalid.includes(dest));

    return dest; //?
}

function move(current) {
    // printCups(current);
    // printCups(labelToCup[1]);

    // Remove next 3 cups, remember them:
    // -- what are the 3 labels we remove?
    let pickedUp = [
        current.next.label,
        current.next.next.label,
        current.next.next.next.label
    ]; //?
    let oldNext = current.next;

    // -- current.next points 4 down the chain now
    current.next = current.next.next.next.next;

    // Get our next destination cup
    let destCup = labelToCup[nextDest(current, pickedUp)]; //?

    // Insert pickedUp cups after destCup
    // -- end of picked up needs to point to the cup after dest:
    oldNext.next.next.next = destCup.next;
    // -- dest.next needs to be beginning of pick up chain:
    destCup.next = oldNext;

    // New current cup is just current.next
    current = current.next; //?

    return current;
}

function printCups(start) {
    let toPrint = start;
    let labels = [];
    do {
        labels.push(toPrint.label);
        toPrint = toPrint.next;
    } while (toPrint !== start)
    console.log('cups: ' + labels);
    // let a = labelToCup[1].next.label;
    // let b = labelToCup[1].next.next.label;
    // console.log(`${a} x ${b} = ${a * b}`);
}

// PLAY GAME

// let { firstCup, labelToCup } = parse(TEST_INPUT);
let { firstCup, labelToCup } = parse(FULL_INPUT);
// console.log(firstCup);

let current = firstCup;

let MOVE = 1;
do {
    if (MOVE % 100000 == 0) console.log(`-- move ${MOVE} --`);
    current = move(current); //?
    MOVE++;

} while (MOVE <= MOVES)

console.log('-- final --');
// printCups(current);

console.log('== ANSWER ==');

let b = labelToCup[1].next.next.label;
let a = labelToCup[1].next.label;
console.log(`${a} x ${b} = ${a * b}`);
a * b; //?