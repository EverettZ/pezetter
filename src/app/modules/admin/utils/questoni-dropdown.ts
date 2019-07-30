import { QuestionBase } from './question-base';

export class DropdownQuestion extends QuestionBase<string> {
  controlType = 'dropdown';

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
