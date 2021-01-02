// Das hier ist eine eigene React Komponente.
// Hier finden sich ausschließlich wiederverwendbare HTML Stücke.
// Es befindet sich keinerlei Funktionalität in dieser Datei!
// Diese ist für alle Seiten gedacht.

import React from 'react';

import TopAppBar, {
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarTitle,
} from '@material/react-top-app-bar';

// Material IO TopAppBar
const MyTopAppBar = (props) => {
  return (
    <TopAppBar className={props.isGold ? "colorTopBar": ""} fixed>
      <TopAppBarRow>
        <TopAppBarSection align='start'>
          <TopAppBarTitle>21 Stack Game</TopAppBarTitle>
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
  );
}

export default MyTopAppBar;
