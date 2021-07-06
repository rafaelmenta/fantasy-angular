import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyMaskDirective } from './currency-mask.directive';

@NgModule({
  declarations: [
    CurrencyMaskDirective,
  ],
  exports: [
    CurrencyMaskDirective,
  ]
})
export class MaskModule { }
