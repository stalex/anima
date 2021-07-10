export const cellKey = (x, y) => `${x}_${y}`;

export const parseCellKey = (key) => key.split('_').map(Number)

export const randomIntLess = (range) => Math.floor(Math.random() * range);

export const isObject = o => typeof o === 'object';

export const seed1 = (count, width, height) => ([
    {
        x: 0,
        y: 0,
    },
    {
        x: 0,
        y: 1,
    },
    {
        x: 1,
        y: 1,
    },
    {
        x: 1,
        y: 0,
    },
].map(({x, y}) => ({
    x,
    y,
    key: cellKey(x, y)
})))

export const seed = (count, width, height) =>
    Array(count).fill(0).reduce((acc) => {
        const x = randomIntLess(width);
        const y = randomIntLess(height);
        const key = cellKey(x, y);
        acc[key] = {
            x,
            y,
            key
        };
        return acc;
    }, {})

export const neighbours = Array(8).fill(0).map((_, i) => {
    const angle = i * Math.PI / 4;
    return [Math.cos(angle), Math.sin(angle)].map(Math.round);
});

export const nextGen = (cells) => {
    const dead = [];

    const survived = Object.values(cells).reduce((newCells, cell) => {
        const {x, y, key} = cell;
        const neighboursKeys = neighbours.filter(([dx, dy])=> x + dx >= 0 && y + dy >= 0).map(([dx, dy]) => cellKey(x + dx, y + dy));
        const neighboursCount = neighboursKeys.reduce((count, key) => cells[key] ? ++count : count, 0);
        if (neighboursCount === 2 || neighboursCount === 3) {
            newCells[key] = {x, y, key};
        } else {
            dead.push([x, y]);
        }
        neighboursKeys.forEach(key => {
            if (!isObject(cells[key])) {
                newCells[key] = (newCells[key] || 0) + 1;
            }
        });
        return newCells;
    }, {});

    const born = [];

    const newGen = Object.entries(survived).reduce((newGen, [key, cell]) => {
        if (cell === 3) {
            const [x, y] = parseCellKey(key);
            born.push([x, y]);
            newGen[key] = {x, y, key}
        } else if (isObject(cell)) {
            newGen[key] = cell;
        }

        return newGen;
    }, {});

    return [newGen, born, dead];
}