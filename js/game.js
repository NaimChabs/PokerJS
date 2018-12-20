
let couleur = ['C', 'D', 'H', 'S'];
let valeur = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K', 'Q'];
let puissance = ['13', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];


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
        Deck.jeuJ1 = mainR;  // suite pb mise à jour hors de la fonction



    },

    rangeMain2: function (main) {
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
        Deck.jeuJ2 = mainR;  // suite pb mise à jour hors de la fonction



    }

    };  // fin de l'objet Deck



// --- INIT DU JEU
Deck.initDeck(couleur, valeur, puissance);


// Distribution des cartes
Deck.distribution(Deck.jeuDeck, Deck.jeuJ1, 5);
//Deck.distribution(Deck.jeuDeck, Deck.jeuJ2, 5);

Deck.jeuJ2 = [Deck.jeuDeck[1],Deck.jeuDeck[2],Deck.jeuDeck[3],Deck.jeuDeck[4],Deck.jeuDeck[5]];




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


Deck.rangeMain(Deck.jeuJ1);
Deck.rangeMain2(Deck.jeuJ2);

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
         return main.result = [21, main[4].puissance];
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
        main.result = [19,brelanP];
        return main.result;
    }


    if (main.couleur === true ) {   // _________________________________________couleur
    return main.result = [18, main[4].puissance];
    }

    if (main.suite === true ) {   // ______________________________________________Suite
        return main.suite = [17, main[4].puissance];
    }

    if (brelan === 1){          // ________________________________Brelan
        return main.result = [16, brelanP];
    }
    //if (idem.filter(e => e === 2).length === 2) {
        if (pair > 1){          //________________________________DoublePair
       // return main.doublePair = true;
        return main.result = [8, pairP];
    }



        if (pair === 1){  //____________________________________Pair
            main.result = [9, pairP];
            return main.result;}
           // return main.pair = true;}




}

console.log(Deck.jeuJ1);
console.log(Deck.jeuJ2);



