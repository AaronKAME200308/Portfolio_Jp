'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Variants } from "framer-motion"

const slideVariants: Variants = {
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
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    x: -60,
    scale: 0.98,
  },
}


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

const TITLES = [
  { title: "Branding", itemsPerSlide: 6 },
  { title: "Affiche Concert", itemsPerSlide: 3 },
  { title: "Identité visuel", itemsPerSlide: 4 },
  { title: "Retouche Photo", itemsPerSlide: 2 },
  { title: "Miniature", itemsPerSlide: 4 },
  { title: "Campagne Aadémique", itemsPerSlide: 5 },
  { title: "Dépliant Professionnel", itemsPerSlide: 5 }
]


// 🔹 Toutes les images
const ALL_ITEMS: GridItem[] = [
  { id: "1", color: "#8B6F47", size: "small", colSpan: 1, rowSpan: 4, image: "/bt1.jpeg", filter: "Branding" },
  { id: "2", color: "#6BA547", size: "small", colSpan: 1, rowSpan: 2, image: "/bt2.jpeg", filter: "Branding" },
  { id: "3", color: "#5A5A5A", size: "small", colSpan: 1, rowSpan: 4, image: "/bt4.jpeg", filter: "Branding" },
  { id: "4", color: "#D4E5D4", size: "small", colSpan: 1, rowSpan: 2, image: "/bt3.jpeg", filter: "Branding" },
  { id: "5", color: "#C9A876", size: "medium", colSpan: 1, rowSpan: 2, image: "/bt5.jpeg", filter: "Branding" },
  { id: "6", color: "#D3C5A5", size: "medium", colSpan: 1, rowSpan: 2, image: "/bt6.jpeg", filter: "Branding" },
  { id: "7", color: "#FFFFFF", size: "small", colSpan: 1, rowSpan: 4, image: "/bt7.jpeg", filter: "Branding" },
  { id: "8", color: "#2A2A2A", size: "small", colSpan: 1, rowSpan: 4, image: "/bt8.jpeg", filter: "Branding" },
  { id: "9", color: "#B8956A", size: "large", colSpan: 1, rowSpan: 2, image: "/bt9.jpeg", filter: "Branding" },
  { id: "11", color: "#B8956A", size: "large", colSpan: 1, rowSpan: 2, image: "/bt11.jpeg", filter: "Branding" },
  { id: "12", color: "#B8956A", size: "large", colSpan: 1, rowSpan: 2, image: "/bt12.jpeg", filter: "Branding" },
  { id: "10", color: "#F5E6D3", size: "medium", colSpan: 1, rowSpan: 2, image: "/bt10.jpeg", filter: "Branding" },

  { id: "13", color: "#8B6F47", size: "small", colSpan: 2, rowSpan: 4, image: "/ac.jpeg", filter: "Affiche Concert" },
  { id: "15", color: "#8B6F47", size: "small", colSpan: 2, rowSpan: 2, image: "/ac1.jpeg", filter: "Affiche Concert" },
  { id: "16", color: "#8B6F47", size: "small", colSpan: 2, rowSpan: 2, image: "/ac4.jpeg", filter: "Affiche Concert" },
  { id: "17", color: "#8B6F47", size: "small", colSpan: 2, rowSpan: 4, image: "/ac9.jpeg", filter: "Affiche Concert" },
  { id: "18", color: "#8B6F47", size: "small", colSpan: 1, rowSpan: 2, image: "/ac3.jpeg", filter: "Affiche Concert" },
  { id: "19", color: "#8B6F47", size: "small", colSpan: 2, rowSpan: 2, image: "/ac5.jpeg", filter: "Affiche Concert" },
  { id: "20", color: "#8B6F47", size: "small", colSpan: 2, rowSpan: 4, image: "/bt9.jpeg", filter: "Affiche Concert" },
  { id: "21", color: "#8B6F47", size: "small", colSpan: 2, rowSpan: 2, image: "/ac6.jpeg", filter: "Affiche Concert" },
  { id: "22", color: "#8B6F47", size: "small", colSpan: 1, rowSpan: 2, image: "/ac7.jpeg", filter: "Affiche Concert" },

  { id: "23", color: "#8B6F47", size: "small", colSpan: 2, rowSpan: 4, image: "/idv13.jpeg", filter: "IDV" },
  { id: "24", color: "#8B6F47", size: "small", colSpan: 1, rowSpan: 2, image: "/idv14.jpeg", filter: "IDV" },
  { id: "25", color: "#8B6F47", size: "small", colSpan: 1, rowSpan: 2, image: "/idv17.jpeg", filter: "IDV" },
  { id: "26", color: "#8B6F47", size: "small", colSpan: 2, rowSpan: 2, image: "/idv22.jpeg", filter: "IDV" },
  { id: "27", color: "#8B6F47", size: "small", colSpan: 2, rowSpan: 4, image: "/idv18.jpeg", filter: "IDV" },
  { id: "28", color: "#8B6F47", size: "small", colSpan: 1, rowSpan: 2, image: "/idv19.jpeg", filter: "IDV" },
  { id: "29", color: "#8B6F47", size: "small", colSpan: 1, rowSpan: 2, image: "/idv20.jpeg", filter: "IDV" },
  { id: "30", color: "#8B6F47", size: "small", colSpan: 1, rowSpan: 2, image: "/idv21.jpeg", filter: "IDV" },
  { id: "31", color: "#8B6F47", size: "small", colSpan: 1, rowSpan: 2, image: "/idv14.jpeg", filter: "IDV" },

  { id: "32", color: "#8B6F47", size: "small", colSpan: 2, rowSpan: 4, image: "/rtp1.jpeg", filter: "Retouche Photo" },
  { id: "33", color: "#8B6F47", size: "small", colSpan: 2, rowSpan: 4, image: "/rtp.jpeg", filter: "Retouche Photo" },
  { id: "34", color: "#8B6F47", size: "small", colSpan: 2, rowSpan: 4, image: "/rtp2.jpeg", filter: "Retouche Photo" },
  { id: "35", color: "#8B6F47", size: "small", colSpan: 2, rowSpan: 4, image: "/rtp3.jpeg", filter: "Retouche Photo" },
  { id: "36", color: "#8B6F47", size: "small", colSpan: 2, rowSpan: 4, image: "/rtp4.jpeg", filter: "Retouche Photo" },
  { id: "37", color: "#8B6F47", size: "small", colSpan: 2, rowSpan: 4, image: "/rtp5.jpeg", filter: "Retouche Photo" },

  { id: "38", color: "#8B6F47", size: "small", colSpan: 2, rowSpan: 4, image: "/mini.jpeg", filter: "Miniature" },
  { id: "39", color: "#8B6F47", size: "small", colSpan: 1, rowSpan: 1, image: "/mini1.jpeg", filter: "Miniature" },
  { id: "40", color: "#8B6F47", size: "small", colSpan: 1, rowSpan: 1, image: "/mini2.jpeg", filter: "Miniature" },
  { id: "41", color: "#8B6F47", size: "small", colSpan: 2, rowSpan: 3, image: "/mini3.jpeg", filter: "Miniature" },

  { id: "38", color: "#8B6F47", size: "small", colSpan: 2, rowSpan: 4, image: "/ca.jpeg", filter: "Campagne Aadémique" },
  { id: "39", color: "#8B6F47", size: "small", colSpan: 1, rowSpan: 2, image: "/ca1.jpeg", filter: "Campagne Aadémique" },
  { id: "40", color: "#8B6F47", size: "small", colSpan: 1, rowSpan: 2, image: "/ca2.jpeg", filter: "Campagne Aadémique" },
  { id: "41", color: "#8B6F47", size: "small", colSpan: 1, rowSpan: 2, image: "/ca3.jpeg", filter: "Campagne Aadémique" },
  { id: "38", color: "#8B6F47", size: "small", colSpan: 1, rowSpan: 2, image: "/ca10.jpeg", filter: "Campagne Aadémique" },
  { id: "39", color: "#8B6F47", size: "small", colSpan: 1, rowSpan: 2, image: "/ca5.jpeg", filter: "Campagne Aadémique" },
  { id: "40", color: "#8B6F47", size: "small", colSpan: 2, rowSpan: 4, image: "/ca6.jpeg", filter: "Campagne Aadémique" },
  { id: "41", color: "#8B6F47", size: "small", colSpan: 1, rowSpan: 2, image: "/ca7.jpeg", filter: "Campagne Aadémique" },
  { id: "38", color: "#8B6F47", size: "small", colSpan: 1, rowSpan: 2, image: "/ca8.jpeg", filter: "Campagne Aadémique" },
  { id: "39", color: "#8B6F47", size: "small", colSpan: 1, rowSpan: 2, image: "/ca9.jpeg", filter: "Campagne Aadémique" },
  { id: "40", color: "#8B6F47", size: "small", colSpan: 4, rowSpan: 2, image: "/ca4.jpeg", filter: "Campagne Aadémique" },
  { id: "41", color: "#8B6F47", size: "small", colSpan: 2, rowSpan: 2, image: "/ca11.jpeg", filter: "Campagne Aadémique" },



]

