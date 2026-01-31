import { useState } from "react";
import HexagonCard from "../component/ProjectCard";
import { motion } from "framer-motion";
import Carousel from "../component/Carroussel"

const filters = [
  "All",
  "Branding",
  "Menu Design",
  "Event Design",
  "Cosmetics",
  "Sports",
];

const projects = {
  first: [
    {
      title: "Maeva Perfume",
      category: "Branding",
      image: "/projects/maeva.jpg",
      description: "Complete visual identity for an authentic perfume boutique.",
      tags: ["Logo", "Visuals", "Social media"],
    },
    {
      title: "Saveurs du Cameroun",
      category: "Menu Design",
      image: "/projects/saveurs.jpg",
      description: "Menu revitalization and communication strategy for an authentic restaurant.",
      tags: ["Menu", "Print", "Communication"],
    },
    {
      title: "Bijouterie 237",
      category: "Branding",
      image: "/projects/bijouterie.jpg",
      description: "Identity creation for a Cameroonian artisanal jewelry store.",
      tags: ["Logo", "Product visuals", "E-commerce"],
    },
    {
      title: "Maeva Perfume",
      category: "Branding",
      image: "/projects/maeva.jpg",
      description: "Complete visual identity for an authentic perfume boutique.",
      tags: ["Logo", "Visuals", "Social media"],
    },
    {
      title: "Maeva Perfume",
      category: "Branding",
      image: "/projects/maeva.jpg",
      description: "Complete visual identity for an authentic perfume boutique.",
      tags: ["Logo", "Visuals", "Social media"],
    },
  ],
  second: [
    {
      title: "Bijouterie 237",
      category: "Branding",
      image: "/projects/bijouterie.jpg",
      description: "Identity creation for a Cameroonian artisanal jewelry store.",
      tags: ["Logo", "Product visuals", "E-commerce"],
    },
    {
      title: "Bijouterie 237",
      category: "Branding",
      image: "/projects/bijouterie.jpg",
      description: "Identity creation for a Cameroonian artisanal jewelry store.",
      tags: ["Logo", "Product visuals", "E-commerce"],
    },
    {
      title: "Bijouterie 237",
      category: "Branding",
      image: "/projects/bijouterie.jpg",
      description: "Identity creation for a Cameroonian artisanal jewelry store.",
      tags: ["Logo", "Product visuals", "E-commerce"],
    }, {
      title: "Bijouterie 237",
      category: "Branding",
      image: "/projects/bijouterie.jpg",
      description: "Identity creation for a Cameroonian artisanal jewelry store.",
      tags: ["Logo", "Product visuals", "E-commerce"],
    },
  ],
};


const Projects = () => {
  const [active, setActive] = useState("All");

  const filterProjects = (list) => {
    if (active === "All") return list;
    return list.filter((p) => p.category === active);
  };
  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      {/* TITRE */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mx-auto mb-12 w-fit px-3 py-2 border border-[#f2cc6a]/60 rounded-full text-2xl font-bold text-center"
      >
        <div className="flex items-center gap-2">
          <span>Projets</span>
        </div>
      </motion.div>
      {/* FILTERS */}

      <div className="flex flex-wrap gap-1 justify-center mb-12">
        {filters.map((f) => (
          <button key={f} onClick={() => setActive(f)}>
            <motion.div
              whileHover={"2"}
              className={`px-4 py-1 rounded-full  text-sm font-medium
                            transition-all duration-300
                            ${active === f
                  ? "bg-gradient-to-r from-[#f2cc6a] to-white/90 text-black shadow-[0_0_15px_rgba(242,204,106,0.4)]"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
            >
              {f}
            </motion.div>
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="flex flex-wrap justify-center gap-x-3 ">
        {active === "All" && (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex flex-wrap justify-center gap-x-3"
          >
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-6">
              {filterProjects(projects.first).map((project, i) => (
                <HexagonCard key={`first-${i}`} {...project} />
              ))}
            </div>

            {/* ROW 2 */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-6 mt-[-40px]">
              {filterProjects(projects.second).map((project, i) => (
                <HexagonCard key={`second-${i}`} {...project} />
              ))}
            </div>
          </motion.div>)}
        {/* CARROUSEL APRÈS FILTRE */}
        {active !== "All" && (
          <motion.div
            key="carousel"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-full"
          >
            <Carousel />
          </motion.div>)}
      </div>
    </main>
  );
};

export default Projects;
