import { Component, OnInit, Input } from '@angular/core';
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
  names = [];
  pairings = {};

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
        const id = params['room'];
        this.auth.authState.subscribe(async (user)=>{
          if (user)
          {
            var keys = [];
            console.log(id)
            console.log(user.uid)
            const docref= this.db.collection('rooms').doc(id)
            await docref.get().subscribe((users_snap)=>{
              let users=users_snap.data();
              let temp = users['users'];
              
              for(var key in temp){
                keys.push(key);
              }
              this.names=keys;
              for (const user_name of this.names)
              {                
                const user_ref = this.db.collection('users').doc(user.uid);
                user_ref.get().subscribe((user_data)=>{
                  let dat = user_data.data();
                  let links = dat['urls'];
                  this.pairings[user_name] = links;
      
                })
              }

              console.log(this.names)
              const user_ref = this.db.collection('users').doc(user.uid)
               user_ref.get().subscribe((user_data)=>{
                let dat = user_data.data();
                let links = dat['urls'];
                if (!temp.hasOwnProperty(user.uid)){
                  temp[user.uid] =links;
                }
                this.db.collection('rooms').doc(id).set({id:users['id'],users:temp}).then(()=>{
                  console.log(temp)
                })
              })

            });



            const room_doc = this.db.collection('rooms').doc(id);
            const user_doc = this.db.collection('users').doc(user.uid);
            const room_observer = room_doc.snapshotChanges().subscribe(()=>{
              const docref= this.db.collection('rooms').doc(id)
              docref.get().subscribe((users_snap)=>{
                let users=users_snap.data();
                let temp = users['users'];
                keys = [];
                for(var key in temp){
                  keys.push(key);
                }
                this.names=keys;
                this.pairings={}
                for (const user_name of this.names)
                {                
                  const user_ref = this.db.collection('users').doc(user.uid);
                  user_ref.get().subscribe((user_data)=>{
                    let dat = user_data.data();
                    let links = dat['urls'];
                    this.pairings[user_name] = links;
                  })
                }
              });
            })
            const user_observer = user_doc.snapshotChanges().subscribe(()=>{
              const docref= this.db.collection('rooms').doc(id)
              docref.get().subscribe((users_snap)=>{
                let users=users_snap.data();
                let temp = users['users'];
                const user_ref = this.db.collection('users').doc(user.uid)
                user_ref.get().subscribe((user_data)=>{
                  let dat = user_data.data();
                  let links = dat['urls'];
                    temp[user.uid] =links;
                  this.db.collection('rooms').doc(id).set({id:users['id'],users:temp}).then(()=>{
                    console.log(temp)
                  })
                })
  
              });
            })

          }
          else{
          }
        })


  });
}
}