// 🔹 Découpe en slides de 6 max
const chunkSlides = (items: GridItem[], size = 6): GridSlide[] =>
  Array.from({ length: Math.ceil(items.length / size) }, (_, i) => ({
    id: `slide-${i}`,
    items: items.slice(i * size, i * size + size),
  }))

export default function Carousel({ active }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(false)
  const [activeImage, setActiveImage] = useState<string | null>(null)

  const getItemsPerSlide = (title: string) => {
    // Récupère la config du title
    const config = TITLES.find(t => t.title === title)
    if (!config) return 6 // valeur par défaut

    // Ajuste selon la taille de l’écran
    if (typeof window !== "undefined" && window.innerWidth <= 640) {
      return Math.min(1, config.itemsPerSlide) // mobile = 1 item par slide
    }

    return config.itemsPerSlide
  }


  useEffect(() => {
    const handleResize = () => {
      setCurrentSlide(0) // reset slide si le nombre change
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [active])


  const filteredItems = ALL_ITEMS.filter(item => item.filter === active)
  const itemsPerSlide = getItemsPerSlide(active)
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
        <span
          onClick={() =>
            setCurrentSlide((currentSlide - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length)
          }
          className="sm:flex flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-br from-[#f2cc6a] to-[#f2a500] text-white shadow-lg hover:scale-110 transition-transform"
        >
          <ChevronLeft className="w-5 h-5" color='white' strokeWidth={2} />
        </span>

        {/* Carousel */}
        <div
          className="flex-1 overflow-hidden rounded-lg bg-linear-to-r from-[#f2cc6a] via-[#f2cc6a] to-white/90"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full h-125 p-8"
            >
              <div
                className={`grid gap-4 h-full ${window.innerWidth <= 640
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
                    onDragEnd={(_event, info) => {
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
                      gridColumn: `span ${window.innerWidth <= 640 ? 1 : item.colSpan
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
        <span
          onClick={() =>
            setCurrentSlide((currentSlide + 1) % CAROUSEL_SLIDES.length)
          }
          className="sm:flex flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-br from-[#f2cc6a] to-[#f2a500] text-white shadow-lg hover:scale-110 transition-transform"
        >
          <ChevronRight className="w-5 h-5" />
        </span>
      </div>
      {/* INDICATEUR DE SLIDE – MOBILE */}
      <div className="sm:hidden flex justify-center gap-2 mt-4">
        {CAROUSEL_SLIDES.map((_, index) => (
          <motion.span
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="cursor-pointer rounded-full"
            animate={{
              width: index === currentSlide ? 24 : 8,
              height: 8,
              backgroundColor:
                index === currentSlide
                  ? "rgba(255,255,255,1)"
                  : "rgba(255,255,255,0.4)",
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        ))}
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
