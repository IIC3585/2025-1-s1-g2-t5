<script>
  export let cartas = [];

  // Filtros
  let tipoSeleccionado = "Todos";
  let rarezaSeleccionada = "Todas";
  let busquedaNombre = "";

  // Tipos y rarezas dinámicos
  $: tiposUnicos = cartas
    ? Array.from(new Set(cartas.flatMap(c => c.data.types || [])))
    : [];
  $: rarezasUnicas = cartas
    ? Array.from(new Set(cartas.map(c => c.data.rarity).filter(Boolean)))
    : [];

  const resetearFiltros = () => {
    tipoSeleccionado = "Todos";
    rarezaSeleccionada = "Todas";
    busquedaNombre = "";
  };

  // Array filtrado
  $: cartasFiltradas = cartas.filter(c => {
    const okTipo =
      tipoSeleccionado === "Todos" ||
      (c.data.types && c.data.types.includes(tipoSeleccionado));
    const okRareza =
      rarezaSeleccionada === "Todas" || c.data.rarity === rarezaSeleccionada;
    const okNombre =
      !busquedaNombre ||
      c.data.name.toLowerCase().includes(busquedaNombre.toLowerCase());
    return okTipo && okRareza && okNombre;
  });

  // Paginación
  let currentPage = 1;
  const itemsPerPage = 21;

  $: totalPages = Math.ceil(cartasFiltradas.length / itemsPerPage);
  $: cartasPaginadas = cartasFiltradas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page cuando cambian filtros
  $: if (tipoSeleccionado || rarezaSeleccionada || busquedaNombre) {
    currentPage = 1;
  }

  const goToPage = page => {
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
    }
  };
</script>

<style>
  /* Empuja el contenido para dejar espacio al sidebar */
  .with-sidebar {
    margin-left: 16rem;
  }
</style>

<div class="flex min-h-screen">
  <!-- SIDEBAR FILTROS -->
  <aside
    class="fixed left-0 top-1/2 transform -translate-y-1/2
           w-64 bg-white/80 backdrop-blur-lg p-4 overflow-y-auto
           shadow-lg rounded-tr-2xl rounded-br-2xl space-y-6"
  >
    <!-- Buscador -->
    <div class="relative">
      <input
        type="text"
        bind:value={busquedaNombre}
        placeholder="🔍 Busca tu Pokémon..."
        class="w-full pl-14 pr-4 py-3 rounded-full border-2 border-gray-300
               focus:border-yellow-400 transition duration-200 outline-none shadow-sm"
      />
      <img
        src="pokeball.png"
        alt="Pokéball"
        class="absolute left-4 top-1/2 -translate-y-1/2 h-8 w-auto opacity-70 animate-bounce"
      />
    </div>

    <!-- Filtro TIPO -->
    <div>
      <h4 class="font-semibold mb-2">Tipo</h4>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <button
          on:click={() => (tipoSeleccionado = "Todos")}
          class="text-center text-xs font-semibold py-1 px-2 rounded-full
                 transition hover:scale-105
                 {tipoSeleccionado === 'Todos'
                   ? 'bg-yellow-400 text-white ring-2 ring-yellow-500'
                   : 'bg-gray-100 text-gray-700'}"
        >
          Todos
        </button>
        {#each tiposUnicos as tipo}
          <button
            on:click={() => (tipoSeleccionado = tipo)}
            class="text-center text-xs font-semibold py-1 px-2 rounded-full
                   transition hover:scale-105
                   {tipoSeleccionado === tipo
                     ? 'bg-yellow-400 text-white ring-2 ring-yellow-500'
                     : 'bg-gray-100 text-gray-700'}"
          >
            {tipo}
          </button>
        {/each}
      </div>
    </div>

    <!-- Filtro RAREZA -->
    <div>
      <h4 class="font-semibold mb-2">Rareza</h4>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <button
          on:click={() => (rarezaSeleccionada = "Todas")}
          class="text-center text-xs font-semibold py-1 px-2 rounded-full
                 transition hover:scale-105
                 {rarezaSeleccionada === 'Todas'
                   ? 'bg-pink-500 text-white ring-2 ring-pink-600'
                   : 'bg-gray-100 text-gray-700'}"
        >
          Todas
        </button>
        {#each rarezasUnicas as rareza}
          <button
            on:click={() => (rarezaSeleccionada = rareza)}
            class="text-center text-xs font-semibold py-1 px-2 rounded-full
                   transition hover:scale-105
                   {rarezaSeleccionada === rareza
                     ? 'bg-pink-500 text-white ring-2 ring-pink-600'
                     : 'bg-gray-100 text-gray-700'}"
          >
            {rareza}
          </button>
        {/each}
      </div>
    </div>

    <!-- Botón Reset -->
    <button
      on:click={resetearFiltros}
      class="w-full py-2 font-semibold rounded-full bg-red-500 text-white
             hover:bg-red-600 transition-colors duration-200"
    >
      Reiniciar
    </button>
  </aside>

  <!-- CONTENIDO Y PAGINACIÓN -->
  <div class="with-sidebar flex flex-col flex-1">
    <!-- Grid de cartas -->
    <main class="p-6 flex flex-wrap items-start gap-4 justify-start">
      {#each cartasPaginadas as carta (carta.id)}
        <a
          href={`/cards/${carta.id}`}
          class="self-start flex-shrink-0 w-40 flex flex-col items-center
                 bg-gradient-to-b from-yellow-50 via-white to-yellow-50
                 rounded-2xl p-4 shadow-lg transition hover:scale-105"
        >
          <div class="w-full h-32 overflow-hidden rounded-lg border-2 border-yellow-300 mb-3">
            <img
              src={carta.data.image}
              alt={carta.data.name}
              class="w-full h-full object-cover"
            />
          </div>
          <h3 class="text-lg font-extrabold text-center group-hover:text-yellow-600">
            {carta.data.name}
          </h3>
          <p class="text-center text-gray-600">
            ${carta.data.price.toLocaleString()} CLP
          </p>
          {#if carta.data.types}
            <div class="mt-2 flex flex-wrap justify-center gap-1">
              {#each carta.data.types as tipo}
                <span class="px-2 py-0.5 text-[10px] font-medium rounded-full bg-gray-200 text-gray-700">
                  {tipo}
                </span>
              {/each}
            </div>
          {/if}
        </a>
      {/each}
    </main>

    <!-- Paginación -->
    <nav class="px-6 py-4 flex justify-center items-center gap-2">
      <button
        on:click={() => goToPage(currentPage - 1)}
        class="px-3 py-1 rounded-full text-sm font-semibold
               bg-gray-200 hover:bg-gray-300 transition disabled:opacity-40"
        disabled={currentPage === 1}
      >
        ← Anterior
      </button>

      {#each Array(totalPages) as _, i}
        <button
          on:click={() => goToPage(i + 1)}
          class="w-8 h-8 rounded-full text-sm font-semibold
                 flex items-center justify-center transition
                 {currentPage === i + 1
                   ? 'bg-yellow-400 text-white ring-2 ring-yellow-600'
                   : 'bg-gray-100 text-gray-800 hover:bg-gray-300'}"
        >
          {i + 1}
        </button>
      {/each}

      <button
        on:click={() => goToPage(currentPage + 1)}
        class="px-3 py-1 rounded-full text-sm font-semibold
               bg-gray-200 hover:bg-gray-300 transition disabled:opacity-40"
        disabled={currentPage === totalPages}
      >
        Siguiente →
      </button>
    </nav>
  </div>
</div>
