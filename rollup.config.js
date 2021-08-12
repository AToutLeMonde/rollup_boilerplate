const isProd = process.env.NODE_ENV === 'production';
console.log('isProd', isProd)
require('dotenv').config({
  path: isProd ? '.env.prod' : '.env.dev'
})

import autoprefixer from 'autoprefixer'
import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy'
import del from 'rollup-plugin-delete'
import html from '@rollup/plugin-html';
import image from '@rollup/plugin-image';
// import injectProcessEnv from 'rollup-plugin-inject-process-env'
import livereload from 'rollup-plugin-livereload';
// import postcss from 'postcss'
import postcssPlugin from 'rollup-plugin-postcss'
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import sass from 'sass'
import sassPlugin from 'rollup-plugin-sass'
// import scss from 'rollup-plugin-scss';
import serve from 'rollup-plugin-serve';
import styles from "rollup-plugin-styles";
import { terser } from 'rollup-plugin-terser';
import visualizer from 'rollup-plugin-visualizer';


const folder = isProd ? 'prod' : 'test'
const formSelectorName = process.env.CSS_FORM_LOCATOR;
const {BACKEND_URL} = process.env

const extensions = ['.js', '.ts', '.tsx'];

export default {
  input: ['src/index.tsx' ], //  'react', 'react-dom'],
  output: {
     file: `build/${folder}/${formSelectorName}.js`,    
     format: 'iife',
    sourcemap: !isProd,
     
  },
  plugins: [
    replace({
      'process.env.CSS_FORM_LOCATOR': `${formSelectorName}`,
      'process.env.BACKEND_URL': `${BACKEND_URL}`,
      'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
      preventAssignment: true
    }),
    //del({ targets: `build/${folder}/*` }),
    copy({
      targets: [
        { src: 'public/*', dest: `build/${folder}/` },        
      ]
    }),
    image(),
    resolve({
      extensions,
    }),
    commonjs({
      include: /node_modules/,
    }),
  //   injectProcessEnv({ 
  //     NODE_ENV: process.env.NODE_ENV,
  // }),
    babel({
      extensions,
      exclude: /node_modules/,
      babelrc: false,
      runtimeHelpers: true,
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
      plugins: [
        'react-require',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        ['@babel/plugin-proposal-object-rest-spread', {
          useBuiltIns: true,
        }],
        ['@babel/plugin-transform-runtime', {
          corejs: 3,
          helpers: true,
          regenerator: true,
          useESModules: false,
        }],
      ],
    }),
    
    html({
      fileName: 'index.html',
      title: 'Open GUI APP',
      template: ({ title }) => {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
</head>
<body>

  <div id="${formSelectorName}" data-title="Параметр из div атрибута"></div>
   
  <script src="${formSelectorName}.js"></script>
</body>
</html>
`;
      },
    }),
    // postcssPlugin({
    //   extract: `${formName}.css`,
    //   minimize: isProd,
    //   sourceMap: !isProd
    // }),
    styles({
      extensions: ['.css', '.scss']
    }),
    // visualizer({
    //   filename: 'bundle-analysis.html',
    //   open: false,
    // }),
    
    (isProd && terser()),
    (!isProd && serve({
      host: 'localhost',
      port: 3000,
      open: false,
      contentBase: [`build/${folder}`]
      
    })),
    (!isProd && livereload({
      watch: `build/${folder}`,
    })),
  ],
};