// 404 Page
// Importiert React Shit
import React, {Component} from 'react';

// Importiert eigene Komponenten
import MyTopAppBar from '../Components/TopAppBar.js';

// Importiert MDC (Material Design Components) Komponenten
import { Headline2, Headline5 } from '@material/react-typography';

// Rendert einfach nur eine Seite ohne jegliche Funktion
class SickSocket extends Component {
  render () {
    return (
      <div>
        <MyTopAppBar/>
        <div className="Wrapper">
            <Headline2>Could not connect to Socket!</Headline2>
            <Headline5>Try to reconnect...</Headline5>
        </div>
      </div>
    )
  }
}

// Exportiere Seite als Modul
export default SickSocket;
