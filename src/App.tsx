import * as React from "react";
import './App.css';
import Routes from './router'

import {BrowserRouter as HashRouter, Switch , Route } from 'react-router-dom';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

const initialUserState = {
 
  username:"",
}
// const initialusername = {
//   username:""
// }


const userReducer = (state=initialUserState,action: { type: string; state: { username :any;}; })=>{




  if(action.type==="username"){

    
    return{state,username:action.state.username}
  }


  return state

 
}


const reducers = combineReducers({
  user:userReducer,
  
})

const store = createStore(reducers)


store.subscribe(()=>{
  console.log(store.getState(),"$$$$");
})



      
  


function App() {

  return (

    <div>

      <HashRouter>

      <div className="App">
      <Provider store={store}>
 
        <Switch>

          {

            Routes.map((item :any, index :any) => {

              return <Route key={'route_' + index}

              path={item.path}

              component={item.component}

              exact={item.exact || false}

              />

            })

          }

        </Switch>
    </Provider>
      </div>



      </HashRouter>

    </div>

  );

}



export default App;

