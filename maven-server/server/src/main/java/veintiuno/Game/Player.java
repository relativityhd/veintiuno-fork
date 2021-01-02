package veintiuno.Game;

import java.util.Stack;
import veintiuno.server.UserAction;

public class Player {
    //Definition der Variablen
    protected String username;
    protected boolean active = false;
    protected boolean admin;
    protected boolean ai = false;
    //Konstruktor
    public Player(String username){
        this.username = username;
        if ("admin".equals(username.toLowerCase())) {this.admin = true;}
        else {this.admin =false;}
    }
    //AI-Konstruktor
    public Player(String username, boolean AI){
        this.username = username;
        this.ai = true;
    }
    //Getter und Setter
    public void setActivity(boolean activity){
        this.active = activity;
    }
    public boolean getActivity(){
        return this.active;
    }
    public boolean isAdmin(){
        return admin;
    }
    public String getUsername(){
        return username;
    }
    public boolean getAi(){
        return ai;
    }
    public void setAi(boolean ai){
         this.ai = ai;
    }
    public UserAction getMoveAI(Stack<Integer> gameStack, int moves, int playernumber){
        return new UserAction("AI",1);
    }
}