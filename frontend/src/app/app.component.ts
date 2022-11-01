import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Language } from './core/enums/language.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  /**
   * The constructor function is a special function that is called when a new instance of the class is
   * created
   * @param {TranslateService} translate - TranslateService - This is the service that we'll use to
   * translate our application.
   * @param {NbThemeService} themeService - This is the service that allows us to change the theme of
   * the application.
   */
  constructor(private translate: TranslateService, private themeService: NbThemeService) { }

  /**
   * The function is called when the component is initialized. It sets the language to English.
   */
  ngOnInit(): void {
    this.translate.use(Language.EN);
    const theme = localStorage.getItem('theme');
    if (theme) this.themeService.changeTheme(theme);
  }
}
