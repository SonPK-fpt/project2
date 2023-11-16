/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/prefer-screen-queries */
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { Provider } from "react-redux";
import store from "../../store";
import { BrowserRouter } from "react-router-dom";
import Page404 from "./Page404";
import { handleInitData } from "../../actions/shared";

describe("Not found page", () => {
  it("should render screen", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Page404 />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  it("should show notification text", async () => {
    await store.dispatch(handleInitData());
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Page404 />
        </BrowserRouter>
      </Provider>
    );

    const notif1 = component.getByTestId("notif1");
    const notif2 = component.getByTestId("notif2");
    const notif3 = component.getByTestId("notif3");

    expect(notif1).toBeInTheDocument();
    expect(notif2).toBeInTheDocument();
    expect(notif3).toBeInTheDocument();
  });
});
