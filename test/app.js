'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-inair-blankapp:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        appName: 'TestApp',
        packageName: 'inair.test'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'TestApp/.gitignore',
      'TestApp/build.gradle',
      'TestApp/settings.gradle'
    ]);
  });
});
