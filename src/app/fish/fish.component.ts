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
    BORDER_DISTANCE_BOUND = 50;
    TURN_MAX_DEGREE = 30;
    DURATION = 1500 + Math.floor(Math.random() * 1000);

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
        let element = document.getElementById(this.fishId);
        let position = element.getBoundingClientRect();

        this.x = position.left;
        this.y = position.top;

        let intervalid = setInterval(() => this.getNewPath(), this.DURATION + 1000);
        // clearInterval(intervalid);
    }

    getNewPath(): void {
        if(this.x % 2) {
            this.currentDirection = this.currentDirection + Math.floor(Math.random() * 10);
        } else {
            this.currentDirection = this.currentDirection - Math.floor(Math.random() * 10);
        }
        
        let rad = this.currentDirection * (Math.PI / 180);
        let xOffset = 50 * Math.cos(rad);
        let yOffset = 50 * Math.sin(rad);

        console.log(Math.floor(this.x), Math.floor(this.y), this.scrnWidth, this.scrnHeight);
        if(this.x + xOffset > this.scrnWidth - this.BORDER_DISTANCE_BOUND
        || this.x + xOffset < this.BORDER_DISTANCE_BOUND
        || this.y + yOffset > this.scrnHeight - this.BORDER_DISTANCE_BOUND
        || this.y + yOffset < this.BORDER_DISTANCE_BOUND) {
            this.currentDirection = (this.currentDirection + 180 - Math.floor(Math.random() * 20)) % 360;
            rad = this.currentDirection * (Math.PI / 180);
            xOffset = 50 * Math.cos(rad);
            yOffset = 50 * Math.sin(rad);
        }

        // we want to move in the direction we are facing
        let target = '#' + this.fishId;
        anime({
            targets: document.getElementById(this.fishId),
            translateX: 50 * Math.cos(rad),
            translateY: 50 * Math.sin(rad),
            duration: this.DURATION,
            loop: false,
            easing: 'linear'
        });

        this.x = this.x + 50 * Math.cos(rad);
        this.y = this.y + 50 * Math.sin(rad);
    }

    turnAround(slope): void {
        // turn around animation

    }

    constructor() {
        this.getScreenSize();
    }
}
