import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import { terser } from "rollup-plugin-terser";
import ts from "@wessberg/rollup-plugin-ts";

const production = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/cjs/index.js',
      sourcemap: !production,
      format: 'cjs',
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
      },
    },
    {
      file: 'dist/es/index.js',
      sourcemap: !production,
      format: 'es',
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
      },
    },
    {
      file: 'dist/umd/index.js',
      sourcemap: !production,
      format: 'es',
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
      },
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
    nodeResolve({
      browser: true
    }),
    production ? terser() : null
  ]
};
