import React, { useRef, useState, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
const pokemons = [
    {
        name: 'Venusaur',
        sprite: 'https://img.pokemondb.net/sprites/black-white/normal/venusaur-f.png',
        sound: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/3.ogg',
    },
    {
        name: 'Charizard',
        sprite: 'https://img.pokemondb.net/sprites/black-white/normal/charizard.png',
        sound: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/6.ogg',
    },
    {
        name: 'Blastoise',
        sprite: 'https://img.pokemondb.net/sprites/black-white/normal/blastoise.png',
        sound: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/9.ogg',
    },
    {
        name: 'Alakazam',
        sprite: 'https://img.pokemondb.net/sprites/black-white/normal/alakazam-f.png',
        sound: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/65.ogg',
    },
    {
        name: 'Pikachu',
        sprite: 'https://img.pokemondb.net/sprites/black-white/normal/pikachu-f.png',
        sound: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/25.ogg',
    },
    {
        name: 'Gengar',
        sprite: 'https://img.pokemondb.net/sprites/black-white/normal/gengar.png',
        sound: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/94.ogg',
    },
    {
        name: 'Snorlax',
        sprite: 'https://img.pokemondb.net/sprites/black-white/normal/snorlax.png',
        sound: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/143.ogg',
    },
    {
        name: 'Mewtwo',
        sprite: 'https://img.pokemondb.net/sprites/black-white/normal/mewtwo.png',
        sound: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/150.ogg',
    },
];

const playSound = (sound) => {
  const audio = new Audio(sound);
  audio.play();
};


const SpritesBar = ({ direction = 'left' }) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [spriteWidth, setSpriteWidth] = useState(0);
  const containerRef = useRef(null);
  const spriteRef = useRef(null);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (containerRef.current && spriteRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setSpriteWidth(spriteRef.current.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const minSprites = spriteWidth > 0 ? Math.ceil((containerWidth * 2) / spriteWidth) : pokemons.length * 2;
  const spritesToShow = Array(minSprites)
    .fill(null)
    .map((_, i) => pokemons[i % pokemons.length]);

  const fullLoopWidth = spriteWidth * (spritesToShow.length / 2 || 1);

  const animateX = direction === 'left'
    ? [0, -fullLoopWidth]
    : [-fullLoopWidth, 0];

  const transition = {
    repeat: Infinity,
    repeatType: 'loop',
    ease: 'linear',
    duration: 30,
  };

  return (
    <div
      className="overflow-hidden w-full"
      ref={containerRef}
      style={{ whiteSpace: 'nowrap' }}
    >
      <motion.div
        className="flex flex-row gap-6 whitespace-nowrap"
        animate={{ x: animateX }}
        transition={transition}
        style={{ willChange: 'transform' }}
      >
        {spritesToShow.map((pokemon, idx) =>
          <img
            ref={idx === 0 ? spriteRef : null}
            key={idx}
            className="
              w-28 h-auto cursor-pointer select-none
              transition-transform transition-[filter] duration-300
              hover:scale-125 hover:brightness-110
              ease-in-out
            "
            src={pokemon.sprite}
            alt={pokemon.name}
            draggable={false}
            onClick={() => playSound(pokemon.sound)}
            style={{ display: 'inline-block' }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default SpritesBar;