const BASE_URL = "https://api.tcgdex.net/v2/es/cards/"
import lodash from "lodash";
const { pick } = lodash;

export const cardSchema = {
    id: String,
    name: String,
    image: String,
    rarity: String,
    variants: {
        firstEdition: Boolean,
        holo: Boolean,
        normal: Boolean,
        reverse: Boolean,
        wPromo: Boolean,
    },
    types: Array,
    description: String,
    price: Number,
};
    

export async function fetchPokemonCards() {
    const pokemonCards = await fetch(`${BASE_URL}`)
        .then((response) => response.json())
        .catch((error) => {
            console.error("Error fetching Pokémon cards:", error);
            return [];
        });
    
    const cardsToFetch = pokemonCards.slice(0, 100);
    
    const detailCards = await Promise.all(
        cardsToFetch.map(async (card: any) => {
            try {
                const resCarta = await fetch(`${BASE_URL}${card.id}`);
                const carta = await resCarta.json();
                if (!carta.image) return null;
                carta.image += "/high.png";
                carta.price = getRandomPrice(10000, 100000);
                return pick(carta, Object.keys(cardSchema));
            } catch (error) {
                console.error(`Error fetching card ${card.id}:`, error);
                return null;
            }
        })
    );

    return detailCards.filter(Boolean);
}


const getRandomPrice = (min: number, max: number) => {
    return Number(Math.random().toFixed(2)) * (max - min) + min;
}