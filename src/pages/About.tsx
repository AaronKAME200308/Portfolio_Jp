import { motion } from "framer-motion";
import CircularProgress from "../component/CircleProgress";
import { Sparkle } from "lucide-react";

// SVG en composants React
import PowerPointIcon from "../../public/brand-microsoft-powerpoint-svgrepo-com.svg?react";
import CanvaIcon from "../../public/canva-svgrepo-com.svg?react";
import CapcutIcon from "../../public/capcut-svgrepo-com.svg?react";
import IllustratorIcon from "../../public/illustrator-svgrepo-com.svg?react";
import IndesignIcon from "../../public/indesign-svgrepo-com.svg?react";
import PhotoshopIcon from "../../public/photoshop-svgrepo-com.svg?react";

const logos = [
  { Icon: PowerPointIcon, percent: 70 },
  { Icon: CanvaIcon, percent: 90 },
  { Icon: CapcutIcon, percent: 85 },
  { Icon: IllustratorIcon, percent: 80 },
  { Icon: IndesignIcon, percent: 75 },
  { Icon: PhotoshopIcon, percent: 88 },
];

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      {/* TITRE */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mx-auto mb-12 w-fit px-3 py-2 border border-[#f2cc6a]/60 rounded-full text-2xl font-bold text-center"
      >
        <div className="flex items-center gap-2">
          <Sparkle className="w-5 h-5 text-[#f2cc6a]/60" />
          <span>Compétences</span>
        </div>
      </motion.div>

      {/* LOGOS + PROGRESS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 place-items-center">
        {logos.map(({ Icon, percent }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center gap-4"
          >
            {/* SVG INLINE */}
            <Icon
              className="
                w-16 h-16
                text-white/70
                hover:text-[#f2cc6a]
                transition
                hover:scale-110
                hover:drop-shadow-[0_0_12px_rgba(242,204,106,0.8)]
              "
            />

            {/* CERCLE */}
            <CircularProgress percentage={percent} size={90} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default About;
