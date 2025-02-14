"use client"

import { useState, useEffect, useRef } from "react";
import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import animationData from "./Animation - 1739454337309.json";
import LoveNote from "../components/LoveNote";
import { Fireworks } from 'fireworks-js';

const LottieAnimation = dynamic(() => import('./LottieAnimation'), {
    ssr: false
});

export default function YesPage() {
    const router = useRouter();
    const [showNotes, setShowNotes] = useState({
        note1: false,
        note2: false,
        note3: false
    });
    const fireworksRef = useRef(null);

    const handleYesClick = () => {
        router.push('/nextpage');
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
          console.log("Attempting to play audio...")
          const audioInstance = new Audio("/HAPPY HAPPY HAPPY  TikTok sound effect.mp3")
          audioInstance.loop = true
          
          // Add volume control and preload
          audioInstance.volume = 1.0
          audioInstance.preload = 'auto'
          
          const playAudio = async () => {
            try {
              await audioInstance.play()
              console.log("Audio playing successfully")
            } catch (error) {
              console.error("Audio playback failed:", error)
            }
          }
    
          playAudio()
    
          return () => {
            console.log("Cleaning up audio")
            audioInstance.pause()
            audioInstance.currentTime = 0
          }
        }
      }, [])  // Empty dependency array means it runs once on mount

    useEffect(() => {
        // Initialize fireworks
        const container = document.getElementById('fireworks');
        const fireworks = new Fireworks(container, {
            autoresize: true,
            opacity: 0.5,
            acceleration: 1.05,
            friction: 0.97,
            gravity: 1.5,
            particles: 50,
            traceLength: 3,
            traceSpeed: 10,
            explosion: 5,
            intensity: 30,
            flickering: 50,
            lineStyle: 'round',
            hue: {
                min: 0,
                max: 360
            },
            delay: {
                min: 30,
                max: 60
            },
            rocketsPoint: {
                min: 50,
                max: 50
            },
            lineWidth: {
                explosion: {
                    min: 1,
                    max: 3
                },
                trace: {
                    min: 1,
                    max: 2
                }
            },
            brightness: {
                min: 50,
                max: 80
            },
            decay: {
                min: 0.015,
                max: 0.03
            },
            mouse: {
                click: false,
                move: false,
                max: 1
            }
        });

        fireworks.start();

        // Cleanup function
        return () => {
            fireworks.stop();
        };
    }, []);

    const handleFirstAnimationComplete = () => {
        console.log('First animation completed!');
        setShowNotes(prev => ({ ...prev, note1: true }));
    };

    const handleSecondAnimationComplete = () => {
        console.log('Second animation completed!');
        setShowNotes(prev => ({ ...prev, note2: true }));
    };

    const handleThirdAnimationComplete = () => {
        console.log('Third animation completed!');
        setShowNotes(prev => ({ ...prev, note3: true }));
    };

    return (
        <div className="flex flex-col items-center min-h-screen py-10 gap-8 relative">
            <canvas 
                id="fireworks" 
                className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-10"
                style={{
                    width: '100vw',
                    height: '100vh',
                    position: 'fixed',
                    top: 0,
                    left: 0
                }}
            />
            <div className="inline-block max-w-[80%] rounded-lg overflow-hidden mb-8 z-20 relative">
                <img 
                    src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWJvcHU4cWN3amY4bTA5Z256Ym01OXluMDhhZGxmam9qMG1zN3B5bCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/rrasLFSTyi4Th1e8Xo/giphy.gif"
                    alt="Celebration"
                    className="object-contain"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                    <LottieAnimation 
                        animationData={animationData}
                        onAnimationComplete={handleFirstAnimationComplete}
                    />
                    {showNotes.note1 && (
                        <LoveNote message="My dearest Billu, you are the softest melody in my heart, the sweetest scent in my kitchen, and the brightest red in my world. Just like a cat finds the coziest spot, my heart has found its home in you. Happy Valentine’s Day, my love! 💖" />
                    )}
                </div>

                <div className="flex flex-col items-center">
                    <LottieAnimation 
                        animationData={animationData}
                        onAnimationComplete={handleSecondAnimationComplete}
                    />
                    {showNotes.note2 && (
                        <LoveNote message="My Billu, you are the perfect recipe for love—a cup of warmth, a spoonful of laughter, a sprinkle of mischief, and a whole lot of sweetness. Life with you is like a freshly baked cake—irresistible and comforting. Happy Valentine's Day, my love! ✨" />
                    )}
                </div>

                <div className="flex flex-col items-center">
                    <LottieAnimation 
                        animationData={animationData}
                        onAnimationComplete={handleThirdAnimationComplete}
                    />
                    {showNotes.note3 && (
                        <LoveNote message="Billu, if love were a song, you’d be my favorite tune. If happiness had a sound, it would be your laughter. You are the music my heart dances to, today and always. Happy Valentine’s Day, my melody of love! 💝" />
                    )}
                </div>
            </div>
        </div>
    );
}