import { Page } from '@playwright/test';
 
export function createNavigation(page: Page) {
  
  const openInventoryList = () => page.goto('/inventory.html');

  const openInventoryDetails = (id: string) => page.goto(`inventory-item.html?id=${id}`);
  
  const openCartDetals = () => page.goto('/cart.html');

  const openCheckoutPersonalInfo = () => page.goto('/checkout-step-one.html');
   
  const openCheckoutOverview = () => page.goto('/checkout-step-two.html');

  const openCheckoutComplete = () => page.goto('/checkout-complete.html');

  return {
    openInventoryList,
    openInventoryDetails,
    openCartDetals,
    openCheckoutPersonalInfo,
    openCheckoutOverview,
    openCheckoutComplete
  }; 
}

export type Navigation = ReturnType<typeof createNavigation>;

