import * as fs from 'fs';
import * as cp from 'child_process';
import Reporter from '@tradie/reporter-utils';
import generator from '@tradie/generator-utils';
import * as pkg from '../../package.json';
import { ROOT } from '../config/paths';
import { VirtualFileSystem } from '@tradie/generator-utils';

function fromFile(file: string, data: { [name: string]: string } = {}) {
  const filePath = require.resolve(`../../tpl/${file}`);
  const fileContents = fs.readFileSync(filePath).toString();
  return Object.keys(data).reduce(
    (contents, name) => fileContents.replace(`<%= ${name} %>`, data[name]),
    fileContents
  );
}

function generate(vfs: VirtualFileSystem) {
  vfs.write('package.json', fromFile('package.json.ejs', { version: pkg.version }));
  vfs.write('.gitignore', fromFile('.gitignore.ejs'));
  vfs.write('src/index.ts', fromFile('src/index.ts'));
  vfs.write('src/index.test.ts', fromFile('src/index.test.ts'));
  vfs.write('examples/index.ts', fromFile('examples/index.ts'));
}

export default async function () {
  const reporter = new Reporter({
    startedText: 'Creating',
    finishedText: 'Created'
  });

  reporter.started();
  try {
    await generator(ROOT, generate);
    cp.execSync('yarn');
    reporter.finished();
  } catch (error) {
    reporter.failed(error);
  }

  return reporter.wait();
}
