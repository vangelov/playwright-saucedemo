import { CheckoutPersonalInfo, CartList, CheckoutOverview } from './components';
import { test } from './fixtures';

test.beforeEach(async ({ navigation }) => {
  await navigation.openCheckoutPersonalInfo();
});

test('should validate we get an error if we don not provide all personal information', async ({ page }) => {
  const checkoutPersonalInfo = CheckoutPersonalInfo(page);
  await checkoutPersonalInfo.continueCheckout();
  await checkoutPersonalInfo.form.expect().toContainErrorText('Error: First Name is required');
});

test('should validate that we can cancel the first checkout', async ({ page }) => {
  const checkoutPersonalInfo = CheckoutPersonalInfo(page);
  await checkoutPersonalInfo.cancelCheckout();
  await CartList(page).expect().toBeVisible();
}); 
 
test('should be able to continue the checkout', async ({ page }) => {
  const checkoutPersonalInfo = CheckoutPersonalInfo(page);
  await checkoutPersonalInfo.form.setValues({
    'First name': 'Vladimir',
    'Last name': 'Angelov',
    'ZIP/Postal Code': '1000'
  })
  await checkoutPersonalInfo.continueCheckout();
  await CheckoutOverview(page).expect().toBeVisible();
});
 

  
