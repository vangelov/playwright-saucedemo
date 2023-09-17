
import { Locator, Page, expect } from '@playwright/test';

type FormValues = {
  [placeholder: string]: string;
}; 

export function Form(parent: Locator) {
  const self = parent.locator('form');
  const error = self.getByTestId('error');

  const setValues = async (values: FormValues) => {
    for (const placeholder in values) {
      const input = self.getByPlaceholder(placeholder);
      const value = values[placeholder];
      await input.type(value);
    }
  }

  return {
    setValues,
    expect: () => ({
      ...expect(self),
      toContainErrorText: (text: string) => expect(error).toContainText(text)
    })
  };
}

//

export function LoginForm(page: Page) {
  const self = page.locator('.login-box');
  
  const form = Form(self); 
  const loginButton = self.getByRole('button', { name: 'Login' });

  const login = async (username: string, password: string) => {
    await form.setValues({ 'Username': username, 'Password': password });
    await loginButton.click();
  } 

  return {
    login,
    ...form
  };
}