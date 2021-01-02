package veintiuno.server;

import java.util.ArrayList;
import veintiuno.Game.Player;
import veintiuno.AI.AIEngine;
import veintiuno.exceptions.UsernameException;
import veintiuno.exceptions.CantJoinException;

public class UserHandle {
    private static ArrayList<Player> userArrayList = new ArrayList<Player>();

    public static boolean validateUsername (String username) {
        boolean isValid = true;
        for(Player i: userArrayList){
            if (username.toLowerCase().equals(i.getUsername().toLowerCase())){
                isValid = false;
            }
        }
        return isValid;
    }
    
    //Neuer Nutzer wird in die Liste eingefügt
    public static void newUser (String username) throws UsernameException, CantJoinException{
        if (userArrayList.size() < 6){
            if (GameInstance.isGameRunning()){
                throw new CantJoinException("Das Spiel läuft bereits");
            }
            //Prüfen ob ein  Spieler mit gleichem Namen bereits im Spiel ist
            for(Player i: userArrayList){
                if (username.toLowerCase().equals(i.getUsername().toLowerCase())){
                    throw new UsernameException(username);}
            }
            userArrayList.add(new Player(username));
        }
        else {throw new CantJoinException();}
    }

    //Eine neue AI wird in die Spielerliste eingefügt
    public static void newAI(String aiName) throws CantJoinException{
        if (userArrayList.size() < 6){
            userArrayList.add(new AIEngine(aiName));
        }
        else{
            throw new CantJoinException("Du kannst keine AI hinzufügen du bist ja voller als das Spiel");
        }
    }
    
    //Gibt die Liste mit Nutzern zurück
    public static ArrayList<Player> getUsers(){
        return userArrayList;
    }
    
    //entfernt einen Spieler und gibt zurück ob der Spieler ein admin war
    public static boolean playerLeave(String playerToRemove){
        boolean wasAdmin = false;
        for(int i = 0;i < userArrayList.size(); i++){
            if(playerToRemove.equals(userArrayList.get(i).getUsername())){
                GameInstance.playerLeave(playerToRemove);
                wasAdmin = userArrayList.get(i).isAdmin();
                userArrayList.remove(i);
            }
        }
        if (wasAdmin) {return true;}
        else {return false;}
    }

    //entfernt alle Spieler aus den Spiel und gibt eine leere ArrayListe zurück
    public static ArrayList<Player> endRound(){
        userArrayList = new ArrayList<Player>();
        GameInstance.initGame();
        return userArrayList;
    }
}