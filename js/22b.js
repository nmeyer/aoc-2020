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

function round(gameId, roundNum, deck1, deck2) {
    let card1,
        card2;

    ({ card: card1, deck: deck1 } = draw(deck1)); //?
    ({ card: card2, deck: deck2 } = draw(deck2)); //?

    if (deck1.size >= card1 && deck2.size >= card2) {
        // Winner of round is winner of sub-game
        console.log('Playing a sub - game to determine the winner...');
        GAME_NUM += 1;

        let { 
            deck1: subDeck1,
            deck2: subDeck2 
        } = game(GAME_NUM, deck1.take(card1), deck2.take(card2)); //?

        console.log(`...anyway, back to game ${gameId}.`);
        
        if (subDeck1.size > subDeck2.size) {
            console.log(`Player 1 wins round ${roundNum} of game ${gameId}!`);
            deck1 = deck1.push(card1).push(card2);
        } else {
            deck2 = deck2.push(card2).push(card1);
            console.log(`Player 2 wins round ${roundNum} of game ${gameId}!`);
        }
    }
    else {
        // Play Normally
        if (card1 > card2) {
            console.log(`Player 1 wins round ${roundNum} of game ${gameId}!`);
            deck1 = deck1.push(card1).push(card2);
        } else {
            console.log(`Player 2 wins round ${roundNum} of game ${gameId}!`);
            deck2 = deck2.push(card2).push(card1);
        }
    }

    return { deck1, deck2 }; //?
}

let GAME_NUM = 1;

function game(gameId, deck1, deck2) {
    console.log();
    console.log(`=== Game ${ gameId } ===`);
    console.log();

    let roundNum = 0;
    let preventLoops = Set();

    while (true) {
        roundNum++;
        
        console.log(`-- Round ${roundNum} (Game ${gameId})--`);
        console.log(deck1.toString());
        console.log(deck2.toString());

        let loopKey = List([deck1, deck2]); //?
        console.log('loopKey: ' + loopKey.toString());

        if (preventLoops.has(loopKey)) {
            // Infinite Loops detected,
            // Player 1 wins
            console.log(`Loop found in game ${gameId}. Player 1 wins!`);
            return { deck1: { size: 1 }, deck2: { size: 0 } };
        }
        preventLoops = preventLoops.add(loopKey);

        
        ({ deck1, deck2 } = round(gameId, roundNum, deck1, deck2));
        console.log();

        if (done(deck1, deck2)) {
            if (deck1.size > deck2.size)
                console.log(`The winner of game ${gameId} is Player 1!`);
            else
                console.log(`The winner of game ${gameId} is Player 2!`);
            return { deck1, deck2 };
        }
    }
}

function run(input) {
    let deck1 = List(input[0]),
        deck2 = List(input[1]);

    return game(GAME_NUM, deck1, deck2);
}

// let { deck1, deck2 } = run(TEST_INPUT);
let { deck1, deck2 } = run(FULL_INPUT);

console.log('== Post-Game Results ==');
console.log(`Player 1: ${deck1.toArray()}`);
console.log(`Player 2: ${deck2.toArray()}`);

// let ALL_CARDS = Set(TEST_INPUT[0]).union(TEST_INPUT[1]);
let ALL_CARDS = Set(FULL_INPUT[0]).union(FULL_INPUT[1]);
ALL_CARDS.size; //?

let winner = done(deck1, deck2);
winner.size; //?

// let winner = List([34, 10, 27, 24, 21, 3, 42, 14, 31, 6, 18, 5, 39, 37, 30, 16, 35, 23, 33, 22, 49, 45, 48, 44, 36, 17, 25, 9, 26, 12, 15, 2, 20, 19, 50, 40, 47, 28, 46, 38, 32, 13, 43, 8, 29, 1, 41, 7, 11, 4]);
let answer = winner
    .reverse()
    .reduce(function (r, card, i) {
        return r + (card * (i+1)); //?
    }, 0);

console.log(answer); //?

console.log(`Expected ${ALL_CARDS.size} cards in winning deck. Got ${winner.size}`);


// let a = List([8, 15, 3])
// // let a = List([8, 3, 15])
// let b = List([10, 9, 7, 5])
// a.merge(b); //?