package veintiuno.AI;
import java.util.Stack;

public class MinMax {
	private static int bestchoice;
//Starten des Baumes und des MiniMax-Algorithmuses
	protected static int giveResult( Stack<Integer> inputStack, int moves) {

		int depth = 7;//festlegen der Suchtiefe
		int playernumber = 1; //erster Spieler Computer also 1
		@SuppressWarnings("unchecked")
		Stack<Integer> bufferStack = (Stack<Integer>) inputStack.clone(); //bufferStack

		Tree root = new Tree(depth, playernumber, moves, 1, bufferStack);//aufbauen der Wurzel des Baumes
		root = buildTree(root, depth, bufferStack, moves);//aufrufen der Buildtree Funktion
		
		//System.out.println(root); //test Print Statemet
		
		

		minmax(depth, root, playernumber, -Integer.MAX_VALUE, Integer.MAX_VALUE);//Aufruf Minmax Algorithmus

		return bestchoice;//Rückgabe des Ergebnisses

	}

	// Gametree für das Spiel bauen
	private static Tree buildTree(Tree gametree, int depth, Stack<Integer> originStack, int moves) {
		@SuppressWarnings("unchecked")
		Stack<Integer> gamestack = (Stack<Integer>) originStack.clone();
		if (depth > 0) { // gucken, ob maximale Rekursionstiefe erreicht ist
			for (int number = 0; number <= 9; number++) { //Schleife mit Spielzügen durchlaufen
				if (GameLogic.validateMove(number, gamestack, gametree.getMoves() + 1)) {// Richtigkeit des gewählten
																							// Zuges validieren
					@SuppressWarnings("unchecked")
					Stack<Integer> newStack = (Stack<Integer>) GameLogic
							.getnewStack(number, gamestack, gametree.getMoves() + 1).clone();
					Tree child = new Tree(depth - 1, -gametree.getPlayernumber(), gametree.getMoves() + 1, number,
							newStack);// neues Kind des Baumes erzeugen

					gametree.addChildren(child); // Kind zur Liste der Kinder hinzufügen
					buildTree(child, depth - 1, newStack, gametree.getMoves() + 1); // rekursiver Aufruf der Funktion,
																					// um Kinder der Kinder zu erzeugen
				} else {
					continue;
				}

			}
		}

		return gametree;// vollständigen Suchbaum zurückgeben

	}

	//MinMax Algorithmus zum Finden des besten Spielzuges

	private static int minmax(int depth, Tree node, int playernumber, int alpha, int beta) {

		
		if (node.gameOver()==Math.abs(Integer.MAX_VALUE )) {//Abbruchbedingung des Algorithmuses
			return node.valueOfGame();
			
										//Wert des Spiels wird ausgegeben
		}
		if (playernumber == 1) { //Maximizer
			int bestValue = Integer.MAX_VALUE * -playernumber;//bestvalue festlegen kleinstmöglicher Wert
			for (Tree child : node.getChildren()) {
				int value = minmax(depth - 1, child, -playernumber, alpha, beta);//Wiederaufruf der Funktion
				if (value > bestValue) {	//gucken ob ein Teil der Rekursion einen besseren Wert hat als bestValue
					bestValue = value;
					bestchoice =child.getNumber();		//speichern des besten Ergebnisses in Klasssenvariable
				}
				alpha = Math.max(alpha, bestValue);//Abbruchbedingung wenn bereits ein Wert gefunden wurde
				if (beta <= alpha) {
					break;
				}

			}

			return bestValue; //Rückgabe des Wertes
		} else { 			//Minimizer
			int bestValue = Integer.MAX_VALUE * -playernumber; //bestvalue festlegen größtmöglicher Wert
			for (Tree child : node.getChildren()) {
				int value = minmax(depth - 1, child, -playernumber, alpha, beta);
				if (value < bestValue) {//genau umgekehrt als beim Maximizer
					bestValue = value;
					
				}
				beta = Math.min(beta, bestValue);//so wie beim Maximizer
				if (beta <= alpha) {
					break;
				}

			}
			return bestValue; //Rückgabe heuristischer Wert

		}

	}

}