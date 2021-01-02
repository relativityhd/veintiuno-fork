package veintiuno.Scores;

import java.io.BufferedWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;

public class MyWriter {

    private BufferedWriter mywriter;
    private Path myfile;
    private Boolean isopen = false;

    // Passes argument ptFile for "path to file"
    public MyWriter(String ptFile) {
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
                mywriter = Files.newBufferedWriter(myfile);
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
                mywriter.close();
                isopen = false;
            }
        } catch (Exception e) {
            System.out.println("Couldn't close File " + myfile + ". An error occured.");
            System.out.println(e);
        }
    }

    // Write a line
    public void writeLn (String line) {
        try {
            if (isopen) {
                mywriter.write(line + "\n");
            } else {
                System.out.println("Couln't write Line to File " + myfile + ". File is not open.");
            }
        } catch (Exception e) {
            System.out.println("Couln't write Line to File " + myfile + ". An error occurred.");
            System.out.println(e);
        }
    }

    // Write an array
    public void wrtieArr (ArrayList<String> arr) {
        try {
            if (isopen) {
                for (String line : arr) {
                    mywriter.write(line + "\n");
                }
            } else {
                System.out.println("Couln't write Line to File " + myfile + ". File is not open.");
            }
        } catch (Exception e) {
            System.out.println("Couln't write Line to File " + myfile + ". An error occurred.");
            System.out.println(e);
        }
    }
}
