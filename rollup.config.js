import {terser} from 'rollup-plugin-terser';

export default {
    input: 'src/main.js',
    output: [
        {
            file: 'build/bundle.js',
            format: 'umd',
            name: 'GOL',
        },
        {
            file: 'build/bundle.min.js',
            format: 'iife',
            name: 'GOL',
            plugins: [terser()],
        }
    ]
};