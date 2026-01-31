import { useState } from "react";
import ProjectCard from "../component/ProjectCard";

const filters = [
    "All",
    "Branding",
    "Menu Design",
    "Event Design",
    "Cosmetics",
    "Sports",
];

const projects = [
    {
        title: "Maeva Perfume",
        category: "Branding",
        image: "/projects/maeva.jpg",
        description:
            "Complete visual identity for an authentic perfume boutique.",
        tags: ["Logo", "Visuals", "Social media"],
    },
    {
        title: "Saveurs du Cameroun",
        category: "Menu Design",
        image: "/projects/saveurs.jpg",
        description:
            "Menu revitalization and communication strategy for an authentic restaurant.",
        tags: ["Menu", "Print", "Communication"],
    },
    {
        title: "Bijouterie 237",
        category: "Branding",
        image: "/projects/bijouterie.jpg",
        description:
            "Identity creation for a Cameroonian artisanal jewelry store.",
        tags: ["Logo", "Product visuals", "E-commerce"],
    },
];

const Projects = () => {
    const [active, setActive] = useState("All");

    const filtered =
        active === "All"
            ? projects
            : projects.filter((p) => p.category === active);

    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            {/* FILTERS */}
            <div className="flex flex-wrap gap-3 justify-center mb-12">
                {filters.map((f) => (
                    <button
                        key={f}
                        onClick={() => setActive(f)}
                        className={`
                            px-6 py-2.5
                            rounded-full
                            text-sm font-medium
                            transition-all duration-300
                            ${active === f
                                ? "bg-gradient-to-r from-[#f2cc6a] to-white/90 text-black shadow-[0_0_15px_rgba(242,204,106,0.4)]"
                                : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                            }
                        `}
                    >
                        {f}
                    </button>

                ))}
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((project, i) => (
                    <ProjectCard key={i} {...project} />
                ))}
            </div>
        </section>
    );
};

export default Projects;
