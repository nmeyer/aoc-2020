const _ = require('underscore');

const trees = [
    '....##..#........##...#.#..#.##',
    '.#.#..#....##....#...#..##.....',
    '##.#..##..#...#..........##.#..',
    '.#.##.####..#......###.........',
    '#.#.#...........#.....#...#....',
    '#.......#....#.#.##..###..##..#',
    '.#...#...##....#.........#.....',
    '..........##.#.#.....#....#.#..',
    '.......##..##...#.#.#...#......',
    '.#.#.#...#...##...#.##.##..#...',
    '........##.#.#.###.........##..',
    '#.#..#.#.#.....#...#...#......#',
    '.#.#.#...##......#...#.........',
    '.#..##.##.#...#...##....#.#....',
    '.##...#..#..#......##.###....##',
    '.....#...#.###.....#.#.........',
    '#.##..#....#.#.#.#.............',
    '........#...#......#...#..#....',
    '##..##...##.##...#...#.###...##',
    '#.#....##.#...###......#..#.#..',
    '..#.....#.##......#..........#.',
    '#.......#..#......#.....#....#.',
    '.....###...........#....#.##...',
    '#.#........##.......#.#...#.##.',
    '.#.#.#........#........#.#.....',
    '#..#..##.....#.###..#.#.#.##..#',
    '..#.#...#..##.#.#.#.......###..',
    '........#........#..#..#...#...',
    '##............#...#..##.##...#.',
    '#....#.#.....##...#............',
    '............#...#..#.#.#....#..',
    '#.#.#...##.##.#....#....#......',
    '................###.....#.....#',
    '##.#####.#..#...###..#...###...',
    '...#.....#...#.#....#...#..#...',
    '.......#....##.##.#.##.........',
    '..#..#..##.....#...#.#.....#...',
    '...#...#.#.##.#..###.......#...',
    '...#...........#.#####..##..#..',
    '#.#...#........####..#......#.#',
    '#..#.##...........#.#......#.##',
    '#.#..#....##..#..##.#..........',
    '.....#..#.....#........##..#...',
    '...###.......#.##.......#......',
    '...##..#..#...#....#.###...#...',
    '....####....#........#.##.#.#.#',
    '#....#.....#.###.##...##..##.##',
    '.##.#...#.##.#......#..##.#....',
    '...#.............#.............',
    '..##..##.#.....#........##....#',
    '#.....#....#.......####...#..#.',
    '..#...#..#...#...##.#....##....',
    '.#...##....#....#..#....#......',
    '##..#.#...##......#..#.......##',
    '..#...#.##..#.....#.#...#..#.#.',
    '#..##....#..........#..........',
    '.#........#..#......#......#.#.',
    '...##.#.........#.#....#.#...#.',
    '#.....#.#..#...#...#..#...#...#',
    '#.........#.#.........##.......',
    '.#.......#......#.........###..',
    '.#..#..##...........#.....#..#.',
    '.#....................#.....#..',
    '.##.....#....#....#.###.....#..',
    '...##.#.....#.#....#.........#.',
    '.........##.....#.....#.##..#..',
    '......#......#.#..#..###...#..#',
    '..##...#.#..#...#.#....#.......',
    '..#..##.###.#..#..#..#......#..',
    '.....##...##.........#...##...#',
    '###.#..##....##...##.#..###....',
    '#...#.#..##......##...#.#..#...',
    '..........#....###....#........',
    '#.#.#.#.#.....#..##.##.....#...',
    '.##.....#...#.....#......#.....',
    '.#..........#.#.............#..',
    '.#..##..#.#..##...#....#.##...#',
    '..#.#..........#...#..........#',
    '.#.......#.......#...#..#.....#',
    '##.#...##...#......#.#..#......',
    '#####..#....#..#...#...#.#.....',
    '....#.......#.#..#.............',
    '#..#..#.#.####...#....#....##..',
    '#..#.##.#......#...#......#....',
    '#...##.##...#....#..........##.',
    '..#..#.......##.#....#...#.#...',
    '.....#.##..............##.....#',
    '..##.##...##.....#.........#.#.',
    '.#....##...##...##..#....##..#.',
    '.#...#....#..#......#.#........',
    '#....#.#.#..............#....##',
    '..##..#..#....#####.#....#.#.##',
    '#....#...#.##..#.##.........###',
    '#..#..#....#...............#.#.',
    '#....##...##........##.##.#.##.',
    '......#......##....##.....#.###',
    '#...##..#..#.....#.#........##.',
    '..#.#.##...#...#....#..###...#.',
    '#..##..#.###..##.#.#....#......',
    '..###..#.##........###.....#...',
    '#.............#.............#..',
    '.#.##....#..##.#...#....#.#####',
    '###.....###.#......##..#..##...',
    '.#.#......##.#....#....#.#..#..',
    '###..#..#....#......###.##.....',
    '......#.......#......#..##..##.',
    '..#..#...#..#....#.##....#.#..#',
    '.......##..#........#.#.##.....',
    '.#...#..#........#..#.#..#..#.#',
    '.#..#.##.......#......#...#.#..',
    '.##..##......##.#...#......####',
    '.....#....#......#.....#......#',
    '..........#.#.#...##.#..#.#....',
    '...#.......##......#..#.#.##...',
    '.###..#.#.#....................',
    '##...#...#.##............#.....',
    '....#....#.##...#..#.#...##....',
    '..#.#....#.###...#...#.#.####.#',
    '..#..#.#...#.#......##.........',
    '#..#..####.##.#.#..###....#...#',
    '....#..........#.##.#..#.#.#.#.',
    '#.#.##.........#.....##...#..##',
    '#......#...#.##.#......#..#.#..',
    '#...#........#..#..#...##...#..',
    '.....#.####..##..#.#.##..#...#.',
    '#..#........#........#...#....#',
    '...........#..#.....#.#.#.#....',
    '....#......#....#...#....##....',
    '.#.#..#...#.#....#..#.#....##.#',
    '....#...#...#.##..#...#..##...#',
    '#######...............##.....##',
    '.#.#..............#....#..#.###',
    '#......#.#......###....###.....',
    '##..#...#.##..##..##.#....#....',
    '#....##..#..#...#.#.#...#......',
    '..........#..#.##..##.##.#..##.',
    '....#.#.#.....##........#..#...',
    '..###...#.....##.##.....##..##.',
    '....#.#..#.#.......#.......#...',
    '..##.#..#.....##...###...#...#.',
    '..#.........#...##...#...#..#..',
    '..#..#..#..#..##.#...##..#.#...',
    '...##..#..##..#..####...#.....#',
    '............#............###...',
    '.#.#.###.#.....#.#.#..#.###..#.',
    '...#.........#.....####........',
    '....##.#..##.#.............#...',
    '....#.##.....#..#.....#......##',
    '..........#.............#...##.',
    '#..#.....#.......##..###.......',
    '..##.#...........#.......#..#..',
    '...#...#.#.##.###....#.#..#....',
    '...#..........##..#..#..#...###',
    '.........#.....#..##.....#..#..',
    '#........#...#...#..#.#....##..',
    '.#.#.....####..#.##.#..........',
    '###.......##..#.##...#.....#...',
    '..###.##.#..#..#..#.....##...#.',
    '.........#.....##.#..#..##.....',
    '#..#..##...###..............#..',
    '#....#.#....#..#.....#..####...',
    '####..#.....##...#..#.#.#.#...#',
    '...#....#.....#.##.#.#.#....##.',
    '..........#...#.....###....#.##',
    '#....#.#.#....#..#..#.....#....',
    '.....#.#...#......#....#......#',
    '.####....##...#...#......##..#.',
    '.#...#..#....#..#..............',
    '##.#...##...#.##..#......#.....',
    '..####.##..#....#.#......#.#.##',
    '........#.....##...#.#..##....#',
    '....#.#.#.#.###...#.#...##...##',
    '#.....#...####.#....#.#........',
    '..#.....#...##.........###.....',
    '....#....#....#..#......#####.#',
    '###.....#..#.#.#......#.##.#...',
    '....#.##......#..#.#...........',
    '.#....#....#.#..#.......#...##.',
    '...................#.#.#..#....',
    '##...#.....#........#....#...#.',
    '........##......#...##.#..#.#.#',
    '#.#..###...#....#.#...#.......#',
    '#..........##......#..#..#.....',
    '.............#...##.#...#......',
    '#..#....##..#.........#..#.###.',
    '.....#..........#....##.#...##.',
    '###....................#.#.##..',
    '#........##...##......#....###.',
    '#....#.............#....#...#..',
    '##.......##.#.......#....#..#..',
    '##...#............#..#.#....##.',
    '..#.#..#...#####..........#....',
    '..#.........##.....#.#...####..',
    '....#..............#...........',
    '..#...#.#.#..#.......##.#.#.#..',
    '....#.##.....##..#.....#..####.',
    '#...#...#...#.......#.........#',
    '......#..#.####...###.#.#.....#',
    '.......#..#..#.....#.#..##.#..#',
    '.#......##..#............#.....',
    '.#........#.#....#....#........',
    '.....#.#..#.##.#..##....#..#...',
    '#.#...........#....##.....#....',
    '..#..#..##.###..##..#..###.#.##',
    '##.#..#...##.#.........#...#.#.',
    '......#..#..##...#....#...#.##.',
    '#.##.......................#...',
    '.......#..#..#.##..##......#...',
    '..#.#...#.....#..###....#...#..',
    '##..#.....#..#..#.##.....#...##',
    '#...##...###...#.#..###....#...',
    '...#.#.#..####.....#...##....#.',
    '.#.#..##.....#..#.....##..##..#',
    '#...#..........#.##.#.#........',
    '..##....#.##....#..##......#...',
    '....#..........###.....####..##',
    '...........###....##.#.#.#.#...',
    '...#......................####.',
    '#.#.#...#.#.#.#.#......#.....##',
    '..###...#.####...#..##..#....#.',
    '....#....#.......#...#.........',
    '.#.###.............##..#...#...',
    '....#.#....##...#.....#.##.....',
    '#.......##.....#.#.....#....##.',
    '....##.....###..#.#..#....#...#',
    '......#..##...#......#.....#.##',
    '.#.....#.##.###....#.....#..###',
    '...#..#.###.#....#..#..#...##.#',
    '...##..#...#..#.#.#..#...#.....',
    '##.####...##..#.#.#....#.......',
    '..##..#.#.......##.#......##.#.',
    '....##....#....#..#....#..##.#.',
    '..##..........##....#...#.#..#.',
    '#.#...#.#.###.#.#..##.#...#....',
    '.....#..#.............#...#...#',
    '....#.#..#...##...#....#.##....',
    '#..#...#.###.....#...#.....#.#.',
    '#####....#....#....#.......#.##',
    '#...##....##.#.#...#.....##.#..',
    '#.......#...#..#..#...#....#...',
    '....#......#.#..........#....##',
    '#.###...#.#..##..#.##........#.',
    '#..#.....##.......#..#..#.#....',
    '...#...#.##...#....#.#.#.#...#.',
    '...##..#.#....#......###......#',
    '#.#....#...#..#..#....#........',
    '..#..#.#...##..........#.###...',
    '#..........#...#..#....#....###',
    '..#..#.#....#..............#...',
    '...#........#...#.#....###.#..#',
    '....#.#.#................#..#.#',
    '..#........##.#....#.#..#......',
    '...##..#..#.......#..#......#.#',
    '..#..#....#.........#....#.##..',
    '#.....#....###.#..#..#...#...#.',
    '..#..##.###.#..##....#.###.....',
    '...#...####..#........###.#....',
    '.........#.#...#..#..#.#.......',
    '.##.........##.#..............#',
    '..#.#.#.....###........#.#.#..#',
    '....##..#....#....#.#..#.......',
    '#.#.....#...#........##........',
    '.##.#.#..#..#.#.#.........#....',
    '#.....#..#.##...#...#..........',
    '##..#....#....##.#..#.........#',
    '................#.##.#......#.#',
    '..#..#.#........##...###..#...#',
    '##........#.......#...##.##..#.',
    '##....#.....#..##....#.......#.',
    '#.#....#.#........#..#.........',
    '......##......#...#.....#.##...',
    '###....#..........##.#.#......#',
    '......#...###.........###..#...',
    '.####....#...##..#.#.....#...#.',
    '.##...#...###....#...#.#..###..',
    '#..#......##...#.###..###...#..',
    '#....#.#.#..#....##...#.##..#..',
    '..#.....#...#..........#.##.###',
    '#.....#....###.......##..##.#..',
    '#..##...#..#....#.###......#...',
    '#..#........##..#.....#.#.#....',
    '#.##.#.#..#....#.#.............',
    '.#...............#....##.......',
    '.#.##......##........#...#..#.#',
    '.#...#....#....#...#..#...##...',
    '.....#..###...##........#.#....',
    '...#.......#....##..#..#....#..',
    '...###....#........#..#.###.#..',
    '......##..##..............###.#',
    '.......#.####..##....#.#....#..',
    '#...#......#...#..#.....##....#',
    '.#..#..###....#..##.##.#.......',
    '#......##......#..##....#..##..',
    '.....#..#.#......##.##..##.....',
    '...#..#.......#......#.........',
    '....#..####......#..#....#...#.',
    '..#.#..#...#....#....#.......#.',
    '####..#........#.###...##.#.#.#',
    '.......##........#.#.#...##....',
    '...#.........#..#.#..##....#...',
    '.....#..#...#.#....#...#.#.##.#',
    '#..##.....#.....##.......#...#.',
    '.......##.#.#.....#....#......#',
    '...#...#.##...#......#....#....',
    '..#..#.#...#..#.....#...###.#..',
    '.........#...#..#.......##.....',
    '..##...................#..#.###',
    '.##.##..#.#...#.#....#.....##..',
    '#.#...##...#...#...##..#......#',
    '....#..#...#.....##.#.....#..##',
    '##.#..........###..#...#..#....',
    '...##....#.##....#......#......',
    '.....#.........#....#.#.......#',
    '.......#............#.#.....#..',
    '..#..#...#..#####..#....##.....',
    '...##......##...#.#........##..',
    '.....#..###...##.#.#.##.#...#..',
    '..#.#.#..##..#.##...##.#.#.....',
    '......##...#..##......#.#......',
    '......................#........',
    '#...#..#....#..#.#.##.#.....#.#',
    '.#......#.#....#.#.#..#....#...',
    '.#..#.#.#..#....#..............'
];

const slopes = [
    {'rows': 1, 'cols': 1},
    {'rows': 1, 'cols': 3}, // this slope was part 1
    {'rows': 1, 'cols': 5},
    {'rows': 1, 'cols': 7},
    {'rows': 2, 'cols': 1}
];

function treesEncountered(slope) {
    let [row, col] = [0, 0];
    let treesHit = 0;

    while (row < trees.length) {
        if (trees[row][col] === '#')
            treesHit++;

        // make sure we wrap around to the left side of the map with %
        [row, col] = [row + slope.rows, (col + slope.cols) % trees[0].length];
    }

    return treesHit;
}

// multiply trees encountered at each slope setting together
console.log(`Answer: ${_.reduce(slopes, (memo, slope) => memo * treesEncountered(slope), 1)}`);