//Création des boutons
let btnmise = document.getElementById('miseinit');
let btnmisedouble = document.getElementById('misedouble');
let btnpasser = document.getElementById('passer');
let change1 = document.getElementById('CJ1');
let change2 = document.getElementById('CJ2');
let change3 = document.getElementById('CJ3');
let change4 = document.getElementById('CJ4');
let change5 = document.getElementById('CJ5');
let partie = document.querySelector('#distribuer');
let val = document.getElementById("valid");
let cartechange = [];
let victoire;
let mess_result; // message de fin de tour
localStorage.setItem('mise', 0);
localStorage.setItem('miseB', 0);
localStorage.setItem('pot', '0');
let budgetInit = parseInt(localStorage.budget);

document.getElementById('miseinit').style.visibility = 'hidden'; //Cache les boutons
document.getElementById('misedouble').style.visibility = 'hidden'; //Cache les boutons
document.getElementById('passer').style.visibility = 'hidden'; //Cache les boutons
document.getElementById("affpot").style.visibility = 'hidden'; //Stat pot
document.getElementById("valid").style.visibility = 'hidden'; //Stat pot


let couleur = ['C', 'D', 'H', 'S'];
let valeur = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K', 'Q'];
let puissance = ['14', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '13', '12'];


partie.addEventListener('click', function () {
    nouvellepartie();
    localStorage.mise = 20;
    localStorage.miseB = 20;
    localStorage.pot = parseInt(localStorage.mise) + parseInt(localStorage.miseB); // Pot = Mise joueur+Bot;
    affichage();
    // btnon();
    btnvalider();
    // partiecommence++;
});

// creation tableau avec puissance
let valeurP = [];
for (let i = 0; i < valeur.length; i++) {
    valeurP [i] = [valeur[i], puissance[i]];

}


function rand(nb) {
    return Math.floor(Math.random() * nb);
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
            for (let e in valeur) {
                // console.log(couleur[i] + '    ' + valeur[e]);
                this.jeuDeck.push(new Carte(i, valeur[e], puissance[e]));
            }
        }
    },


    distribution: function (jeuDeck, jeuJ, nbCarteOut) {
        for (let i = 0; i < nbCarteOut; i++) {
            let laCarte = jeuDeck[rand(jeuDeck.length)];
            let posLaCarte = jeuDeck.indexOf(laCarte);
            jeuDeck.splice(posLaCarte, 1);
            jeuJ.push(laCarte);
            // console.log(laCarte);


        }
    },

    distributionUnit: function (jeuDeck, jeuJ, place) {

        let laCarte = jeuDeck[rand(jeuDeck.length)];
        console.log(laCarte);
        let posLaCarte = jeuDeck.indexOf(laCarte);
        console.log(posLaCarte);

        jeuDeck.splice(posLaCarte, 1);
        jeuJ.splice(place, 1, laCarte);


    },

    rangeMain: function (main) {
        let res = [];
        let mainIn = main;
        let mainR = [];

        for (let e of main) {
            res.push(parseInt(e.puissance));
        }
        res.sort((a, b) => a - b);


        for (let e of res) {
            for (let i = 0; i < mainIn.length; i++) {
                if (parseInt(mainIn[i].puissance) === e) {
                    mainR.push(main[i]);
                    mainIn.splice(i, 1);
                }
            }
        }
        return main = mainR;  // suite pb mise à jour hors de la fonction


    },


};  // fin de l'objet Deck


// --- INIT DU JEU

