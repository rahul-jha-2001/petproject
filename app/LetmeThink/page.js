"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from 'next/navigation'




const handleNoClick = () => {
  // Add your no click handling logic here
  pass
};

export default function LetMeThink() {
  const [isDarkening, setIsDarkening] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [counter, setCounter] = useState(20);
  const [playSound, setPlaySound] = useState(true)
  const [userInteracted, setUserInteracted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Get the interacted state from localStorage when component mounts
    const interacted = localStorage.getItem('userInteracted') === 'true';
    setUserInteracted(interacted);
  }, []);

  const handleYesClick = () => {
    localStorage.setItem('userInteracted', 'true'); // Save the state
    router.push('/yespage');
  };

  useEffect(() => {
    setCounter(15);

    if (typeof window !== 'undefined') {
      console.log("Attempting to play audio...")
      const audioInstance = new Audio("/Echoes of the End.mp3")
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
    handleThinking();
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    let interval;
    if (isDarkening && counter > 0) {
      interval = setInterval(() => {
        setCounter((prev) => prev - 1); // Countdown logic
      }, 1000);
    } else if (counter === 0) {
      setIsDarkening(false);
      setShowMessage(true); // Show the dialog box only when counter reaches 0
      setTimeout(() => {
        handleYesClick();
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isDarkening, counter]);

  const handleThinking = () => {
    setIsDarkening(true);
    setCounter(15);
    
    // Show thinking message after 5 seconds
    setTimeout(() => {
      setShowMessage(true);
      setIsDarkening(false);
    }, 5000);
  };

  const randomPosition = () => {
    const x = Math.random() * 1500 - 100; // Random value between -100px and 100px
    const y = Math.random() * 1500 - 100; // Random value between -100px and 100px
    return { x, y };
  };
  return (
    <div className="main-container">
      <AnimatePresence>
        {isDarkening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 10, ease: "easeInOut" }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'black',
              zIndex: 9999,
            }}
          />
        )}
      </AnimatePresence>

      {isDarkening && (
        <div className="fixed inset-0 flex items-center justify-center z-[10001] text-white text-6xl">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-pink-600 mb-8">Think Quick!Time is fading away</h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex flex-col gap-4 w-full max-w-md mx-auto"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="yes-button w-full px-6 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-semibold shadow-lg hover:from-rose-500 hover:to-pink-500 transition-all duration-300"
                onClick={handleYesClick}
                style={{ fontSize: '1.25rem' }}
              >
                Yes, of course! 💝
              </motion.button>
              <motion.button 
                whileHover={{x: randomPosition().x,
                    y: randomPosition().y,
                    transition: { duration: 0.001, ease: "easeOut" }, // Quick transition
                  }}
                whileTap={{ scale: 0.95 }}
                className="w-fit text-sm bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-semibold shadow-lg hover:translate-x-6 hover:translate-y-6 hover:shadow-xl transition-all duration-300"
                onClick={handleNoClick}
              >
                     NO   
              </motion.button>
            </motion.div>
          </div>
        </div>
      )}

      {/* New dialog box */}
      {showMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-[10002]">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-bold">Time's up!</h2>
            <p>Oye Bhut hoa masti majak ab yes bol le. </p>
            <button onClick={() => handleYesClick()} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
              Yessssssss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
    