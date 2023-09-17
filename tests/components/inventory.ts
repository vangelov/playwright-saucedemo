import { Page, expect, Locator } from '@playwright/test';

type InventoryItemOptions = {
  index?: number;
  name?: string;
};

export function InventoryItem(page: Page, parent: Locator, { index, name }: InventoryItemOptions = {}) {
  let self = parent.locator('.inventory_item');
  if (name) self = self.filter({ has: page.locator(`.inventory_item_name:text("${name}")`) })
  if (index !== undefined) self = self.nth(index);

  const nameElement = self.locator('.inventory_item_name');
  const addToCartButton = self.getByRole('button', { name: 'Add to cart' });
  const removeButton = self.getByRole('button', { name: 'Remove' });

  const count = self.count;
  const openDetails = () => nameElement.click();
  const addToCart = () => addToCartButton.click();
  const removeFromCart = () => removeButton.click();

  return { 
    count,
    openDetails,
    addToCart,
    removeFromCart,
    expect: () => ({
      ...expect(self),
      toBeInCart: (inCart = true) => expect(removeButton).toBeVisible({ visible: inCart })
    })
  };
}

//

export function InventoryList(page: Page) {
  const self = page.locator('.inventory_list');

  const items = (options?: InventoryItemOptions) => InventoryItem(page, self, options);
  const itemAt = (index: number) => InventoryItem(page, self, { index });

  return {
    expect: () => expect(self),
    items,
    itemAt
  };
}
 
// 

export function InventoryDetails(page: Page) {
  const self = page.locator('.inventory_item_container');
  const addToCartButton = page.getByRole('button', { name: 'Add to cart' });
  const removeButton = page.getByRole('button', { name: 'Remove' });

  const addToCart = () => addToCartButton.click();
  const removeFromCart = () => removeButton.click();

  return {
    addToCart,
    removeFromCart,
    expect: () => ({
      ...expect(self),
      toBeInCart: (inCart = true) => expect(removeButton).toBeVisible({ visible: inCart })
    })
  };
}

