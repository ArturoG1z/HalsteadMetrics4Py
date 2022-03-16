import { Pipe, PipeTransform } from '@angular/core';
import hljs from 'highlight.js';
import python from 'highlight.js/lib/languages/python';

@Pipe({
  name: 'codeHighlight'
})
export class CodeHighlightPipe implements PipeTransform {

  transform(text: string, ...args: unknown[]): unknown {
    hljs.registerLanguage('python', python);
    return hljs.highlight('python', text).value;
  }

}
