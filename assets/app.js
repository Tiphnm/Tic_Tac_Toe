///////////////// ZONE DE VERIFICATION DE PAGE ACTUEL ///////////////////

//On capte url
var urlActuel = location.href;
// convert url en tableau
var bloqueUrl = urlActuel.split("/");
//supprime le dernier élément d'un tableau et retourne cet élément.
let dernierPartie = bloqueUrl.pop();
let pageActuel;

let trouve = dernierPartie.indexOf("?"); //je verifie si l'url a des parametres
if (trouve != -1) {
  /* on a trouvé ? alors on a de parametres get */
  pageActuel = dernierPartie.split("?")[0];
} else {
  pageActuel = dernierPartie;
}

console.log(pageActuel);
// Declaration de variables

// solo game
let playerSolo;
// multiplayer game
let playerX;
let playerO;
let multiPlayers;

//  SETUP OF THE GAME ///////

const soloPlayerX = document.querySelector(".play.soloplayer.x");
const soloPlayerO = document.querySelector(".play.soloplayer.o");
const inputName = document.querySelector("#jouerSeul");
const btnMultiPlayer = document.querySelector(".multiplayer");

// Get the name of the player and the symbol X or O
if (soloPlayerX) {
    soloPlayerX.addEventListener("click", () => {
    soloPlayer = inputName.value + ",X";
    localStorage.setItem("soloplayer", soloPlayer);
  });
}

if (soloPlayerO) {
  soloPlayerO.addEventListener("click", () => {
    soloPlayer = inputName.value + ",O";
    localStorage.setItem("soloplayer", soloPlayer);
  });
}

/***** cet if verifie si le bouton .multiplayer existe ********/

if (btnMultiPlayer) {
  btnMultiPlayer.addEventListener("click", () => {
    let player1 = document.querySelector("#player1").value;
    let player2 = document.querySelector("#player2").value;
    localStorage.setItem("multiplayer", [player1, player2]);
    //verifier s il y a deja des joueurs avec ces noms
    // player one is always X
    localStorage.setItem(player1, "X");
    localStorage.setItem(player2, "O");
  });
}

/********* ajoute button pour passer à la page resultats  **********/
function ajouter_bouton_resultat() {

  return ajouter_bouton('resultat');
}

/**
 * retourner à la accueil
 */
function ajouter_bouton_accueil() {

  return ajouter_bouton('accueil');
}


if (pageActuel == "game.html") {

  let div = document.querySelector(".module");
  let titleMsg = document.createElement("h1");

  // Mode single player, get the symbol
  if (localStorage.getItem("soloplayer")) {
    const ruleSolo = localStorage.getItem("soloplayer").split(",");
    console.log(ruleSolo);
    titleMsg.innerText = "Bienvenue " + ruleSolo[0] + " symbol: " + ruleSolo[1];

    function set_rules() {
      const rules = {
        players: 1,
        name: ruleSolo[0],
        symbol: ruleSolo[1],
      };
      return rules;
    }

    localStorage.removeItem("soloplayer");

  } else if (localStorage.getItem("multiplayer")) {
    //j'appele le item multiplayer et je le transforme en tableau pour afficher ces noms
    joueurs = localStorage.getItem("multiplayer").split(",");

    console.log("multiplayer game");

    function set_rules() {
      const rules = {
        players: 2,
        player_x: joueurs[0],
        player_o: joueurs[1],
      };
      return rules;
    }
    titleMsg.innerHTML =
      "Bienvenue <label id='joueur1'>" +
      joueurs[0] +
      "</label> et " +
      "<label id='joueur2'>" +
      joueurs[1] +
      "</label>";
    localStorage.removeItem("multiplayer");
  }
  div.prepend(titleMsg);
    

} else {
  if (document.querySelector("#titreJoeurs")) {
    let elem = document.querySelector("#titreJoeurs");
    elem.nextElementSibling.remove(); // Retire l'élément #titreJoeurs
  }
  if (pageActuel == 'resultat.html') {

    //parcourir le localstorage pour savoir le gagnant
    liste_resultat=[];   
    
    if(localStorage.getItem('resultat')){
        
        //on recupere les scores des  jeux
        let resultat = JSON.parse(localStorage.getItem('resultat'));
        //on ordenne les resultats en mode decroisant, alors on aura le premier dans la premier place
        let objetOrdenne = Object.keys(resultat).sort(function(a,b){return resultat[b]-resultat[a]});
        
        //on recupere la balise div
        let divConteneur = document.querySelector("#positionWinner");
      
        /**il afichera les meilleurs 10 utilisatuers */  
        for (let x=0; (x < objetOrdenne.length && x <= 10); x++){        
            let conteneurDiv= document.createElement("div");
            if(x==0){

              conteneurDiv.appendChild(ajouter_p("<label>1er</label> <i class=\"fas fa-trophy\" aria-hidden=\"true\"></i>  "+ objetOrdenne[x]));
              
            }else{

              conteneurDiv.appendChild(ajouter_p("<label>"+(x+1)+" - </label> "+ objetOrdenne[x]));
              
            }
            conteneurDiv.appendChild(ajouter_p(resultat[objetOrdenne[x]]+" points")); 

            divConteneur.appendChild(conteneurDiv);

        }
    }

    //bouton pour reinitialiser les scores, les points
    document.querySelector("#mettreZero").addEventListener('click',()=>{

      if (confirm("Vous etez sur de reinitialeser les scores ? ")) {
          localStorage.setItem('resultat', '');
          document.location.reload();
      } 
      
      
    });

  } 


}


