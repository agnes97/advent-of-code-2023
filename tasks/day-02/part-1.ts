import path from "node:path";

const example = Bun.file(path.join(import.meta.dir, "../../inputs/day-02/example.txt"));
const input = Bun.file(path.join(import.meta.dir, "../../inputs/day-02/input.txt"));

const lines = (await input.text()).split("\n");

type Cube = { 
    blue: number,
    green: number,
    red: number
}

const initialCube: Cube = { blue: 0, green: 0, red: 0 }
const availableCubes: Cube = { blue: 14, green: 13, red: 12 }

const getGames = (lines: string[]) => new Map([...lines]
    .map((game, index) => {
        const sliceAt = game.indexOf(':') + 2;
        return [index + 1, (game.slice(sliceAt)).split(';').map((set) => set.trim())];
}))

const revealedCubesInSet = (set: string): Cube => set.split(',')
    .map((string) => string.trim().split(' ').reverse())
    .reduce((previous, current) => {
        const cubeColor = current[0] as keyof Cube;
        const numberOfCubes = current[1];

        return ({ ...previous, [cubeColor]: previous[cubeColor] + Number(numberOfCubes) });
    }, initialCube)


const divideGameToSets = (string: string) => string.split(',')

const checkAllSetsInAGame = (game: string) => {
    //  If string contains color, remove related number from available cubes:
    return divideGameToSets(game)
        .map((set) => revealedCubesInSet(set))
        .map((cube) => cube.blue <= availableCubes.blue 
            && cube.green <= availableCubes.green 
            && cube.red <= availableCubes.red)
}

// Compare revealed cubes (from example or input) with available cubes
function main(lines: string[]) {
    const areGamesPossible = Array.from(getGames(lines).values())
        .map((games) => games.map((game) => checkAllSetsInAGame(game)))
    
    // filter games where all sets are true
    const possibleGames = areGamesPossible
        .map((game) => game
        .map((set) => set.length === set
        .filter((value) => value !== false).length))

    // get IDs of all possible games
    const returnTrueIndexes = possibleGames
        .map((game, index) => game
        .every((game) => game) ? index + 1 : -1)
        .filter((index) => index !== -1)

    // sum IDs of possible games
    return returnTrueIndexes.reduce((sum, current) => current ? sum + current : sum, 0)
}

console.log(main(lines));
