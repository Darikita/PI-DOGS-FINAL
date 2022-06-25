/* import { render, screen } from '@testing-library/react';
import App from './App'; */

/* test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
}); */


import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { render, screen } from '@testing-library/react';
 import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import App from './App';
import Post  from './components/Post/Post.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Detail from './components/dogDetail/dogDetail.jsx';
import Card from './components/Cards/Card.jsx';

configure({adapter: new Adapter()});
describe('< LandingPage/>',() => {

  describe('Forms', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<LandingPage />);
    })
    it('Renderiza un <h4>', () => {
      expect(wrapper.find('h4')).toHaveLength(1)
    })

    it('Renderiza un tag <span> con el texto igual a Welcome!', () => {
      // El orden en el que se encuentran los Labels es importante.
      expect(wrapper.find('span').at(0).text()).toEqual('W');
    })
    it('Renderiza un <button>', () => {
      expect(wrapper.find('button')).toHaveLength(1)
    })
     it('Renderiza un button con el texto igual a HOME ', () => {
      expect(wrapper.find('button').at(0).text()).toEqual('HOME');
    }) 
    it('Renderiza un button con la propiedad type igual a "button"', () => {
      expect(wrapper.find('button[type="button"]')).toHaveLength(1);
    })
  });
}); 

/*   it('deberia renderizar un "img" que contenga el "image" que recibe por props', () => {
    expect(wrapper.find(Card).at(1).prop('image')).toBe("https://cdn2.thedogapi.com/images/rkiByec47.jpg")
  }) */
/*   it('deberia renderizar un "img" que contenga el "img" que recibe por props', () => {
    expect(wrapper.find('img').at(0).text()).toEqual(image);
  }) */

//import { App , addCity, removeCity, reducer} from "./App.js";
/*configure({adapter: new Adapter()});

 */
/* describe('<Todos />', () => {
  let wrapper;
  let store;
  const state = [
    {
      title:"compras",
      description:"ir al super a hacer compras",
      place:"walmart",
      date:"mañana",
      id:1,
      status:"Todo"
    },
    {
      title:"leer",
      description:"leer Lord of the Flies",
      place:"living room",
      date:"hoy",
      id: 2,
      status:"Todo"
    }
  ]
  const mockStore = configureStore();
  store = mockStore(state);
  const status = "Todo";
  beforeEach(() => {
    wrapper = mount(<Provider store={store}>
                      <MemoryRouter initialEntries={[ '/' ]}>
                      <Todos status={status}/>
                      </MemoryRouter>
                    </Provider>)
  })
  
  it('deberia mapear la cantidad de todos que haya en el store y renderizar un <Todo /> por cada uno', () => {
    expect(wrapper.find(Todo)).toHaveLength(2)
  })

  it('deberia pasar como props al componente Todo el `title` del todo', () => {
    expect(wrapper.find(Todo).at(0).prop('title')).toBe('compras')
  })

  it('deberia renderizar un "span", que muestre la prop "status" que recibe el componente <Todos />', () => {
    // Este span es el titulo de nuestro contenedor de Todos
    expect(wrapper.find('span')).toHaveLength(1);
    expect(wrapper.contains(<span>{status}</span>)).toEqual(true)
  })

  it('deberia renderizar un componente <Link>, por cada <Todo> que exista', () => {
    expect(wrapper.find(Link)).toHaveLength(2)
  })

  it('El <Link> deberia redirigir a "/edit/:id", y que el "id" matchee el id de cada Todo', () => {
    expect(wrapper.find(Link).at(1).prop('to')).toEqual('/edit/2')
  })
  
  it('Cada <Link> deberia contener un componente Todo.', () => {
    // Dentro de cada Link deberia renderizarse un componente Todo
    const link = wrapper.find(Link).at(1);
    expect(link.find(Todo)).toHaveLength(1);
  })
  
  it('deberia mapear la cantidad de todos que haya en el store filtrando por status y renderizar un <Todo /> por cada uno. Dependiendo el status que llegue por props.', () => {
    state[0].status = 'Done';
    store = mockStore(state)
    wrapper = mount(<Provider store={store}>
                      <MemoryRouter initialEntries={[ '/' ]}>
                        <Todos status='Todo'/>
                      </MemoryRouter>
                    </Provider>)
    expect(wrapper.find(Todo)).toHaveLength(1)
  })

}); */
/*configure({adapter: new Adapter()});

describe(' Dog Detail', () => {

  describe('<Detail />', () => {
    let wrapper;
    let store;
    const match = {params: {id: 1}, isExact: true, path: "/perro/:id", url: "/perro/1"};
    const dogs = [
      {
        name: "African Hunting Dog",
        height: ["76"],
        id: 3,
        image: "https://cdn2.thedogapi.com/images/rkiByec47.jpg",
        life_span: "11 years",
        weight: (2) ["19 ", " 30"],
        temperaments: (3) ["Wild", " Hardworking", " Dutiful"]
      },
       {
        title:"leer",
        description:"leer Lord of the Flies",
        place:"living room",
        date:"hoy",
        id: 2,
        status:"Todo"
      } 
    ]
    beforeEach(() => {
      const mockStore = configureStore([]);
      store = mockStore(dogs);
      wrapper =  shallow(<Detail match={match} store={store} />)
      store.clearActions();
    })
    
    it('deberia renderizar un "h1" que contenga el texto "No hay todo." si no existe un ´todo´ especifico que corresponda con el id de `params`', () => {
      const match = {params: {id: 4747474}, isExact: true, path: "/perro/:id", url: "/perro/ 4747474"};
      const wrapper =  mount(<Detail match={match} store={store} />)
      expect(wrapper.find('h1')).toHaveLength(1);
      expect(wrapper.find('h1').at(0).text()).toEqual('No hay todo.');
    });
    */
   /*  it('deberia renderizar primero un `button` con el texto `Done` que al hacerle click hace un dispatch de la action `toDone`', () => {
      // El orden del boton aca es importante...
      expect(wrapper.find('button').at(0).text()).toEqual('Done');
      wrapper.find('button').at(0).simulate('click');
      const expectedAction = [{
        payload: 1,
        type: 'ToDone'
      }]
      expect(store.getActions()).toEqual(expectedAction);
    })
    
    it('deberia renderizar segundo un `button` con el texto `In Progress` que al hacerle click hace un dispatch de la action `toInProgress`', () => {
      // El orden del boton aca es importante...
      expect(wrapper.find('button').at(1).text()).toEqual('In Progress');
      wrapper.find('button').at(1).simulate('click');
      const expectedAction = [{
        payload: 1,
        type: 'ToInProgress'
      }]
      expect(store.getActions()).toEqual(expectedAction);
    })
    
    it('deberia renderizar tercero un `button` con el texto `Remove` que al hacerle click hace un dispatch de la action `removeTodo`', () => {
      // El orden del boton aca es importante...
      expect(wrapper.find('button').at(2).text()).toEqual('Remove');
      wrapper.find('button').at(2).simulate('click');
      const expectedAction = [{
        payload: 1,
        type: 'RemoveTodo'
      }]
      expect(store.getActions()).toEqual(expectedAction);
    })
    
  });
})
 */


