package veintiuno.AI;

import java.util.Stack;
import java.util.ArrayList;
import java.util.List;

// Klasse, die einen Spielbaum erstellen kann.
public class Tree {
	private int depth;

	private int playernumber; // ob Spieler Computer oder menschlichen Spieler simuliert
	private Stack<Integer> currentStack = new Stack<Integer>();
	private int number; // Nummer, die gespielt wird
	private int moves; // wie viele Spielzüge schon gemacht wurde
	private List<Tree> children = new ArrayList<Tree>();

	protected Tree(int depth, int playernumber, int moves, int number, Stack<Integer> currentStack) { // Konstruktor

		@SuppressWarnings("unchecked")
		Stack<Integer> bufferStack = (Stack<Integer>) currentStack.clone();
		bufferStack = currentStack;
		this.depth = depth;
		this.playernumber = playernumber;
		this.moves = moves;
		this.number = number;
		this.currentStack = bufferStack;
	}

	// getter Funktionen

	protected int getMoves() {
		return moves;
	}

	protected void addChildren(Tree child) { // Funktion um Kinder für Teil des Baumes hinzufgügen
		this.children.add(child);

	}

	protected List<Tree> getChildren() {
		return children;
	}

	protected Stack<Integer> getCurrentStack() {
		return currentStack;
	}

	protected int getNumber() {
		return number;
	}

	protected int getPlayernumber() {
		return playernumber;
	}

	protected int gameOver() {
		if (currentStack.peek() >= 21) {
			return (Integer.MAX_VALUE * playernumber); // jemand hat gewonnen
		} else {
			return 0;
		}

	}

	// heuristische Funktion, die den Spielwert ausgibt
	protected int valueOfGame() {
		if (currentStack.peek() >= 21)
			return (100 * playernumber); // jemand hat gewonnen
		if (currentStack.peek() == 11 && currentStack.size() == 6) {
			return 100 * playernumber / 2; // jemand ist kurz vorm Gewinnen

		}

		if (currentStack.peek() >= 12 && currentStack.size() == 6) {
			return -(100 * playernumber / 2); // jemand ist kurz vorm Verlieren

		}

		return 0; // neutraler Spielstand
	}

	public String toString() { // toString Methode zum Testen
		return " Stack: " + currentStack + " Value: " + this.gameOver();
	}

}
