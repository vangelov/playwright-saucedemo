import { Page, expect } from '@playwright/test';

export function Menu(page: Page) {
  const self = page.getByRole('navigation');

  const allItemsLink = self.getByText('All Items');
  const aboutLink = self.getByText('About');
  const logoutLink = self.getByText('Logout');
  const resetAppStateLink = self.getByText('Reset App State');

  const openAllItems = () => allItemsLink.click();
  const openAbout = () => aboutLink.click();
  const logout = () => logoutLink.click();
  const resetAppState = () => resetAppStateLink.click();

  return {
    openAllItems,
    openAbout,
    logout,
    resetAppState,
    expect: () => expect(self)
  };
}