import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import { terser } from "rollup-plugin-terser";

const production = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    name: 'useTextWidth',
    sourcemap: !production,
    format: 'cjs',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
    },
  },
  external: ['react', 'react-dom'],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE)
    }),
    typescript(
      { exclude: 'src/examples/*' }
    ),
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
