import { motion } from "framer-motion";

interface Props {
    title: string;
    category: string;
    image: string;
    description: string;
    tags: string[];
}

const HexagonCard = ({ image, title, description, tags }: Props) => {
  return (
    <div className="hex">
      <div
        className="hex-inner"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="hex-overlay">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm opacity-80">{description}</p>

          <div className="flex flex-wrap gap-2 mt-2 text-xs">
            {tags.map((t, i) => (
              <span key={i} className="px-2 py-0.5 bg-white/20 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HexagonCard;
