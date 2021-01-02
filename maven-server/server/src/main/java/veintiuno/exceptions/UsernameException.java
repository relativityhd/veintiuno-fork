package veintiuno.exceptions;
//Wird aufgerufen, wennn der Nutzername belegt ist
public class UsernameException extends Exception{
    String username;
    public UsernameException(){
        super();
    }
    
    public UsernameException(String username){
        super();
        this.username = username;
    }
    
    public String getUsername() {
        return username;
    }
}