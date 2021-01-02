package veintiuno.Game;

import java.util.List;
import java.util.Stack;

//Klasse, deren Objekte zur übergabe von Rundeninformationen genutzt werden
//Wird als Objekt direkt an den Client geschickt
public class RoundInfo {
    //Definition der Variablen
    public Player player;
    public Stack stack;
    public int moves;
    public List<Player> playerList;
    //Konstruktoren
    public RoundInfo (Player player, Stack stack, int moves) {
        this.player = player;
        this.stack = stack;
        this.moves = moves;
    }
    // Daten für die AI Programmierung
    public RoundInfo (Player player, Stack stack, int moves, List<Player> playerList){
        this.player = player;
        this.stack = stack;
        this.moves = moves;
        this.playerList = playerList;
    }
}
