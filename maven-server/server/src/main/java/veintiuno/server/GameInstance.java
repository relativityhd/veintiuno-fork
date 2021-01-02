package veintiuno.server;

import java.util.ArrayList;
import java.util.Stack;

import veintiuno.Game.MainGame;
import veintiuno.Game.Player;
import veintiuno.Game.RoundInfo;
import veintiuno.exceptions.GameOverException;
import veintiuno.exceptions.GameStackException;

public class GameInstance {
    // hauptsächlich wrapperfunktionen um SockeAPI.java kurz zu halten und
    // funktionalität zu vereinheitlichen
    // viele der Funktionen ließen sich auch durch das spiel implementieren würden
    // das spiel selber aber zu spezifisch machen
    private static MainGame instance;
    private static boolean gameRunning;

    public static boolean isGameRunning() {
        return gameRunning;
    }

    // erstellt eine Instanz des spiels, nullt die vorherige, falls stopGame nicht
    // aufgerufen wurde
    public static void initGame() {
        stopGame();
        instance = new MainGame();
    }
    //stoppt setzt Instanz des Spiels auf null
    public static void stopGame() {
        instance = null;
        gameRunning = false;
    }

    // Fügt die aktuellen Teilnehmer in die Instanz des Hauptspiels ein
    public static void parsePlayers(ArrayList<Player> players) {
        for (Player player : players) {
            instance.addGameMember(player);
        }
    }

    //Sagt dem Spiel, dass ein Spieler das Spiel verlassen hat
    public static void playerLeave(String playerToRemovefromGame) {
        instance.removeGameMember(playerToRemovefromGame);
    }

    //Spiel Starten
    public static RoundInfo startGame() {
        gameRunning = true;
        return instance.gameStart();
    }

    // Verarbeitet bringt Anfragen ans Spiel
    // 0 vom Client wird als Pass gewertet
    public static RoundInfo PlayerAction(UserAction action) throws GameStackException, GameOverException {
        if (action.getAction() != 0 && action.getAction() <= 9) {
            return instance.add(action.getAction());
        } else {
            return instance.pass();
        }
    }

    //3 Funktionen für die arbeit der AI
    public static Stack<Integer> getGameStack() {
        return instance.gameStack;

    }

    public static int getPlayerCount() {
        return instance.gameMember.size();
    }

    public static int getMoves() {
        return instance.getMoves();
    }

}