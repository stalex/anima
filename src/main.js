import {neighbours, nextGen, seed} from "./gol";
import {createCellDrawer, createClearRect} from "./canvasGrid";

export const init = (options) => {
    const canvas = document.createElement('canvas');

    const defaultSettings = {
        seedFillPercent: 0.5,
        frameDelay: 1000,
    }

    const canvasAttrs = {
        id: 'golCanvas',
        width: 40,
        height: 40,
        style: 'position: absolute; top: 0; left: 0',
    };

    const cellParams = {
        width: 4,
        height: 4,
    }

    Object.entries(canvasAttrs).forEach(
        ([name, value]) => canvas.setAttribute(name, value)
    );

    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const width = Math.floor(canvas.width / cellParams.width);
    const height = Math.floor(canvas.height / cellParams.height);

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);

    gradient.addColorStop(0, 'green');
    gradient.addColorStop(1, 'cyan');
    //gradient.addColorStop(1, 'green');

    const drawCell = createCellDrawer(ctx, cellParams.width, cellParams.height, gradient);
    const clearScene = createClearRect(ctx, canvas.width, canvas.height);

    let cells;

    const initScene = () => {
        cells = seed(Math.floor(width * height * defaultSettings.seedFillPercent), width, height);
        clearScene();
        Object.values(cells).forEach(({x, y}) => {
            drawCell(x, y);
        });
    }


    let lastStepTime;
    const step = time => {
        if (!lastStepTime) {
            lastStepTime = time;
            initScene();
        }
        if (time - lastStepTime > defaultSettings.frameDelay) {
            lastStepTime = time;
            const [newCells, born, dead] = nextGen(cells);
            if (!Object.values(newCells).length || (!born.length && !dead.length)) {
                initScene();
            } else {
                cells = newCells;
                dead.forEach(([x, y]) => {
                    drawCell(x, y, 'clear');
                });
                born.forEach(([x, y]) => {
                    drawCell(x, y);
                });
            }

        }
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}