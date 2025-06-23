import React, { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { addToCart } from "../utils/cartDB";

type CardProps = {
  card: {
    id: string;
    data: {
      name: string;
      price: number;
      image?: string;
      description?: string;
      types?: string[];
    };
  };
};

const Card: React.FC<CardProps> = ({ card }) => {
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAdd = async () => {
    await addToCart({
      id: card.id,
      name: card.data.name,
      price: card.data.price,
      image: card.data.image || "",
      quantity: 1,
    });

    setShowModal(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <>
      {showSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300">
          ¡Producto añadido al carro!
        </div>
      )}
      <div className="flex flex-col items-center max-w-sm sm:max-w-md mx-auto p-4 sm:p-6 bg-gradient-to-br from-yellow-100 via-white to-yellow-200 rounded-2xl shadow-2xl relative">
        {card.data.image && (
          <div className="overflow-hidden rounded-xl border-4 border-yellow-300 shadow-lg mb-4 sm:mb-6">
            <img
              src={card.data.image}
              alt={card.data.name}
              className="object-cover w-full h-auto block max-h-64 sm:max-h-80"
            />
          </div>
        )}
        <h2 className="text-2xl sm:text-4xl font-extrabold mb-2 sm:mb-4 text-center text-yellow-800 drop-shadow">
          {card.data.name}
        </h2>
        <h3 className="text-xl sm:text-3xl font-bold text-yellow-700 mb-2 sm:mb-4 text-center drop-shadow">
          Precio: <span className="text-yellow-900">${card.data.price} CLP</span>
        </h3>
        <p className="text-sm sm:text-base text-gray-800 mb-4 text-center italic">{card.data.description}</p>

        {Array.isArray(card.data.types) && card.data.types.length > 0 && (
          <div className="mt-2 w-full">
            <h3 className="text-sm sm:text-md font-semibold text-yellow-700 text-center mb-2">Tipos:</h3>
            <ul className="flex flex-wrap justify-center gap-2">
              {card.data.types.map((type, index) => (
                <li
                  key={index}
                  className="px-2 py-1 sm:px-3 sm:py-1 bg-yellow-300 text-yellow-900 rounded-full font-semibold shadow text-xs sm:text-sm"
                >
                  {type}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={() => setShowModal(true)}
          className="mt-6 sm:mt-8 px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-base sm:text-lg font-bold rounded-full shadow-lg hover:scale-105 hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200"
        >
          Añadir al carro
        </button>

      </div>

      <ConfirmModal
        isOpen={showModal}
        message={`¿Deseas añadir "${card.data.name}" al carro?`}
        onConfirm={handleAdd}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
};

export default Card;