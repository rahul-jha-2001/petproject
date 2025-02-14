"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
// import Bouquet from "./components/Bouquet"
import LoveNote from "./components/LoveNote"
// import PhotoReveal from "./components/PhotoReveal"
// import RosePicker from "./components/RosePicker"
import LetMeThink from "./LetmeThink/page"
import { useRouter } from 'next/navigation'

export default function Home() {
  const [unwrapStage, setUnwrapStage] = useState(0)
  const [showLoveNote, setShowLoveNote] = useState(false)
  const [showPhoto, setShowPhoto] = useState(false)
  const [playSound, setPlaySound] = useState(true)
  const [userInteracted, setUserInteracted] = useState(false)
  const [currentGif, setCurrentGif] = useState("https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW5lenZyZHI5OXM2eW95b3pmMG40cWVrMDhtNjVuM3A4dGNxa2g2dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/VM1fcpu2bKs1e2Kdbj/giphy.gif")
  const [isDarkening, setIsDarkening] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const handleInteraction = () => {
      setUserInteracted(true)
      // Remove event listeners after first interaction
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
    }

    document.addEventListener('click', handleInteraction)
    document.addEventListener('touchstart', handleInteraction)

    return () => {
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && userInteracted) {
      console.log("Attempting to play audio...")
      const audioInstance = new Audio("/Whispers of the Harp.mp3")
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
  }, [userInteracted])

  const handleYesClick = () => {
    router.push('/yespage')
  }

  const handleNo1Click = () => {
    router.push('/LetmeThink')
  }

  const handleNo2Click = () => {
    alert("I love you too! 💖");
  }

  const handleNo3Click = () => {
    alert("Challenge accepted! 🌹");
  }

  const messages = [
    "Are you sure?",
    "Really sure??",
    "Are you positive?",
    "Pookie please...",
    "Just think about it!",
    "If you say no, I will be really sad...",
    "I will be very sad...",
    "I will be very very very sad...",
    "Ok fine, I will stop asking...",
    "Just kidding, say yes please! ❤️"
];

let messageIndex = 0;

function handleNo4Click() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    
    // Update the gif
    setCurrentGif("https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGE3OGJuMzA1MmNubHBlcmpsN3d5YWlxaW80dW9mcmVmZm9xcGxtaSZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/W0VuY0dTxH9L6vLUJ2/giphy.gif");
    
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    
    // Increase yes button size
    const yesCurrentWidth = yesButton.offsetWidth;
    const yesCurrentHeight = yesButton.offsetHeight;
    yesButton.style.height = `${yesCurrentHeight * 1.2}px`;
    
    // Decrease no button size
    const noCurrentWidth = noButton.offsetWidth;
    const noCurrentHeight = noButton.offsetHeight;
    noButton.style.height = `${noCurrentHeight * 0.8}px`;
}

  const handleStartClick = () => {
    setUserInteracted(true)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-pink-50 to-red-50">
      {!userInteracted ? (
        <motion.div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-semibold shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartClick}
          >
            Click to Start 💝
          </motion.button>
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-pink-600 mb-8">Will you be my Valentine?</h1>
          </motion.div>
          

          <div className="relative w-full max-w-6xl px-4">
            {/* Centered Buttons container */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-center mb-8"
            >
              <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="yes-button w-full px-6 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-semibold shadow-lg hover:from-rose-500 hover:to-pink-500 transition-all duration-300"
                  onClick={handleYesClick}
                  style={{ fontSize: '1.25rem' }}  // Make "Yes" button more prominent
                >
                  Yes, of course! 💝
                </motion.button>

                

              
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-semibold shadow-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-300"
                    onClick={handleNo1Click}
                  >
                    Let me think 💭
                  </motion.button>

                  {/* <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold shadow-lg hover:from-cyan-500 hover:to-blue-500 transition-all duration-300"
                    onClick={handleNo2Click}
                  >
                    No, But Still love you 💖
                  </motion.button> */}

                  {/* <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-3 col-span-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg font-semibold shadow-lg hover:from-emerald-500 hover:to-teal-500 transition-all duration-300"
                    onClick={handleNo3Click}
                  >
                    Impress me first! ✨
                  </motion.button> */}
  
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ fontSize: '1.25rem' }}
                  className="no-button w-full px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-lg font-semibold shadow-lg hover:from-gray-500 hover:to-gray-400 transition-all duration-300"
                  onClick={handleNo4Click}
                >
                  No 🤔
                </motion.button>
              </div>
            </motion.div>

            {/* Single GIF container */}
            <div className="hidden md:block absolute top-1/2 -right-24 transform -translate-y-1/2 w-96 h-96 bg-white/10 rounded-lg backdrop-blur-sm p-4">
              <img 
                src={currentGif} 
                alt="Valentine's Animation"
                className="w-full h-full"
              />
            </div>
          </div>

          <AnimatePresence>
            {showLoveNote && <LoveNote />}
            {showPhoto && <PhotoReveal />}
            {unwrapStage === 2 && <RosePicker />}
          </AnimatePresence>
        </>
      )}
    </main>
  )
}

