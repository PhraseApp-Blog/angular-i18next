import { ITranslationService, I18NEXT_SERVICE } from 'angular-i18next';
import { Component, ViewEncapsulation, Inject, OnInit } from '@angular/core';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'header-language',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  language = 'en';
  languages: string[] = ['en', 'el'];

  constructor(
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService
  ) {}

  ngOnInit() {
    this.i18NextService.events.initialized.subscribe((e) => {
      if (e) {
        this.updateState(this.i18NextService.language);
      }
    });
  }

  changeLanguage(lang: string){
    if (lang !== this.i18NextService.language) {
      this.i18NextService.changeLanguage(lang).then(x => {
        this.updateState(lang);
        document.location.reload();
      });
    }
  }

  private updateState(lang: string) {
    this.language = lang;
  }
}
