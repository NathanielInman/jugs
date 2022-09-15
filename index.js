#!/usr/bin/env node

import gulp from 'gulp';
import inquirer from 'inquirer';
import iniparser from 'iniparser';
import conflict from 'gulp-conflict';
import install from 'gulp-install';
import rename from 'gulp-rename';
import template from 'gulp-template';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const defaults = (() => {
  const homeDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
        workingDirName = process.cwd().split('/').pop().split('\\').pop(),
        osUserName = homeDir && homeDir.split('/').pop() || 'root',
        configFile = homeDir + '/.gitconfig';
  let user = {};

  if (fs.existsSync(configFile)) {
    user = iniparser.parseSync(configFile).user;
  } //end if
  return {
    appName    : workingDirName,
    userName   : user.name || osUserName,
    authorEmail: user.email || '',
  };
})();

// If they don't specify specifics, we need to have defaults ready
var handleDefaults = function (answers) {
  return answers;
};

inquirer.prompt([{
    name   : 'name',
    message: 'Give your app a name',
    default: defaults.appName
  }, {
    name   : 'appVersion',
    message: 'What is the version of your project?',
    default: '0.1.0'
  }, {
    name   : 'appDescription',
    message: 'What is a description of your project?',
    default: 'n/a'
  }, {
    name   : 'authorName',
    message: 'What is the author name?',
    default: defaults.userName
  }, {
    name   : 'authorEmail',
    message: 'What is the author email?',
    default: defaults.authorEmail
  }, {
    name   : 'userName',
    message: 'What is the github username?',
    default: defaults.userName
  }, {
    type   : 'confirm',
    name   : 'moveon',
    message: 'Continue?'
  }])
  .then(answers=>{
    if (!answers.moveon) return done();
    answers.file = { relative: '<%= file.relative %>' };
    answers = handleDefaults(answers);
    answers.year = (new Date()).getFullYear();
    gulp.src([
      __dirname + '/templates/app/**'
    ])
      .pipe(template(answers, {
        interpolate: /<%=\s([\s\S]+?)%>/g
      }))
      .pipe(rename(function (file) {
        if (file.basename[0] === '_' && file.basename[1] === '_'){
          file.basename = file.basename.slice(1);
        } else if (file.basename[0] === '_') {
          file.basename = '.' + file.basename.slice(1);
        } //end if
      }))
      .pipe(conflict('./'))
      .pipe(gulp.dest('./'))
      .pipe(install());
  });
