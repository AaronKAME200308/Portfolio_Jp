'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface GridItem {
  id: string
  color: string
  size: 'small' | 'medium' | 'large'
  colSpan: number
  rowSpan: number
  image: string
  filter: string
}

interface GridSlide {
  id: string
  items: GridItem[]
}

interface CarouselProps {
  active: string
}

const slideVariants = {
  initial: { opacity: 0, x: 60, scale: 0.98 },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    x: -60,
    scale: 0.98,
  },
}

// 🔹 Toutes les images
const ALL_ITEMS: GridItem[] = [
  { id: '1', color: '#8B6F47', size: 'small', colSpan: 1, rowSpan: 4, image: '/public/bt1.jpeg', filter: 'Branding' },
  { id: '2', color: '#6BA547', size: 'small', colSpan: 1, rowSpan: 2, image: '/public/bt2.jpeg', filter: 'Branding' },
  { id: '3', color: '#5A5A5A', size: 'small', colSpan: 1, rowSpan: 4, image: '/public/bt4.jpeg', filter: 'Branding' },
  { id: '4', color: '#D4E5D4', size: 'small', colSpan: 1, rowSpan: 2, image: '/public/bt3.jpeg', filter: 'Branding' },
  { id: '5', color: '#C9A876', size: 'medium', colSpan: 1, rowSpan: 2, image: '/public/bt5.jpeg', filter: 'Branding' },
  { id: '6', color: '#D3C5A5', size: 'medium', colSpan: 1, rowSpan: 2, image: '/public/bt6.jpeg', filter: 'Branding' },

  { id: '7', color: '#FFFFFF', size: 'small', colSpan: 1, rowSpan: 4, image: '/public/bt7.jpeg', filter: 'Branding' },
  { id: '8', color: '#2A2A2A', size: 'small', colSpan: 1, rowSpan: 4, image: '/public/bt8.jpeg', filter: 'Branding' },
  { id: '9', color: '#B8956A', size: 'large', colSpan: 1, rowSpan: 2, image: '/public/bt9.jpeg', filter: 'Branding' },
  { id: '11', color: '#B8956A', size: 'large', colSpan: 1, rowSpan: 2, image: '/public/bt11.jpeg', filter: 'Branding' },
  { id: '12', color: '#B8956A', size: 'large', colSpan: 1, rowSpan: 2, image: '/public/bt12.jpeg', filter: 'Branding' },

  { id: '10', color: '#F5E6D3', size: 'medium', colSpan: 1, rowSpan: 2, image: '/public/bt10.jpeg', filter: 'Branding' },
]

// 🔹 Découpe en slides de 6 max
const chunkSlides = (items: GridItem[], size = 6): GridSlide[] =>
  Array.from({ length: Math.ceil(items.length / size) }, (_, i) => ({
    id: `slide-${i}`,
    items: items.slice(i * size, i * size + size),
  }))

export default function Carousel({ active }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [activeImage, setActiveImage] = useState<string | null>(null)
  const [itemsPerSlide, setItemsPerSlide] = useState(6)

  // 🔹 Détecte la largeur de l’écran pour adapter le nombre d’items par slide
  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth <= 640) {
        setItemsPerSlide(1) // mobile : max 2 images par slide
      } else {
        setItemsPerSlide(6) // desktop : 6 images par slide
      }
    }

    updateItemsPerSlide()
    window.addEventListener('resize', updateItemsPerSlide)
    return () => window.removeEventListener('resize', updateItemsPerSlide)
  }, [])

  const filteredItems = ALL_ITEMS.filter(item => item.filter === active)
  const CAROUSEL_SLIDES = chunkSlides(filteredItems, itemsPerSlide)

  useEffect(() => {
    setCurrentSlide(0)
  }, [active, itemsPerSlide])

  useEffect(() => {
    if (!isAutoPlay || CAROUSEL_SLIDES.length <= 1) return
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % CAROUSEL_SLIDES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlay, CAROUSEL_SLIDES.length])

  if (!CAROUSEL_SLIDES.length) return null
  const currentSlideData = CAROUSEL_SLIDES[currentSlide]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-1">
      <div className="w-full max-w-4xl flex items-center gap-4">

  {/* Bouton précédent */}
  <button
    onClick={() =>
      setCurrentSlide((currentSlide - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length)
    }
    className="hidden sm:flex flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#f2cc6a] to-[#f2a500] text-white shadow-lg hover:scale-110 transition-transform"
  >
    <ChevronLeft className="w-5 h-5" color='white' strokeWidth={2}/>
  </button>

  {/* Carousel */}
  <div
    className="flex-1 overflow-hidden rounded-lg bg-gradient-to-r from-[#f2cc6a] via-[#f2cc6a] to-white/90"
    onMouseEnter={() => setIsAutoPlay(false)}
    onMouseLeave={() => setIsAutoPlay(true)}
  >
    <AnimatePresence mode="wait">
      <motion.div
        key={currentSlide}
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full h-[500px] p-8"
      >
        <div
  className={`grid gap-4 h-full ${
    window.innerWidth <= 640
      ? "grid-cols-1 grid-rows-1" // Mobile : 2 colonnes, 1 ligne
      : "grid-cols-4 grid-rows-4" // Desktop : 4x4
  }`}
>
  {currentSlideData.items.map((item) => (
    <motion.div
      key={item.id}
      layout
      onClick={() => setActiveImage(item.image)}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.3}
      onDragEnd={(event, info) => {
        if (info.offset.x < -50) {
          // glissé vers la gauche → slide suivant
          setCurrentSlide((currentSlide + 1) % CAROUSEL_SLIDES.length)
          setIsAutoPlay(false)
        } else if (info.offset.x > 50) {
          // glissé vers la droite → slide précédent
          setCurrentSlide(
            (currentSlide - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length
          )
          setIsAutoPlay(false)
        }
      }}
      whileHover={{
        borderWidth: 2,
        borderColor: "white",
        boxShadow: "0 25px 30px rgba(255, 255, 255, 0.8)",
      }}
      className="rounded-lg overflow-hidden group cursor-pointer w-full h-full"
      style={{
        gridColumn: `span ${
          window.innerWidth <= 640 ? 1 : item.colSpan
        }`,
        gridRow: `span ${window.innerWidth <= 640 ? 1 : item.rowSpan}`,
      }}
    >
      <img
        src={item.image}
        alt={item.id}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </motion.div>
  ))}
</div>

      </motion.div>
    </AnimatePresence>
  </div>

  {/* Bouton suivant */}
  <button
    onClick={() =>
      setCurrentSlide((currentSlide + 1) % CAROUSEL_SLIDES.length)
    }
    className="hidden sm:flex flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#f2cc6a] to-[#f2a500] text-white shadow-lg hover:scale-110 transition-transform"
  >
    <ChevronRight className="w-5 h-5" />
  </button>
</div>

      <AnimatePresence>
        {activeImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
          >
            <motion.img
              src={activeImage}
              alt="Preview"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>

  )
}
