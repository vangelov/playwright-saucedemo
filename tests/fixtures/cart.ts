import { LocalStorage } from './local-storage';

export function createCart(localStorage: LocalStorage) {
  
  const setInventoryIds = async (ids: number[]) => {
    const data = JSON.stringify(ids);
    await localStorage.setItem('cart-contents', data);
  };
 
  return {
    setInventoryIds
  };
}

export type Cart = ReturnType<typeof createCart>;