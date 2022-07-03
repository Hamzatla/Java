//----------------------
// On Load Functions of js from Html
//----------------------
let game_Win_var = 5;

/* Called the function when the BODY tag loads on the page
    Does any OnLoad needed actions on Main Page */
function diff_Selector_Game(){
    First_Game_rps();
}
/* Called the function when the page loads
    Sets all the views (DIV Tag) to their starting visible/invisible setting */
function First_Game_rps(){
    document.getElementById("game_Screen_page").classList.add("visible");
    document.getElementById("game_Screen_page").classList.remove("invisible");
    document.getElementById("game_Screen_Bottom_page").classList.add("visible");
    document.getElementById("game_Screen_Bottom_page").classList.remove("invisible");
    document.getElementById("new_Game_Screen_page").classList.add("invisible");
    document.getElementById("new_Game_Screen_page").classList.remove("visible");
}
//----------------------
// Player Move Functions OF Game
//---------------------- 
/* Called on every turn when difficulty has Bot re-roll
    returns a random number function between 1 & 3 */
function Bot_randomization(){
    return (Math.floor(Math.random() * 3) + 1);
}
/* Called every single turn 
    Controls the diffculty of the game. 
    Easy gets 1 rolls of game
    Medium gets 2 rolls of game
    Hard gets 3 rolls of game
    A roll is a random roll of which object is chosen.*/
function difficulty_Buff_Method(p, a){
    var currentDiff = document.getElementById("diff_Btn_ID").innerHTML;
    if(currentDiff == "Difficulty: Easy"){
        win_Status_Action_Game(p,a);
    }
    else if(currentDiff == "Difficulty: Medium"){
        if(win_Status_Check(p,a) != 2){
            // Extra Roll
            win_Status_Action_Game(p, Bot_randomization());
        }
        else{
            win_Status_Action_Game(p,a);
        }
    }
    else if(currentDiff == "Difficulty: Hard"){
        if(win_Status_Check(p,a) != 2){
            // Extra Roll
            var eRoll = Bot_randomization();
            if(win_Status_Check(p, eRoll) != 2){
                // 2nd Extra Roll
                eRoll = Bot_randomization();
                win_Status_Action_Game(p, eRoll);
            }
            else{
                win_Status_Action_Game(p, eRoll);
            }
        }
        else{
            win_Status_Action_Game(p,a);
        }
    }
}
/* Called when difficulty is higher than easy
    Returns the status of winning without saying anyone has won.
    0 = Tie, 1 = player, 2 = Bot */
function win_Status_Check(pS, aS){
    var p = parseInt(pS);
    var a = parseInt(aS);
    if(p == a) {
        return 0;
    }
    else if((a+1 == p) || (a == p+2)){
        return 1;
    }
    else if((a == p+1) || a+2 == p){
        return 2;
    }
}
/* Called function when player and BOT have both chosen their final object
    Does all actions needed to achieve the status of the winner */
function win_Status_Action_Game(pS, aS){
    var p = parseInt(pS);
    var a = parseInt(aS);
    if(p == a) {
        update_Labels_Game(" ", "Tie!", true);
    }
    else if((a+1 == p) || (a == p+2)){
        update_Labels_Game("player_Score", "You Win!", false);
    }
    else if((a == p+1) || a+2 == p){
        update_Labels_Game("bot_Score", "Bot Wins!", false);
    }
    set_Images_Game(parseInt(pS), parseInt(aS));
    set_Progress_Game();
    is_Game_Over_Check();
}
/* Called function every turn
    Updates all of the board labels */
function update_Labels_Game(pointMaker, winText, isTie){
    // Update win Label
    document.getElementById("win_Label_ID").style.visibility="visible";
    document.getElementById("win_Label_ID").innerHTML = winText;
    if(!isTie){
        // Update score label
        var a = parseInt(document.getElementById(pointMaker).innerHTML);
        document.getElementById(pointMaker).innerHTML = a + 1;
    }
}
/* Called function every turn
    Updates the board's images */
