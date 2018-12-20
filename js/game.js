<<<<<<< HEAD

let couleur = ['C', 'D', 'H', 'S'];
let valeur = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K', 'Q'];
let puissance = ['13', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];




function rand(nb){
    return  Math.floor(Math.random() * nb);
}
class Carte {
    constructor(couleur, valeur, puissance) {
        this.couleur = couleur;
        this.valeur = valeur;
        this.puissance = puissance;
        this.nom = couleur + valeur;
        this.img = this.nom + '.jpg';
    }
}




let Deck = {
    jeuDeck: [],
    jeuJ1: [],
    jeuJ2: [],



    initDeck: function (couleur, valeur, puissance) {
       for (let i of couleur) {
            for(let e in valeur) {
               // console.log(couleur[i] + '    ' + valeur[e]);
                this.jeuDeck.push( new Carte(i, valeur[e], puissance[e]) );}
            }
        },


   distribution: function (jeuDeck, jeuJ, nbCarteOut) {
        for (let i = 0; i < nbCarteOut; i++){
            let laCarte = jeuDeck[rand(jeuDeck.length)];
            let posLaCarte = jeuDeck.indexOf(laCarte);
            jeuDeck.splice(posLaCarte,1);
            jeuJ.push(laCarte);
           // console.log(laCarte);


        }
    },

    };  // fin de l'objet Deck



// --- INIT DU JEU
Deck.initDeck(couleur, valeur, puissance);


// Distribution des cartes
Deck.distribution(Deck.jeuDeck, Deck.jeuJ1, 5);
//Deck.distribution(Deck.jeuDeck, Deck.jeuJ2, 5);

Deck.jeuJ2 = [Deck.jeuDeck[1],Deck.jeuDeck[1],Deck.jeuDeck[2],Deck.jeuDeck[2],Deck.jeuDeck[2]];


// Evaluation des mains


testCouleur(Deck.jeuJ1);
testCouleur(Deck.jeuJ2);




function testCouleur(main){
    for (let i = 0; i < couleur.length; i++) {
    if (main.filter(e => e.couleur === couleur[i]).length === 5) {
        return main.couleurM = true;
    }}}

sameCard(Deck.jeuJ1);
sameCard(Deck.jeuJ2);


function sameCard(main){
    let idem =[];
    let brelan = 0;
    let pair = 0;

    for (let i = 0; i < valeur.length; i++){
       //console.log(i);
        //console.log(valeur[i]);
        idem[valeur[i]] = main.filter(e => e.valeur === valeur[i]).length;

        if (idem[valeur[i]] === 4){
            return main.carre = true;
        }
        if (idem[valeur[i]] === 3){
            brelan += 1;
        }

        if (idem[valeur[i]] === 2){
            pair += 1;
        }
      //  console.log(idem[i]);
    }
   // return main.idem = idem;
    console.log(idem);

    if (idem.filter(e => e === 2).length === 2) {
        return main.doublePair = true;
    }
/*
    for (let u of idem){
        console.log(u);
        if (u === 4){
            return main.carre = true;
        }
        if (u === 3){
            brelan += 1;
        }
        if (idem.filter(e => e === 2).length === 2) {
            return main.doublePair = true;
        }
        if (u === 2){
            pair += 1;
        }

    }
*/

    if (pair === 1 && brelan === 1){
        return main.brelanPair = true;}

        else if (pair === 1){
            return main.pair = true;}


}

console.log(Deck.jeuJ1);
console.log(Deck.jeuJ2);


     //eval('jeuJ1' + couleur[0]) = Deck.jeuJ1.filter(e => e.couleur === couleur[0]);
=======
function jindex() {
    // Créations des boutons en variable
    let play = document.getElementById('go');
    console.log("Initialisation");
>>>>>>> 4ebca8fed323365a50eecadf364de85332a25de7

    // Association boutons -> fonctions respective
    play.onclick = init;

    //Fonctions
    function init() {
        names = document.getElementById('Pseudo').value;
        money = document.getElementById('Budget').value;
        localStorage.setItem("pseudo", names);
        localStorage.setItem("budget", money);
        window.location = 'pokerjeu.html';
    }
}

