import { Component,OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

interface UrlResponse {
  newUrls: string[];
  userId: number;
}

interface UrlObj {
  url: string;
  userId: number;
}


@Component({
  selector: 'greeting-root',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss']
})
export class GreetingComponent implements OnInit{
  title = 'Fish';
  existingUrls: UrlObj[] = [
    {
      url: "www.google.com",
      userId: 2,
    },
    {
      url: "www.yahoo.com",
      userId: 2,
    },
    {
      url: "www.gmail.com",
      userId: 2,
    },
    {
      url: "www.nba.com",
      userId: 2,
    }
  ];
  constructor(public auth: AngularFireAuth) {
  }
  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.signOut();
  }
  ngOnInit() {
    // subscribe to whatever endpoint the backend uses to pass in data
    // within that call merge the new urls into the old ones
    
  }
}