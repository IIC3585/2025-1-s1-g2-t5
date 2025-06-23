// utils/cartDB.ts
export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('CartDB', 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('cart')) {
        db.createObjectStore('cart', { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const addToCart = async (item: any) => {
  const db = await openDB();
  const tx = db.transaction('cart', 'readwrite');
  const store = tx.objectStore('cart');
  const existing = await new Promise<any>((resolve) => {
    const req = store.get(item.id);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve(undefined);
  });
  if (existing) {
    item.quantity = existing.quantity + (item.quantity || 1);
  } else {
    item.quantity = item.quantity || 1;
  }
  await store.put(item);
  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });

  // Notifica a la app que el carrito cambió
  window.dispatchEvent(new Event("cart-updated"));
};

export const getCartCount = async (): Promise<number> => {
  const db = await openDB();
  const tx = db.transaction('cart', 'readonly');
  const store = tx.objectStore('cart');
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result.length);
    request.onerror = () => reject(request.error);
  });
};

export const getCartItems = async (): Promise<any[]> => {
  const db = await openDB();
  const tx = db.transaction('cart', 'readonly');
  const store = tx.objectStore('cart');
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const removeFromCart = async (id: string) => {
  const db = await openDB();
  const tx = db.transaction('cart', 'readwrite');
  const store = tx.objectStore('cart');
  await store.delete(id);
  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
};

export const clearCart = async () => {
  const db = await openDB();
  const tx = db.transaction('cart', 'readwrite');
  const store = tx.objectStore('cart');
  await store.clear();
  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
};
