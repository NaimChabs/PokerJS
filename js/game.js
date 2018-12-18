window.onload = function() {
    // Créations des boutons en variable
    let play = document.getElementById('go');

    console.log("Initialisation");

    // Association boutons -> fonctions respective
    play.onclick = init;

    //Fonctions
    function init() {
        let pseudo = document.getElementById('Pseudo').value;
        let budget = document.getElementById('Budget').value;
        window.location = 'jeu.html';
    }
};

