<script>
  export let cartas;
  let tipoSeleccionado = "Todos";
  let rarezaSeleccionada = "Todas";

  // Tipos únicos dinámicos
  $: tiposUnicos = cartas
    ? Array.from(new Set(cartas.flatMap(carta => carta.data.types || [])))
    : [];

  // Rarezas únicas dinámicas (opcional)
  $: rarezasUnicas = cartas
    ? Array.from(new Set(cartas.map(carta => carta.data.rarity).filter(Boolean)))
    : [];

  // Filtra por tipo Y rareza
  $: cartasFiltradas = cartas.filter(carta => {
    const cumpleTipo = tipoSeleccionado === "Todos" || 
                      (carta.data.types && carta.data.types.includes(tipoSeleccionado));
    const cumpleRareza = rarezaSeleccionada === "Todas" || 
                         carta.data.rarity === rarezaSeleccionada;
    return cumpleTipo && cumpleRareza;
  });
</script>

<div class="filtros">
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