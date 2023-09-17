import { CheckoutComplete } from './components';
import { test } from './fixtures';

test.beforeEach(async ({ navigation }) => {
  await navigation.openCheckoutComplete();
});

test('should be able to test loading of checkout complete page', async ({ page }) => {
  await CheckoutComplete(page).expect().toBeVisible();
});


 
 
  
 