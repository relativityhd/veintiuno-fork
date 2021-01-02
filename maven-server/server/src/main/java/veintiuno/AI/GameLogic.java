package veintiuno.AI;

import java.util.Stack;

public class GameLogic {

	// Funktion, die sagt, ob ein Spilezug gültig ist, oder nicht

	protected static boolean validateMove(int number, Stack<Integer> gameStack, int moves) {

		if (gameStack.peek() > 21) { //Spiel ist zu Ende
			return false;
		}

		if (number == 0 && moves < 4) { //Es darf nicht gepasst werden
			return false;
		}

		if (number == 0 && gameStack.size() == 1) { //Es darf nicht gepasst werden
			return false;

		}

		return true;

	}

	// Funktion, die eines neuen Gamestack nach einer eingegeben Nummer ausgibt
	protected static Stack<Integer> getnewStack(int number, Stack<Integer> gameStack, int moves) {

		@SuppressWarnings("unchecked") 
		Stack<Integer> bufferStack = (Stack<Integer>) gameStack.clone();// erzeugen eines Bufferobjektes

		// Umsetzung der Spiellogik

		if (number == 0) {
			bufferStack.push(bufferStack.pop() + bufferStack.pop());
			return bufferStack;
		} else {
			if (bufferStack.size() < 6) {
				bufferStack.push(number);
				return bufferStack;

			} else {
				bufferStack.push(bufferStack.pop() + number);
				return bufferStack;

			}
		}

	}

}
