import { TranslatorService } from './../services/translator.service';
import { Pipe, PipeTransform, Inject } from '@angular/core';

@Pipe({name: 'translate', pure: false})
export class TranslatePipe implements PipeTransform {

  constructor(@Inject("translatorService") private translatorService: TranslatorService) { }

  transform(input: string, interpolateParams?: any, interpolationId?: string) {
    return this.translatorService.translate(input, interpolateParams, interpolationId);
  }
}