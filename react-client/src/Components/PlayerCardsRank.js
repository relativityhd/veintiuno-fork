// Das hier ist eine eigene React Komponente.
// Hier finden sich ausschließlich wiederverwendbare HTML Stücke.
// Es befindet sich keinerlei Funktionalität in dieser Datei!
// Diese sind für die Ranks Seite gedacht.

import React from 'react';

import Card, {
  CardPrimaryContent,
  CardMedia
} from "@material/react-card";
import {
  Headline6,
  Subtitle2,
} from '@material/react-typography';



const UserCardWinner = (props) => {
  return (
    <Card className='mdc-card player-card'>
      <CardPrimaryContent>
        <CardMedia wide imageUrl={'https://mlxneml8dkis.i.optimole.com/JA1H0sI-TIlavWNJ/w:1200/h:750/q:83/https://www.games-magazin.de/wp-content/uploads/2019/04/ciri_in_the_witcher_3_wild_hunt-wide.jpg'} />
      <div className='mdc-card-primary'>
        <Headline6 className='mdc-card-title'>
          {props.username}
        </Headline6>
        <Subtitle2 className='mdc-card-subtitle'>
          Congratulations!
        </Subtitle2>
      </div>
      </CardPrimaryContent>
    </Card>
  );
}

const UserCardOther = (props) => {
  return (
    <Card className={'mdc-card rank-player-card index-' + props.rankPos}>
      <CardPrimaryContent>
      <div className='mdc-card-primary'>
        <Headline6 className='mdc-card-title'>
          {props.rankPos}. {props.username}
        </Headline6>
        <Subtitle2 className='mdc-card-subtitle'>
          Wins: {props.wins}
        </Subtitle2>
      </div>
      </CardPrimaryContent>
    </Card>
  );
}

export { UserCardWinner, UserCardOther };
