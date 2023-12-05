import path from "node:path";

const example = Bun.file(path.join(import.meta.dir, "../../inputs/day-01/example.txt"));
const input = Bun.file(path.join(import.meta.dir, "../../inputs/day-01/input.txt"));

const lines = (await input.text()).split("\n");

const getDigits = (text: string) => Array.from(text.match(/\d/g)?.values() ?? []);

const findFirstAndLast = <T>(text: T[], type: 'first' | 'last') => 
    text.at(type === 'first' ? 0 : -1);

function main(lines: string[]) {
    const numbers = lines.map((line) => {
        const digits = getDigits(line);

        return Number(`${findFirstAndLast(digits, 'first')}${findFirstAndLast(digits, 'last')}`);
    });

    return numbers.reduce((sum, current) => sum + current, 0);
}

console.log(main(lines));