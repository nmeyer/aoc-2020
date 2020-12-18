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
const XYZT_KEY = (x,y,z,t) => { 
    if (t == null)
        throw new Error('Missing t val to XYZT_KEY(): ' + [x,y,z].join(','));
    return [x,y,z,t].join(',')
};
const KEY_XYZT = (key) => {
    let xyzt = key.split(',');
    if (xyzt.length < 4)
        throw new Error('Missing t in cellkey in KEY_XYZT(): ' + key);
    return key.split(',')
};

// Pre-cache dx,dy,dz,dt for all neighboring cells
const cartesian = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));
let DIRS = cartesian(_.range(-1, 2),
                _.range(-1, 2),
                _.range(-1, 2),
                _.range(-1, 2)); //?
DIRS.splice(40, 1);

function bigBang(input) {
    let world = new Set();

    for (var y = 0; y < input.length; y++) {
        for (var x = 0; x < input[0].length; x++) {
            if (input[y][x] == '#')
                world.add(XYZT_KEY(x, y, 0, 0));
        }
    }

    return world;
}

function printWorld(world) {
    // console.log(world);
    console.log(`Active: ${world.size}`);
}

function neighbors(world, x, y, z, t) {
    let nxyztArr = [];
    for (var dir of DIRS) {
        let [dx, dy, dz, dt] = dir,
            nxyzt = [parseInt(x) + dx, parseInt(y) + dy, parseInt(z) + dz, parseInt(t) + dt];
        nxyztArr.push(nxyzt);
    }
    return nxyztArr;
}

function splitNeighbors(world, x, y, z, t) {
    let active = [],
        inactive = [];

    for (var nxyzt of neighbors(world, x, y, z, t)) {
        let [nx, ny, nz, nt] = nxyzt;
        let nKey = XYZT_KEY(nx, ny, nz, nt);
        if (world.has(nKey)) {
            active.push(nKey);
        } else {
            inactive.push(nKey);
        }
    }
    
    // console.log(`${XYZT_KEY(x,y,z)} => ${active.length} ACTIVE neighbors`);
    // console.log(`${XYZT_KEY(x, y, z)} => ${inactive.length} INACTIVE neighbors`);
    
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
        let [x, y, z, t] = KEY_XYZT(cell); //?

        let { 
            '#': active, 
            '.': inactive 
        } = splitNeighbors(world, x, y, z, t);

        for (let nKey of inactive)
            inactiveToCheck.add(nKey);

        let numActive = active.length;
        if (numActive == 2 || numActive == 3) {
            // console.log(`(${x},${y},${z}) # -> #`);
            newWorld.add(XYZT_KEY(x, y, z, t));
        } else {
            // console.log(`(${x},${y},${z}) # -> .`);
        }
    }

    // inactiveToCheck; //?
    for (let cell of inactiveToCheck) {
        let [x, y, z, t] = KEY_XYZT(cell); //?

        let { '#': active } = splitNeighbors(world, x, y, z, t);
        let numActive = active.length;

        if (numActive == 3) {
            newWorld.add(XYZT_KEY(x, y, z, t));
        }
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