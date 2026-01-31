import { motion } from "framer-motion";

const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const buttonHover = { scale: 1.03 };

const Home = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* HERO */}
      <div className="flex justify-center items-center text-center">
        <motion.div
          initial="hidden"
          animate="show"
          variants={heroVariants}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          {/* TITRE */}
          <h2
            style={{ fontFamily: "SwirlyCanalope" }}
            className="text-5xl font-extrabold leading-tight mb-4"
          >
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#f2cc6a] to-white/90">
              Bienvenue
            </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#f2cc6a] to-white/90">
              Chez JP
            </span>
          </h2>

          {/* TEXTE */}
          <p className="text-lg text-white/85 mb-8">
            Créateur d'identité visuel
          </p>

          {/* IMAGE */}
          <motion.div
            initial={{
              boxShadow: "0 25px 60px rgba(242, 204, 106, 0.8)",
            }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden flex items-center justify-center mb-8"
          >
            <img
              src="/aaron.JPG"
              alt="Portrait"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* BOUTONS */}
          <div className="flex justify-center gap-4 flex-wrap">
            <button onClick={() => scrollToSection("Projets")}>
              <motion.div
                whileHover={buttonHover}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#f2cc6a] to-white/90 font-semibold text-white shadow-lg"
              >
                Voir mes projets
              </motion.div>
            </button>

            <button onClick={() => scrollToSection("Contact")}>
              <motion.div
                whileHover={buttonHover}
                className="px-6 py-3 rounded-full border border-white/30 text-white/85"
              >
                Me contacter
              </motion.div>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
