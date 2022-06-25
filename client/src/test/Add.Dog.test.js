import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import isReact from "is-react";

import * as data from "../../../api/info.json";

import AddDog from "../components/AddDog/AddDog.jsx";

configure({ adapter: new Adapter() });

describe("<AddDog/>", () => {
  const state = { dogs: data };
  const mockStore = configureStore([thunk]);

  beforeAll(() => expect(isReact.classComponent(AddDog)).toBeFalsy());

  // RECUERDEN USAR FUNCTIONAL COMPONENT EN LUGAR DE CLASS COMPONENT
  describe("Formulario de creación de producto", () => {
    let addDog;
    let store = mockStore(state);
    beforeEach(() => {
      addDog = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/add"]}>
            <AddDog />
          </MemoryRouter>
        </Provider>
      );
    });

    it("Debe renderizar un formulario", () => {
      expect(addDog.find("form").length).toBe(1);
    });

    it('Debe renderizar un input para con la propiedad "name" igual a "name', () => {
      expect(addDog.find('input[name="name"]').length).toBe(1);
    });

    it('Debe renderizar un input de tipo number para con la propiedad "name" igual a "heightMin"', () => {
      expect(addDog.find('input[name="heightMin"]').length).toBe(1);
      expect(addDog.find('input[type="number"]').length).toBe(2);
    });
  });
});
