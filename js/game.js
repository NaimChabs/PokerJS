//Création des boutons
let btnmise = document.getElementById('miseinit');
let btnmisedouble = document.getElementById('misedouble');
let btnpasser = document.getElementById('passer');
let change1 = document.getElementById('CJ1');
let change2 = document.getElementById('CJ2');
let change3 = document.getElementById('CJ3');
let change4 = document.getElementById('CJ4');
let change5 = document.getElementById('CJ5');




let couleur = ['C', 'D', 'H', 'S'];
let valeur = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K', 'Q'];
let puissance = ['14', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '13','12'];


// creation tableau avec puissance
let valeurP = [];
for (let i = 0; i < valeur.length; i++){
    valeurP [i]= [valeur[i], puissance[i]];

}


function rand(nb){
    return  Math.floor(Math.random() * nb);
}

class Carte {
    constructor(couleur, valeur, puissance) {
        this.couleur = couleur;
        this.valeur = valeur;
        this.puissance = puissance;
        this.nom = valeur + couleur;
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

    distributionUnit: function (jeuDeck, jeuJ, place) {

            let laCarte = jeuDeck[rand(jeuDeck.length)];
        console.log(laCarte);
            let posLaCarte = jeuDeck.indexOf(laCarte);
        console.log(posLaCarte);

        jeuDeck.splice(posLaCarte,1);
            jeuJ.splice(place, 1,laCarte);




    },

    rangeMain: function (main) {
        let res = [];
        let mainIn = main;
        let mainR = [];

        for (let e of main) {
            res.push(parseInt(e.puissance));
        }
        res.sort((a, b) => a - b );


        for(let e of res){
            for(let i = 0; i < mainIn.length ; i++) {
                if (parseInt(mainIn[i].puissance) === e){
                    mainR.push(main[i]);
                    mainIn.splice(i,1);
                }
            }
        }
        //Deck.jeuJ1 = mainR;  // suite pb mise à jour hors de la fonction
        return main = mainR;  // suite pb mise à jour hors de la fonction



    },



    };  // fin de l'objet Deck



// --- INIT DU JEU
Deck.initDeck(couleur, valeur, puissance);


// Distribution des cartes
Deck.distribution(Deck.jeuDeck, Deck.jeuJ1, 5);
Deck.distribution(Deck.jeuDeck, Deck.jeuJ2, 5);
//Deck.jeuJ2 = Objet.assign(Deck.jeuJ1);
//___________POUR TESTER le jeu de l'ordi
//Deck.jeuJ2 = [Deck.jeuDeck[1],Deck.jeuDeck[2],Deck.jeuDeck[3],Deck.jeuDeck[4],Deck.jeuDeck[5]];







function testsuite(main) {

    let suite = false;
    let i = 1;

do {
    if (parseInt(main[0].puissance) === parseInt(main[i].puissance) - i ) {
        suite = true;
    }
    else {
        suite = false;
    }
    i = i+1;
} while (suite === true && i < 5);



    main.suite = suite;

}

function testCouleur(main) {
    for (let i = 0; i < couleur.length; i++) {
        if (main.filter(e => e.couleur === couleur[i]).length === 5) {
            return main.couleur = true;
            // return main.result = [5,1];
        }
    }
    return main.couleur = false;
}


Deck.jeuJ1 = Deck.rangeMain(Deck.jeuJ1);
Deck.jeuJ2 = Deck.rangeMain(Deck.jeuJ2);
//Deck.rangeMain2(Deck.jeuJ2);

testsuite(Deck.jeuJ1);
testsuite(Deck.jeuJ2);


testCouleur(Deck.jeuJ1);
testCouleur(Deck.jeuJ2);



sameCard(Deck.jeuJ1);
sameCard(Deck.jeuJ2);

//sameCard(Deck.jeuJ1);
// sameCard(Deck.jeuJ2);


function sameCard(main){
    let idem =[];
    let brelan = 0;
    let brelanP = 0;
    let pair = 0;

    if (main.suite === true && main.couleur === true) {  // ________________flush
         return main.result = [21, parseInt(main[4].puissance)];
    }



        for (let i = 0; i < valeur.length; i++){
       //console.log(i);
        //console.log(valeur[i]);
        idem[valeur[i]] = [main.filter(e => e.valeur === valeur[i]).length, puissance[i]];
        if (idem[valeur[i]][0] === 4){
            // return main.carre = true;
            return main.result = [20,puissance[i]]; // ______________________carré
        }
        if (idem[valeur[i]][0] === 3){
            brelan = 1;
            brelanP = puissance[i];
        }

        if (idem[valeur[i]][0] === 2){
            pair += 1;
            if (pair === 1){pairP = puissance[i];}
            if (pair > 1 && puissance[i] > pairP) { pairP = puissance[i];}
        }

    }



    console.log(idem);
   // console.log(brelan);
    // console.log(pair);
    //return main.idem = idem;

    if (pair === 1 && brelan === 1){     //______________________________________ full
        //return main.brelanPair = true;
        main.result = [19,parseInt(brelanP)];
        console.log('full');
        return main.result;
    }


    if (main.couleur === true ) {   // _________________________________________couleur
        console.log('couleur');
        return main.result = [18, parseInt([4].puissance)];
    }

    if (main.suite === true ) {   // ______________________________________________Suite
        console.log('suite');
        return main.suite = [17, parseInt(main[4].puissance)];
    }

    if (brelan === 1){          // ________________________________Brelan
        console.log('brelan');
        return main.result = [16, parseInt(brelanP)];
    }
    //if (idem.filter(e => e === 2).length === 2) {
        if (pair > 1){          //________________________________DoublePair
       // return main.doublePair = true;
            console.log('doublePair');
        return main.result = [15, parseInt(pairP)];
    }



        if (pair === 1){  //____________________________________Pair
            main.result = [14, parseInt(pairP)];
            console.log('pair');
            return main.result;}
           // return main.pair = true;}


        else { return main.result = [0,0]}


}

affOrdi();
affJoueur();

console.log(Deck.jeuJ1);
console.log(Deck.jeuJ2);
let victoire = winner(Deck.jeuJ1, Deck.jeuJ2);

console.log(victoire);





function winner(main1, main2){
    let gagnant;
    if (main1.result[0] > main2.result[0]){
        gagnant = 'joueur';
    }
    if (main1.result[0] < main2.result[0]){
        gagnant = 'ordi';
    }
    if (main1.result[0] === main2.result[0]){

        if (main1.result[1] > main2.result[1]){
            gagnant = 'joueur';
        }
        if (main1.result[1] < main2.result[1]){
            gagnant = 'ordi';
        }
        if (main1.result[1] === main2.result[1]){
            gagnant = 'egal';
        }
    }
    return gagnant;
}

function ordiPlay (jeu, main, victoire){
    let nb = 3;

    if (victoire === 'ordi'){  // on ne fait rien
        return main;

    }

   // if (victoire === 'egal' && ){


   // }
    if (victoire === 'joueur'){
        console.log('jj');
        main.splice(0,nb);

        Deck.distribution(jeu, main, nb);
        main = Deck.rangeMain(main);
       sameCard(main);
        console.log(main);
        Deck.jeuJ2 = main; //a enelever aprsè le debug pour un return ...
       //Deck.rangeMain2(main);
       affOrdi();



    }



}


