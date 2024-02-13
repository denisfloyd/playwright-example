import {test, expect, type Page} from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('/');
});

test.describe('Sign Up flux', () => {
  test('should load explanation step and go to sign in step', async ({page}) => {
    expect(page.getByText('By continuing you accept our Terms of Service')).toBeVisible();
    expect(page.getByText('Step 1 / 3')).toBeVisible();

    await page.getByRole('button', {name: /Continue/i}).click();

    await expect(page.getByText("Let's set up your account")).toBeVisible();
    await expect(page.getByText('Step 2 / 3')).toBeVisible();
    const [step1Indicator, step2Indicator] = await Promise.all([
      page.getByRole('listitem').first(),
      page.getByRole('listitem').nth(1),
    ]);
    await expect(step1Indicator).toHaveClass(/bg-purple-600/i);
    await expect(step2Indicator).toHaveClass(/bg-purple-600/i);
    await expect(step2Indicator).toHaveClass(/ripple/i);
  });

  test('should fill sign in form to a new user to go to confirmation email step', async ({
    page,
  }) => {
    await page.getByRole('button', {name: /Continue/i}).click();

    await fillSignInFields(page);

    const buttonConfirm = page.getByRole('button', {name: /Continue/i});
    expect(await buttonConfirm.isDisabled()).toBeFalsy();

    await buttonConfirm.click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Confirm your email')).toBeVisible();
  });

  test('should not allow user to proceed sign in with invalid fields', async ({page}) => {
    await page.getByRole('button', {name: /Continue/i}).click();

    await fillSignInFields(page, {
      firstName: '',
      lastName: '',
      email: 'test',
      password: 'secret',
    });

    const buttonConfirm = page.getByRole('button', {name: /Continue/i});
    expect(await buttonConfirm.isDisabled()).toBeTruthy();
  });

  test('should finish flux when user do email confirmation on last step', async ({page}) => {
    await page.getByRole('button', {name: /Continue/i}).click();

    await fillSignInFields(page);

    const buttonConfirm = page.getByRole('button', {name: /Continue/i});
    await buttonConfirm.click();

    await page.getByTestId('verification-code').fill('john.doe@email.com');
    await page.getByRole('button', {name: 'Confirm'}).click();

    await expect(page.getByText('Congratulations! Your Account is Ready')).toBeVisible();
    page.on('dialog', async dialog => {
      expect(dialog.type()).toContain('alert');
      expect(dialog.message()).toContain('You reached the end');

      await dialog.accept();
    });
    await page.getByRole('button', {name: 'Get Started'}).click();
  });
});

type SignInFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

async function fillSignInFields(
  page: Page,
  {firstName, lastName, email, password}: SignInFormData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    password: 'secret',
  }
) {
  const [firstNameInput, emailInput, lastNameInput, passwordInput] = [
    page.getByLabel('First Name'),
    page.getByLabel('Email'),
    page.getByLabel('Last Name'),
    page.getByLabel('Password'),
  ];
  await firstNameInput.fill(firstName);
  await emailInput.fill(email);
  await lastNameInput.fill(lastName);
  await passwordInput.fill(password);
}
