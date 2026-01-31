import { Linkedin, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-auto">
      <div className="py-6 text-center bg-gradient-to-r from-black/80 via-black to-black/80 ">
        
        {/* Réseaux sociaux */}
        <div className="flex justify-center gap-6 mb-3">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition-all duration-300 hover:scale-125 hover:opacity-90"
          >
            <Linkedin size={28} strokeWidth={1.8} color="white"/>
          </a>

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition-all duration-300 hover:scale-125 hover:opacity-90"
          >
            <Facebook size={28} strokeWidth={1.8} color="white" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xm opacity-95 text-white">
          © {new Date().getFullYear()} Olinga Njoya Jean Pascal — Tous droits réservés.
        </p>
      </div>
    </footer>
    
  );
};

export default Footer;

