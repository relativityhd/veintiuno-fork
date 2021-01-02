package veintiuno;

//Hauptmethode startet den Server
public class Main {

    public static void main(String[] args) throws InterruptedException {
        // Call the SocketAPI
        veintiuno.sockets.SocketAPI.startServer("localhost", 9092);
    }
}
