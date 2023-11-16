/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { Provider } from "react-redux";
import store from "../../store";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./LoginPage";
import { handleInitData } from "../../actions/shared";

describe("Login page", () => {
  it("should render all element", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();

    const usernameInput = component.getByTestId("username");
    const passwordInput = component.getByTestId("password");
    const submitButton = component.getByTestId("submit");
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should show alert message if input wrong", async () => {
    await store.dispatch(handleInitData());

    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    const usernameInput = component.getByTestId("username");
    const passwordInput = component.getByTestId("password");
    const submitButton = component.getByTestId("submit");
    const alert = jest.spyOn(window, "alert");

    fireEvent.change(usernameInput, { target: { value: "sarahedo" } });
    fireEvent.change(passwordInput, { target: { value: "123123" } });

    expect(usernameInput.value).toBe("sarahedo");
    expect(passwordInput.value).toBe("123123");

    fireEvent.click(submitButton);

    expect(alert).toHaveBeenCalledWith("Wrong username or password!");
  });
});