/* describe('With React Testing Library', () => {
 
  let store,wrapper

  it('Shows "Hello world!"', () => {
    

    expect(getByText('Hello Worldd!')).not.toBeNull()
  })
}) */

/* configure({ adapter: new Adapter() });

describe("<Post />", () => {
  describe("Estructura", () => {
    let wrapper,store;
    beforeEach(() => {
      const initialState = {dogs:[]}
  const mockStore = configureStore()
  store = mockStore(initialState)
   
   wrapper = shallow(<Provider store={store}><Post /></Provider>);
    });
    it('El form debe tener un label que diga: "Username:"', () => {
      const element = wrapper.find('label')
      console.log(element)
      expect(element).toBe('Name:');
  });

    it('Renderiza un input con la propiedad "name" igual a "city"', () => {
      expect(wrapper.find('input[name="name"]')).toHaveLength(1);
    }); */

    /* it('Renderiza un input con la propiedad "name" igual a "location"', () => {
      expect(wrapper.find('textarea[name="location"]')).toHaveLength(1);
    });

    it('Renderiza un input con la propiedad "name" igual a "temperatura"', () => {
      expect(wrapper.find('input[name="temperatura"]')).toHaveLength(1);
    });

    it('Renderiza un boton con el "type" "submit"', () => {
      expect(wrapper.find('button[type="submit"]')).toHaveLength(1);
    }); 
  });
})
*/  /* describe("Manejo de inputs con estado", () => {
    let wrapper, useState, useStateSpy;
    beforeEach(() => {
      useState = jest.fn();
      useStateSpy = jest.spyOn(React, "useState");
      useStateSpy.mockImplementation((init) => [init, useState]);
      wrapper = shallow(<App />);
    });

    describe("City input", () => {
      it("El form deberia cambiar de estado cuando escriban en el input de city", () => {
        wrapper.find('input[name="city"]').simulate("change", {
          target: { name: "city", value: "Rosario" },
        });
        expect(useState).toHaveBeenCalledWith({
          city: "Rosario",
          location: "",
          temperatura: "",
        });
      });
    });

    describe("Location input", () => {
      it('deberia cambiar de estado cuando escriban en el input de "location"', () => {
        wrapper.find('textarea[name="location"]').simulate("change", {
          target: { name: "location", value: "Alemania" },
        });
        expect(useState).toHaveBeenCalledWith({
          city: "",
          location: "Alemania",
          temperatura: "",
        });
      });
    });


    describe("Temp input", () => {
      it('deberia cambiar de estado cuando escriban en el input de "temperatura"', () => {
        wrapper
          .find('input[name="temperatura"]')
          .simulate("change", { target: { name: "temperatura", value: "30" } });
        expect(useState).toHaveBeenCalledWith({
          city: "",
          location: "",
          temperatura: "30",
        });
      });
    });
  });
});
 */
