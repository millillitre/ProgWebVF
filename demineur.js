let taille = 0; // taille de la grille
let nbbombe = 0; // nombre de bombes dans la grille
let draps = 0;
let matriceBombesChiffres = []; // matrice contenant les bombes et les chiffres (nb de bombes au voisinage de la case)
let matriceHistorique = []; // matrice qui sauvegarde les cases cliquees du user
let matriceBombes = []; // matrice des positions des bombes
let table = []; // table affichee en HTML
let matriceDraps = []; // matrice des positions des drapeaux places

// NOTE
let representBombe = -1


//affiche le tableau a l'ecran
function afficheTab(table) {
    document.getElementById("countdrapeau").innerHTML = draps;
    table.innerHTML = ""; // efface le tableau pour mettre des nouvelles valeurs
    // affiche le tableau
    let i = 0; // ligne 0
    let j = 0; // colonne 0
    for (i = 0; i < taille; i++) { // pour chaque ligne 

        const Ligne = document.createElement("TR");

        for (j = 0; j < taille; j++) { // pour chaque colonne
            const i2 = i;
            const j2 = j;
            let Cell = document.createElement("TD"); // pour chaque case sur la ligne du tableau
            const bouton = document.createElement("button"); // creer un button a chaque case
            bouton.setAttribute("type", "button");
            bouton.setAttribute("name", "button");

            // ajoute l'élement nécéssaire à chaque cellule du tableau
            if (matriceHistorique[i][j] == representBombe) { // si la case n'a pas ete cliquee
                if (matriceBombesChiffres[i][j] == representBombe) { // si c'est une bombe 
                    bouton.setAttribute("id", "buttonhide");
                    bouton.onclick = function () { jeu(1, i2, j2) };
                    bouton.onmouseup = function () { gestion_cliques(event, 1, i2, j2, bouton) }
                    Cell.appendChild(bouton);
                }
                else { // si c'est un chiffre

                    bouton.setAttribute("id", "buttonhide");
                    bouton.onclick = function () { jeu(0, i2, j2) };
                    bouton.onmouseup = function () { gestion_cliques(event, 0, i2, j2, bouton) }
                    Cell.appendChild(bouton);
                }

                if (matriceDraps[i][j] == 1) {                   //Doit-on afficher un drapeau sur la matrice
                    bouton.setAttribute("id", "buttondraps");
                    Cell.appendChild(bouton);
                }

                else {
                    bouton.setAttribute("id", "buttonhide");    //Doit-on enlever un drapeau de la matrice
                    Cell.appendChild(bouton);
                }
            }
            else { // si la case a deja ete cliquee
                if (matriceBombesChiffres[i][j] == 0) { // si c'est un 0

                    bouton.setAttribute("id", "buttonrien");
                    //bouton.innerText = matriceBombesChiffres[i][j];
                    Cell.appendChild(bouton);
                }
                else if (matriceBombesChiffres[i][j] == representBombe) { // si c'est une bombe

                    bouton.setAttribute("id", "buttonbombe");
                    bouton.innerText = matriceBombesChiffres[i][j];
                    Cell.appendChild(bouton);
                }
                else { // si c'est un chiffre

                    bouton.setAttribute("id", "buttonchiffre");
                    bouton.innerText = matriceBombesChiffres[i][j];
                    Cell.appendChild(bouton);
                }

            }


            // on ecrit la ligne case par case
            Ligne.appendChild(Cell);

        }
        // on ecrit le tableau ligne par ligne
        table.appendChild(Ligne);
    }
}

