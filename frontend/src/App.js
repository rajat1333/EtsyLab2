import { Component } from 'react';

import './App.css';
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./js/store/Store";

class App extends Component{
  render(){
    return(
      //Use Browser Router to route to different pages
      <Provider store={store}>
        <BrowserRouter>
          <div>
            {/* App Component Has a Child Component called Main*/}
            <Main/>
          </div>
        </BrowserRouter>
      </Provider>
      
    );
  }
}

export default App;
