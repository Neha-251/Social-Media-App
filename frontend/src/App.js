import './App.css';
import { AllRoutes } from './components/Routes/Routes';
import {gapi} from "gapi-script";
import { useEffect } from 'react';

function App() {


  useEffect(() => {
    function start(){
      gapi.client.init({
        client_id:"684237123379-9inof3f9a3sqa680bt3kikpngok2buil.apps.googleusercontent.com",
        scope: ""
      })
    }

    gapi.load("client:auth2", start)
  })

  return (
    <div className="App">
      <AllRoutes/>
    </div>
  );
}

export default App;
