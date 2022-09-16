#!/usr/bin/env node

import chalk from 'chalk';
import gulp from 'gulp';
import inquirer from 'inquirer';
import iniparser from 'iniparser';
import rename from 'gulp-rename';
import shell from 'gulp-shell';
import tap from 'gulp-tap';
import template from 'gulp-template';
import filter from 'gulp-filter';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const handleDefaults = answers => answers;
const defaults = (() => {
  const homeDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
  const workingDirName = process.cwd().split('/').pop().split('\\').pop();
  const osUserName = (homeDir && homeDir.split('/').pop()) || 'root';
  const configFile = `${homeDir}/.gitconfig`;

  let user = {};

  if (fs.existsSync(configFile)) {
    user = iniparser.parseSync(configFile).user;
  } // end if
  return {
    appName: workingDirName,
    userName: user.name || osUserName,
    authorEmail: user.email || ''
  };
})();

inquirer.prompt([
  {
    name: 'name',
    message: 'Give your app a name',
    default: defaults.appName
  }, {
    name: 'appVersion',
    message: 'What is the version of your project?',
    default: '0.1.0'
  }, {
    name: 'appDescription',
    message: 'What is a description of your project?',
    default: 'n/a'
  }, {
    name: 'authorName',
    message: 'What is the author name?',
    default: defaults.userName
  }, {
    name: 'authorEmail',
    message: 'What is the author email?',
    default: defaults.authorEmail
  }, {
    name: 'userName',
    message: 'What is the github username?',
    default: defaults.userName
  }, {
    type: 'confirm',
    name: 'moveon',
    message: 'Continue?'
  }
])
  .then(answers => {
    if (!answers.moveon) return;
    const unsafeExtensions = ['*', '!*.png', '!*.txt', '!*.ico'];
    const publicFolderFilter = filter(unsafeExtensions, { restore: true });

    answers.file = { relative: '<%= file.relative %>' };
    answers = handleDefaults(answers);
    answers.year = (new Date()).getFullYear();
    const stream = gulp.src([`${__dirname}/templates/app/**`])
      .pipe(publicFolderFilter)
      .pipe(template(answers, { interpolate: /<%=\s([\s\S]+?)%>/g }))
      .pipe(rename(file => {
        if (file.basename[0] === '_' && file.basename[1] === '_') {
          file.basename = file.basename.slice(1);
        } else if (file.basename[0] === '_') {
          file.basename = '.' + file.basename.slice(1);
        } // end if
      }))
      .pipe(publicFolderFilter.restore)
      .pipe(tap(file => {
        console.log(
          chalk.gray('[') +
          chalk.black(new Date().toLocaleTimeString()) +
          chalk.gray('] [') +
          chalk.cyan('conflict') +
          chalk.gray('] ') +
          chalk.white('Creating ') +
          chalk.magenta(file.relative || file.dirname)
        );
      }))
      .pipe(gulp.dest('./'));

    stream.on('end', () => {
      console.log(chalk.green('Files created successfully.'));
      console.log(chalk.gray('Installing npm modules...'));
      shell.task('npm i')();
    });
  });
