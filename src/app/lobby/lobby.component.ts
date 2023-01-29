import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    public auth: AngularFireAuth,
    public db: AngularFirestore
  ) { }
  

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
        const id = params['room'];
        this.auth.authState.subscribe(async (user)=>{
          if (user)
          {
            console.log(id)
            console.log(user.uid)
            const docref= this.db.collection('rooms').doc(id)
            docref.get().subscribe((users_snap)=>{
              let users=users_snap.data();
              let temp = users['users'];
              if (!temp.includes(user.uid)){
                temp.push(user.uid);
              }
              this.db.collection('rooms').doc(id).set({id:users['id'],users:temp})
            });
          }
          else{

          }
        })

  });
}
}
