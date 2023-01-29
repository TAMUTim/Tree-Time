import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FishComponent } from './fish/fish.component';
import { GreetingComponent } from './greeting.component';

import {FirebaseUIModule, firebase, firebaseui} from 'firebaseui-angular';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { WaitingRoomComponent } from './waiting-room/waiting-room.component';
import { RoomFormComponent } from './room-form/room-form.component';
import { LobbyComponent } from './lobby/lobby.component';
import { CreateRoomFormComponent } from './create-room-form/create-room-form.component';
import { TableComponent } from './table/table.component';

const firebaseConfig = {
  apiKey: "AIzaSyDQZDZvHw_A-C1JeaCoQf-wAuX1ktguOjw",
  authDomain: "aquarium-16311.firebaseapp.com",
  projectId: "aquarium-16311",
  storageBucket: "aquarium-16311.appspot.com",
  messagingSenderId: "1076310005415",
  appId: "1:1076310005415:web:987e4a527840e272386d82",
  measurementId: "G-2VFRWS6FL9"
}

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  //term of service
  tosUrl: '<your-tos-link>',
  //privacy url
  privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  //credentialHelper:             firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
  credentialHelper: firebaseui.auth.CredentialHelper.NONE
};


@NgModule({
  declarations: [
    AppComponent,
    FishComponent,
    GreetingComponent,
    WaitingRoomComponent,
    RoomFormComponent,
    LobbyComponent,
    CreateRoomFormComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
