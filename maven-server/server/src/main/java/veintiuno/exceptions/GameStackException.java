package veintiuno.exceptions;

//Exception wenn der Stack < 2 ist
public class GameStackException extends Exception {

    public GameStackException() {
        super();
    }
    public GameStackException(String message) {
        super(message);
    }
}