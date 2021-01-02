package veintiuno.exceptions;

import veintiuno.Game.Player;

//Wird aufgerufen, wenn das Spiel vorbei ist
public class GameOverException extends Exception{
    Player winner;
    int winningMove;

    public GameOverException(){
        super();
    }
    public GameOverException(Player winner, int winningMove){
        super();
        this.winner = winner;
        this.winningMove = winningMove;
    }
    public Player getWinner(){
        return this.winner;
    }
}