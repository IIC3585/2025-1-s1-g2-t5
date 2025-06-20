import { defineCollection, z } from "astro:content";
import { fetchPokemonCards, } from "./fetchPokemonManager";


const pokemonCards = defineCollection({
    loader: fetchPokemonCards,
    schema: z.object({
        id: z.string(),
        name: z.string(),
        image: z.string(),
        rarity: z.string(),
        variants: z.object({
            firstEdition: z.boolean(),
            holo: z.boolean(),
            normal: z.boolean(),
            reverse: z.boolean(),
            wPromo: z.boolean(),
        }),
        types: z.array(z.string()).optional(),
        description: z.string().optional(),
    })
});

export const collections = { pokemonCards };