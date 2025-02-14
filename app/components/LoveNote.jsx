import { motion } from "framer-motion"
import { TypeAnimation } from "react-type-animation"

export default function LoveNote({ message }) {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto my-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-pink-600">A Note For You</h2>
      <TypeAnimation
        sequence={[
          message,
          1000,
          message,
        ]}
        wrapper="p"
        speed={50}
        style={{ whiteSpace: "pre-line", fontSize: "1rem", lineHeight: "1.5" }}
        repeat={0}
      />
    </motion.div>
  )
}

