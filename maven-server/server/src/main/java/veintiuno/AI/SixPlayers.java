package veintiuno.AI;

import java.util.Stack;

public class SixPlayers {

    protected static int getMove(Stack<Integer> gameStack, int moves) {
        int maximalNumber;
        int stackSize = gameStack.size();

        if (moves > 2 && stackSize > 2) {
            if ((gameStack.get(stackSize - 2) + gameStack.get(stackSize - 1)) >= 21) {
                return 0;
                // Fall wenn KI passen soll
            }
        }

        if (stackSize == 6) {

            if ((gameStack.get(stackSize - 1) > 11)
                && (gameStack.get(stackSize - 1) < 21)){
                return 21 - gameStack.get(stackSize - 1);
                // zu Element 6 die Differenz zu 21 hinzufügen
            }

            if ((gameStack.get(stackSize - 3) + gameStack.get(stackSize - 2) + gameStack.get(stackSize - 1) >= 21)
                    && (gameStack.get(stackSize - 2) + gameStack.get(stackSize - 1) >= 7)
                    && (gameStack.get(stackSize - 2) + gameStack.get(stackSize - 1) < 16)) {
                return  16 - (gameStack.get(stackSize - 2) + gameStack.get(stackSize - 1));
                // [5] + [6] = 16 in vollem Stack
            }
        }

        if (stackSize >= 2) {
        //muss gegeben sein, da in den Bedingungen unten eine Mindestgröße von 2 Elemente im Stack vorausgesetzt wird

            if ((gameStack.get(stackSize - 2) + gameStack.get(stackSize - 1) >= 12) 
                && (gameStack.get(stackSize - 2) + gameStack.get(stackSize - 1) < 20)){
                maximalNumber = (20 - (gameStack.get(stackSize - 2) + gameStack.get(stackSize - 1)));
                return (int) ((Math.random() * (maximalNumber)) + 1);
                // die letzten beiden Elemente müssen in Summe mit der hinzuzufügenden Zahl
                // kleiner als 21 sein
            }
        }

        return (int) (Math.random() * (9)) + 1;
        // ansonsten eine zufällige Zahl zwischen 1 und 9 ausgeben

    }

}