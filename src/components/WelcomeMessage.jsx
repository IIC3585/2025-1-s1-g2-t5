import React from "react";
import { motion } from "framer-motion";

const WelcomeMessage = () => (
  <div className="flex flex-col items-center">
    <div className="flex flex-col items-center leading-tight">
      <span
  style={{
    fontFamily: "'Fredoka', Arial, sans-serif"
  }}
  className="text-8xl font-extrabold text-center text-white
    [text-shadow:2px_2px_0_rgb(220,38,38),-2px_2px_0_rgb(220,38,38),2px_-2px_0_rgb(220,38,38),-2px_-2px_0_rgb(220,38,38)]"
>
  ¡Compra
</span>
      <span
        className="
          text-3xl font-extrabold text-center text-white
          [text-shadow:2px_2px_0_rgb(220,38,38),-2px_2px_0_rgb(220,38,38),2px_-2px_0_rgb(220,38,38),-2px_-2px_0_rgb(220,38,38)]
        "
      >
        todos los
      </span>
    </div>
    <div className="relative flex justify-center">
      <motion.img
        src="/logo.png"
        alt="Logo Pokédex"
        className="w-96 drop-shadow-lg"
        draggable={false}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />
    </div>
    <p className="text-center text-xl text-gray-700 max-w-xl">
      Explora la Pokédex interactiva, escucha los sonidos de tus Pokémon favoritos y descubre sus estadísticas.
    </p>
  </div>
);

export default WelcomeMessage;
