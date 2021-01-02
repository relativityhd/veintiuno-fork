VeintiUno
============

## Setup for Developing
### On MacOS/Unix with Homebrew / Brew
+ install homebrew
  ```bash
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
+ install maven
  ```bash
  brew install maven
+ install nodejs
  ```bash
  brew install node
### On Windows (May not working)
+ [Install Maven](http://maven.apache.org/install.html)
+ [Install NodeJS](https://nodejs.org/en/)
### Then for both
+ Clone Repostitory
+ In repositories root folder:
    ```bash
    cd ./react-client/
    npm i
    npm start
+ In repositories root folder:
    ```bash
    cd ./maven-server/server/
    mvn clean install
    mvn exec:java
### Notes
+ Everytime you Update some Java Code (maven-server) you need to run these two commands!
    ```bash
    mvn clean install
    mvn exec:java
+ Eventually you must set some Environment Variables or find other work arrounds:
    + For Maven Server: [Download Java JDK](https://www.oracle.com/java/technologies/javase-jdk14-downloads.html) (NOT JRE!) and set a JAVA_HOME Environment to the downloaded Folder (better put this Folder into Programms or so...)
    + For using Sass with MaterialIO set SASS_PATH to .\node_modules via Terminal

# Abstract
VeintiUno is a students project for programming 101. We use Java and React to create a really stupid game where user picking numbers an try to get to reach 21.
## Here are the rules:
Zwei oder mehr Spieler geben reihum entweder Zahlen zwischen 1 und 9 ein oder nichts
- Die eingegebenen Zahlen werden auf den Stack gelegt.
- Bei Eingabe von „nichts“ werden die letzten2 Zahlenentnommen,addiert und das Ergebnis wird wieder auf den Stack gelegt.
- Siegbedingung:
    - Wer durch seine Aktion den Wert 21 oder mehrerreicht, der gewinnt!
- Einschränkungen:
    - Der Stack soll auf 6Elemente begrenztsein. Eine weitereeingegebene Zahl wird sofort auf die6.addiert.
    - Die Eingabe von „nichts“ zur Addition soll erst ab der 4.Spielrunde möglich sein;in den ersten 3 Spielrunden müssen Zahlen eingegeben werden.
    - Die Eingabe von „nichts“ zur Addition ist nur erlaubt, wenn mindestens 2 Zahlen auf dem Stack liegen.
## This was our challenge:
Erweiterung des Keller-basierten Spiels „21 Plus“ aus Aufgabe 32), bei dem 2 (oder mehr)
Spieler abwechselnd entweder eine Zahl zwischen 1 und 9 zu einem Stack/Keller hinzufügen
oder die obersten 2 Zahlen addieren können, mit dem Ziel 21 oder mehr zu erreichen.
(Genaue Regeln sind in Aufgabe 32 definiert).
Das Spiel soll um einen „intelligenten“ computersimulierten Spieler erweitert werden.
In Bezug zur Vorlesung sollten dabei auch insbesondere die Themen Algorithmenbewertung/-
beschreibung und Datenstrukturen betrachtet werden.
Mögliche Erweiterungen:
- Komfortablere UI-basierte Anwendung (mit Auswahl Anzahl / Art der Spieler,
grafischer Darstellung des Stacks etc.)
- Betrachtung unterschiedlicher Algorithmen für den „intelligenten“
computersimulierten Spieler.
- Highscore-Tabelle
- usw.

