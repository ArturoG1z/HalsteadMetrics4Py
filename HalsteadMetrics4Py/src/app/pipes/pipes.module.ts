import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeHighlightPipe } from './code-highlight.pipe';



@NgModule({
  declarations: [
    CodeHighlightPipe
  ],
  exports: [
    CodeHighlightPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
