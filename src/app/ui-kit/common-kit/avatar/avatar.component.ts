import { Component, Input, OnInit } from '@angular/core';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {

  @Input() email: string;
  @Input() size = 75;
  @Input() stroke = 0;

  user$ = this.authService.userChanged$;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {}

}
