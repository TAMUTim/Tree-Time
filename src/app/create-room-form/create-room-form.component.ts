import { Component , OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router'; 

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-create-room-form',
  templateUrl: './create-room-form.component.html',
  styleUrls: ['./create-room-form.component.scss']
})
export class CreateRoomFormComponent  implements OnInit{
  constructor(public router:Router,
    public auth: AngularFireAuth,
    public db: AngularFirestore) { }  //
  room = new FormControl('');
  goToRoom() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
  }
  const temp = this.db.collection('rooms').doc(this.room.value).set({id:this.room.value,users:[]}).then(()=>{this.router.navigate(['/', 'game',this.room.value]);})
    
  }
  ngOnInit() {}

}