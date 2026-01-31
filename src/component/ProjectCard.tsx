import { motion } from "framer-motion";

interface Props {
    title: string;
    category: string;
    image: string;
    description: string;
    tags: string[];
}

const ProjectCard = ({
    title,
    category,
    image,
    description,
    tags,
}: Props) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative rounded-2xl overflow-hidden group bg-black"
        >
            {/* IMAGE */}
            <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover opacity-80"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90" />

            {/* CONTENT */}
            <div className="relative p-6 h-full flex flex-col justify-between">
                <div>
                    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full bg-cyan-400/20 text-cyan-300">
                        {category}
                    </span>

                    <h3 className="text-xl font-bold text-white mb-2">
                        {title}
                    </h3>

                    <p className="text-sm text-white/70">
                        {description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-6">
                    {tags.map((tag, i) => (
                        <span
                            key={i}
                            className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/70"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* BUTTON */}
                <button className="absolute right-6 top-6 opacity-0 group-hover:opacity-100 transition">
                    <span className="px-4 py-2 text-xs rounded-full bg-white text-black font-medium">
                        Détails sur le projet
                    </span>
                </button>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
