import {SOURCE_FILES} from './paths';

function getCommonOptions({modules = true}) {
  //FIXME:
  //add flow if its configured
  // if (isUsingFlow({root})) {
  //   babelOptions.presets.push(require.resolve('babel-preset-flow'));
  // }

  return {
    babelrc: false,
    presets: [
      [
        require.resolve('babel-preset-env'),
        {modules: modules ? 'commonjs' : false}
      ],
      require.resolve('babel-preset-react')
    ],
    plugins: [
      require.resolve('babel-plugin-transform-object-rest-spread'),
      require.resolve('babel-plugin-transform-class-properties')
    ]
  };
}

export function getCommonJSOptions() {
  const options = getCommonOptions({modules: true});
  options.plugins.push(require.resolve('babel-plugin-transform-runtime'));
  return options;
}

export function getESModuleOptions() {
  const options = getCommonOptions({modules: false});
  options.plugins.push(require.resolve('babel-plugin-transform-runtime'));
  return options;
}

export function getUMDOptions() {
  const options = getCommonOptions({modules: false});
  options.include = SOURCE_FILES;
  options.plugins.push(require.resolve('babel-plugin-external-helpers'));
  return options;
}

export function getDemoOptions() {
  const options = getCommonOptions({modules: false});
  return options;
}
