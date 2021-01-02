package veintiuno.server;

//Klasse die die zur Verwaltung des Zugs eines Spielers dient
//wird genutzt wenn informationen vom Server kommen
//der Konstruktor mit Spielername ist ungenutzt ist aber in der weiterentwicklung des 
//Spiels nötig
public class UserAction {
    private String username;
    private int action;

    public UserAction(String username, int action){
        this.username = username;
        this.action = action;
    }
    public UserAction(String actionString){
        this.action = Integer.parseInt(actionString);
    }
    public String getUser(){
        return username;
    }
    public int getAction(){
        return action;
    }

}