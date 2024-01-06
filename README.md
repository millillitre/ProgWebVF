# Programmation Web
Projet 2 - Web application
Marie-Line Da Costa Bento, Léo Dalquier, Saad Zeghari, Anya Meetoo

Cahier des charges

REQUIRE:
Il nous faut au moins une page HTML et une page JS.
1. String object
2. Functions
3. Conditional Statements 
4. Loops: should include the use of at least While, for ... in and for .. of loop
5. Arrays
6. JavaScript Validation
7. Prototypes & User-defined objects
8. DOM, more specifically manipulation of HTML elements using JavaScript. Manipulation should include:
    - addition of HTML elements
    - remove of HTML elements
    - Update of HTML elements (changing the content or changing the style)
The web application should be hosted online. There are several online services that propose free hosting.

Notre idée : Le démineur 

REQUIRE :
- Une matrice recouverte qui se découvre sur appui
- Des cases de différents types : bombes / chiffres / vides / drapeau 
- Affichage d'un nombre de drapeaux et positionnement de drapeaux sur les cases
- Affichage du temps (décompteur) 
- Changement de niveaux possibles (plateauxplus ou moins grand)
- Présence de quelques animations pour la victoire/défaite
- Sons? Leaderborard? (facultatif)

Déroulement :
- La matriche contennant les chiffres et les bombes est caché
- L'utilisateur clique n'importe où : le tableau de mines est créé.
- L'utilisateur peut placer un drapeau avec son clic droit.
    - s'il clique gauche sur une bombe, c'est la fin de la partie
    - s'il clique gauche sur un chiffre, cela le révèle.
        - si le chiffre est 0, cela libere les cases vides autour  
- En fin de partie, on revele toutes les bombes et le nb de drapeaux restants
