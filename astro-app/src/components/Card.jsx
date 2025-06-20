
console.log("Card component loaded");

const Card = ({ card }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {card.data.image && (
        <img
          src={card.data.image}
          alt={card.data.name}
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{card.data.name}</h2>
        <p className="text-gray-700">{card.data.description}</p>
        {card.data.types && card.data.types.length > 0 && (
          <div className="mt-2">
            <h3 className="text-sm font-medium text-gray-600">Tipos:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {card.data.types.map((type, index) => (
                <li key={index}>{type}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;