import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbThemeService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { NbThemeEnum } from 'src/app/core/enums/nb-theme.enum';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  /**
   * Theme icon
   */
  public icon = 'sun-outline';
  /**
   * User menu
   */
  public userMenu: NbMenuItem[] = [
    {
      title: this.translate.instant('app.user.profile'),
      link: '/app/user/profile',
      icon: 'person-outline'
    },
    {
      title: this.translate.instant('app.logout'),
      icon: 'clipboard-outline'
    },
  ];
  /**
   * Create button menu
   */
  public createMenu: NbMenuItem[] = [
    {
      title: this.translate.instant('app.product.new'),
      link: '/app/product/create',
      icon: 'shopping-bag-outline'
    },
    {
      title: this.translate.instant('app.service.new'),
      link: '/app/service/create',
      icon: 'clipboard-outline'
    },
    {
      title: this.translate.instant('app.subscription.new'),
      link: '/app/subscription/create',
      icon: 'refresh-outline'
    }
  ];
  /**
   * Username
   */
  public username!: string;
  /**
   * User email
   */
  public email!: string;
  /**
   * Current app them
   */
  private currentTheme = NbThemeEnum.DEFAULT;

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
   * The function sets the user context
   */
  ngOnInit(): void {
    this.setUserContext();
    const themeIcon = localStorage.getItem('theme-icon');
    if (themeIcon) this.icon = themeIcon;
  }

  /**
   * If the current theme is the default theme, change the theme to dark and set the icon to the moon
   * icon. If the current theme is the dark theme, change the theme to cosmic and set the icon to the
   * flash icon. Otherwise, change the theme to default and set the icon to the sun icon
   */
  public changeTheme(): void {
    if (this.currentTheme === NbThemeEnum.DEFAULT) {
      this.currentTheme = NbThemeEnum.DARK;
      this.icon = 'moon-outline';
    } else if (this.currentTheme === NbThemeEnum.DARK) {
      this.currentTheme = NbThemeEnum.COSMIC;
      this.icon = 'flash-outline';
    } else {
      this.currentTheme = NbThemeEnum.DEFAULT;
      this.icon = 'sun-outline';
    }
    this.themeService.changeTheme(this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
    localStorage.setItem('theme-icon', this.icon);
  }

  /**
   * It sets the username and email properties of the component to the values stored in the local
   * storage
   */
  public setUserContext(): void {
    const user: User = JSON.parse(localStorage.getItem('user')!);
    if (user){
      this.username = user.fullname!;
      this.email = user.email!;
    }
  }

}
