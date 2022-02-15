require('dotenv/config')
const esbuild = require("esbuild")
const rimraf = require("rimraf")
const fs = require("fs")

const APP = process.env.APP
const isProd = process.env.NODE_ENV == 'production'
const shouldWatch = process.argv.filter(arg => arg == "--watch").length > 0

// clear dist/ build directory
rimraf.sync("dist")

if (process.env.USE_ESBUILD) {
  // bundle browser script files
  esbuild.build({
    entryPoints: fs.readdirSync("./browser_scripts").map(file => "./browser_scripts/" + file),
    outdir: "dist/browser_scripts",
    bundle: true,
    minify: isProd,
    watch: shouldWatch,
    sourcemap: !isProd
  })

  // build the node app
  // esbuild bundles the entire node app into start.js
  const entryFile = "sites/demo/start.js"

  esbuild.build({
    entryPoints: [entryFile],
    outdir: "dist",
    platform: "node",
    external: ["./node_modules/*"],
    bundle: true,
    minify: isProd,
    loader: {
      ".js": "jsx",
      ".svg": "text"
    },
    watch: shouldWatch,
    sourcemap: !isProd
  }).catch(() => process.exit(1))
} else {
  const { exec } = require("child_process")

  exec("yarn run legacy:build", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  })
}
