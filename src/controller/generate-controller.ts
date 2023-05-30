import fs from 'node:fs';
import path from 'node:path';
import shelljs from 'shelljs';

import { EChoicesBoilerplate } from '../enum/choices-boilerplate.enum';

import { IAnswers } from '../interface/answers.interface';
import { EGitName } from '../enum/git-name.enum';

class GenerateController {
  public gen(answers: IAnswers) {
    try {
      switch (answers.tech) {
        case EChoicesBoilerplate.NODE_TS:
          this._execPath(EGitName.NODEJS_TS, answers.folderName);
          break;

        case EChoicesBoilerplate.SCSS:
          this._execPath(EGitName.SCSS, answers.folderName);
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  private _execPath(gitName: string, folderName: string) {
    try {
      shelljs.cd(path.resolve());
      shelljs.exec(`git clone git@github.com:troquatte/${gitName}.git`);

      fs.renameSync(
        `${path.join(path.resolve(), gitName)}`,
        `${path.join(path.resolve(), folderName)}`,
      );

      console.log('Arquivo criado com Sucesso!');
      return shelljs.exit();
    } catch (error) {
      console.log(error);
    }
  }
}

export const GenFile = new GenerateController();
