import path from 'node:path';
import fs from 'node:fs';
import { EChoicesBoilerplate } from './enum/choices-boilerplate.enum';
import { EErros } from './enum/erros.enum';
import { EGitName } from './enum/git-name.enum';

export const questions = [
  {
    type: 'list',
    name: 'tech',
    message: 'Qual Boilerplate devo criar?',
    choices: [EChoicesBoilerplate.NODE_TS, EChoicesBoilerplate.SCSS],
  },
  {
    type: 'input',
    name: 'folderName',
    message: 'Qual nome devo dar para pasta do projeto?',
    validate(folderName: string) {
      console.log(folderName);

      if (!folderName) return EErros.ERROR_NULL;

      if (/[^\w\s-]/.test(folderName)) return EErros.ERROR_SPECIAL_CHARACTERS;

      if (folderName === EGitName.NODEJS_TS || folderName === EGitName.SCSS)
        return EErros.ERROR_GIT_NAME;

      try {
        const dir = path.resolve(folderName);
        fs.accessSync(dir, fs.constants.R_OK);
        return EErros.ERROR_INVALID_FOLDER;
        // eslint-disable-next-line no-empty
      } catch (error) {}

      return true;
    },
  },
];
