// Das hier ist eine eigene React Komponente.
// Hier finden sich ausschließlich wiederverwendbare HTML Stücke.
// Es befindet sich keinerlei Funktionalität in dieser Datei!
// Diese sind für die Games Seite gedacht.

import React from 'react';

import { Headline6 } from '@material/react-typography';

// Witcher: https://images6.alphacoders.com/532/532666.jpg
// Ciri: https://mlxneml8dkis.i.optimole.com/JA1H0sI-TIlavWNJ/w:1200/h:750/q:83/https://www.games-magazin.de/wp-content/uploads/2019/04/ciri_in_the_witcher_3_wild_hunt-wide.jpg
// AI: https://www.hwzdigital.ch/files/2019/08/AdobeStock_138972731_cropped-1280x0-c-default.jpg
const UserIcon = (props) => {
  return (
    <div className="user-wrapper" id={"gcard-"+props.username.replace(/\W/g, '')} >
      <div className="user-icon-wrapper">
        {
          props.isAi ? <img alt="AI" src="https://www.hwzdigital.ch/files/2019/08/AdobeStock_138972731_cropped-1280x0-c-default.jpg" /> :
          props.isSelf ? <img alt="You" src="https://images6.alphacoders.com/532/532666.jpg" /> :
          <img alt="User" src="https://mlxneml8dkis.i.optimole.com/JA1H0sI-TIlavWNJ/w:1200/h:750/q:83/https://www.games-magazin.de/wp-content/uploads/2019/04/ciri_in_the_witcher_3_wild_hunt-wide.jpg" />
        }
      </div>
      <Headline6 className={"player-caption" + (props.isSelf ? " own-caption" : "")} >{props.username}</Headline6>
    </div>
  );
}

export { UserIcon };
