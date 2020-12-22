const { List, Map, Set, Stack } = require('immutable');

const TEST_INPUT = [
    [ 9, 2, 6, 3, 1, ],
    [ 5, 8, 4, 7, 10, ]
];

const FULL_INPUT = [
    [ 41,48,12,6,1,25,47,43,4,35,10,13,23,39,22,28,44,42,32,31,24,50,34,29,14 ],
    [ 36,49,11,16,20,17,26,30,18,5,2,38,7,27,21,9,19,15,8,45,37,40,33,46,3 ]
];

function draw(deck) {
    return { card: deck.first(), deck: deck.shift() }
}

function done(deck1, deck2) {
    if (deck1.size == 0)
        return deck2;
    if (deck2.size == 0)
        return deck1;
    return false;
}

function round(deck1, deck2) {
    let card1,
        card2;

    ({ card: card1, deck: deck1 } = draw(deck1)); //?
    ({ card: card2, deck: deck2 } = draw(deck2)); //?

    if (card1 > card2) {
        deck1 = deck1.push(card1).push(card2);
    } else {
        deck2 = deck2.push(card2).push(card1);
    }

    return { deck1, deck2 }; //?
}

function run(input) {
    let deck1 = List(input[0]),
        deck2 = List(input[1]);

    let roundNum = 0;
    while (true) {
        roundNum++;
        ({ deck1, deck2 } = round(deck1, deck2));
        console.log(`-- Round ${ roundNum } --`);
        console.log(deck1.toString());
        console.log(deck2.toString());
        
        if (done(deck1, deck2))
            return { deck1, deck2 };
    }
}

// let { deck1, deck2 } = run(TEST_INPUT);
let { deck1, deck2 } = run(FULL_INPUT);
let winner = done(deck1, deck2);
let answer = winner
    .reverse()
    .reduce(function (r, card, i) {
        return r + (card * (i+1)); //?
    }, 0);
answer; //?