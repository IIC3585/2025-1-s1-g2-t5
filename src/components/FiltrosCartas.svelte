<script>
  export let cartas;
  let tipoSeleccionado = "Todos";
  let rarezaSeleccionada = "Todas";
  let busquedaNombre = "";

  // Tipos únicos dinámicos
  $: tiposUnicos = cartas
    ? Array.from(new Set(cartas.flatMap(carta => carta.data.types || [])))
    : [];

  // Rarezas únicas dinámicas (opcional)
  $: rarezasUnicas = cartas
    ? Array.from(new Set(cartas.map(carta => carta.data.rarity).filter(Boolean)))
    : [];

    // Función para resetear filtros
  const resetearFiltros = () => {
    tipoSeleccionado = "Todos";
    rarezaSeleccionada = "Todas";
    busquedaNombre = "";
  };

  // Filtra por tipo Y rareza
  $: cartasFiltradas = cartas.filter(carta => {
    const cumpleTipo = tipoSeleccionado === "Todos" || 
                      (carta.data.types && carta.data.types.includes(tipoSeleccionado));
    const cumpleRareza = rarezaSeleccionada === "Todas" || 
                         carta.data.rarity === rarezaSeleccionada;
    const cumpleNombre = busquedaNombre === "" || 
                         carta.data.name.toLowerCase().includes(busquedaNombre.toLowerCase());
    return cumpleTipo && cumpleRareza && cumpleNombre;
  });
</script>

<div class="filtros">
   <!-- Input de búsqueda por nombre -->
  <input 
    type="text" 
    bind:value={busquedaNombre} 
    placeholder="Buscar por nombre..." 
    class="busqueda-input"
  />
  <!-- Filtro por tipo dinámico -->
  <select bind:value={tipoSeleccionado}>
    <option value="Todos">Todos los tipos</option>
    {#each tiposUnicos as tipo}
      <option value={tipo}>{tipo}</option>
    {/each}
  </select>

  <!-- Filtro por rareza dinámico -->
  <select bind:value={rarezaSeleccionada}>
    <option value="Todas">Todas las rarezas</option>
    {#each rarezasUnicas as rareza}
      <option value={rareza}>{rareza}</option>
    {/each}
  </select>

    <!-- Botón Reset -->
  <button on:click={resetearFiltros} class="reset-btn">
    Reiniciar filtros
  </button>
</div>

<div class="cartas-grid">
  {#each cartasFiltradas as carta}
    <div class="carta">
      <img src={carta.data.image} alt={carta.data.name} width="150" />
      <h3>{carta.data.name}</h3>
      <p>Rareza: {carta.data.rarity}</p>
      {#if carta.data.types}
        <p>Tipos: {carta.data.types.join(', ')}</p>
      {/if}
    </div>
  {/each}
</div>

<style>
  .filtros {
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
  }

  .busqueda-input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    flex-grow: 1;
  }


  .reset-btn {
    padding: 8px 12px;
    background: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s;
  }

  .reset-btn:hover {
    background: #d32f2f;
  }
  .cartas-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
  }
  .carta {
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 8px;
  }
</style>