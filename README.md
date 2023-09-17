
# playwright-saucedemo
Playwright Tests for the [Sauce Labs Sample App](https://www.saucedemo.com/)

## Introduction

As an excercise for learning Playwright I've re-implementated the [original tests](https://github.com/saucelabs/sample-app-web/tree/main/test/e2e/specs) for the Sauce Labs Sample App. 
I've used the same component-based approach as with the [Playright TodoMVC demo](https://github.com/vangelov/playwright-component-demo/tree/master). 
This example bit more complicated as it makes use of fixtures and different projects to handle authentication.

## Projects Organization

There are several projects:
- Login tests for each browser.
- One project that just runs the authecation.
- All other tests for each browser depend the the project for authentication.

## How to Run

```npx playwright test```
