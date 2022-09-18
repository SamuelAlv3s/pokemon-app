import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideFooterDirective } from './hide-footer.directive';

@NgModule({
  declarations: [HideFooterDirective],
  imports: [CommonModule],
  exports: [HideFooterDirective],
})
export class DirectivesModule {}
