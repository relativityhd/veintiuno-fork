package veintiuno.Scores;

import java.io.BufferedReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;

public class MyReader {

    private BufferedReader myreader;
    private Path myfile;
    private Boolean isopen = false;

    public MyReader (String ptFile) {
        try {
            myfile = Paths.get(ptFile);
            if (!Files.exists(myfile)) Files.createFile(myfile);
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public void openFile () {
        try {
            if (!isopen) {
                myreader = Files.newBufferedReader(myfile);
                isopen = true;
            }
        } catch (Exception e) {
            System.out.println("Couldn't open File " + myfile + ". An error occured.");
            System.out.println(e);
        }
    }

    public void closeFile () {
        try{
            if (isopen) {
                myreader.close();
                isopen = false;
            }
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    // Read next line
    public String readLn () {
        try {
            if (isopen) {
                return myreader.readLine();
            } else {
                System.out.println("Couln't read Line of File " + myfile + ". File is not open.");
            }
        } catch (NullPointerException e) {

        } catch (Exception e) {
            System.out.println("Couln't read Line of File " + myfile + ". An error occurred.");
            System.out.println(e);
        }
        return "";
    }

    // To Array
    public ArrayList<String> readArr () {
        ArrayList<String> arr = new ArrayList<String>();
        try {
            if (isopen) {
                String line = myreader.readLine();
                while (!line.equals("")) {
                    arr.add(line);
                    line = myreader.readLine();
                }
            } else {
                System.out.println("Couln't read Line of File " + myfile + ". File is not open.");
            }
        } catch (NullPointerException e) {
            
        } catch (Exception e) {
            System.out.println("Couln't read Line of File " + myfile + ". An error occurred.");
            System.out.println(e);
        }
        return arr;
    }
}