// Initialise une matriceBombesChiffres avec bombes et chiffres et la renvoit 
// Modifie le tableau pour le début de partie
function initTable() {
    table = document.getElementById("tableNonCache"); // tableau affiché sur écran

    matriceBombesChiffres = [];
    matriceBombes = [];
    matriceHistorique = [];
    matriceDraps = [];

    // remplit la matriceBombesChiffres de zeros
    for (let l = 0; l < taille; l++) {
        let arrayzeros1 = [];
        for (let c = 0; c < taille; c++) {
            arrayzeros1.push(0);
        }
        matriceBombesChiffres.push(arrayzeros1);
    }
    // remplit la matriceBombes de zeros
    for (let l = 0; l < taille; l++) {
        let arrayzeros2 = [];
        for (let c = 0; c < taille; c++) {
            arrayzeros2.push(0);
        }
        matriceBombes.push(arrayzeros2);

    }

    // remplit la matriceHistorique de -1
    for (let l = 0; l < taille; l++) {
        let arrayvide = [];
        for (let c = 0; c < taille; c++) {
            arrayvide.push(-1);
        }
        matriceHistorique.push(arrayvide);
    }

    // remplit la matriceDraps de 0
    for (let l = 0; l < taille; l++) {
        let arrayvide = [];
        for (let c = 0; c < taille; c++) {
            arrayvide.push(0);
        }
        matriceDraps.push(arrayvide);
    }

    // les bombes dans la matriceBombesChiffres a des positions randoms et on copie les positions dans matriceBombes
    while (nbbombe > 0) {

        let randomligne = Math.floor(Math.random() * taille); // ligne random
        let randomcolonne = Math.floor(Math.random() * taille); // colonne random

        if (matriceBombesChiffres[randomligne][randomcolonne] == 0) { // si pas de bommbe déjà, mettre une bombe
            matriceBombes[randomligne][randomcolonne] = representBombe;
            matriceBombesChiffres[randomligne][randomcolonne] = representBombe;
            nbbombe--;
        }

    }

    // Compte les bombes autour de chaque case
    Chiffres(matriceBombesChiffres, taille, taille)
    // Affiche la table à l'écran
    afficheTab(table);

}

// Compte les nombres de bombes autour d'une case et update la matriceBombesChiffres
function Chiffres(matriceBombesChiffres, maxLigne, maxColonne) {
    for (let i = 0; i < maxLigne; i++) { //maxLigne est le num de la dernière ligne 
        for (let j = 0; j < maxColonne; j++) { //maxColonne est le num de la dernière colonne
            if (matriceBombesChiffres[i][j] == representBombe) { // si on est sur une bombe
                let Ideb = i; // ligne debut
                let Ifin = i; // ligne fin
                let Jdeb = j; // colonne debut
                let Jfin = j; // colonne fin

                // LIGNE DEBUT
                if (i - 1 >= 0) { // si on est pas sur le bord haut
                    Ideb = i - 1;
                }
                // LIGNE FIN
                if (i + 1 < maxLigne) { // si on est pas sur le bord bas
                    Ifin = i + 1;
                }

                // COLONNE DEBUT
                if (j - 1 >= 0) { // si on est pas sur le bord gauche
                    Jdeb = j - 1;
                }
                // COLONNE FIN
                if (j + 1 < maxColonne) { // si on est pas sur le bord droit
                    Jfin = j + 1;
                }

                // On ajoute des 1 sur les cases au voisinage de la bombe
                for (let l = Ideb; l <= Ifin; l++) {
                    for (let c = Jdeb; c <= Jfin; c++) {
                        if (matriceBombesChiffres[l][c] != representBombe && matriceBombesChiffres[l][c] < 9) { // si on n'est pas sur la case bombe
                            matriceBombesChiffres[l][c] = matriceBombesChiffres[l][c] + 1; // rajout un 1
                        }
                    }
                }
            }
        }
    }
}

