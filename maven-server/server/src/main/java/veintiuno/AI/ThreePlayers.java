package veintiuno.AI;

import java.util.Stack;

public class ThreePlayers {

    protected static int getMove(Stack<Integer> gameStack, int moves) {

        int stackSize = gameStack.size();
        if (moves > 2 && stackSize > 2) {
            if ((gameStack.get(stackSize - 2) + gameStack.get(stackSize - 1)) >= 21) {
                return 0;
                // Fall wenn KI passen soll
            }
        }

        if (stackSize >= 2) {
        //muss gegeben sein, da in den Bedingungen unten eine Mindestgröße von 2 Elemente im Stack vorausgesetzt wird

            if ((stackSize <= 5 && (gameStack.get(stackSize - 2) + gameStack.get(stackSize - 1) >= 12))
                && (gameStack.get(stackSize - 2) + gameStack.get(stackSize - 1) <20)) { //ÄNDERUNG
                return  (20 - (gameStack.get(stackSize - 2) + gameStack.get(stackSize - 1)));
                // die letzten beiden Elemente müssen in Summe mit der hinzuzufügenden Zahl
                // kleiner als 21 sein
            }
        }

        if (stackSize == 6){
            
            if ((gameStack.get(stackSize - 1) > 11)
                && (gameStack.get(stackSize -1) < 21)){ //ÄNDERUNG
                return 21 - gameStack.get(stackSize - 1);
                // zu Element 6 die Differenz zu 21 hinzufügen
            }
            if ((gameStack.get(stackSize - 3) + gameStack.get(stackSize - 2) + gameStack.get(stackSize - 1) >= 21)
                && (gameStack.get(stackSize - 2) + gameStack.get(stackSize - 1) >= 10
                && (gameStack.get(stackSize - 2) + gameStack.get(stackSize - 1) < 19))) {
                    return 19 - (gameStack.get(stackSize - 2) + gameStack.get(stackSize - 1));
            }   // [5] + [6] = 19 in vollem Stack
        }

        if (stackSize == 5){ 

            if ((gameStack.get(stackSize - 1) >= 10)
                && (gameStack.get(stackSize - 1) < 19)) { //ÄNDERUNG
                return  19 - (gameStack.get(stackSize - 1));
                // fünftes und sechstes Element sollen in Summe 19 ergeben
            }
            if ((gameStack.get(stackSize - 2) < gameStack.get(stackSize - 1))
                    && (gameStack.get(stackSize - 2) + gameStack.get(stackSize - 1) >= 11)
                    && (gameStack.get(stackSize - 2) + gameStack.get(stackSize -1) < 20)) { //ÄNDERUNG
                return (20 - (gameStack.get(stackSize - 2) + gameStack.get(stackSize - 1)));
                // an Stelle [6] soll eine Zahl hinzugefügt werden, sodass die Summe von [4] +
            }   // [5] + [6] = 20 ergibt
        }

        return (int) (Math.random() * (9)) + 1;
        // ansonsten eine zufällige Zahl zwischen 1 und 9 ausgeben
    }
}