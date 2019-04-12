import { Component, OnInit, Inject } from '@angular/core';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { I18NextModule, ITranslationService, I18NEXT_SERVICE, I18NextTitle } from 'angular-i18next';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private title: Title,
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.routerState.root),
      map(route => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
      ).subscribe((event) => this.updatePageTitle(event.title));
  }

  ngOnInit() {
    this.i18NextService.events.languageChanged.subscribe(lang => {
      const root = this.router.routerState.root;
      if (root != null && root.firstChild != null) {
        const data: any = root.firstChild.data;
        this.updatePageTitle(data && data.value && data.value.title);
      }
    });
  }

  updatePageTitle(title: string): void {
    const newTitle = title || 'my awesome i18next page';
    this.title.setTitle(newTitle);
  }
}
