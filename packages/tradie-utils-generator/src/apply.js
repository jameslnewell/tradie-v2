// @flow
import path from 'path';
import fs from 'fs-extra';
import {type FileMap, type FileStatusMap} from './types';

export type ApplyOptions = {};

/**
 * Apply differences to disk
 * @param {string} dest 
 * @param {FileStatusMap} statuses 
 * @param {FileMap} oldFiles 
 * @param {FileMap} newFiles 
 * @param {ApplyOptions} opts 
 */
export default function(
  dest: string,
  statuses: FileStatusMap,
  newFiles: FileMap,
  opts: ApplyOptions = {}
) {
  return Promise.all(
    Object.keys(statuses).map(filePath => {
      const status = statuses[filePath];
      const destFilePath = path.resolve(dest, filePath);
      console.log(status, destFilePath);
      switch (status) {
        case 'A':
        case 'M':
          return fs
            .ensureDir(path.dirname(destFilePath))
            .then(
              () =>
                console.log(destFilePath, newFiles[filePath].contents) ||
                fs.writeFile(destFilePath, newFiles[filePath].contents)
            );

        case 'D':
          return fs.unlink(destFilePath);
      }
    })
  );
}