/////////////////////       GAME ZONE //////////////////////////////

///  Get the name of the symbol of the solo player, if there is....

if (pageActuel == "game.html") {
  const rules = set_rules();

  if (rules.players == 1) {
    var human = rules.symbol;
    var ai = rules.symbol == "X" ? "O" : "X";
  } else if (rules.players == 2) {
    console.log(rules);
  }

  const winingCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];

  const elements = document.querySelectorAll(".element");
  // make a digital board
  let gameTable = [];
  for (i = 0; i < 9; i++) {
    gameTable.push(i);
  }
  // ---------- Game start function ---------------
  gameOn();

  function gameOn() {
    // game over message
    document.querySelector(".endgame").style.display = "none";
    for (i = 0; i < elements.length; i++) {
      elements[i].innerText = "";
      // remove the color of the winner
      elements[i].classList.remove("background-color");
      elements[i].addEventListener("click", ticTacToe, false);
    }
  }

  function ticTacToe(event) {
    // check if the square is free, otherwise you cannot click in a played cell
    // game table is filled with numbers at the start, but replaced by string each turn
    if (typeof gameTable[event.target.id] == "number") {
      //Execute the turn function for a CLIC as human play and WHERE is clicked;
      turn(event.target.id, human);
      // null game means tie, so is THERE IS NOT A TIE, the computer will play
      if (!nullgame()) {
        // then ai will play in the best option square
        turn(bestOption(), ai);
      }
    }
  }

  // each player have a TURN to put and X or an O in the GAMETABLE BOARD
  function turn(cellId, player) {
    gameTable[cellId] = player;
    document.querySelector(`#${CSS.escape(cellId)}`).innerText = player;
    console.log(gameTable);
    let isGameWon = checkForWinner(gameTable, player);
    // if game won is not null, then  execute game is over and transfer who won.
    if (isGameWon) {
      gameOver(isGameWon);
    }
  }

  function checkForWinner(board, player) {
    // just make a list of the human play, in wich index of element?
    let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
    // game won by default is null... unless
    let gameWon = null;
    // check for the index and who won. using constant desconstruction
    // loop for all every win combinantions and check if PLAYS is one of them
    for (let [index, win] of winingCombinations.entries()) {
      if (win.every((elem) => plays.indexOf(elem) > -1)) {
        // return who won?  player, index is the WINNING COMBINATION that made that player win
        gameWon = { index: index, player: player };
        break;
      }
    }
    //console.log(gameWon);
    return gameWon;
  }

  function gameOver(gameWon) {
    // get the winner combination of game won and select from the combinations
    for (let index of winingCombinations[gameWon.index]) {
      // if the human won , put a blue background in those elements
      document.querySelector(`#${CSS.escape(index)}`).style.backgroundColor =
        gameWon.player == human ? "blue" : "red";
    }
    // as the game is over, Kill the event click
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeEventListener("click", ticTacToe, false);
    }
    if (gameWon.player == human) {
      printWinner("You win");

      //add the points winner
      //ajouter les points au gagnant pour les utiliser dans la page resultat      
      calculeResultat(rules.name);

    } else {
      printWinner("You loose");
    }
  }

  // print the winner
  function printWinner(winner) {
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".text").innerText = winner;

    //adds the button to go to the result page
    //ajoute le bouton pour aller à la page resultat
     document.querySelector(".endgame").appendChild(ajouter_bouton_resultat());

    /**Bouton pour rejouer en passant pour l'accueil 
     * TODO Amelioration : faire la sorte de rester dans la meme page en jouant avec le meme utilisateur utiliser
     */
     document.querySelector(".endgame").appendChild(ajouter_bouton_accueil());   
      
  }

  // check what are the spaces/cells that are free to play (for the AI)
  function freeCells() {
    let freeCelltoPlay = gameTable.filter((free) => {
      if (typeof free == "number") {
        // if the values of the arrays are numbers it means that is a free spot
        return free;
      }
    });
    //console.log(freeCelltoPlay);
    return freeCelltoPlay;
  }

  //
  function bestOption() {
    // call the  min max function and return the index of the board that the ai should play in
    return minimax(gameTable, ai).index;
  }

  function nullgame() {
    if (freeCells().length == 0) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "green";
        elements[i].removeEventListener("click", ticTacToe, false);
      }
      printWinner("Tie game!");
      return true;
    }
    return false;
  }

  /// Start of min-max function ///

  function minimax(newGameTable, player) {
    var availSpots = freeCells();

    if (checkForWinner(newGameTable, human)) {
      return { score: -10 };
    } else if (checkForWinner(newGameTable, ai)) {
      return { score: 10 };
    } else if (availSpots.length === 0) {
      return { score: 0 };
    }

    var moves = [];
    for (let i = 0; i < availSpots.length; i++) {
      var move = {};
      move.index = newGameTable[availSpots[i]];
      newGameTable[availSpots[i]] = player;

      if (player === ai) move.score = minimax(newGameTable, human).score;
      else move.score = minimax(newGameTable, ai).score;
      newGameTable[availSpots[i]] = move.index;
      if (
        (player === ai && move.score === 10) ||
        (player === human && move.score === -10)
      )
        return move;
      else moves.push(move);
    }

    let bestMove, bestScore;
    if (player === ai) {
      bestScore = -1000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      bestScore = 1000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    return moves[bestMove];
  }
}
// end of Min-max function

