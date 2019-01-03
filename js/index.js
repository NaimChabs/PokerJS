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