//Page jeu
function jjeu() {
    // Init. des variables globales
    localStorage.setItem('mise', 20);
    localStorage.setItem('miseB', 20);
    localStorage.setItem('pot', '0');
    // let cptchange;
    // let nbrCartechange = cptchange;

    //Création des boutons
    let btnmise = document.getElementById('miseinit');
    let btnmisedouble = document.getElementById('misedouble');
    let btnpasser = document.getElementById('passer');

    // Association boutons -> fonctions respective
    btnmise.onclick = addmise;
    btnmisedouble.onclick = misedouble;
    btnpasser.onclick = passer;

    //Affichage
    function affichage() {
        document.getElementById("miseAffich").innerHTML = 'Mise : ' + localStorage.mise + '€'; //Stat mise
        document.getElementById("potAffich").innerHTML = 'Pot : ' + localStorage.pot + '€'; //Stat pot
        document.getElementById("affpot").innerHTML = 'Pot : ' + localStorage.pot + '€'; //Stat pot
        document.getElementById("budgetAffich").innerHTML = 'Budget : ' + localStorage.budget + '€'; //Stat budget
        console.log("ok");
    }

    // Fonctions
    // Mise 20
    function addmise() {
        localStorage.budget = parseInt(localStorage.budget) - parseInt(localStorage.mise); // Budget -= mise du joueur
        localStorage.pot = parseInt(localStorage.mise) + parseInt(localStorage.miseB); // Pot = Mise joueur+Bot
        console.log('mise ' + localStorage.mise);// Test ordre d'appel
        console.log('Budget ' + localStorage.budget); // Test ordre d'appel
        console.log('Pot ' + localStorage.pot); // Test ordre d'appel
        console.log("pas ok"); // Test ordre d'appel
        document.getElementById('miseinit').style.visibility = 'hidden'; //Cache les boutons
        document.getElementById('misedouble').style.visibility = 'hidden'; //Cache les boutons
        document.getElementById("actionAffich").innerHTML = 'Action : Mise 20€'; //action effectué

        affichage(); // refresh l'affichage des stats


    }

    // Mise 40
    function misedouble() {
        localStorage.mise = 40; // On mise 40
        localStorage.budget = parseInt(localStorage.budget) - parseInt(localStorage.mise); //Budget -= miseJ
        localStorage.pot = parseInt(localStorage.mise) + parseInt(localStorage.miseB); //Pot = MiseJ+B
        console.log('mise ' + localStorage.mise); //TEST
        console.log('Budget ' + localStorage.budget); //TEST
        console.log('Pot ' + localStorage.pot); //TEST
        console.log("oui"); //TEST ordre
        document.getElementById('miseinit').style.visibility = 'hidden'; //Cache
        document.getElementById('misedouble').style.visibility = 'hidden'; //Cache
        document.getElementById("actionAffich").innerHTML = 'Action : Mise 40€'; //action effectué
        affichage(); //refresh stats display
    }

    // Passer le tour
    function passer() {
        localStorage.mise = 0; //On joue pas
        document.getElementById('miseinit').style.visibility = 'hidden'; //Cache les boutons
        document.getElementById('misedouble').style.visibility = 'hidden'; //Cache les boutons
        document.getElementById('passer').style.visibility = 'hidden'; //Cache les boutons
        document.getElementById('actionAffich').innerHTML = 'Action : Couché'; //action effectué
        console.log("perdu"); //Test
        //END GAME ICI et reboot
        affichage();
    }

    //TEST récup depuis page index
    console.log(localStorage.getItem("pseudo"));
    console.log(localStorage.getItem("budget"));
}


function changecarte() {
    cptchange++;
}

function valider() {
    distribution(nbrCartechange);
}