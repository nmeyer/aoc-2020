var _ = require('underscore');

const TEST_INPUT = {
    depart: 939,
    buses: [7, 13, 'x', 'x', 59, 'x', 31, 19]
};
const FULL_INPUT = {
    depart: 1008169,
    buses: [29, 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 41, 'x', 'x', 'x', 37, 'x', 'x', 'x', 'x', 'x', 653, 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 13, 'x', 'x', 'x', 17, 'x', 'x', 'x', 'x', 'x', 23, 'x', 'x', 'x', 'x', 'x', 'x', 'x', 823, 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 19]
};

function nextBus(depart, buses) {
    depart //?
    buses = _.without(buses, 'x'); //?

    let waits = _.map(buses, (bus) => { return { id: bus, wait: bus - (depart % bus) } });
    waits = _.sortBy(waits, 'wait') //?
    
    return waits[0];
}   

// let next = nextBus(TEST_INPUT.depart, TEST_INPUT.buses); //?
let next = nextBus(FULL_INPUT.depart, FULL_INPUT.buses); //?
const ANSWER = next.id * next.wait; //?