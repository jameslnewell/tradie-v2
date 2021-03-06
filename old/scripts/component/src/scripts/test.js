import fs from 'fs';
import path from 'path';
import jest from '@tradie/jest-utils';

import * as paths from '../config/paths';
import * as globs from '../config/globs';

export default function(argv) {
  const setupFiles = [];
  const codeSetupFile = path.join(paths.CODE_SRC, '_.test.js');
  if (fs.existsSync(codeSetupFile)) {
    setupFiles.push(codeSetupFile);
  }
  const testSetupFile = path.join(paths.TEST_SRC, '_.test.js');
  if (fs.existsSync(testSetupFile)) {
    setupFiles.push(testSetupFile);
  }

  return jest(argv, {
    testEnvironment: 'node',
    rootDir: paths.ROOT,
    testMatch: [`**/${globs.TESTS}`],
    testPathIgnorePatterns: [
      '<rootDir>/node_modules/',
      '<rootDir>/src/_\\.test\\.js$', //ignore the test setup file
      '<rootDir>/test/_\\.test\\.js$', //ignore the test setup file
      '<rootDir>/.*/__fixtures__/', //ignore test files within fixtures
      '<rootDir>/.*/__mocks__/' //ignore test files within mocks
    ],
    moduleFileExtensions: ['jsx', 'js'],
    transform: {
      '^.+\\.jsx?$': require.resolve('../config/babelTransform')
    },
    mapCoverage: true,
    collectCoverageFrom: [
      `**/${globs.SOURCES}`,
      `!**/${globs.TESTS}`,
      `!**/${globs.MOCKS}`,
      `!**/${globs.FIXTURES}`
    ],
    setupFiles
  });
}
