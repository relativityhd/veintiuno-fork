//Diese Klasse wird verwendet, um Java mitzuteilen, wie es 2 Objekte der Typ-Score vergleichen muss. 
//-1 bedeutet, dass die erste Punktzahl größer als die zweite ist, +1
//bedeutet, dass sie kleiner ist und 0 bedeutet, dass sie gleich ist.

package veintiuno.Scores;

import java.util.Comparator;

public class ScoreComparator implements Comparator<Score> {
        public int compare(Score score1, Score score2) {

            int sc1 = score1.getScore();
            int sc2 = score2.getScore();

            if (sc1 > sc2){
                return -1;
            }
            
            else if (sc1 < sc2){
                return +1;
            }
            
            else{
                return 0;
            }
        }
}