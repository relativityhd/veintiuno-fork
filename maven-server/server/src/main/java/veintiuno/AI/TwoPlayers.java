package veintiuno.AI;

import java.util.Stack;

public class TwoPlayers { // gives Output for onevsone mactch

    protected static int getMove(Stack<Integer> gameStack, int moves) {

        int stackSize = gameStack.size();

        if (moves > 2 && stackSize > 2) {
            if (((gameStack.get(stackSize - 2) + gameStack.get(stackSize - 1)) >= 21)
                    || ((gameStack.get(stackSize - 2) + gameStack.get(stackSize - 1)) == 11
                            && (gameStack.get(stackSize - 3) < 10))) {
                return 0; // Fall wenn KI passen soll
            }
        }

        if (stackSize == 6) {
            if (21 - gameStack.get(stackSize - 1) <= 9) {
                return 21 - gameStack.get(stackSize - 1); // Computer soll 6. Element auf 21 aufstocken, um zu gewinnen

            }
        }

        int z = 10;
        if (moves > 3) {
            if (21 - gameStack.get(stackSize - 1) < 10) {
                z = 21 - gameStack.get(stackSize - 1); // verhindern, dass Computer zulässt, dass sich die letzten
                                                       // beiden Zahlen
                // auf 21 addieren lassen
            }
        }

        return (int) (Math.random() * (z - 1)) + 1;

    }

}