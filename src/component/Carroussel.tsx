import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface GridItem {
  id: string
  color: string
  size: 'small' | 'medium' | 'large'
  colSpan: number
  rowSpan: number
}

interface GridSlide {
  id: string
  items: GridItem[]
}

const slideVariants = {
  initial: {
    opacity: 0,
    x: 60,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // easing premium
    },
  },
  exit: {
    opacity: 0,
    x: -60,
    scale: 0.98,
    transition: {
      duration: 0.45,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}


// Données d'exemple pour 3 slides
const CAROUSEL_SLIDES: GridSlide[] = [
  {
    id: 'slide-1',
    items: [
      { id: 'item-1', color: '#8B6F47', size: 'large', colSpan: 2, rowSpan: 2 },
      { id: 'item-2', color: '#6BA547', size: 'small', colSpan: 1, rowSpan: 1 },
      { id: 'item-3', color: '#5A5A5A', size: 'small', colSpan: 1, rowSpan: 1 },
      { id: 'item-4', color: '#D4E5D4', size: 'small', colSpan: 1, rowSpan: 1 },
      { id: 'item-5', color: '#C9A876', size: 'medium', colSpan: 1, rowSpan: 1 },
      { id: 'item-6', color: '#D3C5A5', size: 'medium', colSpan: 1, rowSpan: 1 },
      { id: 'item-7', color: '#FFFFFF', size: 'small', colSpan: 1, rowSpan: 1 },
      { id: 'item-8', color: '#2A2A2A', size: 'small', colSpan: 1, rowSpan: 1 },
      { id: 'item-9', color: '#B8956A', size: 'large', colSpan: 2, rowSpan: 1 },
      { id: 'item-10', color: '#F5E6D3', size: 'medium', colSpan: 1, rowSpan: 1 },
    ],
  },
  {
    id: 'slide-2',
    items: [
      { id: 'item-11', color: '#6BA547', size: 'medium', colSpan: 1, rowSpan: 2 },
      { id: 'item-12', color: '#E8D4B8', size: 'small', colSpan: 1, rowSpan: 1 },
      { id: 'item-13', color: '#F5E6D3', size: 'large', colSpan: 2, rowSpan: 1 },
      { id: 'item-14', color: '#5A5A5A', size: 'medium', colSpan: 1, rowSpan: 1 },
      { id: 'item-15', color: '#2A2A2A', size: 'small', colSpan: 1, rowSpan: 1 },
      { id: 'item-16', color: '#D3C5A5', size: 'medium', colSpan: 1, rowSpan: 1 },
      { id: 'item-17', color: '#C9A876', size: 'large', colSpan: 2, rowSpan: 2 },
      { id: 'item-18', color: '#8B6F47', size: 'small', colSpan: 1, rowSpan: 1 },
    ],
  },
  {
    id: 'slide-3',
    items: [
      { id: 'item-19', color: '#2A2A2A', size: 'small', colSpan: 1, rowSpan: 1 },
      { id: 'item-20', color: '#C9A876', size: 'large', colSpan: 2, rowSpan: 2 },
      { id: 'item-21', color: '#6BA547', size: 'small', colSpan: 1, rowSpan: 1 },
      { id: 'item-22', color: '#F5E6D3', size: 'medium', colSpan: 1, rowSpan: 1 },
      { id: 'item-23', color: '#8B6F47', size: 'medium', colSpan: 1, rowSpan: 1 },
      { id: 'item-24', color: '#5A5A5A', size: 'small', colSpan: 1, rowSpan: 1 },
      { id: 'item-25', color: '#D4E5D4', size: 'large', colSpan: 2, rowSpan: 1 },
      { id: 'item-26', color: '#E8D4B8', size: 'medium', colSpan: 1, rowSpan: 1 },
    ],
  },
]

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length)
    }, 5000) // Change slide toutes les 5 secondes

    return () => clearInterval(interval)
  }, [isAutoPlay])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlay(false)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length)
    setIsAutoPlay(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length)
    setIsAutoPlay(false)
  }

  const currentSlideData = CAROUSEL_SLIDES[currentSlide]

  return (
    <div className="w-full h-screen  flex flex-col items-center justify-center p-4">
      {/* Carousel Container */}
      <div className="relative w-full max-w-5xl">
        {/* Grid Slide */}
        <div className="overflow-hidden rounded-lg bg-gray-900">
          <AnimatePresence mode="wait">
    <motion.div
      key={currentSlide}
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-[500px] p-8"
    >
            <div className="grid grid-cols-4 grid-rows-4 gap-4 h-full">
              {currentSlideData.items.map((item) => (
                <motion.div
            key={item.id}
            layout
            className="rounded-lg flex items-center justify-center group cursor-pointer"
            style={{
              backgroundColor: item.color,
              gridColumn: `span ${item.colSpan}`,
              gridRow: `span ${item.rowSpan}`,
            }}
          >
                  {/* Logo placeholder - tu peux remplacer par une image */}
                  <div className="text-center opacity-50 group-hover:opacity-75 transition-opacity">
                    <svg
                      className="w-12 h-12 mx-auto mb-2 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    </svg>
                    <p className="text-xs font-semibold text-gray-500">Restau</p>
                    <p className="text-xs font-semibold text-gray-500">Tradition</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
          </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
          aria-label="Slide précédent"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
          aria-label="Slide suivant"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="flex gap-2 mt-8">
        {CAROUSEL_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-8' : 'bg-white/30 hover:bg-white/50'
              }`}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <p className="text-white/60 text-sm mt-4">
        {currentSlide + 1} / {CAROUSEL_SLIDES.length}
      </p>
    </div>
  )
}
