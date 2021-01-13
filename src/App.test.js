import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
// import { shallow } from "@testing-library/react";
import Enzyme, { shallow } from "enzyme";
import React from "react";

// npm install --save-dev @wojtekmaj/enzyme-adapter-react-17

import App from "./App";

// set up enzyme's react adapter
Enzyme.configure({ adapter: new Adapter() });

// JS DOC ---- Used to coming back to the app months later!
/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */

const setup = () => shallow(<App />);
const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

test("renders without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");

  // if the ASSERTION OR the expect method to find the appComponent to exist, then PASS
  expect(appComponent.length).toBe(1);
});
test("renders button", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});

test("renders counter display", () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});

test("counter starts at 0", () => {
  const wrapper = setup();
  // test method returns a string
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("0");
});

describe("Increment", () => {
  test("renders increment button", () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, "increment-button");
    expect(button.length).toBe(1);
  });

  test("counter increments when button is clicked", () => {
    const wrapper = setup();
    // find the button
    const button = findByTestAttr(wrapper, "increment-button");
    // click the button
    button.simulate("click");
    // find the display and test that the number has been incremeneted
    const count = findByTestAttr(wrapper, "count").text();
    expect(count).toBe("1");
  });
});

describe("Decrement", () => {
  test("renders decrement button", () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, "decrement-button");
    expect(button.length).toBe(1);
  });

  test("clicking decrement button decrements counter display when state is greater than 0", () => {
    const wrapper = setup();

    // simulating a button click to make counter > 0
    const incButton = findByTestAttr(wrapper, "increment-button");
    incButton.simulate("click");

    // simulating a DECREMENT to make counter back to 0
    const decButton = findByTestAttr(wrapper, "decrement-button");
    decButton.simulate("click");

    const count = findByTestAttr(wrapper, "count").text();
    expect(count).toBe("0");
  });
});

describe("Error when counter goes below 0", () => {
  test("error does not show when not needed", () => {
    const wrapper = setup();
    // creating a reference to the data-test="error-message"
    const errorMessage = findByTestAttr(wrapper, "error-message");
    const errorHasHiddenClass = errorMessage.hasClass("hidden");
    expect(errorHasHiddenClass).toBe(true);
  });
});

describe("counter is 0 and decrement is clicked", () => {
  // using describe so you can use beforeEach for shared setup
  // initializing wrapper variable to be scoped in and out of the beforeEach method
  let wrapper;

  beforeEach(() => {
    wrapper = setup();

    const button = findByTestAttr(wrapper, "decrement-button");
    button.simulate("click");
  });

  test("error shows", () => {
    const errorMessage = findByTestAttr(wrapper, "error-message");
    const errorHasHiddenClass = errorMessage.hasClass("hidden");
    expect(errorHasHiddenClass).toBe(false);
  });

  test("counter still displays 0", () => {
    const count = findByTestAttr(wrapper, "count").text();
    expect(count).toBe("0");
  });

  test("Incrementing clears the error", () => {
    const incButton = findByTestAttr(wrapper, "increment-button");
    incButton.simulate("click");

    // checking the error message
    const errorMessage = findByTestAttr(wrapper, "error-message");
    const errorHasHiddenClass = errorMessage.hasClass("hidden");
    expect(errorHasHiddenClass).toBe(true);
  });
});
// test("no count below 0", () => {
//   const wrapper = setup();
//   const button = findByTestAttr(wrapper, "decrement-button");
//   button.simulate("click");
//   const count = findByTestAttr(wrapper, "count").text();
//   expect(count).toBe("0");
//   const errorMessage = findByTestAttr(wrapper, "error-message").text();
//   expect(errorMessage).toBe("Error, counter can't go below zero");
// });
