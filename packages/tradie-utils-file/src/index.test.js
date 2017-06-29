// @flow
import Files from '.';
import finder from 'finder-on-steroids';

jest.mock('finder-on-steroids');

console.log(finder.foo);

describe('Files', () => {
  describe('.include()', () => {
    it('should return true when no filter is provided', () => {
      const files = new Files('/foo/bar');
      expect(files.include('index.js')).toBeTruthy();
    });

    it('should return true when an include filter is provided and the file does match', () => {
      const files = new Files('/foo/bar', {include: '**/*.js'});
      expect(files.include('index.js')).toBeTruthy();
    });

    it('should return false when an include filter is provided and the file does not match', () => {
      const files = new Files('/foo/bar', {include: '**/*.js'});
      expect(files.include('index.css')).toBeFalsy();
    });

    it('should return false when an exclude filter is provided and the file does match', () => {
      const files = new Files('/foo/bar', {exclude: '**/*.js'});
      expect(files.include('index.js')).toBeFalsy();
    });

    it('should return true when an exclude filter is provided and the file does not match', () => {
      const files = new Files('/foo/bar', {exclude: '**/*.js'});
      expect(files.include('index.css')).toBeTruthy();
    });
  });

  describe('.list()', () => {
    it('should resolve to a filtered list of files from the specified directory', () => {
      finder.__setFiles([
        '/foo/bar/package.json',
        '/foo/bar/README.md',
        '/foo/bar/src/index.js',
        '/foo/bar/src/index.test.js',
        '/foo/bar/node_modules/blah/index.js'
      ]);

      const files = new Files('/foo/bar', {
        include: '**/*.js',
        exclude: ['**/*.test.js', /node_modules/]
      });

      return expect(files.list()).resolves.toEqual(['/foo/bar/src/index.js']);
    });
  });
});