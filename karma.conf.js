// Reference: http://karma-runner.github.io/0.12/config/configuration-file.html
const webPackConfig =require('./webpack.config');

module.exports = (config) =>{
  config.set({
    basePath: '',
    frameworks: [
      // Reference: https://github.com/karma-runner/karma-jasmine
      // Set framework to jasmine
      'jasmine',
    ],

    reporters: [
      // Reference: https://github.com/mlex/karma-spec-reporter
      // Set reporter to print detailed results to console
      'progress',

      // Reference: https://github.com/karma-runner/karma-coverage
      // Output code coverage files
      'coverage',
    ],

    files: [
      // Grab all files in the app folder that contain .spec.
      'src/tests.webpack.js',
    ],
    exclude: [
    ],

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-phantomjs-launcher'),
      require('karma-spec-reporter'),
      require('karma-webpack'),
    ],

    preprocessors: {
      // Reference: http://webpack.github.io/docs/testing.html
      // Reference: https://github.com/webpack/karma-webpack
      // Convert files with webpack and load sourcemaps
      'src/tests.webpack.js': ['webpack', 'sourcemap'],
      'src/app/root.module.js': ['webpack'],
      'src/app/**/*.spec.js': ['webpack'],
    },

    browsers: [
      // Run tests using PhantomJS
      'PhantomJS',
    ],

    singleRun: true,

    // Configure code coverage reporter
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        {type: 'text-summary'},
        {type: 'html'},
      ],
    },

    webpack: webPackConfig,

    // Hide webpack build information from output
    webpackMiddleware: {
      noInfo: 'errors-only',
    },
  });
};
