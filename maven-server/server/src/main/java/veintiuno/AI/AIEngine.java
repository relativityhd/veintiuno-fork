package veintiuno.AI;

import java.util.Stack;

import veintiuno.Game.Player;
import veintiuno.server.UserAction;

public class AIEngine extends Player { // Orchestriert AI und reagiert auf verschiedene Spielerzahlen

    public AIEngine(String name) {
        super(name, true);
    }

    public UserAction getMoveAI(Stack<Integer> gameStack, int moves, int playernumber) {

        int returnMove = 0;
        switch (playernumber) { // selects cases to return result for given Playernumber

            case 2:
                returnMove = MinMax.giveResult(gameStack, moves); //auskommentiert, weil der Minmax Algorithmus nicht sauber funktioniet
                //returnMove = TwoPlayers.getMove(gameStack, moves);
                break;
            case 3:
                returnMove = ThreePlayers.getMove(gameStack, moves);
                break;
            case 4:
                returnMove = FourPlayers.getMove(gameStack, moves);
                break;
            case 5:
                returnMove = FivePlayers.getMove(gameStack, moves);
                break;
            case 6:
                returnMove = SixPlayers.getMove(gameStack, moves);
                break;
            default:
                break;

        }
        return new UserAction(this.username, returnMove);// Rückgabe des Ergebnisse

    }
}
