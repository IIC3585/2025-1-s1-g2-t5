<script lang="ts">
  import { onMount } from 'svelte';
  import Header from './Header';
  import { getCartCount } from '../utils/cartDB';

  let cartCount = 0;

  onMount(async () => {
    cartCount = await getCartCount();
  });
</script>

<Header cartCount= />