     //eval('jeuJ1' + couleur[0]) = Deck.jeuJ1.filter(e => e.couleur === couleur[0]);

function jindex() {
    // Créations des boutons en variable
    let play = document.getElementById('go');
    console.log("Initialisation");
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


//function jjeu() {
    // Init. des variables
    localStorage.setItem('mise', 20);
    localStorage.setItem('miseB', 20);
    localStorage.setItem('pot', '0');
    // let cptchange;
    // let nbrCartechange = cptchange;


// Association boutons -> fonctions respective
btnmise.onclick = addmise;
btnmisedouble.onclick = misedouble;
btnpasser.onclick = passer;
change1.addEventListener("click", function() {
    Deck.distributionUnit(Deck.jeuDeck, Deck.jeuJ1, 0);
    affJoueur();
    change1.style.visibility = "hidden" ;});

change2.addEventListener("click", function() {
    Deck.distributionUnit(Deck.jeuDeck, Deck.jeuJ1, 1);
    affJoueur();
    change2.style.visibility = "hidden" ;});

change3.addEventListener("click", function() {
    Deck.distributionUnit(Deck.jeuDeck, Deck.jeuJ1, 2);
    affJoueur();
    change3.style.visibility = "hidden" ;});

change4.addEventListener("click", function() {
    Deck.distributionUnit(Deck.jeuDeck, Deck.jeuJ1, 3);
    affJoueur();
    change4.style.visibility = "hidden" ;});

change5.addEventListener("click", function() {
    Deck.distributionUnit(Deck.jeuDeck, Deck.jeuJ1, 4);
    affJoueur();
    change5.style.visibility = "hidden" ;});



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

function changecard(nb) {
    Deck.jeuJ1.splice(nb, 1);
    Deck.distribution(Deck.jeuDeck, Deck.jeuJ1, 1);
    affJoueur();
    console.log("1");
}

//TEST récup depuis page index
    console.log(localStorage.getItem("pseudo"));
    console.log(localStorage.getItem("budget"));
//}


function affOrdi() {


    document.getElementById("jeuJ21").innerHTML = '<img src="../JPEG/' + Deck.jeuJ2[0].img + '" width="100%" height="100%" >';
    document.getElementById("jeuJ22").innerHTML = '<img src="../JPEG/' + Deck.jeuJ2[1].img + '" width="100%" height="100%">';
    document.getElementById("jeuJ23").innerHTML = '<img src="../JPEG/' + Deck.jeuJ2[2].img + '" width="100%" height="100%">';
    document.getElementById("jeuJ24").innerHTML = '<img src="../JPEG/' + Deck.jeuJ2[3].img + '" width="100%" height="100%">';
    document.getElementById("jeuJ25").innerHTML = '<img src="../JPEG/' + Deck.jeuJ2[4].img + '" width="100%" height="100%">';

}

function affJoueur() {
    document.getElementById("jeuJ11").innerHTML = '<img src="../JPEG/' + Deck.jeuJ1[0].img + '" width="100%" height="100%" >';
    document.getElementById("jeuJ12").innerHTML = '<img src="../JPEG/' + Deck.jeuJ1[1].img + '" width="100%" height="100%">';
    document.getElementById("jeuJ13").innerHTML = '<img src="../JPEG/' + Deck.jeuJ1[2].img + '" width="100%" height="100%">';
    document.getElementById("jeuJ14").innerHTML = '<img src="../JPEG/' + Deck.jeuJ1[3].img + '" width="100%" height="100%">';
    document.getElementById("jeuJ15").innerHTML = '<img src="../JPEG/' + Deck.jeuJ1[4].img + '" width="100%" height="100%">';

}