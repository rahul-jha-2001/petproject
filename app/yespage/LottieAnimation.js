"use client"

import { useState,useRef } from "react";
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function LottieAnimation({ animationData, onAnimationStart, onAnimationComplete }) {
    const lottieRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    
    const handleAnimationClick = () => {
        console.log("handleAnimationClick");
        if (lottieRef.current) {
            setIsPlaying(true);
            onAnimationStart?.();
            lottieRef.current.play();
        }
    }

    return (
        <div className="relative w-64 h-64">
            <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop={false}
                autoplay={false}
                className="w-full h-full"
                onComplete={() => {
                    setIsPlaying(false);
                    onAnimationComplete?.();
                }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <button
                    onClick={handleAnimationClick}
                    disabled={isPlaying}
                    className={`
                        bg-pink-500 
                        hover:bg-pink-600 
                        text-white 
                        font-bold 
                        py-2 
                        px-4 
                        rounded
                        transition-opacity
                        ${isPlaying ? 'opacity-0' : 'opacity-100'}
                    `}
                >
                </button>
            </div>
        </div>
    );
} 