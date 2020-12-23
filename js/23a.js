// LINKED-LIST solution from scratch
// Because I haven't done that in forever.

// Note: LINKED-LISTS IN JAVASCRIPT SUCK. POINTERS ARE GREAT.

const { Range, OrderedMap } = require('immutable');

const TEST_INPUT = '389125467';
const FULL_INPUT = '364289715';

function Cup(label) {
    this.label = label; //?
}

function parse(input) {

    // Keep an index of cup label -> cup node
    let labelToCup = OrderedMap();

    // Linked-List of Cups from back to front
    let firstCup = new Cup(+input[0]); //?
    labelToCup = labelToCup.set(+firstCup.label, firstCup); //?
    let prevCup = firstCup;

    for (let i = 1; i < input.length; i++) {
        let label = +input[i];

        let cup = new Cup(label);
        labelToCup = labelToCup.set(label, cup);

        // Link up the cups
        prevCup.next = cup;
        prevCup = cup;
    }

    // Wrap-around last cup to front:
    prevCup.next = firstCup;

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
            dest = 9;
    } while (invalid.includes(dest));

    return dest; //?
}

function move(current) {
    printCups(current);

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
    let destCup = labelToCup.get(nextDest(current, pickedUp)); //?
    destCup; //?
    labelToCup.get(3); //?

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
}

// PLAY GAME

let { firstCup, labelToCup } = parse(FULL_INPUT);

let current = firstCup;

let MOVE = 1;
do {
    console.log(`-- move ${MOVE} --`);
    current = move(current); //?
    MOVE++;

} while (MOVE <= 100)

console.log('-- final --');
printCups(current);

console.log('== ANSWER ==');
printCups(labelToCup.get(1).next);

let start = labelToCup.get(1).next;
let toPrint = start;
let labels = [];
do {
    labels.push(toPrint.label);
    toPrint = toPrint.next;
} while (toPrint.next !== start)
console.log(labels.join(''));