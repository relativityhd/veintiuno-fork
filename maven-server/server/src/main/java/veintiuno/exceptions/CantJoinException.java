package veintiuno.exceptions;

public class CantJoinException extends Exception {
    
    public CantJoinException(){
        super("Das Spiel ist voll");
    }
    public CantJoinException (String error){
        super(error); 
    }
    
}