// Affiche tous les zeros au voisinage de la case zero clique
function afficheZeros(matrice, i, j) {
    const stack = [{ i, j }]; //initialisation d'une pile contenant les lignes et colonnes
    if (matrice[i][j] != 0) { // si la cellule est différente de zéro alors on ne fait pas la fonction
        return;
    }
    const visited = []; //matrice contenant les cases à zéro
    while (stack.length > 0) {
        const current = stack.pop(); //supprime le dernier élément de la pile et le retourne dans current
        visited.push(current); //ajoute current à la fin de visited
        const { i, j } = current;
        for (let ligne = -1; ligne < 2; ligne++) {
            for (let colonne = -1; colonne < 2; colonne++) {
                //enleve les drapeaux posés sur les cases zéros
                if (matriceDraps[i][j] == 1) {
                    draps += 1;
                    matriceDraps[i][j] = 0;
                }
                //si on atteint les bords
                if (i + ligne < 0 || j + colonne < 0) {
                    continue;
                }
                if (i + ligne >= matrice.length || j + colonne >= matrice.length) {
                    continue;
                }
                // si la cellule suivante est différente de zéro alors on continue
                if (matrice[i + ligne][j + colonne] != 0) {
                    continue;
                }
                //teste si au moins un élément de visited a pour ligne la ligne suivante ou pour colonne la colonne suivante
                if (visited.some((v) => v.i == i + ligne && v.j == j + colonne)) {
                    continue;
                }
                stack.push({ //ajoute les lignes i+1 et j+1 à la fin de la pile
                    i: i + ligne,
                    j: j + colonne
                });
            }
        }
    }
    for (visit of visited) {
        matriceHistorique[visit.i][visit.j] = 0; // met les cases de visited dans la matrice historique à zero
    };
}

// Comparaison entre 2 matrices
function matrice_egale(matA, matB) {
    let i = 0;
    let j = 0;
    let res = 1;
    for (i = 0; i < matA.length; i++) { // chaque ligne 
        for (j = 0; j < matA[i].length; j++) { //chaque colonne
            if (matA[i][j] != matB[i][j]) { // si les cases sont différentes
                res = 0;
            }
        }
    }
    return res;
}

function gestion_cliques(event, fin, i, j, bouton) {
    let boubaloo;

    if (event.which) {
        switch (event.which) {
            case 1: //Clique gauche
                boubaloo = "G";
                //enleve les drapeaux posés sur les cases zéros
                if (matriceDraps[i][j] == 1) {
                    draps += 1;
                    matriceDraps[i][j] = 0;
                }
                jeu(fin, i, j);
                break;
            case 2: //clique milieu
                boubaloo = "M";
                break;
            case 3: //clique droit
                boubaloo = "D";

                if (matriceDraps[i][j] == 1) {
                    draps += 1;
                    matriceDraps[i][j] = 0;

                    //document.getElementById("buttonhide").style.background = rgb(255, 4, 108); MARCHE PAS

                }
                else if (matriceDraps[i][j] == 0) {
                    if (draps > 0) {
                        draps -= 1;
                        matriceDraps[i][j] = 1;
                        //document.getElementById("buttonhide").style.background = rgb(4, 4, 108); MARCHE PAS

                    }
                }

                break;
        }
    }

    //alert(boubaloo);
    afficheTab(table);
    document.getElementById("countdrapeau").innerHTML = draps;
    return (draps);
}

function affichageFin(message){
    clearInterval(decompte); // arrete le decompteur
    for (i=0; i<taille; i++){
        for (j=0; j<taille; j++){
            matriceHistorique[i][j] = 0; // toutes les cases doivent être affichees
            if (matriceBombesChiffres[i][j] == representBombe){ // on dessine une bombe pour l'affichage
                representBombe = "💣";
                matriceBombesChiffres[i][j] = representBombe;
                representBombe = -1;
            };
        }
    }
    representBombe = "💣";
    afficheTab(table); // on affiche le tableau de fin 
    representBombe = -1;
    
    document.getElementById("MessageFin").innerHTML = message; // Message soit le joueur a gagne ou perdu
}

function resetGame(){
    document.getElementById("MessageFin").innerHTML = "EN JEU";
    modeChoisi();
    ChangeBack();
    initTable(); // reset la grille et l'affiche
    ResetDecompte();
}

// Lance le jeu
// fini le jeu si on trouve toutes les bombes ou user a clique sur une bombe
function jeu(GameOver, i, j) {
    if (GameOver) { // si user clique sur une bombe
        affichageFin("YOU LOSE!");
        //perdu();
    }
    else { // si c'est un chiffre
        matriceHistorique[i][j] = 0; // update la matrice de cliques, on a clique sur la case
        afficheZeros(matriceBombesChiffres, i, j);
        if (matrice_egale(matriceHistorique, matriceBombes)) { // si on a clique sur toutes les cases sauf les bombes, on a gagne
            affichageFin("YOU WIN!");
            //gagne();
        }
    }
    afficheTab(table); // affiche le tableau updated
}