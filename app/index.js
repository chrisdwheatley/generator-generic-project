'use strict';
var util = require('util');
var path = require('path');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');


var GenericProjectGenerator = module.exports = function GenericProjectGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(GenericProjectGenerator, yeoman.generators.Base);

GenericProjectGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);
  console.log(chalk.cyan.bold('This generator will scaffold and wire a basic project structure.') +
    chalk.cyan('\nJust tell me a few details to get started.\n'));

  var prompts = [
    {
      name: 'projectName',
      message: 'What would you like to name your project?'
    },
    {      
      name: 'projectDescription',
      message: 'Add a project description (this can be amended at any time if required):', 
    },
    {
      type: 'confirm',
      name: 'addChildFolder',
      message: 'Would you like to add any subfolders right now?',
      default: false
    }
  ];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;
    this.projectDescription = props.projectDescription;
    this.addChildFolder = props.addChildFolder;

    cb();
  }.bind(this));
};

GenericProjectGenerator.prototype.app = function app() {
  this.mkdir('docs');
  this.mkdir('src');
  this.mkdir('test');

  this.template('_README.md', 'README.md');
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');    
};

GenericProjectGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('.gitignore', '.gitignore');
};
