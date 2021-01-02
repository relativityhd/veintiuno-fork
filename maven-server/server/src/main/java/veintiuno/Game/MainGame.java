package veintiuno.Game;
import java.util.Stack;
import java.util.ArrayList;
import java.util.List;
import veintiuno.exceptions.GameOverException;
import veintiuno.exceptions.GameStackException;

public class MainGame {
    //Definition der Variablen
    private int moves = 0;
    private int maxStackLength = 6;
    private int maxPlayerNumber = 6;
    //Der Stack und die Spieler
    public Stack<Integer> gameStack = new Stack<Integer>();
    public List<Player> gameMember = new ArrayList<Player>(maxPlayerNumber);
    //Fügt einen neuen Spieler dem Spiel hinzu
    public void addGameMember(Player newPlayer){
            gameMember.add(newPlayer);
        }
    //Löscht einen Spieleraus der Liste
    public List<Player> removeGameMember(String username){
        for (int i = 0; i < gameMember.size(); i++){
            if (username.equals(gameMember.get(i).getUsername())){
                gameMember.remove(i);
                break;
            }
        }
        return gameMember;
    }
    //Initiieren der nächsten Runde und Wechsel des Aktivitätsstatus
    public void nextRound() throws GameOverException{
        if (this.getLastStackNumber() < 21){
            moves = moves + 1;
            //Die aktivität des vorherigen Spielers wird auf "Falsch" und die des neuen auf "True" gesetzt
            gameMember.get(((moves - 1) % gameMember.size())).setActivity(false);
            gameMember.get((moves % gameMember.size())).setActivity(true);
        }
        else{
            //Sieg
            throw new GameOverException(gameMember.get((moves % gameMember.size())),this.getLastStackNumber());
        }
    }
    //Getter und Setter
    public int getMoves(){
        return this.moves;
    }
    public int getLastStackNumber(){
        return gameStack.peek();
    }
    //Spiel startet und der erste Spieler wird auf "Aktiv" gesetzt
    public RoundInfo gameStart(){
        gameMember.get(0).setActivity(true);
        return new RoundInfo(
            gameMember.get(0),
            gameStack,
            this.getMoves(),
            this.gameMember
        );
    }
    //Funktion zum einfügen einer Zahl, wenn der User eine eingibt
    public RoundInfo add(int inputNumber) throws GameOverException{
        //Wenn der Stack nicht voll ist wird eine Zahl am Ende eingefügt
        if (gameStack.size() < maxStackLength){
            gameStack.push(inputNumber);
        }
        //Wenn der Stack voll ist wird die eingegebene Zahl auf die Letzte addiert
        else{
            gameStack.push(gameStack.pop() + inputNumber);
        }
        this.nextRound();
        return new RoundInfo(
            gameMember.get((moves) % gameMember.size()),
            gameStack,
            this.getMoves()
        );
    }
    //Wenn der Nutzer passt wird diese Funktion aufgerufen
    public RoundInfo pass() throws GameStackException, GameOverException{
        //Fehlermeldung da erst ab Runde 4 gepasst werden kann
        if (moves < 3 || gameStack.size() < 2){
            throw new GameStackException();
        }
        //Beim regelkonformen Passen werden die Letzten beiden Zahlen durch ihre Summe ersetzt
        else {
            gameStack.push(gameStack.pop() + gameStack.pop());
            this.nextRound();
            return new RoundInfo(
                gameMember.get((moves) % gameMember.size()),
                gameStack,
                this.getMoves()
            );
        }
    }
}