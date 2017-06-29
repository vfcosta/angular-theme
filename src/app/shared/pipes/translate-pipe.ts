import { TranslatorService } from './../services/translator.service';
import { Pipe, Inject } from "ng-forward";

@Pipe('translate')
@Inject("translatorService")
export class TranslatePipe {

  constructor(private translatorService: TranslatorService) { }

  transform(input: string, interpolateParams?: any, interpolationId?: string) {
    return this.translatorService.translate(input, interpolateParams, interpolationId);
  }
}