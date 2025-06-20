// src/stores.js
import { writable } from 'svelte/store';

// Store para las cartas filtradas
export const cartasFiltradas = writable([]);

// Store para el carrito (compartido con React)
//export const carrito = writable([]);