// Das hier ist eine eigene React Komponente.
// Hier finden sich ausschließlich wiederverwendbare HTML Stücke.
// Es befindet sich keinerlei Funktionalität in dieser Datei!
// Diese sind für die Lobby Seite gedacht.

import React from 'react';

import Button from '@material/react-button';
import Card, {
  CardPrimaryContent,
  CardMedia,
  CardActions,
  CardActionButtons
} from "@material/react-card";
import {
  Headline6,
  Subtitle2,
} from '@material/react-typography';


const UserCard = (probs) => {
  return (
    <Card className='mdc-card player-card'>
      <CardPrimaryContent>
        <CardMedia wide imageUrl={'https://mlxneml8dkis.i.optimole.com/JA1H0sI-TIlavWNJ/w:1200/h:750/q:83/https://www.games-magazin.de/wp-content/uploads/2019/04/ciri_in_the_witcher_3_wild_hunt-wide.jpg'} />
      <div className='mdc-card-primary'>
        <Headline6 className='mdc-card-title'>
          {probs.username}
        </Headline6>
        <Subtitle2 className='mdc-card-subtitle'>
          User
        </Subtitle2>
      </div>
      </CardPrimaryContent>
      { probs.isAdmin &&
        <CardActions>
          <CardActionButtons>
            <Button onClick={() => probs.parent.kickPlayer(probs.username)} >Kick User</Button>
          </CardActionButtons>
        </CardActions>
      }
    </Card>
  );
}

const AICard = (probs) => {
  return (
    <Card className='mdc-card player-card'>
      <CardPrimaryContent>
        <CardMedia wide imageUrl={'https://www.hwzdigital.ch/files/2019/08/AdobeStock_138972731_cropped-1280x0-c-default.jpg'} />
      <div className='mdc-card-primary'>
        <Headline6 className='mdc-card-title'>
          {probs.ainame}
        </Headline6>
        <Subtitle2 className='mdc-card-subtitle'>
          AI
        </Subtitle2>
      </div>
      </CardPrimaryContent>
      { probs.isAdmin &&
        <CardActions>
          <CardActionButtons>
            <Button onClick={() => probs.parent.kickPlayer(probs.ainame)} >Remove AI</Button>
          </CardActionButtons>
        </CardActions>
      }
    </Card>
  );
}

const OwnCard = (probs) => {
  return (
    <Card className='mdc-card player-card ownCard'>
      <CardPrimaryContent>
        <CardMedia wide imageUrl={'https://images6.alphacoders.com/532/532666.jpg'} />
      <div className='mdc-card-primary'>
        <Headline6 className='mdc-card-title'>
          {probs.username}
        </Headline6>
        { probs.isAdmin ?
        <Subtitle2 className='mdc-card-subtitle'>Admin</Subtitle2>
        : <Subtitle2 className='mdc-card-subtitle'>Player</Subtitle2> }
      </div>
      </CardPrimaryContent>
      <CardActions>
        { probs.isAdmin ?
          <CardActionButtons>
            <Button className="start-btn" raised onClick={() => probs.parent.startGame()}>Start</Button>
            <Button className="add-ai" onClick={() => probs.parent.addAI()}>AI+</Button>
            <Button onClick={() => probs.parent.goToStart()}>Leave</Button>
          </CardActionButtons>
          :
          <CardActionButtons>
            <Button onClick={() => probs.parent.goToStart()}>Leave</Button>
          </CardActionButtons>
        }
      </CardActions>
    </Card>
  );
}

export { UserCard, AICard, OwnCard };
