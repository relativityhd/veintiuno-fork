package veintiuno.sockets;

import com.corundumstudio.socketio.listener.*;

import veintiuno.Game.RoundInfo;
import veintiuno.exceptions.*;
import veintiuno.server.GameInstance;
import veintiuno.server.UserAction;
import veintiuno.server.UserHandle;
import veintiuno.Scores.HighscoreManager;


import com.corundumstudio.socketio.*;

public class SocketAPI {

    public static void startServer(String host, Integer port) throws InterruptedException {

        // Server Config mit Hostname und Port
        Configuration config = new Configuration();
        config.setHostname(host);
        config.setPort(port);

        //Initiiert Server mit ServerConfig
        final SocketIOServer server = new SocketIOServer(config);

        // Startet Grundlegende Funktionen des Spiels
        HighscoreManager.readFile();
        GameInstance.initGame();
        SocketAPI.setUpListeners(server);

        // Startet den Server und schickt den Server Thread schlafen
        server.start();
        Thread.sleep(Integer.MAX_VALUE);
        server.stop();
    }
    
    // Funktion um Eventlistener zu erstellen
    private static SocketIOServer setUpListeners (final SocketIOServer server) {
        
        //prüft ob ein Nutzername verfügbar ist
        //sendet ein boolean an den client
        server.addEventListener("ProofUsername", String.class, new DataListener<String>() {
            @Override
            public void onData(SocketIOClient client, String username, AckRequest ackRequest) {
                client.sendEvent("ValidUsername", veintiuno.server.UserHandle.validateUsername(username));
            }
        });
        //Eine neue KI hinzufügen
        //schickt ein PlayerUpdate zurück oder eine GameFull Exception
        server.addEventListener("AddAI", String.class, new DataListener<String>(){
            public void onData(SocketIOClient client, String aiName ,AckRequest ackRequest){
                try{
                    UserHandle.newAI(aiName);
                    server.getBroadcastOperations().sendEvent("PlayerUpdate", UserHandle.getUsers());
                }catch (CantJoinException GameFull){
                    client.sendEvent("AIError", GameFull.getMessage());
                }
                
            }
        });


        //Wird ausgelöst wenn ein Spieler versucht das Spiel zu betreten
        //testet erneut ob der nutzername nicht bereits vergeben ist
        //schickt dem Spieler die Spielerliste
        server.addEventListener("JoinLobby", String.class, new DataListener<String>() {
            @Override
            public void onData(SocketIOClient client, String newPlayer, AckRequest ackRequest) {
                // Call Funktion to handle new Username
                try{veintiuno.server.UserHandle.newUser(newPlayer);
                    server.getBroadcastOperations().sendEvent("PlayerUpdate",  UserHandle.getUsers());
                    client.sendEvent("ToLobby", UserHandle.getUsers());
                } catch(UsernameException UserError){
                    client.sendEvent("LobbyError", UserError.getMessage() );
                } catch(CantJoinException GameFull){
                    client.sendEvent("LobbyError", GameFull.getMessage());
                }
            }
        });

        //Wird ausgelöst wenn ein Spieler das Spiel verlässt oder betritt
        server.addEventListener("KickPlayer", String.class, new DataListener<String>(){
            public void onData(SocketIOClient client, String playerToKick ,AckRequest ackRequest){
                boolean wasAdmin = UserHandle.playerLeave(playerToKick);
                System.out.println(playerToKick);
                if (wasAdmin){
                    server.getBroadcastOperations().sendEvent("PlayerUpdate",UserHandle.endRound());
                }
                System.out.println(UserHandle.getUsers());
                server.getBroadcastOperations().sendEvent("PlayerUpdate", UserHandle.getUsers());
            }
        });
        
        //verarbeitet sämtliche Tätigkeiten eines Spielers 
        //verarbeitet AI Tätigkeit
        //schickt infos über das Spiel, Exceptions für Sieg und GameStackfehlerschickt
        server.addEventListener("UserAction", String.class, new DataListener<String>() {
            @Override
            public void onData(SocketIOClient client, String actionValue , AckRequest ackRequest){
                try {
                    UserAction action = new UserAction(actionValue);
                    System.out.println(action.getAction());
                    RoundInfo roundInfo = GameInstance.PlayerAction(action);
                    System.out.println(roundInfo.player.getUsername());
                    server.getBroadcastOperations().sendEvent("Next", roundInfo);
                    
                    try{
                        while (roundInfo.player.getAi()) {
                            Thread.sleep((long)(Math.random() * 5000+1-1000)+1000);
                            roundInfo = GameInstance.PlayerAction(roundInfo.player
                            .getMoveAI(GameInstance.getGameStack(), 
                            GameInstance.getMoves(), GameInstance.getPlayerCount()));
                            server.getBroadcastOperations().sendEvent("Next", roundInfo);  
                        }
                    } catch (InterruptedException e) {
                        System.out.println("This should not happen.");
                    }
                    
                
                }catch (GameStackException GameStackError){
                    client.sendEvent("GameStackException", GameStackError);
                }catch(GameOverException GameOver){
                    server.getBroadcastOperations().sendEvent("GameOver", GameOver);
                    GameInstance.stopGame();
                    UserHandle.endRound();
                    HighscoreManager.addScore(GameOver.getWinner().getUsername());
                }
            }
        });

        //Nimmt ein start request vom admin an und schickt die Spieler ins spiel 
        //schickt ein dem Spiel eine info über das leere Spiel
        server.addEventListener("StartGame",String.class, new DataListener<String>(){
            @Override
            public void onData(SocketIOClient client, String none, AckRequest ackRequest){
                GameInstance.initGame();
                GameInstance.parsePlayers(UserHandle.getUsers());
                RoundInfo Info = GameInstance.startGame();
                server.getBroadcastOperations().sendEvent("ToGame", Info);
            }
        });

        //Request damit der Server die Bestenliste erhält
        //schickt das scoreboad zurück an den Server
        server.addEventListener("RanksReq", String.class, new DataListener<String>() {
            @Override
            public void onData(SocketIOClient client, String none, AckRequest ackRequest){
                client.sendEvent("RanksRes", HighscoreManager.getTopTen());
            }
        });
        
        return server;
    }
}