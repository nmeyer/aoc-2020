const _ = require('underscore');

const TEST_INPUT = [
    '.#.',
    '..#',
    '###',
];
const TEST_ANSWER = 112;

const FULL_INPUT = [
    '#.##.##.',
    '.##..#..',
    '....#..#',
    '.##....#',
    '#..##...',
    '.###..#.',
    '..#.#..#',
    '.....#..'
];

const CYCLES = 6;

const XYZ_KEY = (x,y,z) => [x,y,z].join(',');
const KEY_XYZ = (key) => key.split(',');
const cartesian = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));

function bigBang(input) {
    let world = new Set();

    for (var y = 0; y < input.length; y++) {
        for (var x = 0; x < input[0].length; x++) {
            if (input[y][x] == '#')
                world.add(XYZ_KEY(x, y, 0));
        }
    }

    return world;
}

function printWorld(world) {
    console.log(`Active: ${ world.size }`);
}

// let dx = _.range(-1, 2),
//     dy = _.range(-1, 2),
//     dz = _.range(-1, 2);
// let DIRS = cartesian(dx, dy, dz); //?
// DIRS.splice(13, 1);
const DIRS = [
    [-1, -1, -1],
    [-1, -1, 0],
    [-1, -1, 1],
    [-1, 0, -1],
    [-1, 0, 0],
    [-1, 0, 1],
    [-1, 1, -1],
    [-1, 1, 0],
    [-1, 1, 1],
    [0, -1, -1],
    [0, -1, 0],
    [0, -1, 1],
    [0, 0, -1],
    [0, 0, 1],
    [0, 1, -1],
    [0, 1, 0],
    [0, 1, 1],
    [1, -1, -1],
    [1, -1, 0],
    [1, -1, 1],
    [1, 0, -1],
    [1, 0, 0],
    [1, 0, 1],
    [1, 1, -1],
    [1, 1, 0],
    [1, 1, 1]
];

function neighbors(world, x, y, z) {
    let nxyzArr = [];
    for (var dir of DIRS) {
        let [dx, dy, dz] = dir,
            nxyz = [parseInt(x) + dx, parseInt(y) + dy, parseInt(z) + dz];
        nxyzArr.push(nxyz);
    }
    return nxyzArr;
}

function splitNeighbors(world, x, y, z) {
    let active = [],
        inactive = [];

    for (var nxyz of neighbors(world, x, y, z)) {
        let [nx, ny, nz] = nxyz;
        let nKey = XYZ_KEY(nx, ny, nz);
        if (world.has(nKey)) {
            active.push(nKey);
        } else {
            inactive.push(nKey);
        }
    }
    
    // console.log(`${XYZ_KEY(x,y,z)} => ${active.length} ACTIVE neighbors`);
    // console.log(`${XYZ_KEY(x, y, z)} => ${inactive.length} INACTIVE neighbors`);
    
    return {
        '#': active,
        '.': inactive
    }
}

function step(world) {
    let newWorld = new Set();
    let inactiveToCheck = new Set();

    // Check active, build up Set of inactive cells to check as we go
    for (let cell of world) {
        let [x, y, z] = KEY_XYZ(cell); //?

        let { 
            '#': active, 
            '.': inactive 
        } = splitNeighbors(world, x, y, z);

        for (let nKey of inactive)
            inactiveToCheck.add(nKey);

        let numActive = active.length;
        if (numActive == 2 || numActive == 3) {
            // console.log(`(${x},${y},${z}) # -> #`);
            newWorld.add(XYZ_KEY(x, y, z));
        } else {
            // console.log(`(${x},${y},${z}) # -> .`);
        }
    }

    // inactiveToCheck; //?
    for (let cell of inactiveToCheck) {
        let [x, y, z] = KEY_XYZ(cell); //?

        let { '#': active } = splitNeighbors(world, x, y, z);
        let numActive = active.length;

        if (numActive == 3) {
            // console.log(`(${x},${y},${z}) . -> #`);
            newWorld.add(XYZ_KEY(x, y, z));
        }
        // else {
        //     console.log(`(${x},${y},${z}) . -> .`);
        // }
    }

    return newWorld;
}

function run(input) {
    let world = bigBang(input);
    printWorld(world);

    let cycle = 0;
    while (cycle < CYCLES) {
        world = step(world);
        cycle++;
        printWorld(world);
    }
}

// run(TEST_INPUT);
run(FULL_INPUT);