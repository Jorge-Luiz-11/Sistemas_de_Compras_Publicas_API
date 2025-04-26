import fs from 'fs';

export async function createSchema(origin: string, destiny: string) {
    try {
        const initText = '//This file must be edited directly by migration.';
        const endingText = '//End\n';
        const file = await fs.promises.readFile(origin, 'utf8');
        const initial = file.indexOf(initText);
        const ending = file.indexOf(endingText, initial);

        if (initial !== -1 && ending !== -1) {
            const result = file.substring(initial, ending + endingText.length);
            await fs.promises.writeFile(destiny, result, 'utf8');
        } else {
            throw new Error(`Schema file wasn't created.`);
        }
    } catch (error) {
        console.log(error);
    }
}

export async function removeSchema(origin: string) {
    try {
        fs.promises.unlink(origin);
    } catch (error) {
        console.log(error);
    }
}
