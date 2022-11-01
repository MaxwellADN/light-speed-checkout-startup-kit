import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-back-nav',
  templateUrl: './back-nav.component.html',
  styleUrls: ['./back-nav.component.scss']
})
export class BackNavComponent {
  @Input() public title: string = '';
  @Input() public link: string = '';
}
