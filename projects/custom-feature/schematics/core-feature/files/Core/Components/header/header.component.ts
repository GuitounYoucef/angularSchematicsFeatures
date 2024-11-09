import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [MatToolbarModule,MatIconModule,MatMenuModule,MatDividerModule],


})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  username?:string;
  constructor(//private authService:AuthService,
              private router:Router,
              ) {}

  ngOnInit(): void {
    //this.username=this.authService.getUserName();
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  logout(){
    //this.authService.logout();
    this.router.navigate(['Auth']);

  }

  ChangePassword()
  {
 /*   this.dialog.open(PasswordUpdateComponent, {
      width:'580px',

    }).afterClosed().subscribe(val =>{
      if(val==='update'){
        
      }
    });*/
  }

}
