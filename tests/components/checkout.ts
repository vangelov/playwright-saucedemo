

import { Page, expect, Locator } from '@playwright/test';
import { Form } from './forms';

export function CheckoutPersonalInfo(page: Page) {
  const self = page.locator('.checkout_info_container');

  const form = Form(self);
  const continueButton = self.getByRole('button', { name: 'Continue '});
  const cancelButton = self.getByRole('button', { name: 'Cancel '});

  const continueCheckout = () => continueButton.click();
  const cancelCheckout = () => cancelButton.click();

  return {
    form,
    continueCheckout,
    cancelCheckout,
    expect: () => expect(self)
  };
} 

// 

export function CheckoutOverview(page: Page) {
  const self = page.locator('.checkout_summary_container');

  const finishButton = self.getByRole('button', { name: 'Finish'});
  const cancelButton = self.getByRole('button', { name: 'Cancel'});

  const finishCheckout = () => finishButton.click();
  const cancelCheckout = () => cancelButton.click();

  return {
    finishCheckout,
    cancelCheckout,
    expect: () => expect(self)
  };
} 

// 

export function CheckoutComplete(page: Page) {
  const self = page.locator('.checkout_complete_container');

  const backHomeButton = self.getByRole('button', { name: 'Back Home'});

  const backHome = () => backHomeButton.click();

  return {
    backHome,
    expect: () => expect(self)
  };
} 
