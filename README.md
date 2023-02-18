# Gantry Glutton - a 3D Fruit Basketgame

[Spiel](https://rayu-u.github.io/GantryGlutton/Fudge/index.html)
[Repository zum Spiel](https://github.com/Rayu-u/GantryGlutton)
[Designdokument](https://docs.google.com/document/d/1LjuBn9BCeejS4iX_immZzFJxjJxzvVEGO0GQM3MNkBY/edit?usp=sharing)

Steuerung: W A S D oder Pfeiltasten für die Steuerung der Plattform. Der Rest ist intuitiv genug. Einfach die Figuren von den Seitenflächen "abholen" und ihnen die richtigen Früchte "besorgen"!

@ Laura Fabricius, Online Medien B. Sc. 5. Semester, an der HFU

im Wintersemester 2022/23 im PRIMA Modul bei Prof. Dipl.-Ing. Jirka R. Dell'Oro-Friedl entstanden.

# PRIMA_WiSe_22-23## Checklist for the final assignment

© Prof. Dipl.-Ing. Jirka R. Dell'Oro-Friedl, HFU
| Nr | Criterion | Explanation |
|---:|---------------------|---------------------------------------------------------------------------------------------------------------------|
| 1 | Units and Positions | Eine Unit ist ein Meter im Spiel. Die positive X-Achse und die negative Z-Achse werden als Hauptachsen verwendet, dies gleicht Blender. |
| 2 | Hierarchy | Die Hierarchie meines Levelgraphs erzeugt voralle einen semantischen Nutzen. Die meisten Elemente, die funktional verknüpft sind, befinden sich auch an ähnlichen Positionen in der Graphhierarchie. |
| 3 | Editor | Verwendet für ein Referenzobjekt für die Kamera, die Komponenten, welche Komponentenskripte verwenden. Einige Eigenschaften wurden auch über den Editor gesetzt, vor allem diejenigen, die in der config nur wenig Sinn gemacht hätten. |
| 4 | Scriptcomponents | All meine funktionellen Einheiten sind agierende Scriptcomponents. z.B. das Verhalten, wenn die Früchte fallen (Fruit) und wenn der Fall "Player enters pickup Zone" eintritt (Customer Queue vermittelt Customers) |
| 5 | Extend | Ich baute einen simplen AudioListener ein, der einfach weniger Attribute verwendet, um meinem Nutzen gerecht zu werden. Damit wird nichts ausversehen im Editor kaputtgemacht. |
| 6 | Sound | die Sounds werden an der Plattform erzeugt und gehört, weil alle Events, bei denen ich Sounds abspiele, in Spielernähe passieren. (Successfully pick up a group of customers and successfully catch a fruit and drop customer). Hier habe ich auch ein kleines Easteregg eingebaut. |
| 7 | VUI | Interface besteht aus Score (Punktezahl) und Progress (Restzeit). Der Endscreen zeigt die Punktenanzahl. |
| 8 | Event-System | Eher weniger nützlich. Habe ein Event, welches bei Zeitablauf ein Signal darüber abgibt. Main fängt dieses ab und läd die Seite neu. |
| 9 | External Data | Meine Config Datei beeinflusst Eigenschaften des Course. Also z.B. wie viele Früchte insgesamt und in welchen Abständen fallen. |
| A | Light | Licht ist notwenig, da 3D. Ein Directional Light für einen einheitlichen Look auf die flatshaded Objekte. Ein Ambience Light, um eine allgemeine helligkeit zu erzeugen. Die ist grau, weil die Szene nicht in einer echten Welt existiert. (Kein Himmel) |
| B | Physics | Ich verwende Kollisionen, um die Plattformen innerhalb der Stage zu halten. (Static Walls, Dynamic Platform) Ich verwende Trigger, um zu erkennen, wenn der Spieler mit der Plattform in einer Pick-up-Zone ge”entered” ist. Außerdem wenn die Früchte die Plattform treffen. Dabei sind die Früchte und die Pick-up-Zones triggers. Ich verwende Forces, um die Plattform mit dem User-Input zu bewegen. Ich verwende einen zufälligen angular Impulse, um den fallenden Customers einen “Kick” zu geben, damit sie interessant fallen. Dies ähnelt einem Torque, ist jedoch wie der Name schon sagt eben eher ein Impuls. Eine grundlegende mir am Herzenliegende Idee war es, den Customers einen “wobbly” Look zu verleihen, während sie auf diesem fahrenden “Restaurant” herumfahren. Deshalb verwendete ich Spherical Joints auf dem Customer, damit der Rigidbody darunter “fest” auf der Plattform bleibt, während er seine Rotation anpasst.|

#GameZone Application:

[250 x 100 pixel!](klein.png)
[1920 x 400 pixel!](weit.png)
Genre: 3D Basket Game
Tags: 3D, FUDGE, PRIMA, WS22/23
Subtitle: Fruit is served! Wie viele schaffst du?
Instructions: Bewege die Plattform mit WASD oder den Pfeiltasten um die Customers abzuholen und gib ihnen die richtigen Früchte!

Ich stimme zu, dass meine Anwendung in der GameZone mit explizitem Verweis zu mir, Laura Fabricius, zur Schau gestellt werden darf.