function nouvellepartie() {
    Deck.initDeck(couleur, valeur, puissance);

    Deck.distribution(Deck.jeuDeck, Deck.jeuJ1, 5);
    Deck.distribution(Deck.jeuDeck, Deck.jeuJ2, 5);
    document.querySelector(".joueur1").style.visibility = "visible";
    change1.style.visibility = "visible";
    change2.style.visibility = "visible";
    change3.style.visibility = "visible";
    change4.style.visibility = "visible";
    change5.style.visibility = "visible";
    document.querySelector(".joueur2").style.visibility = "visible";
    partie.style.visibility = "hidden";

//Deck.jeuJ2 = Objet.assign(Deck.jeuJ1);
//___________POUR TESTER le jeu de l'ordi
//Deck.jeuJ2 = [Deck.jeuDeck[1],Deck.jeuDeck[2],Deck.jeuDeck[3],Deck.jeuDeck[4],Deck.jeuDeck[5]];

    Deck.jeuJ1 = Deck.rangeMain(Deck.jeuJ1);
    Deck.jeuJ2 = Deck.rangeMain(Deck.jeuJ2);



    eval();
    affOrdiback();
    affJoueur();

    console.log(Deck.jeuJ1);
    console.log(Deck.jeuJ2);

    console.log(victoire);
}

function eval(){
    testsuite(Deck.jeuJ1);
    testsuite(Deck.jeuJ2);

    testCouleur(Deck.jeuJ1);
    testCouleur(Deck.jeuJ2);

    sameCard(Deck.jeuJ1);
    sameCard(Deck.jeuJ2);

    victoire = winner(Deck.jeuJ1, Deck.jeuJ2);
    console.log(victoire);


}

