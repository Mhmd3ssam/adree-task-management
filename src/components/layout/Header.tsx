import { ImagePlus } from "lucide-react"
import { useState, useRef } from "react"
import { motion } from "framer-motion"

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const defaultCoverImage = "/cover2.jpg" 
  const [coverImage, setCoverImage] = useState<string>(defaultCoverImage)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setCoverImage(imageUrl)
    }
  }

  return (
    <header className="relative">
      <div 
        className="h-[200px] w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${coverImage})` }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/40 to-transparent">
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-4">
          <div></div>
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => fileInputRef.current?.click()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-white hover:bg-white/20 rounded-lg transition-colors backdrop-blur-sm border border-white/20"
            >
              <ImagePlus size={18} />
              <span>Change cover</span>
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  )
}
