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
    BORDER_DISTANCE_BOUND = 100;
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
        let intervalid = setInterval(() => this.getNewPath(), 2000);
        // clearInterval(intervalid);
    }

    getNewPath(): void {
        let element = document.getElementById(this.fishId);
        let position = element.getBoundingClientRect();

        this.x = position.left;
        this.y = position.top;

        if(this.x % 2) {
            this.currentDirection = this.currentDirection + Math.floor(Math.random() * 10);
        } else {
            this.currentDirection = this.currentDirection - Math.floor(Math.random() * 10);
        }
        
        let rad = this.currentDirection * (Math.PI / 180);
        let slope = Math.tan(rad);
        let xOffset = 50 * Math.cos(slope);
        let yOffset = 50 * Math.sin(slope);

        console.log(this.scrnWidth, this.scrnHeight);
        if(this.x + xOffset > this.scrnWidth - this.BORDER_DISTANCE_BOUND
        || this.x + xOffset < this.BORDER_DISTANCE_BOUND
        || this.y + yOffset > this.scrnHeight - this.BORDER_DISTANCE_BOUND
        || this.y + yOffset < this.BORDER_DISTANCE_BOUND) {
            this.currentDirection = (this.currentDirection + 180 - Math.floor(Math.random() * 20)) % 360;
            rad = this.currentDirection * (Math.PI / 180);
            slope = Math.tan(rad);
            xOffset = 50 * Math.cos(slope);
            yOffset = 50 * Math.sin(slope);
        }

        // we want to move in the direction we are facing
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
