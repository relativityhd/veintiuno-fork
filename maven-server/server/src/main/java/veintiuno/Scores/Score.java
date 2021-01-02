//Diese Klasse ermöglicht es uns, ein Objekt (in unserem Fall ein Arraylist) vom Typ Score zu erstellen, 
//das den Namen und die Punktzahl eines Spielers enthält. 
//Wir implementieren serialisierbar, um diesen Typ sortieren zu können.

package veintiuno.Scores;

public class Score {
    private int wins = 0;
    private String username;

    public Score(String name, int wins) {
        this.wins = wins;
        this.username = name;
    }

    public int getScore() {
        return wins;
    }

    public void addScore() {
        wins = wins + 1;
    }

    public String getUsername() {
        return username;
    }

    public String toLine(String dec) {
        return (username + dec + wins);
    }
}