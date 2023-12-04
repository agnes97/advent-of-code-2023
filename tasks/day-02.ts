import path from "node:path";

const example = Bun.file(path.join(import.meta.dir, "../inputs/day-02/example.txt"));
const input = Bun.file(path.join(import.meta.dir, "../inputs/day-02/input.txt"));

const lines = (await input.text()).split("\n");

type Cube = { 
    blue: number,
    green: number,
    red: number
}

const initialCube: Cube = { blue: 0, green: 0, red: 0 }
const availableCubes: Cube = { blue: 14, green: 13, red: 12 }

const revealedCubes = (): Cube[] => {
    const splitByMultipleOperators = (string: string) => string.split(',').join(';').split(';')

    return lines.map((line) => {
        const sliceAt = line.indexOf(':') + 2

        return splitByMultipleOperators(line.slice(sliceAt))
            .map((string) => string.trim().split(' ').reverse())
            .reduce((previous, current) => {
                const cubeColor = current[0] as keyof Cube;
                const numberOfCubes = current[1];
                
                    return ({ ...previous, [cubeColor]: previous[cubeColor] + Number(numberOfCubes) });
                }, initialCube);
    } 
    );
}

// Compare revealed cubes (from example or input) with available cubes
function main() {
    //  If string contains color, remove related number from available cubes:
    const possibleGames = revealedCubes().map((cube) => cube.blue < availableCubes.blue 
        && cube.green < availableCubes.green 
        && cube.red < availableCubes.red
    )

    console.log(revealedCubes())

    // get possible games IDs (if true, return ID)
    // sum IDs of possible games
    return possibleGames.reduce((acc, current, index) => current ? acc + index + 1 : acc, 0)
}

console.log(main());
