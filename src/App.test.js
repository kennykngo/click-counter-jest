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

test("clicking on button increments counter display", () => {
  const wrapper = setup();
  // find the button
  const button = findByTestAttr(wrapper, "increment-button");
  // click the button
  button.simulate("click");
  // find the display and test that the number has been incremeneted
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("1");
});