/*** */
function calculeResultat(gagnant){
    
    let resultat = {};
    
    //on verifie si resultat est vide
    if(localStorage.getItem('resultat') != '' ){

      //on recupere le score des utilisateurs
      resultat = JSON.parse(localStorage.getItem('resultat'));
    }
    
    
    let calculResultat=0;
    //verifie si le gagnant existe deja
    if(resultat[gagnant]){
        calculResultat=resultat[gagnant] + 1000;
    }else{
      calculResultat=1000;
    }
    //on enregistre le resultat du gagnant dans l'objet
    resultat[gagnant] =calculResultat;
    console.log(resultat);

    //on enregistre les scores
    localStorage.setItem('resultat', JSON.stringify(resultat));    

}

function ajouter_bouton(quoi){

  let my_bouton = document.createElement("button");
  my_bouton.innerHTML = (quoi =='accueil')?"Rejouer" :"Voir les resultats";
  my_bouton.classList.add("play");
  my_bouton.classList.add("btn_lien_game");

  my_bouton.addEventListener("click", function () {
      
        document.location.href = (quoi =='accueil')?"index.html":"resultat.html";
  });

  return my_bouton;

}

//////////// RESULTATS ////////////////
if(document.querySelector("#home_page_return")){
      document.querySelector("#home_page_return").addEventListener('click',() => {
      document.location.href = "index.html";
    })
}

/**
 * ajoute un bouton p
 */
function ajouter_p(textTitre) {

  let my_p = document.createElement("p");
  my_p.innerHTML = textTitre;  

  return my_p; 

}


