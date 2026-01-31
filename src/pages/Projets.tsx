import { useState } from "react";
import HexagonCard from "../component/ProjectCard";
import type { ProjectProps } from "../component/ProjectCard";
import { motion } from "framer-motion";
import Carousel from "../component/Carroussel"
import { PanelsTopLeft } from "lucide-react";

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
      title: "Conception Flyers",
      category: "Branding",
      image: "/face.jpeg",
      description: "",
      tags: ["Visuals" ,"Social media"],
    },
    {
      title: "Affiche Concert",
      category: "Menu Design",
      image: "/face1.jpeg",
      description: "",
      tags: ["Menu", "Print" ,"Social media"],
    },
    {
      title: "Identité Visuelle",
      category: "Branding",
      image: "/projects/bijouterie.jpg",
      description: "",
      tags: ["Logo", "Product visuals", "E-commerce"],
    },
    {
      title: "Miniature",
      category: "Branding",
      image: "/projects/maeva.jpg",
      description: "",
      tags: ["Logo", "Visuals", "Social media"],
    },
    {
      title: "Retouche Photo",
      category: "Branding",
      image: "/projects/maeva.jpg",
      description: "",
      tags: ["Logo", "Visuals", "Social media"],
    },
  ],
  second: [
    {
      title: "Packaging",
      category: "Branding",
      image: "/projects/bijouterie.jpg",
      description: "",
      tags: ["Logo", "Product visuals", "E-commerce"],
    },
    {
      title: "Campagne Aadémique",
      category: "Branding",
      image: "/projects/bijouterie.jpg",
      description: "",
      tags: ["Logo", "Product visuals", "E-commerce"],
    },
    {
      title: "Dépliant Professionnel",
      category: "Branding",
      image: "/projects/bijouterie.jpg",
      description: "",
      tags: ["Logo", "Product visuals", "E-commerce"],
    }, {
      title: "Présentation",
      category: "Branding",
      image: "/projects/bijouterie.jpg",
      description: "",
      tags: ["Logo", "Product visuals", "E-commerce"],
    },
  ],
};


const Projects = () => {
  const [active, setActive] = useState("All");
  

  const filterProjects = (list:ProjectProps[] ): ProjectProps[] => {
    if (active === "All") return list;
    return list.filter((p: { category: string; }) => p.category === active);
  };
  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      {/* TITRE */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mx-auto mb-12 w-fit px-3 py-2 border border-[#f2cc6a]/60 rounded-full text-2xl font-bold text-center bg-gradient-to-r from-black via-black/80 to-black/60"
      >
        <div className="flex items-center gap-2">
          <PanelsTopLeft className="w-5 h-5 text-[#f2cc6a]/90"/>
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
              {filterProjects(projects.first).map((project , i: number) => (
                <HexagonCard key={`first-${i}`} {...project} onSelect={(value) => setActive(value)}/>
              ))}
            </div>

            {/* ROW 2 */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-6 mt-[-40px]">
              {filterProjects(projects.second).map((project, i:number) => (
                <HexagonCard key={`second-${i}`} {...project} onSelect={(value) => setActive(value)}/>
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
            <Carousel active={active} />
          </motion.div>)}
      </div>
    </main>
  );
};

export default Projects;
