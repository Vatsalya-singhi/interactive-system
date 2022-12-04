import { Component, OnInit } from '@angular/core';

import { MoveDirection, ClickMode, HoverMode, OutMode, Container, Engine, Options } from "tsparticles-engine";
import { loadFull } from "tsparticles";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor() { }

    public ngOnInit(): void {
    }


    /**
     * Particle js
     */

    public particlesOptions = {
        background: {
            color: {
                value: "#0d47a1",
            },
        },
        fullScreen: {
            enable: true,
            zIndex: -1,
        },
        style: {
            position: "relative",
            width: "100%",
            height: "100vh",
        },
        particles: {
            color: {
                value: "#ffffff",
            },
            links: {
                color: "#ffffff",
                distance: 100,
                enable: true,
                opacity: 0.5,
                width: 1,
            },
            collisions: {
                enable: true,
            },
            move: {
                direction: MoveDirection.none,
                enable: true,
                outModes: {
                    default: OutMode.bounce,
                },
                random: false,
                speed: 4,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 200,
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 2
                }
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 5 },
                anim: {
                    enable: true,
                    speed: 2
                }
            },
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: {
                    enable: false, //true,
                    mode: ClickMode.push,
                },
                onHover: {
                    enable: true,
                    mode: HoverMode.grab,
                },
                resize: true,
            },
            modes: {
                push: {
                    quantity: 4,
                },
                repulse: {
                    distance: 100,
                    duration: 0.4,
                },
            },
        },
        detectRetina: true,
    };

    public particlesLoaded(container: Container): void {
        console.log(container);
    }

    public async particlesInit(engine: Engine): Promise<void> {
        console.log(engine);
        await loadFull(engine);
    }
}
