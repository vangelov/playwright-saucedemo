import { Page } from '@playwright/test';

export function createLocalStorage(page: Page) {
  
  const setItem = (key: string, value: string) => {
    return page.evaluate(
      ({ key, value }) => localStorage.setItem(key, value), 
      { key, value }
    );
  };

  const getItem = (key: string,) => {
    return page.evaluate(
      (key) => localStorage.getItem(key),
      key 
    );
  };

  return {
    setItem,
    getItem
  };
}

export type LocalStorage = ReturnType<typeof createLocalStorage>;