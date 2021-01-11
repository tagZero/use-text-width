import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import html from '@rollup/plugin-html';
import postcss from 'rollup-plugin-postcss';
import ts from "@wessberg/rollup-plugin-ts";

const template = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta name="color-scheme" content="dark light">
    <title>useTextWidth React hook test</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
  </head>
  <body>
    <div id="root"></div>
    
    <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
    <script src="simple.js"></script>
  </body>
</html>
`;

export default {
  input: './src/examples/simple.tsx',
  output: {
    dir: 'dist',
    name: 'useTextWidth',
    sourcemap: true,
    format: 'umd',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
    },
  },
  external: ['react', 'react-dom'],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    postcss({
      extract: false,
      use: ['sass']
    }),
    ts(),
    resolve({
      browser: true
    }),
    commonjs(),
    html({
      template: () => template
    })
  ]
};
