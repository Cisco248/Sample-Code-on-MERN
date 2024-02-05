import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class EchoClient {
    public static void main(String[] args) {
        final String SERVER_HOST = "localhost";
        final int SERVER_PORT = 12345;

        try (Socket socket = new Socket(SERVER_HOST, SERVER_PORT);
             BufferedReader reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
             PrintWriter writer = new PrintWriter(socket.getOutputStream(), true);
             BufferedReader userInput = new BufferedReader(new InputStreamReader(System.in))
        ) {
            System.out.println("Connected to the server. Type 'exit' to quit.");

            String userInputLine;
            while ((userInputLine = userInput.readLine()) != null) {
                if (userInputLine.equalsIgnoreCase("exit")) {
                    break;
                }

                writer.println(userInputLine);
                System.out.println("Received from server" + reader.readLine());
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
