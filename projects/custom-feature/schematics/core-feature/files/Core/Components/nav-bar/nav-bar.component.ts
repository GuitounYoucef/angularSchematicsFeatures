import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
/* import { select, Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/Store/app.state';
import { role } from 'src/app/Store/auth/auth.selector'; */
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatMenuModule } from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import { CommonModule, NgIf } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {MatBadgeModule} from '@angular/material/badge';
import { MessageState } from 'src/app/Modules/Message/Message.Data/Message.State/message.reducer';
import { selectUnreadedMessagesNumber } from 'src/app/Modules/Message/Message.Data/Message.State/message.selectors';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { UserViewModel } from 'src/app/Modules/User/User.Presentation/user-view-models/user-view-models';
import { AuthViewModel } from 'src/app/Modules/Auth/Auth.Presentation/Auth.ViewModels/AuthViewModel';
import { AvatarModule } from 'ngx-avatars';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PasswordUpdateComponent } from 'src/app/Modules/Auth/Auth.Presentation/password-update/password-update.component';
import { MemberDialogComponent } from 'src/app/Modules/Team/Team.Presentation/member-dialog/member-dialog.component';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css'],
    imports: [NgIf,
        MatToolbarModule,
        AvatarModule,
        MatListModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        MatListModule,
        RouterLink,
        RouterLinkActive,
        MatBadgeModule,
        FormsModule,
        CommonModule,
        MatDialogModule]
})
export class NavBarComponent implements OnInit, OnDestroy {

  //role$=this.store.pipe(select(role));

 
  readonly UnreadedMessagesNumber$ = this.store.select(selectUnreadedMessagesNumber)
  readonly curentUser$ = this.authViewModel.currentUser$;

  constructor(
      private store: Store<MessageState>,
      private authViewModel:AuthViewModel,
      private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.UnreadedMessagesNumber$.subscribe(
      data=>{
        if(data>0)
        {
          this.playNotification();
        }
      }
    )
    this.authViewModel.getUserRole();
  }
playNotification(){
  let player = <HTMLAudioElement>document.getElementById("NotificationAudio");
  player.play();
}


  ngOnDestroy(): void {
    this.UnreadedMessagesNumber$.subscribe();

  }

  logout()
  {
    this.authViewModel.Logout();  
  }

   ChangePassword()
  {
    this.dialog.open(PasswordUpdateComponent, {
      width:'580px',

    }).afterClosed().subscribe(val =>{
      if(val==='update'){
        
      }
    }); 
  } 

}
