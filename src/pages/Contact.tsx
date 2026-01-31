import { useState } from 'react'
import { motion } from 'framer-motion'
import { MailIcon, PhoneIcon, Globe } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Merci ${form.name}, votre message a été envoyé !`)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* TITRE */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mx-auto mb-12 w-fit px-3 py-2 border border-[#f2cc6a]/60 rounded-full text-2xl font-bold text-center bg-gradient-to-r from-black via-black/80 to-black/60"
      >
        <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#f2cc6a]/90"/>
          <span>Contact</span>
        </div>
      </motion.div>
      <motion.p
        animate={{ rotate: [0, -1, 1, -1, 1, 0] }}
        whileHover={{ x: 0 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
        className="text-white/80 mb-8 text-base sm:text-lg"
      >
        Arrête de chercher, tu as trouvé le meilleur. Envoie ton message et regarde la magie opérer.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Formulaire */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white/5 p-6 rounded-2xl border border-white/20 shadow-md space-y-2"
        >
          <input
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
            required
            name="name"
            placeholder="Ton nom"
            className="w-full p-3 rounded-md bg-transparent border border-white/40 outline-none"
          />
          <input
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
            required
            type="email"
            name="email"
            placeholder="Ton email"
            className="w-full p-3 rounded-md bg-transparent border border-white/40 outline-none"
          />
          <textarea
            value={form.message}
            onChange={e => setForm({...form, message: e.target.value})}
            required
            name="message"
            rows={6}
            placeholder="Ton message"
            className="w-full p-3 rounded-md bg-transparent border border-white/40 outline-none"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-md bg-gradient-to-r from-[#f2cc6a] via-[#f2cc6a] to-white/90 font-medium shadow hover:scale-105 transition"
          >
            Envoyer
          </button>
        </motion.form>

        {/* Section SVG + contact */}
        <div
          className="w-full bg-no-repeat bg-center bg-cover rounded-2xl relative h-80 sm:h-auto"
          style={{ backgroundImage: `url('/aigle2.svg')` }}
        >
          <div className="absolute bottom-4 right-4 flex flex-col space-y-4 text-white/70">
            <motion.div
                            whileHover={{ scale: 1.03, translateY: -6 }}
                            className="w-70 relative flex items-center gap-3 rounded-xl overflow-hidden group cursor-pointer"
                        >
                            <span
                                className="
                                    absolute left-0 top-0 h-full w-12 
                                    bg-gradient-to-r from-[#f2cc6a] via-[#f2cc6a] to-white/90
                                    rounded-xl
                                    transition-all duration-300 ease-out
                                    group-hover:w-full
                                "
                            />
                            <a
                                href="mailto:#"
                                className="relative flex items-center gap-3 z-10 text-white transition-colors group-hover:text-white/90"
                            >
                                <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-xl">
                                    <MailIcon size={30} color="white" />
                                </div>
                                <span></span>
                            </a>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.03, translateY: -6 }}
                            className="w-70 relative flex items-center gap-3 rounded-xl overflow-hidden group cursor-pointer"
                        >
                            <span
                                className="
                                    absolute left-0 top-0 h-full w-12 
                                    bg-gradient-to-r from-[#f2cc6a] via-[#f2cc6a] to-white/90
                                    rounded-xl
                                    transition-all duration-300 ease-out
                                    group-hover:w-full
                                "
                            />
                            <a
                                href="tel:contact@monportfolio.fr"
                                className="relative flex items-center gap-3 z-10 text-white transition-colors group-hover:text-white/90"
                            >
                                <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-xl">
                                    <PhoneIcon size={30} color="white" />
                                </div>
                                <span>+237 673 846 813 </span>
                            </a>
                        </motion.div>
          </div>
        </div>

      </div>
    </div>
  )
}
