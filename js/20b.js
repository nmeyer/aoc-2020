const { time } = require('console');
const fs = require('fs');
const _ = require('underscore');

const { Set: ISet, Map: IMap } = require('immutable');

const TEST_ANSWER = 20899048083289;

// Test Image is 3x3 (9) tiles
// Final Image is 12x12 (144) tiles

let SAMPLE_TILE = {
    orient: 'default',
    id: 2311,
    pixels: [
        '..##.#..#.',
        '##..#.....',
        '#...##..#.',
        '####.#...#',
        '##.##.###.',
        '##...#.###',
        '.#.#.#..##',
        '..#....#..',
        '###...#.#.',
        '..###..###'
    ]
};

let ALL_TILES = new Map(); // id -> tile
let UNIQUE_EDGES = new Map(); // edge pattern -> [ tile orientations ]

function reverse(str) {
    return str.split('').reverse().join('');
}
function top(tile) {
    return tile.pixels[0];
}
function bottom(tile) {
    return tile.pixels[9];
}
function left(tile) {
    return tile.pixels.map((r) => r[0]).join('');
}
function right(tile) {
    return tile.pixels.map((r) => r[9]).join('');
}

function getEdges(tile) {
    let edges = { 
        top: top(tile), 
        bottom: bottom(tile),
        left: left(tile),
        right: right(tile),
        reverse_top: reverse(top(tile)),
        reverse_bottom: reverse(bottom(tile)),
        reverse_left: reverse(left(tile)),
        reverse_right: reverse(right(tile)),
    };
    edges; //?
    return edges;
}
// getEdges(SAMPLE_TILE);

function loadInput(path) {
    let input = fs.readFileSync(path).toString();

    let tiles = new Map();
    for (let tile of input.split('\n\n')) {
        let lines = tile.split('\n'); //?
        
        let id = lines.shift(); //?
        id = parseInt(id.substr(5).replace(':',''));
        
        let pixels = lines; //?

        tiles.set(id, { 
            orient: 'default',
            id, 
            pixels 
        });
    }
    
    return tiles; //?
}

function cacheEdges(tiles) {
    let cache = new Map();

    for (let [id, t] of tiles) {
        let edges = getEdges(t);
        for (let e in edges) {
            e; //?
            let pixelString = edges[e]; //?

            let tilesWithEdge = cache.get(pixelString) || new Set();
            // tilesWithEdge.push({
            //     tile: t,
            //     edge: e
            // });
            tilesWithEdge.add(id);
            cache.set(pixelString, tilesWithEdge);
        }
    }
    cache.get('#.##...##.'); //?
    cache.size; //?
    // With no flipping H or V we get 27 unique edges patterns
    // The final solution should only have 24 unique edge patterns used
    // But lets see if we can eliminate most possibilities and 
    // then solve with manual inspection?

    return cache;
}

// Corner Tiles will only have 2 edges
// in common with other tiles
function classifyTiles(tiles) {
    let classified = {
        2: new Set(),
        3: new Set(),
        4: new Set()
    };
    
    for (let [id, t] of tiles) {
        console.log(`CORNER TEST: Tile[${id}]`);
        let edges = getEdges(t);
        edges; //?
        
        let connectingTiles = new Set();
        let connectingEdges = {};
        for (let e in edges) {
            e; //?
            let pixelString = edges[e];
            let otherEdges = Array.from(UNIQUE_EDGES.get(pixelString));
            otherEdges = otherEdges.filter((e_id) => e_id !== id); //?
            if (!otherEdges.length)
                continue;
            connectingEdges[e] = otherEdges;
            connectingTiles.add(...otherEdges);
        }
        t.neighbors = connectingTiles;
        connectingTiles.size; //?
        connectingEdges; //?

        if (id == 1951) {
            connectingTiles; //?
            connectingEdges; //?
        }

        classified[connectingTiles.size].add(t);
        // console.log(`Tile[${id}] has ${commonEdges} edges in common with other tiles.`);
    }

    return classified; //?
}
// Border Tiles will have 3 edges
// in common with other tiles
function findBorderTiles(tiles) {
    
}

function assembleImage(classified) {
    let side = Math.sqrt(ALL_TILES.size);
    let IMAGE = new Array(side);
    for (let i in _.range(side)) { IMAGE[i] = new Array(side); }
    
    ALL_TILES; //?

    let corners = ISet(classified[2]).map((t) => t.id); //?

    let remaining = ISet(ALL_TILES.keys());
    remaining; //?

    function findTile(image, r, c, possible, remaining) {
        // Get the tiles with the right # of neighbors?
        // --> later, at first lets try em all
        // Then, recurse and try all the tiles that share an edge
        
        // Skip this cell if we've already placed a tile there
        if (image[r][c]) {
            console.log(``)
            return false;
        }

        possible; //?
        for (let chosenTile of possible) {
            chosenTile; //?
            // Insert tile into IMAGE
            image[r][c] = chosenTile;
            
            // Remove tile from remaining tiles
            let nowRemaining = remaining.delete(chosenTile.id); //?

            // Pass neighbors as possible values for next tile
            let nowPossible = ALL_TILES.get(chosenTile).neighbors; //?

            // Recurse with this Tile at [r][c], 
            // fewer remaining tiles, and neighbors as possiblities
            findTile(image, r, c, nowPossible, nowRemaining);
        }
    }
    // Start in upper left (0, 0)
    // Possible: tiles are the corners - classified[2] 
    // Remaining: all tiles still remaining to be placed
    findTile(IMAGE, 0, 0, corners, remaining);

    // for (var r = 0; r < side; r++) {
    //     for (var c = 0; c < side; c++) {
    //         placeTileAt(r, c);            
    //     }
    // }
}

function run(tiles) {
    let classified = classifyTiles(tiles);
    classified[2].size; //?
    classified[3].size; //?
    classified[4].size; //?
    let corners = classified[2]; //?
    assembleImage(classified);

    // corners; //?
    // let prod = 1;
    // for (let t of corners) {
    //     prod *= t.id; //?
    // }
    // prod; //?

    return 0;
}

ALL_TILES = loadInput('test_a.input'); //?
// ALL_TILES = loadInput('a.input');
UNIQUE_EDGES = cacheEdges(ALL_TILES);
let answer = run(ALL_TILES); //?