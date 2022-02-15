import {terser} from 'rollup-plugin-terser';
import json from '@rollup/plugin-json'

const files = [
  'logger.js'
]

export default files.map(file => ({
  input: `src/browser/${file}`,
  output: {
    name: 'browser',
    file: `browser/${file}`,
    format: 'iife',
    globals: {
      'deps': 'global_script_deps'
    }
  },
  external: ['deps'],
  preserveSymlinks: true,
  plugins: [
    json(),
    terser()
  ],
}))
