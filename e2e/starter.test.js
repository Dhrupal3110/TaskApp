const { device, element, by } = require('detox');

describe('Navigation Flow Test', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });
  it('should allow entering email and password and trigger login action', async () => {
    // Check if the login screen is rendered
    await expect(element(by.id('login-screen'))).toBeVisible();

    // Type email and password
    await element(by.id('email-input')).typeText('test@example.com');
    await element(by.id('password-input')).typeText('password123');
    

    // Trigger login action
    await element(by.id('login-button')).tap();

    // Add your assertions for the expected behavior after the login action
    // For example, check if the app navigates to the next screen or displays a success message

    // For demonstration purposes, let's assert that a success message is displayed
    await expect(element(by.text('Login successful!'))).toBeVisible();
  });
  // it('should navigate from Home to Details screen', async () => {
  //   // Tap on the "Go to Details" button to navigate
  //   await element(by.id('goto-details')).tap();
  //   // Wait for the Details screen to appear
  //   await expect(element(by.text('Details Screen'))).toBeVisible();
  // });
  // it('should navigate from Details screen to Home screen', async () => {
  //   // Wait for the Details screen to appear
  //   await expect(element(by.text('Details Screen'))).toBeVisible();

  //   await element(by.id('goto-home')).tap();
  // });
  // it('should navigate from Home screen to Profile screen', async () => {
  //   await element(by.id('goto-profile')).tap();
  //   await expect(element(by.id('profile'))).toBeVisible();
  // });
});
