#!/usr/bin/env node
import inquirer from 'inquirer';
import { IAnswers } from './interface/answers.interface';
import { questions } from './questions';
import { GenFile } from './controller/generate-controller';

class Init {
  constructor() {
    inquirer.prompt(questions).then((answers: IAnswers) => {
      GenFile.gen(answers);
    });
  }
}

new Init();
