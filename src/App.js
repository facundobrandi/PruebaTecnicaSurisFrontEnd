import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HeaderTienda } from '../src/Components/Header';
import {FormArt} from "./Components/Form"

function App() {
  return (<>
    <HeaderTienda></HeaderTienda>
    <FormArt></FormArt>
    </>
  );
}

export default App;