## Richtlinien:
Bestandteil der Portfolio-Prüfung des Moduls Programmierung II (Fortgeschrittene
Programmierung, Algorithmen und Datenstrukturen) ist die Umsetzung eines GruppenProgrammierprojektes.
Die Umsetzung erfolgt in einer 5er oder 6er Gruppe (nach Rücksprache sind ggf. auch
abweichende Gruppengrößen möglich). Die Gruppenfindung erfolgt selbst organisiert.
Bewertet werden die Individualleistungen im Rahmen der Gruppenarbeit.
Bewertungsrelevant ist
- abgegebener Programmcode
- Dokumentation
- Abschlusspräsentation
- Anonyme Peerbewertung (in geringerem Umfang)
### Programmcode
Abgabe erfolgt als ein zip-File je Gruppe mit allem relevanten Quellcode, vorzugsweise als
gezipptes Eclipse-Projekt, wenn notwendig einschl. kurzer Installation- und
Bedienungsanleitung.
Die Implementierung unterschiedlicher Bereiche kann durchaus aufgeteilt werden, auf
einzelne Personen oder Untergruppen. Jedes Gruppenmitglied soll aber von jedem
Codebereich ein gewisses Verständnis haben (wird ggf. auch im Rahmen der Präsentation
hinterfragt.)
Siehe auch Bewertungskriterien.
### Dokumentation
Grob 5-10 seitige Dokumentation (je Gruppe) zur Zielsetzung, Umsetzung und den
Ergebnissen des Programmierprojekts. Aus der Dokumentation sollte
Einschl. Nennung der beteiligten Studierenden und ihrer jeweiligen Rollen und Aufgaben in
der Gruppe bzw. Programmteile an deren Erstellung sie beteiligt waren.
### Abschlusspräsentation
Zielsetzung der Abschlusspräsentation ist die Vorstellung der Gruppenarbeit bzw. der
Ergebnisse und Umsetzungsaspekte. Die Präsentation sollte möglichst auch einen Mehrwert
für Studierende der anderen Gruppen haben.
Die Vorstellung sollte durch mehrere Gruppenmitglieder erfolgen.
Jedes Gruppenmitglied muss im Stande sein Rückfragen zu beantworten.
Erfolgt die Präsentation über eine Zoomsitzung (wovon aktuell auszugehen ist), soll auch eine
Webcam eingesetzt werden.
Bitte im Vorfeld Screensharing-/Audio-/Videofunktion evaluieren.
Dauer je Gruppe: ca. 15min Vorstellung plus 10 min Diskussion / Rückfragen.
### Anonyme Peerbewertung
Zusätzlich zur Bewertung durch den Lehrbeauftragten erfolgt eine anonyme Peerbewertung,
die ebenfalls in die Gesamtwertung einfließt. Hierzu bewertet jedes Teammitglied jeweils alle
anderen der Gruppe, in Form einer Tendenzbewertung bezogen auf den Beitrag zum
Gruppenergebnis, das Engagement, sowie die Teamfähigkeit.
Bewertungsstufen:
* (++) Spielte eine klare Hauptrolle im Team
* (+) Beteiligte sich überdurchschnittlich
* (0) Gute angemessene Beteiligung
* (-) Beteiligung unterdurchschnittlich im Vergleich zu anderen Teammitgliedern
* (--) Beteiligung weist kläre Defizite auf / ist unangemessen
Abgabe erfolgt über Moodle bis spätestens 22.05.2020.
Details werden noch bekannt gegeben.

## Bewertungskriterien
- Vollständige Umsetzung der Aufgabenstellung,
einschl. Einhaltung des Abgabeprozesses
- Bezug zu bzw. Miteinbeziehung von
Themengebieten aus der Vorlesung Fortgeschrittene Programmierung,
Algorithmen und Datenstrukturen
- Innovation / Ideenreichtum
- Angemessener Umfang
- Persönlicher Beitrag im Rahmen der Gruppenarbeit
- Qualität der Präsentation
- Präsentation bietet Mehrwert für Zuhörer
- Präsentation stellt Zielsetzung, Vorgehen, Umsetzungsaspekte und
Ergebnisse in geeigneter Weise dar
- Qualität der Dokumentation
- Klare Rollen / Aufgabenverteilung
- Dokumentation ergänzt Präsentation und Programmcode in sinnvoller
Weise
- Programm lässt sich kompilieren, ausführen und nachvollziehen
- Umsetzung kennengelernter Konzepte
- Umsetzung kennengelernter Sprach-Elemente
- Sprechende und korrekte Variablen-/ Methoden-/ Klassennamen
- Code ist sinnvoll formatiert, lesbar sowie logisch strukturiert und
nachvollziehbar

# Important Doku Links:
+ SocketIO for Java: https://github.com/JetBrains/netty-socketio
+ SocketIO-Client for Browser: https://github.com/socketio/socket.io-client
+ MaterialIO for React: https://github.com/material-components/material-components-web-react
