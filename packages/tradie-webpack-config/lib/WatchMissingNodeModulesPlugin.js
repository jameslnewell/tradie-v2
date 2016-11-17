/*
 Copied from: https://github.com/facebookincubator/create-react-app/blob/e5bf5af2969532e4c92ee3b53fdbb4fc1b8ae3c0/packages/react-dev-utils/WatchMissingNodeModulesPlugin.js

 - hopefully gets split out into its own package soon

 */

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

// This Webpack plugin ensures `npm install <library>` forces a project rebuild.
// We’re not sure why this isn't Webpack's default behavior.
// See https://github.com/facebookincubator/create-react-app/issues/186.

'use strict';

class WatchMissingNodeModulesPlugin {
  constructor(nodeModulesPath) {
    this.nodeModulesPath = nodeModulesPath;
  }

  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      var missingDeps = compilation.missingDependencies;
      var nodeModulesPath = this.nodeModulesPath;

      // If any missing files are expected to appear in node_modules...
      if (missingDeps.some(file => file.indexOf(nodeModulesPath) !== -1)) {
        // ...tell webpack to watch node_modules recursively until they appear.
        compilation.contextDependencies.push(nodeModulesPath);
      }

      callback();
    });
  }
}

module.exports = WatchMissingNodeModulesPlugin;