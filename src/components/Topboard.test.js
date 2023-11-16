/* eslint-disable testing-library/render-result-naming-convention */
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { Provider } from "react-redux";
import store from "../store";
import { BrowserRouter } from "react-router-dom";
import Topboard from "./Topboard";

describe("Leader board", () => {
  it("should render screen", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Topboard />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });
});
