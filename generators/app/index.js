'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('underscore.string');
var mkdirp = require('mkdirp');

var AndroidGradleGenerator = yeoman.generators.Base.extend({

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('This generator will allow you to create a minimal ' + chalk.magenta('InAiR') + ' project with Gradle support.'));

    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'Application Name',
      default: 'Hello World'
    }, {
      type: 'input',
      name: 'packageName',
      message: 'Package Name',
      default: 'com.example.mobile.app'
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.packageName = props.packageName;

      if (this.packageName !== undefined) {
        this.packageFolder = this.packageName.replace(/\./g, '/');
      }

      if (this.appName !== undefined) {
        this.className = _.classify(_.slugify(_.humanize(props.appName.replace(/ /g, ''))));
        this.projectName = _.camelize(this.className);
      }

      done();
    }.bind(this));
  },

  app: function () {
    var appDir = [
      this.projectName,
      this.projectName + '/app',
      this.projectName + '/app/libs',
      this.projectName + '/app/src',
      this.projectName + '/app/src/androidTest',
      this.projectName + '/app/src/androidTest/java',
      this.projectName + '/app/src/main',
      this.projectName + '/app/src/main/java',
      this.projectName + '/app/src/main/res',
      this.projectName + '/app/src/main/res/drawable',
      this.projectName + '/app/src/main/res/layout',
      this.projectName + '/app/src/main/res/values',
      this.projectName + '/app/src/test',
      this.projectName + '/app/src/test/java'
    ];

    this.log('\n' + chalk.green('Creating ') + 'project directories:');
    var appDirLength = appDir.length;

    for (var idx = 0; idx < appDirLength; idx++) {
      mkdirp(appDir[idx]);
      this.log('\t' + chalk.green('create ') + appDir[idx]);
    }

    this.directory('gradle', this.projectName + '/gradle');
    this.log('\t' + chalk.green('create ') + this.projectName + '/gradle');

    this.directory('inair', this.projectName + '/inair');
    this.log('\t' + chalk.green('create ') + this.projectName + '/inair');
  },

  end: function () {
    this.log('\n');
    this.log('Finished creating your ' + chalk.red.bold(this.appName) + ' InAiR+Gradle application.');
    this.log('Please update the ' + chalk.yellow.bold('local.properties') + ' with the Android SDK path');
    this.log('\nOpen your favorite IDE and have fun building your next great app.');
    this.log('\n');
  }
});

module.exports = AndroidGradleGenerator;

AndroidGradleGenerator.prototype.workspaceFiles = function workspaceFiles() {
  var configs = [
    'build.gradle',
    'gradle.properties',
    'gradlew',
    'gradlew.bat',
    'local.properties',
    'settings.gradle'
  ];

  var configLength = configs.length;

  for (var idx = 0; idx < configLength; idx++) {
    this.template(configs[idx], this.projectName + '/' + configs[idx]);
  }

  this.template('gitignore', this.projectName + '/.gitignore');
};

AndroidGradleGenerator.prototype.androidSrcFiles = function androidSrcFiles() {
  this.log('\n' + chalk.green('Creating ') + 'app files:');

  this.template('app/build.gradle', this.projectName + '/app/build.gradle');
  this.template('app/proguard-rules.pro', this.projectName + '/app/proguard-rules.pro');
  this.directory('app/libs', this.projectName + '/app/libs');

  var androidTestDir = this.projectName + '/app/src/androidTest/java/' + this.packageFolder;
  this.template('app/src/androidTest/java/ApplicationTest.java', androidTestDir + '/ApplicationTest.java');

  var mainDir = this.projectName + '/app/src/main';
  this.template('app/src/main/java/MainActivity.java', mainDir + '/java/' + this.packageFolder + '/' + 'MainActivity.java');
  this.template('app/src/main/AndroidManifest.xml', mainDir + '/AndroidManifest.xml');
  this.directory('app/src/main/res/drawable', mainDir + '/res/drawable');
  this.directory('app/src/main/res/layout', mainDir + '/res/layout');
  this.template('app/src/main/res/values/strings.xml', mainDir + '/res/values/strings.xml');

  var testDir = this.projectName + '/app/src/test/java/' + this.packageFolder;
  this.template('app/src/test/java/ExampleUnitTest.java', testDir + '/ExampleUnitTest.java');
};
