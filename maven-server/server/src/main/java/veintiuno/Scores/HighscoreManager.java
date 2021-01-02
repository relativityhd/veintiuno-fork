//Datei verwenden, um die Highscores zu speichern. 
package veintiuno.Scores;

import java.util.*;

public class HighscoreManager {

    // Scores ist ein dauerhaft sortiertes Array aus Score Objecten
    private static ArrayList<Score> scores = new ArrayList<Score>();
    private static MyWriter fWriter = new MyWriter("scores.txt");
    private static MyReader fReader = new MyReader("scores.txt");

    // Ließt die Datei HighScoreList.txt aus und speichert Ihre Inhalte im scores Array
    public static void readFile() {
        // Öffne die Datei zum Lesen
        fReader.openFile();
        // Lese die Datei in ein Array namens fileInput aus
        ArrayList<String> fileInput = fReader.readArr();
        if (fileInput.size() >= 0) {
            // Iteriere durch dieses Array
            for (String line:fileInput) {
                // Einzelne Werte einer Zeile sind durch ; getrennt
                String[] parts = line.split(";");
                // Benutzername befindet sich an 1. (0.) Stelle
                String username = parts[0];
                // Wins befindet sich als String an 2. (1.) Stelle und muss daher noch in einen Integer umgewandelt werden
                int wins = Integer.parseInt(parts[1]);
                // Ein neues Score Object wird erzeugt und dem Attribut scores hinzugefügt
                Score newScore = new Score(username, wins);
                scores.add(newScore);
            }
        }
        // Sortiert den Input sicherheitshalber, eigentlich sollte die Datei an sich schon sortiert sein.
        sort();
        // Schließt den Reader wieder.
        fReader.closeFile();
    }

    // Gibt die ersten zehn Einträge des scores Array zurück
    public static ArrayList<Score> getTopTen() {
        ArrayList<Score> returnScores = new ArrayList<Score>();
        int topX = 10;

        if (scores.size() >= 0) {
            for (Score sc:scores) {
                if (topX <= 0) { break; }
                returnScores.add(sc);
                topX --;
            }
        }
        return returnScores;
    }

    // Gibt einfach nur das scores Array zurück
    public static ArrayList<Score> getScores() {
    	return scores;
    }

    // Gibt das Scores Array als langen String zurück
    public static String getScoresAsString () {
        String scoresAsString = "";
        for (Score sc:scores) {
            scoresAsString = scoresAsString + sc.toLine(" - ") + "\n";
        }
        return scoresAsString;
    }

    // Diese Funktion wird aufgerufen, wenn ein Spieler das Spiel gewinnt. Der Parameter username ist der Username des Gewinners.
    public static void addScore(String username) {
        // Sucht linear nach einem Benutzername im scores Array.
        int index = -1;
        for(int i = 0; i < scores.size(); i++) {
            if (scores.get(i).getUsername().equals(username)){
                index = i;
                break;
            }
        }
        // Wenn an dieser Stelle index == -1 ist, so existiert der Benutzername noch nicht im scores Array.
        // Sollte er jedoch schon existieren, so steht in index der index der Stelle an der sich das Score Object des Benutzernamens befindet.

        // Wenn Benutzername nicht existiert, so soll er hinzugefügt werden.
        if (index == -1) {
            Score newScore = new Score(username, 1);
            scores.add(newScore);
        // Sonst soll zum Score Object ein win addiert werden
        } else {
            scores.get(index).addScore();
        }

        sort();
        updateFile();
    }
    
    // Sortiert das Array mithilfe des ScoreComparators
    private static void sort() {
		ScoreComparator comparator = new ScoreComparator();
		Collections.sort(scores, comparator);
    }
    
    // Updated die Datei. Überschreibt sie!
    private static void updateFile() {
        // Öffnet die Datei
        fWriter.openFile();
        if (scores.size() >= 0) {
            for (Score sc:scores) {
                String line = sc.toLine(";");
                fWriter.writeLn(line);
            }
        }
        fWriter.closeFile();
    }
}
