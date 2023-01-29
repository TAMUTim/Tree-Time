import { Component, OnInit } from '@angular/core';
import anime from 'animejs';

interface UrlResponse {
  newUrls: string[];
  userId: number;
}

interface UrlObj {
  url: string;
  userId: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
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

  ngOnInit() {
    // subscribe to whatever endpoint the backend uses to pass in data
    // within that call merge the new urls into the old ones
    
  }
}
