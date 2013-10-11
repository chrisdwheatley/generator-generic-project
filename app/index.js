'use strict';
var util = require('util');
var path = require('path');
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

  var prompts = [
    {
      name: 'projectName',
      message: 'What would you like to name your project?'
    },
    {      
      name: 'projectDescription',
      message: 'Add a project description (this can be amended at any time if required):', 
    }
  ];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;
    this.projectDescription = props.projectDescription;

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
