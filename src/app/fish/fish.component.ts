import { Component, AfterViewInit, Input, OnInit, HostListener } from '@angular/core';
import anime from 'animejs';

@Component({
  selector: 'app-fish',
  templateUrl: './fish.component.html',
  styleUrls: ['./fish.component.scss']
})
export class FishComponent implements AfterViewInit, OnInit {
    @Input() urlString: string;
    @Input() userId: number;

    scrnHeight = 0;
    scrnWidth = 0;
    
    fishId = "";
    svgId = "";
    path = "";
    
    x = -1;
    y = -1;

    currentDirection = Math.floor(Math.random() * 360);
    BORDER_DISTANCE_BOUND = 150;
    TURN_MAX_DEGREE = 30;

    @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
        this.scrnHeight = window.innerHeight;
        this.scrnWidth = window.innerWidth;
    }

    ngOnInit(): void {
        this.fishId = this.urlString + this.userId.toString();
        this.svgId = 'svg' + this.fishId;
    }

    ngAfterViewInit(): void {
        // do something
        this.getNewPath();
    }

    getNewPath(): void {
        let element = document.getElementById(this.fishId);
        let position = element.getBoundingClientRect();

        this.x = position.left;
        this.y = position.top;

        let rad = this.currentDirection * (Math.PI / 180);
        let slope = Math.tan(rad);

        // while(this.x + this.BORDER_DISTANCE_BOUND > this.scrnWidth 
        // || this.x - this.BORDER_DISTANCE_BOUND < 0
        // || this.y + this.BORDER_DISTANCE_BOUND > this.scrnHeight
        // || this.y - this.BORDER_DISTANCE_BOUND < 0) {
        //     this.currentDirection = (this.currentDirection + 10 + Math.floor(Math.random() * 20)) % 360;
            
        //     return;
        // }

        // we want to move in the direction we are facing
        
        // let endX = 50 * Math.cos(slope) + this.x;
        // let endY = 50 * Math.sin(slope) + this.y;

        // console.log("Start for fish", this.fishId, this.x, this.y);

        // console.log("End Path:", path);
        let target = '#' + this.fishId;
        anime({
            targets: document.getElementById(this.fishId),
            translateX: 50 * Math.cos(slope),
            translateY: 50 * Math.sin(slope),
            duration: 2000,
            loop: false,
            easing: 'linear'
        });

        // element = document.getElementById(this.fishId);
        // position = element.getBoundingClientRect();
        // this.x = position.left;
        // this.y = position.top;
        // console.log("End for fish", this.fishId, this.x, this.y);
    }

    turnAround(slope): void {
        // turn around animation


    }

    constructor() {
        this.getScreenSize();
    }
}
