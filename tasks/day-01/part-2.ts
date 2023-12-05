import path from "node:path";

const example = Bun.file(path.join(import.meta.dir, "../../inputs/day-01/example.txt"));
const example2 = Bun.file(path.join(import.meta.dir, "../../inputs/day-01/example-2.txt"));
const input = Bun.file(path.join(import.meta.dir, "../../inputs/day-01/input.txt"));

const lines = (await input.text()).split("\n");

const numbers = new Map(['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    .map((number, index) => [number, index + 1]));

const pattern = new RegExp(`(?=(${Array.from(numbers.keys()).join("|")}|\\d))`, "g");
const getDigits = (text: string) => (Array.from(text.matchAll(pattern), (match) => match[1]) ?? [])
    .map((digit) => numbers.get(digit) ?? Number(digit));

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
