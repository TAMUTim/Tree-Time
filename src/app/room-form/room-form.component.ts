import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.scss']
})
export class RoomFormComponent implements OnInit{
  constructor(public router:Router) { }  //
  room = new FormControl('');
  goToRoom() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
  }
    this.router.navigate(['/', 'game',this.room.value]);
  }
  ngOnInit() {}

}