function testsuite(main) {

    let suite = false;
    let i = 1;

    do {
        if (parseInt(main[0].puissance) === parseInt(main[i].puissance) - i) {
            suite = true;
        } else {
            suite = false;
        }
        i = i + 1;
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


function sameCard(main) {
    let idem = [];
    let brelan = 0;
    let brelanP = 0;
    let pair = 0;

    if (main.suite === true && main.couleur === true) {  // ________________flush
        return main.result = [21, parseInt(main[4].puissance)];
    }


    for (let i = 0; i < valeur.length; i++) {
        //console.log(i);
        //console.log(valeur[i]);
        idem[valeur[i]] = [main.filter(e => e.valeur === valeur[i]).length, puissance[i]];
        if (idem[valeur[i]][0] === 4) {
            // return main.carre = true;
            return main.result = [20, puissance[i]]; // ______________________carré
        }
        if (idem[valeur[i]][0] === 3) {
            brelan = 1;
            brelanP = puissance[i];
        }

        if (idem[valeur[i]][0] === 2) {
            pair += 1;
            if (pair === 1) {
                pairP = puissance[i];
            }
            if (pair > 1 && puissance[i] > pairP) {
                pairP = puissance[i];
            }
        }

    }


    console.log(idem);
    // console.log(brelan);
    // console.log(pair);
    //return main.idem = idem;

    if (pair === 1 && brelan === 1) {     //______________________________________ full
        //return main.brelanPair = true;
        main.result = [19, parseInt(brelanP)];
        console.log('full');
        return main.result;
    }


    if (main.couleur === true) {   // _________________________________________couleur
        console.log('couleur');
        return main.result = [18, parseInt([4].puissance)];
    }

    if (main.suite === true) {   // ______________________________________________Suite
        console.log('suite');
        return main.suite = [17, parseInt(main[4].puissance)];
    }

    if (brelan === 1) {          // ________________________________Brelan
        console.log('brelan');
        return main.result = [16, parseInt(brelanP)];
    }
    //if (idem.filter(e => e === 2).length === 2) {
    if (pair > 1) {          //________________________________DoublePair
        // return main.doublePair = true;
        console.log('doublePair');
        return main.result = [15, parseInt(pairP)];
    }


    if (pair === 1) {  //____________________________________Pair
        main.result = [14, parseInt(pairP)];
        console.log('pair');
        return main.result;
    }
    // return main.pair = true;}


    else {
        return main.result = [0, 0]
    }


}

function winner(main1, main2) {
    let gagnant;
    if (main1.result[0] > main2.result[0]) {
        gagnant = 'joueur';
    }
    if (main1.result[0] < main2.result[0]) {
        gagnant = 'ordi';
    }
    if (main1.result[0] === main2.result[0]) {

        if (main1.result[1] > main2.result[1]) {
            gagnant = 'joueur';
        }
        if (main1.result[1] < main2.result[1]) {
            gagnant = 'ordi';
        }
        if (main1.result[1] === main2.result[1]) {
            gagnant = 'egal';
        }
    }
    return gagnant;
}

function ordiPlay(jeu, main, victoire) {
    let nb = 3;

    if (victoire === 'ordi') {  // on ne fait rien
        localStorage.miseB = localStorage.mise; // l'ordi s'aligne sur la mise du joueur
        localStorage.pot = parseInt(localStorage.mise) + parseInt(localStorage.miseB);
        affOrdi(); // a enlever à terme

      //  return main;
    }

    if (victoire === 'egal' ){
        localStorage.miseB = localStorage.mise; // l'ordi s'aligne sur la mise du joueur
        localStorage.pot = parseInt(localStorage.mise) + parseInt(localStorage.miseB);
        affOrdi(); // a enlever à terme



    }

    if (victoire === 'joueur') {
        console.log('jj');
        main.splice(0, nb);

        Deck.distribution(jeu, main, nb);
        main = Deck.rangeMain(main);
        //sameCard(main);
        console.log(main);
        Deck.jeuJ2 = main; //a enelever aprsè le debug pour un return ...
        //Deck.rangeMain2(main);
        eval();
        console.log(victoire);
        // tour de mise de l'ordi
        if (victoire === 'ordi'){
            localStorage.miseB = localStorage.mise; // l'ordi s'aligne sur la mise du joueur
            localStorage.pot = parseInt(localStorage.mise) + parseInt(localStorage.miseB);
        }
        else { }//il ne mise pas}

        affOrdi();
    }

    setTimeout(finPartie, 2000);

}

function affOrdi() {

    document.getElementById("jeuJ21").innerHTML = '<img src="../JPEG/' + Deck.jeuJ2[0].img + '" width="100%" height="100%" >';
    document.getElementById("jeuJ22").innerHTML = '<img src="../JPEG/' + Deck.jeuJ2[1].img + '" width="100%" height="100%">';
    document.getElementById("jeuJ23").innerHTML = '<img src="../JPEG/' + Deck.jeuJ2[2].img + '" width="100%" height="100%">';
    document.getElementById("jeuJ24").innerHTML = '<img src="../JPEG/' + Deck.jeuJ2[3].img + '" width="100%" height="100%">';
    document.getElementById("jeuJ25").innerHTML = '<img src="../JPEG/' + Deck.jeuJ2[4].img + '" width="100%" height="100%">';

}

function affOrdiback() {


    document.getElementById("jeuJ21").innerHTML = '<img src="../JPEG/Red_back.jpg" width="100%" height="100%" >';
    document.getElementById("jeuJ22").innerHTML = '<img src="../JPEG/Red_back.jpg" width="100%" height="100%">';
    document.getElementById("jeuJ23").innerHTML = '<img src="../JPEG/Red_back.jpg" width="100%" height="100%">';
    document.getElementById("jeuJ24").innerHTML = '<img src="../JPEG/Red_back.jpg" width="100%" height="100%">';
    document.getElementById("jeuJ25").innerHTML = '<img src="../JPEG/Red_back.jpg " width="100%" height="100%">';

}

function affJoueur() {
    document.getElementById("jeuJ11").innerHTML = '<img src="../JPEG/' + Deck.jeuJ1[0].img + '" width="100%" height="100%" >';
    document.getElementById("jeuJ12").innerHTML = '<img src="../JPEG/' + Deck.jeuJ1[1].img + '" width="100%" height="100%">';
    document.getElementById("jeuJ13").innerHTML = '<img src="../JPEG/' + Deck.jeuJ1[2].img + '" width="100%" height="100%">';
    document.getElementById("jeuJ14").innerHTML = '<img src="../JPEG/' + Deck.jeuJ1[3].img + '" width="100%" height="100%">';
    document.getElementById("jeuJ15").innerHTML = '<img src="../JPEG/' + Deck.jeuJ1[4].img + '" width="100%" height="100%">';

}


//Page jeu------------------------------------------------------------------------------------------------------
// Init. des variables globales
//function jjeu() {
// Init. des variables

// let cptchange;
// let nbrCartechange = cptchange;


// Association boutons -> fonctions respective
btnmise.onclick = addmise;
btnmisedouble.onclick = misedouble;
btnpasser.onclick = passer;
change1.addEventListener("click", function () {
    // Deck.distributionUnit(Deck.jeuDeck, Deck.jeuJ1, 0);
    // affJoueur();
    cartechange.push(0);
    change1.style.visibility = "hidden";
});

change2.addEventListener("click", function () {
    // Deck.distributionUnit(Deck.jeuDeck, Deck.jeuJ1, 1);
    // affJoueur();
    cartechange.push(1);
    change2.style.visibility = "hidden";
});

change3.addEventListener("click", function () {
    // Deck.distributionUnit(Deck.jeuDeck, Deck.jeuJ1, 2);
    // affJoueur();
    cartechange.push(2);
    change3.style.visibility = "hidden";
});

change4.addEventListener("click", function () {
    // Deck.distributionUnit(Deck.jeuDeck, Deck.jeuJ1, 3);
    // affJoueur();
    cartechange.push(3);
    change4.style.visibility = "hidden";
});

change5.addEventListener("click", function () {
    // Deck.distributionUnit(Deck.jeuDeck, Deck.jeuJ1, 4);
    // affJoueur();
    cartechange.push(4);
    change5.style.visibility = "hidden";
});


//Affichage

function affchange() {
    change1.style.visibility = "hidden";
    change2.style.visibility = "hidden";
    change3.style.visibility = "hidden";
    change4.style.visibility = "hidden";
    change5.style.visibility = "hidden";

}

function affichage() {
    document.getElementById("miseAffich").innerHTML = 'Mise : ' + localStorage.mise + '€'; //Stat mise
    document.getElementById("potAffich").innerHTML = 'Pot : ' + localStorage.pot + '€'; //Stat pot
    document.getElementById("affpot").style.visibility = 'visible'; //Stat pot
    document.getElementById("affpot").innerHTML = 'Pot : ' + localStorage.pot + '€'; //Stat pot
    document.getElementById("budgetAffich").innerHTML = 'Budget : ' + localStorage.budget + '€'; //Stat budget
    console.log("AFFICHAGE OK");
}

// Fonctions
function btnvalider() {
    document.getElementById("valid").style.visibility = 'visible'; //Stat pot
    val.onclick = btnon;
}

function btnon() {
    for (let i = 0; i < cartechange.length; i++) {
        Deck.distributionUnit(Deck.jeuDeck, Deck.jeuJ1, cartechange[i]);
    }
    affJoueur();
    document.getElementById("valid").style.visibility = 'hidden'; //Stat pot
    document.getElementById('miseinit').style.visibility = 'visible'; //aff les boutons
    document.getElementById('misedouble').style.visibility = 'visible'; //aff les boutons
    document.getElementById('passer').style.visibility = 'visible'; //Cache les boutons
    affchange();
}

function btnoff() {
    document.getElementById('miseinit').style.visibility = 'hidden'; //Cache les boutons
    document.getElementById('misedouble').style.visibility = 'hidden'; //Cache les boutons
    document.getElementById('passer').style.visibility = 'hidden'; //Cache les boutons

    document.getElementById("actionAffich").innerHTML = 'Action : Mise 20€'; //action effectué
}

// Mise 20
function addmise() {
    // if (partiecommence !== 0) {
    localStorage.mise = parseInt(localStorage.mise) + 20;
    localStorage.budget = parseInt(localStorage.budget) - parseInt(localStorage.mise); // Budget -= mise du joueur
    localStorage.pot = parseInt(localStorage.mise) + parseInt(localStorage.miseB); // Pot = Mise joueur+Bot
    console.log('mise ' + localStorage.mise);// Test ordre d'appel
    console.log('Budget ' + localStorage.budget); // Test ordre d'appel
    console.log('Pot ' + localStorage.pot); // Test ordre d'appel
    console.log("Mise de 20"); // Test ordre d'appel
    btnoff();
    eval();
    ordiPlay(Deck.jeuDeck, Deck.jeuJ2, victoire);
    eval();
    console.log(victoire);
    document.getElementById("actionAffich").innerHTML = 'Action : Mise 20€'; //action effectué

    affichage(); // refresh l'affichage des stats
    // }
}

// Mise 40
function misedouble() {
    // if (partiecommence !== 0) {
    localStorage.mise = parseInt(localStorage.pot) + 20; // On mise 40
    localStorage.budget = parseInt(localStorage.budget) - parseInt(localStorage.mise); //Budget -= miseJ
    localStorage.pot = parseInt(localStorage.mise) + parseInt(localStorage.miseB); //Pot = MiseJ+B
    console.log('mise ' + localStorage.mise); //TEST
    console.log('Budget ' + localStorage.budget); //TEST
    console.log('Pot ' + localStorage.pot); //TEST
    btnoff();
    eval();
    ordiPlay(Deck.jeuDeck, Deck.jeuJ2, victoire);
    eval();
    document.getElementById("actionAffich").innerHTML = 'Action : Mise 40€'; //action effectué
    affichage(); //refresh stats display
    // }
}

// Passer le tour
function passer() {
    //localStorage.mise = 0; //On joue pas
    document.getElementById('actionAffich').innerHTML = 'Action : Couché'; //action effectué
    console.log("perdu"); //Test
    btnoff();
    eval();
    ordiPlay(Deck.jeuDeck, Deck.jeuJ2, victoire);
    eval();
    //END GAME ICI et reboot
    affichage();
}



//TEST récup depuis page index
console.log(localStorage.getItem("pseudo"));
console.log(localStorage.getItem("budget"));

//}

function finPartie (){
    console.log(localStorage.pot);
    console.log(localStorage.budget);
    if (victoire === 'joueur'){
        localStorage.budget = parseInt(localStorage.budget) + parseInt(localStorage.pot);
        mess_result = 'Bravo vous emporter le pot: ' + localStorage.pot + '!' ;
    }

    if (victoire === 'egal'){
        localStorage.budget = parseInt(localStorage.budget) + parseInt(localStorage.mise);
        // voir pour mettre un budget à l'ordi
        mess_result = "Egalité, vous récupérez votre mise";


    }

    if (victoire === 'ordi'){
        //voir pour mettre un budget à l'ordi
        localStorage.budget = parseInt(localStorage.budget) - parseInt(localStorage.pot);
        mess_result = 'Vous perdez! l\'Ordi remporte le pot: ' + localStorage.pot + '!' ;

    }


    localStorage.pot = 0;
   // localStorage.mise = 0;

    affichage ();

    // --------------------------init des variables
        cartechange = [];
        Deck.jeuDeck = [],
        Deck.jeuJ1 = [],
        Deck.jeuJ2 = [],

        partie.style.visibility = "visible";

    // -------------------------gestion de l'affiche de fin de manche
    let centre = document.getElementById("affpot");
    let messinit = centre.firstChild;


        let mess = document.createElement("H1");
        let mess_content = document.createTextNode(mess_result);
        mess.append(mess_content);

        centre.replaceChild(mess, messinit);

    // -------------------------gestion de la fin de partie
    if (parseInt(localStorage.budget) <= 0) {
        alert('You lose');
        window.location = 'index.html';
    }
    if (parseInt(localStorage.budget) >= 2 * budgetInit ){
        alert('You win');
        window.location = 'index.html';

    }

}




