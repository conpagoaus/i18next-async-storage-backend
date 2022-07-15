import { babel } from '@rollup/plugin-babel';
import uglify from '@lopatnov/rollup-plugin-uglify';
import nodeResolve from 'rollup-plugin-node-resolve';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv)).argv;

const format = argv.format || argv.f || 'iife';
const compress = argv.compact;

const babelOptions = {
  exclude: 'node_modules/**',
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false
      }
    ]
  ],
  babelrc: false,
  babelHelpers: 'bundled'
};

const moduleName = 'i18nextAsyncStorageBackend';

const output = [
  {
    file: `dist/amd/i18nextAsyncStorageBackend${compress ? '.min' : ''}.js`,
    name: moduleName,
    format: 'amd'
  },
  {
    file: `dist/umd/i18nextAsyncStorageBackend${compress ? '.min' : ''}.js`,
    name: moduleName,
    format: 'umd'
  },
  {
    file: `dist/iife/i18nextAsyncStorageBackend${compress ? '.min' : ''}.js`,
    name: moduleName,
    format: 'iife'
  }
];

export default {
  input: 'src/index.js',
  plugins: [
    babel(babelOptions),
    nodeResolve({
      jsnext: true
    })
  ].concat(compress ? uglify() : []),
  globals: { '@react-native-async-storage/async-storage': 'AsyncStorage' },
  external: ['@react-native-async-storage/async-storage'],
  output
};
