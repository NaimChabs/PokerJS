
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

