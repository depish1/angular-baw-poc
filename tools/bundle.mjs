import { build } from 'esbuild';
import { readdir, readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const rootPath = resolve(import.meta.dirname, '..');
const allAppsDirPath = resolve(rootPath, 'apps');

const app = process.argv[2];
if (!app) throw new Error('Nie podano nazwy aplikacji');
const appRegex = /^[A-Za-z0-9_-]+$/;
if (!appRegex.test(app)) throw new Error('Nieprawidłowa nazwa aplikacji');

const appDirPath = resolve(allAppsDirPath, app);

const angularBuildPath = resolve(appDirPath, 'dist/angular');
const { mainPath, css } = await getAngularBuildFiles(angularBuildPath);

const outputDirPath = resolve(appDirPath, 'dist/baw');
const outputFile = join(outputDirPath, `${app}.js`);

await build({
  stdin: {
    contents: `
      import { init as angularInit } from ${JSON.stringify(mainPath)};

      const css = ${JSON.stringify(css)};

      export function init(...args) {
        return angularInit(...args, css);
      }
    `,
    resolveDir: appDirPath,
    sourcefile: 'build-entry.js',
    loader: 'js',
  },
  outfile: outputFile,
  bundle: true,
  format: 'iife',
  globalName: 'AngularForm',
  platform: 'browser',
  target: 'es2022',
  minify: true,
});

console.log(`Utworzono ${outputFile}`);

async function getAngularBuildFiles(buildPath) {
  try {
    const files = await readdir(buildPath);
    const mainRegex = /^main(?:-[\w-]+)?\.js$/;
    const cssRegex = /^styles(?:-[\w-]+)?\.css$/;
    const cssFile = files.find((file) => cssRegex.test(file));
    const css = cssFile ? await readFile(join(buildPath, cssFile), 'utf8') : '';
    const mainFile = files.find((file) => mainRegex.test(file));
    if (!mainFile) throw new Error('Nie znaleziono pliku main.js');
    const mainPath = resolve(buildPath, mainFile);

    return { mainPath, css };
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error(`Nie udało się odczytać plików buildu Angulara w: ${buildPath}`, {
        cause: err,
      });
    } else {
      throw err;
    }
  }
}
