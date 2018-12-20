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