function set_Images_Game(p, a){
    document.getElementById("pIMG").src=`resources/images/${p}.png`;
    document.getElementById("aiIMG").src=`resources/images/${a}.png`;
}
/* Called function every turn
    Updates the progress bars based on the player's and ai's scores */
function set_Progress_Game(){
    var p = parseInt(document.getElementById("player_Score").innerHTML);
    var a = parseInt(document.getElementById("bot_Score").innerHTML);
    var pPer = "width: " + ((p/game_Win_var)*100) + "%";
    var aPer = "width: " + ((a/game_Win_var)*100) + "%";
    document.getElementById("player_Progress_Bar_ID").style=pPer;
    document.getElementById("player_Progress_Bar_ID").innerHTML = p + "/5";
    document.getElementById("bot_Progress_Bar_ID").style=aPer;
    document.getElementById("bot_Progress_Bar_ID").innerHTML = a + "/5";
}
//--------------------
// Game Over Functions
//--------------------
/* Called function at the end of each turn.
    Checks if any player has reached the game_Win_var score */
function is_Game_Over_Check(){
    var pS = document.getElementById("player_Score").innerHTML;
    var aS = document.getElementById("bot_Score").innerHTML;
    if(pS == game_Win_var){
        toggle_Disable_Check(false);
    }
    else if (aS == game_Win_var){
        toggle_Disable_Check(false);
    }
}
/* Called function when a new game is begun or when the player's/Bot's score reaches the game win score
    toggles disable on player buttons & hides/unhides new game button */
function toggle_Disable_Check(isNewGame){
    // Toggle Player selection buttons
    document.getElementById("rock_Button_ID").classList.toggle("disabled");
    document.getElementById("paper_Button_ID").classList.toggle("disabled");
    document.getElementById("scissor_Button_ID").classList.toggle("disabled");
    // Toggle 'New Game' button & win_Label_ID
    document.getElementById("new_Game_Button_ID").style.visibility= isNewGame ? "hidden" : "visible";
}
// ----------------
// Button Functions
// ----------------
/* Called function when the 'new game' button is pressed
    clears all of the scores, renewables button pressed & clears images */
function start_New_Game_Play(){
    var pS = document.getElementById("player_Score").innerHTML;
    var aS = document.getElementById("bot_Score").innerHTML;
    if(pS == 5 || aS == 5){
        // Reset Scores/Labels
        document.getElementById("bot_Score").innerHTML = "0";
        document.getElementById("player_Score").innerHTML = "0";
        document.getElementById("count_Label_Obj").innerHTML = "0";
        document.getElementById("win_Label_ID").innerHTML = "Press any button to begin";
        set_Progress_Game();
        // Set starting Images
        set_Images_Game(3, 1);
        // Toggles all buttons
        toggle_Disable_Check(true);
    }
}
/* Called by the rock, paper, & scissor buttons
   Handles the player's button click */
function image_Clicker(pSel){
    var pS = document.getElementById("player_Score").innerHTML;
    var aS = document.getElementById("bot_Score").innerHTML;
    if(pS < 5 && aS < 5){
        var aiSel = Bot_randomization();
        difficulty_Buff_Method(pSel, aiSel);
        // Updates a label counting the total number of turns played
        document.getElementById("count_Label_Obj").innerHTML = parseInt(document.getElementById("count_Label_Obj").innerHTML) + 1;
    }
}
/* Called by the 'difficulty' button from Index being pressed
    Handles changing the difficulty level.*/
function change_Diff_Game(){
    var currentDiff = document.getElementById("diff_Btn_ID").innerHTML;
    var newDiff= "Difficulty: ";
    switch(currentDiff){
        case "Difficulty: Easy":
            newDiff = newDiff + "Medium";
            break;
        case "Difficulty: Medium":
            newDiff = newDiff + "Hard";
            break;
        case "Difficulty: Hard":
            newDiff = newDiff + "Easy";
            break;
    }
    document.getElementById("diff_Btn_ID").innerHTML = newDiff;
}