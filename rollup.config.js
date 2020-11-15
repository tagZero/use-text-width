import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import { terser } from "rollup-plugin-terser";
import ts from "@wessberg/rollup-plugin-ts";

const production = process.env.NODE_ENV === 'production';

const output = {
  sourcemap: !production,
  globals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
}

export default {
  input: 'src/index.ts',
  output: [
    {
      ...output,
      file: 'dist/cjs/index.js',
      format: 'cjs'
    },
    {
      ...output,
      file: 'dist/es/index.js',
      format: 'es'
    },
    {
      ...output,
      file: 'dist/umd/index.js',
      format: 'umd',
      name: 'useTextWidth'
    }
  ],
  external: ['react', 'react-dom'],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE)
    }),
    ts({ exclude: 'src/examples/*' }),
    postcss({
      extract: false,
      use: ['sass']
    }),
    nodeResolve(),
    commonjs(),
    production ? terser() : null
  ]
};
