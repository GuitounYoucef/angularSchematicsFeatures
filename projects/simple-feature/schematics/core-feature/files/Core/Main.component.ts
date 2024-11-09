import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

import { RouterOutlet } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { AddPostComponent } from '../Posts/Posts.Presentation/add-post/add-post.component';
import { AppState } from './state/app.state';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { HeaderComponent } from './Components/header/header.component';

@Component({
  selector: 'app-Main',
  templateUrl: './Main.component.html',
  styleUrls: ['./Main.component.css'],
  standalone:true,
  imports:[CommonModule,
           MatSidenavModule,
           NavBarComponent,
           HeaderComponent,
           RouterOutlet,
           MatListModule,
           MatIconModule,
           AddPostComponent]
})
export class MainComponent implements OnInit {

  sideBarOpen = true;
  constructor(private store: Store<AppState>,) { }

  ngOnInit(): void {
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;

  }

}
