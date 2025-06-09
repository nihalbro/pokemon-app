import React, { useEffect, useState } from "react";

export default function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchPokemon() {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
      const data = await res.json();
      const promises = data.results.map(p => fetch(p.url).then(r => r.json()));
      const detailedPokemon = await Promise.all(promises);
      setAllPokemon(detailedPokemon);
      setFilteredPokemon(detailedPokemon);
    }
    fetchPokemon();
  }, []);

  useEffect(() => {
    const filtered = allPokemon.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPokemon(filtered);
  }, [search, allPokemon]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center animate-pulse">Pokémon Encyclopedia</h1>
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-md border p-2 rounded"
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredPokemon.map(pokemon => (
          <div
            key={pokemon.id}
            onClick={() => setSelectedPokemon(pokemon)}
            className="cursor-pointer border p-2 rounded shadow hover:shadow-lg transition"
          >
            <img
              src={pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-20 h-20 mx-auto"
            />
            <p className="capitalize text-center mt-2 font-medium">{pokemon.name}</p>
          </div>
        ))}
      </div>

      {selectedPokemon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => setSelectedPokemon(null)}
              className="absolute top-2 right-2 text-lg text-gray-500 hover:text-red-600"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4 capitalize text-center">{selectedPokemon.name}</h2>
            <img
              src={selectedPokemon.sprites.versions["generation-v"]["black-white"].animated.front_default || selectedPokemon.sprites.front_default}
              alt={selectedPokemon.name}
              className="mx-auto"
            />
            <div className="mt-4 space-y-2">
              <p><strong>Height:</strong> {selectedPokemon.height}</p>
              <p><strong>Weight:</strong> {selectedPokemon.weight}</p>
              <p><strong>Types:</strong> {selectedPokemon.types.map(t => t.type.name).join(", ")}</p>
              <p><strong>Abilities:</strong> {selectedPokemon.abilities.map(a => a.ability.name).join(", ")}</p>
              <p><strong>Stats:</strong></p>
              <ul className="list-disc list-inside">
                {selectedPokemon.stats.map(s => (
                  <li key={s.stat.name}>{s.stat.name}: {s.base_stat}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
