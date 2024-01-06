// Initialise le mode = easy/medium/hard 
// donne la taille du tableau et le nombre de drapeau
function modeChoisi() {
    taille = 20;
    nbbombe = 99;
    draps = 99;
    return (taille, nbbombe, draps);
}

//TIMER DU JEU
let decompte;
function decompteur() {
    let temps;
    //différents temps selon le mode choisi
    temps = 900;
    const timerElement = document.getElementById("timer"); //timer affiché sur la page
    function Red_Temps() {
        let m = parseInt(temps / 60, 10); //définit les minutes
        let s = parseInt(temps % 60, 10); //définit les secondes
        //pour l'affichage avec 00:00
        if (m < 10) {
            m = "0" + m;
        }
        if (s < 10) {
            s = "0" + s;
        }
        timerElement.innerText = m + ":" + s;
        if (temps <= 0) {
            temps = 0;
        }
        else {
            temps--;
        }
        // arrêter le jeu quand le decompte est terminé
        if (m == 0 && s == 0) {
            jeu(1, 0, 0);
        }
    }
    decompte = setInterval(Red_Temps, 1000);//1000 c'est 1s, effectue Red_temps les 1s
}

function ResetDecompte() {
    //function qui permet de remettre le compteur à 0 quand partie terminée/changement de mode
    clearInterval(decompte);
    decompteur();
}

//IMAGE DE FOND
function ChangeBack() {
    // fonction qui permet de changer l'image de fond du jeu selon le mode
    document.body.style.backgroundImage = 'url(images/hell.jpg)';
    document.body.style.color = 'white';
    document.body.style.backgroundSize = "cover";
}