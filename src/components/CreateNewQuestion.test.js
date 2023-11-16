/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/prefer-screen-queries */
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { Provider } from "react-redux";
import store from "../store";
import { BrowserRouter } from "react-router-dom";
import CreateNewQuestion from "./CreateNewQuestion";
import { handleInitData } from "../actions/shared";
import { setAuthedUser } from "../actions/authedUser";

describe("Create new question", () => {
  const loggedUser = {
    id: "mtsamis",
  };
  it("should render screen", async () => {
    await store.dispatch(setAuthedUser(loggedUser));

    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <CreateNewQuestion />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  it("should display 2 input and button to submit", async () => {
    await store.dispatch(handleInitData());
    await store.dispatch(setAuthedUser(loggedUser));

    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <CreateNewQuestion />
        </BrowserRouter>
      </Provider>
    );

    const optionOneText = component.getByTestId("optionOneText");
    const optionTwoText = component.getByTestId("optionTwoText");
    const optionOne = component.getByTestId("optionOne");
    const optionTwo = component.getByTestId("optionTwo");
    const submit = component.getByTestId("submit");

    expect(optionOneText.textContent).toBe("Option one");
    expect(optionTwoText.textContent).toBe("Option two");
    expect(submit.textContent).toBe("Create");

    fireEvent.change(optionOne, { target: { value: "Test 1" } });
    fireEvent.change(optionTwo, { target: { value: "Test 2" } });
    expect(optionOne.value).toBe("Test 1");
    expect(optionTwo.value).toBe("Test 2");
  });

  it("should disable button submit if the input is blank", async () => {
    await store.dispatch(handleInitData());
    await store.dispatch(setAuthedUser(loggedUser));

    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <CreateNewQuestion />
        </BrowserRouter>
      </Provider>
    );

    const optionOne = component.getByTestId("optionOne");
    const optionTwo = component.getByTestId("optionTwo");
    const submit = component.getByTestId("submit");

    fireEvent.change(optionOne, { target: { value: "" } });
    fireEvent.change(optionTwo, { target: { value: "Test 2" } });

    expect(optionOne.value).toBe("");
    expect(optionTwo.value).toBe("Test 2");

    expect(submit).toBeDisabled();
  });
});
