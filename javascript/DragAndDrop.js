//File: DragAndDrop.js
//GUI Assignment: Implementing a Bit of Scrabble with Drag-and-Drop
//Ssuna Mulindwa, UMass Lowell Computer Science, ssuna_mulindwa@student.uml.edu
//Copyright (c) 2021 by ssunaMulindwa. All rights reserved. May be freely copied or
//excerpted for educational purposes with credit to the author.
//updated by SM on August 15, 2021 at 9:23 AM



// Check to make sure the page ready
$().ready(function () {
    GenerateBoard();    // call the function to generate game board
    GenerateTiles();    // call the function to generate tiles
    DragAndDrop();      //  call the drag and drop function

    // waiting for reset button is click and call drag drop to re-enable drag drop
    $("#resetgame").click (function() {
        ResetGame();
        DragAndDrop();
    });

    // waiting for OK button is click and call drag drop to re-enable drag drop
    $("#ok").click (function() {
        SubmitWord();
        DragAndDrop();
    });

    // waiting for exchange button is click and call drag drop to re-enable drag drop
    $("#exchange").click (function() {
        Exchange();
        DragAndDrop();
    });

    // waiting for exchange button is click and call drag drop to re-enable drag drop
    $("#clear_board").click (function() {
        ClearGameBoard();
        DragAndDrop();
    });

    // This button use to return back the un-checked letter back to rack
    $("#back_rack").click (function() {
        returntorack();
        DragAndDrop();
    });

});


// This function call the DragAble and DropAble function
function DragAndDrop () {
    DragAble();
    DropAble();
}


// This function for enable td tab to make it droppable after drag
function DropAble() {

    // droppable to game_board

    $("#game_board td").droppable ({    // select all td tab in game_board
        accept: ".ui-draggable", // accept class ui-draggable after generate by draggable function
        tolerance: 'intersect',     // Draggable overlaps the droppable at least 50% in both directions.
        revert: "invalid",  // this is to make sure that it can be drop, key for check valid
        drop: function (event, ui) {
            if ($(this).attr('id') == undefined) {
                $(this)[0].id = $(this)[0].id + " dropped"; // get the id of the td
                ui.draggable[0].style.cssText = "";     // chagne the css style of the img dragg
                var img = ui.draggable[0].outerHTML;    // get the dragged content

                var strID = String($(this)[0].id);      // get the id from the td
                var match = strID.match(/(.+)(dropped)/);   // using regex to make a groups of substrings

                // replace td tab to new td tab

                if(CheckSpaceLetter(ui.draggable)){
                    var newimg = SpaceSwap(ui.draggable);
                    var new_TD = '<td class="' + $(this)[0].className + '" id="' + match[2] + '">' + newimg + '</td>';
                    $(this)[0].outerHTML = new_TD;
                } else {

                    // combine to get te new td tag
                    var newTD = '<td class="' + $(this)[0].className + '" id="' + match[2] + '">' + img + '</td>';
                    $(this)[0].outerHTML = newTD;
                }

                // remove current dragging
                ui.draggable[0].outerHTML = "";

                // call the drag and drop function
                DragAndDrop()

                // remove the id after drop
                removeIDDrag();

            } else {
                // check if the td already have letter, if true then letter will auto return back to the rack
                ui.draggable.draggable('option', 'revert', true);
                return;
            }
        },
        // remove id if the letter is dragged to other place from the table cell
        out: function (event, ui) {
        }

    });



}

// this function return true/false if SPACE is detect
function CheckSpaceLetter($Space) {
    // this is get the class name in the object
    var classID = $Space[0].className;
    // using regex to groups and get the letter
    var CurrentLetter = classID.match(/(board_piece_)(.)(.+)/);
    // check if the letter is SPACE or not
    if (CurrentLetter[2] == "_")
        return true;
    else
        return false;
}


// This function use to swap the space letter to other letter
function SpaceSwap ($Space) {
    // prompt windows ask user to enter new letter
    var newLetter = prompt("Please Enter alphabet from A-Z for SWAP the SPACE Letter","A");

    // check if the new input it mor than 1 character or not alphabet
    while (String(newLetter).length > 1 || CheckAlpha(newLetter)) {
        newLetter = prompt("Please Enter alphabet from A-Z for SWAP the SPACE Letter","A");
    }

    // make the letter be a Upper Case
    newLetter = newLetter.toUpperCase();

    // Get the outerHTML string
    var textHTML = $Space[0].outerHTML;

    // using regex to groups outerHTML string
    var regex = textHTML.match(/(.+)(board_piece_)(.)(.+)(Letter_)(.)(.+)/);

    // update outerHTML string with correct letter value
    textHTML = regex[1] + regex[2] + newLetter + regex[4] + regex[5] + newLetter + regex[7];

    // return the outerHTML
    return textHTML;
}
 // This function use to check the input is letter or not
function CheckAlpha(word) {
    // cast word to string, this just for make sure it it string
    var check = String(word);
    // regex groups
    var result = check.match(/([a-zA-Z])+$/);
    if (result == null)
        return true;
    else
        return false;

}

// this is the dragable function use to enable <img> with id = tile_drag_x
function DragAble(str) {
    for (var i = 0; i < 7; i++) {
        // // Credit to Jason for draggable and back to original position
        // // https://github.com/JasonD94/GUI/blob/gh-pages/js/scrabble/draggable.js

        $("#tile_drag_" + i).draggable ({
            revert: "invalid",            // This is key. Only the rack and game board are considered valid!
            start: function(ev, ui) {
                // Save original position. (used for swapping tiles)
                startPos = ui.helper.position();  // startPos is a global variable found in variables.js
            },
            stop: function() {
                // If an invalid event is found, this will return the draggable object to its
                $(this).draggable('option', 'revert', 'invalid');
            }

        }); // end draggable
    } // end for loop

}

// this is for re work the scrabble board after valid word
function ReworkBoardGame() {
    var  rid = $("#game_board").find('td');
    rid.each(function() {
        if (String($(this)[0].id) === "dropped")
            $(this).removeAttr('id');
    });
}

// This function use to remove  the id from <td> tab
function removeIDDrag() {
    // get all the td tag to rid
    var  rid = $("#game_board").find('td');

    // loop through eash td in the table
    rid.each(function() {
        if($(this)[0].childElementCount == 0 && $(this)[0].id != "") {
            $(this).removeAttr('id');
        }
    });

}

// global variable for Word check
var WordCheck = "";
// Use to update the total score
var word_score = 0;
var word_length = 0;
// This function use for check the word is valid or not
function SubmitWord () {
    // define and create an empty array of object
    var Word_Obj = [];
    // get all letter on the board include the positon.
    Word_Obj = GetWordFromBoard();
    // check for word is valid or not
    if (word_length != Word_Obj.length) {
        // define a variable based on the return value of the CheckWordValid function
        var checkcorrect = CheckWordValid(Word_Obj);

        // if the word is valid, then calculate the score
        if(checkcorrect) {
            var Score = GetScore(Word_Obj); // get score return from the word
            AddToTable(Word_Obj);   // add the valid word to the game board so it wont be able to move
            GetNewLetter();
            var word = WordCheck + " is a valid word";
            $(".error").html(word);     // display the message
            word_score += Score;    // update the score
            word_length = Word_Obj.length;  // update flag for make sure not check the same word again
        } else {
            var word = WordCheck + " is not a valid word";
            $(".error").html(word); // display the message
            returntorack(); // return all the Letter that is invalid back to rack
        }
        $('#score').html(word_score);   // display the score
        Word_Obj = [];  // empty the object

    } else {
        var word = "Error: There are either NO WORD or WORD THAT ALREADY VALID";
        $(".error").html(word); // display the message
    }
}

// This function is use to clear game board if

function ClearGameBoard(){
    GenerateBoard();    // just call the GenerateBoard function to re-draw the new board
    word_length = 0;    // reset the word_length for next check

}


// This function is called for the first time check the board gamel letter
function GetWordFromBoard(){
    // define and create an empty array of object
    var Word_Obj = [];
    // get all the td tag on the game_board
    var rid = $("#game_board").find('td');
    // loop through each td in the table
    rid.each(function() {
        // console.log($(this));
        // check if there is <img> tab
        if($(this)[0].childElementCount > 0 && ($(this)[0].id == "dropped" || $(this)[0].id == "accepted")) {
            // check if the id of the table cell is dropped
            if($(this)[0].id == "dropped" ) {
                // if the id is dropped then do to following
                var strClass = String($(this).attr('class'));
                var match = strClass.match(/([a-zA-Z]+)(.+)(\d+)(.+)/);     // regex for make groups
                temp = $(this);
                var letterObj = getLetter(temp);

                // this is update the letter object if space is detect
                if (letterObj.Letter == "_"){
                    var outText = $(this)[0].firstChild.className;
                    var matchregex = outText.match(/(board_piece_)(.)(.+)/);
                    letterObj.Letter = matchregex[2];
                    letterObj.Value = ScrabbleTiles[matchregex[2]].value;
                }
                // push all information need to calculate of the word to the object
                Word_Obj.push({
                    "Letter" : letterObj.Letter,
                    "Value" : letterObj.value,
                    "pos" : match[3],
                    "xValue" : match[1],
                    "score" : 0
                });
            } else {
                var strClass = String($(this).attr('class'));
                var match = strClass.match(/([a-zA-Z]+)(.+)(\d+)(.+)/);     // regex for make groups
                //console.log(match);
                $temp = $(this);
                //var letterObj = getLetter($temp);
                //console.log(letterObj);
                Word_Obj.push({
                    "Letter" : $(this)[0].firstChild.className,
                    "Value" : ScrabbleTiles[$(this)[0].firstChild.className].value,
                    "pos" : match[3],
                    "xValue" : match[1],
                    "score" : 0
                });
            }
        }
    });
    // return the object
    return Word_Obj;
}

// Check if the word valid for the first time check
function CheckWordValid($temp) {
    for (var i = 0; i < $temp.length - 1 ; i++){
        if(parseInt($temp[i].pos) + Number(1) != parseInt($temp[i+1].pos))
            return false;
    }
    // define and declear variable
    var word = "";
    // loop through the object to get word
    for (var i = 0; i < $temp.length; i ++){
        word += $temp[i].Letter;
    }
    // console.log(word);
    // store the word to wordcheck to it will be use later on print out the error message
    WordCheck = word;
    // check if the word is in dictionary
    if (CheckDictionary(word)) {
        firstchecktrue = true;
        return true;
    }
    return false;
}

// get letter function from LetterOnRack
function getLetter($temp) {
    // get the id from the object
    var imgid = $temp[0].firstChild.id;
    // loop through to the LetterOnRack
    for (var i = 0; i < LetterOnRack.length; i++){
        // if the letter is on the rack then return the LetterOnRack object
        if (LetterOnRack[i].id == imgid)
            return LetterOnRack[i];
    }
}


//get the new Letter to the rack
function GetNewLetter() {
    // console.log("letter on rack", LetterOnRack);

    tiles = "";
    var MissWord = 7 - LetterOnRack.length;
    // console.log(MissWord);

    // create an empty array with 0 value
    var tempObj = [0, 0, 0, 0, 0 , 0, 0];

    //store all the letter in LetterOnRack
    var j = 0;
    for (var i = 0; i < 7; i++){
        // check to make sure j is not out of range
        if (j < LetterOnRack.length){
            // if they are the same, then
            if(LetterOnRack[j].pos == i) {
                tempObj[i] = LetterOnRack[j];
                j++;
            }
        }
    }

    //replace slot value 0 with it new letter
    for (var i = 0; i < tempObj.length; i++){
        if (tempObj[i] == 0) {
            var index = Math.floor(Math.random() * sLetter.length); // get random index in from sLetter
            while (ScrabbleTiles[sLetter[index]].number_remaining === 0) {
                index = Math.floor(Math.random() * sLetter.length);
            }
            // update the remainning value in ScrabbleTiles array
            ScrabbleTiles[sLetter[index]].number_remaining = ScrabbleTiles[sLetter[index]].number_remaining - 1;

            // Get letter link
            var letter_url = "img/Scrabble_Tiles" + sLetter[index] + ".png";

            tempObj[i] = ({"Letter": sLetter[index], "id" : "tile_drag_" + i, "pos": i, "value" : ScrabbleTiles[sLetter[index]].value, "Link" : "<img id='tile_drag_" + i + "' class='board_piece_" + sLetter[index] + "' src='" + letter_url + "' /></img>"});
        }
    }

    // Empty the LeterOnrack
    LetterOnRack = [];
    // Copy back with the tempObj
    LetterOnRack = tempObj;
    // console.log("temp", LetterOnRack);

    // reupdate titles
    reTitle();
    UpdateRemainWord(); // Update the reamining word
}


// add the valid word to the game board so it wont be able to move
function AddToTable($word) {
    var  rid = $("#game_board").find('td');
    rid.each(function() {
        if($(this)[0].id == "dropped") {
            var classID = $(this)[0].firstChild.className;
            var CurrentLetter = classID.match(/(board_piece_)(.)(.+)/);
            // Get index for LetterOnRack
            var index = String($(this)[0].firstChild.id).replace("tile_drag_", "");
            // Pop that Letter from the LetterOnRack
            // remove the letter on the rack based on the index
            RemoveLetterFromRack(index);
            // change the id of the accepted letter to imgAccepted (img tag)
            $(this)[0].firstChild.id = "imgAccepted";
            // change the class of the acccepted (img tag)
            $(this)[0].firstChild.className = CurrentLetter[2];
            // change the id of the table cell to accepted
            $(this)[0].id = "accepted";
        }
    });
}


// This function to reupdate titles
function reTitle() {
    // console.log(LetterOnRack);
    // diefine an declear tiles variale as an empty string
    var tiles = "";
    tiles += '<table id="RackWord"><tr>';   // add to the string
    // define and clear variable j start at 0 for keep track what is in the LetterOnRack
    var j = 0;
    rid = $("#tiles-rack").find('td');
    // get all the td in the rack
    // loop through the rid td
    for ( var i = 0; i < rid.length; i++){
        // compare the LetterOnRack and what is currently on rack
        if (i < LetterOnRack.length) {
            // add to the tiles
            tiles += "<td>" + LetterOnRack[j].Link + "</td>";
            j++;
        } else {
            // if not in current rack then it should be empty
            tiles += "<td></td>";
        }
    }

    tiles += '</tr></table>';
    // at this point, we should have a new table of tiles as a string
    $("#tiles-rack").html(tiles); // Update to the tiles-rack

}

// This function to return lette back to rack if the word is not valid after check
function returntorack() {
    var  rid = $("#game_board").find('td');
    rid.each(function() {
        if (String($(this)[0].id) === "dropped"){
            $(this).removeAttr('id');
            $(this)[0].firstChild.outerHTML = "";
        }
    });

    // Udpate the tiles
    reTitle();
}


//Remove Elements from the array and push it back
function RemoveLetterFromRack(x) {
    //console.log(x);
    var temp = []; // create a empty object
    // loop through the element in the LetterOnRack
    for (var i = 0; i < LetterOnRack.length; i ++) {
        // if i is not equal to x then push to temp
        if (i != x)
            temp.push(LetterOnRack[i]);
    }
    // empty the LetterOnRack
    LetterOnRack = [];
    // Copy temp back to LetterOnRack
    LetterOnRack = temp;

    //console.log(LetterOnRack);

}

// calculate the score if the word is valid
function GetScore($word) {
    var TotalScore = 0;
    // Calculate the X Letter
    // Loop throuh the object that contain "Letter", "Value", "pos", "xValue", "id", "score"
    for (var i = 0; i < $word.length; i++) {
        // x2 if DxLetter found
        if (String($word[i].xValue) === "DxLetter")
            $word[i].score = parseInt($word[i].Value) * Number(2);
        // x3 if TxLetter found
        else if (String($word[i].xValue) === "TxLetter")
            $word[i].score = parseInt($word[i].Value) * Number(3);
        // the score is current score
        else
            $word[i].score = parseInt($word[i].Value)

        // add the score together
        TotalScore += $word[i].score;
    }
    // Loop throuh the object that contain "Letter", "Value", "pos", "xValue", "id", "score"
    for (var i = 0; i < $word.length; i++) {
        // x2 word if the DxWord is found
        if (String($word[i].xValue) === "DxWord")
            TotalScore = parseInt(TotalScore) * Number(2);
        // x3 word if the TxWord is found
        else if (String($word[i].xValue) === "TxWord")
            TotalScore = parseInt(TotalScore) * Number(3);
    }
    return TotalScore; // return the score
}



// The dictionary lookup object Credit to John Resig
var dict = {};
// Do a jQuery Ajax request for the text dictionary
$.get( "files/dictionary.txt", function( txt ) {
    // Get an array of all the words
    var words = txt.split( "\n" );
    // This will allow for fast lookups later
    for ( var i = 0; i < words.length; i++ ) {
        dict[words[i]] = true;
    }
});

// Modified to only pass in one word, which can then be verified.
function CheckDictionary(word) {
    // See if it's in the dictionary
    if (dict[word]) {
        // If it is, return that word
        return true;
    }
    // Otherwise, it isn't in the dictionary.
    return false;
}


// This function use to exchange all Letters
function Exchange() {
    //console.log(LetterOnRack);
    var  rid = $("#game_board").find('td');
    rid.each(function() {
        // check if the id is dropped
        if($(this)[0].id == "dropped") {
            // if it true then empty it
            $(this)[0].innerHTML = "";
            // call the function to remove the id on drag
            removeIDDrag();
        }
    });

    // this loop is update the number_remaining in the ScrabbleTiles
    for (var i = 0; i < LetterOnRack.length; i++) {
        // get letter from LetterOnRack
        var letter = LetterOnRack[i].Letter;
        // update the remaining number back to the ScrabbleTiles
        ScrabbleTiles[letter].number_remaining += 1;
    }
    LetterOnRack = [];  // empty the object
    UpdateRemainWord(); // Recalculate the remainning word
    GenerateTiles();    // regenerate the titles
    DragAndDrop();      // make it can drag and drop

}

//reset the id of the td
function removeid() {
    // get the id letter on the board
    var rid = $("#game_board").find('td');
    // loop through each td
    rid.each(function () {
        // get the id from the td
        var strID = String($(this).attr('id'));
        // check if it is containt dropped word
        if (strID.indexOf("dropped") > -1) {
            // remove the id
            $(this).removeAttr('id');
        }
    });
}


// Reset the game
function ResetGame() {
    // Return the number_remaining array back to the orignial_distribution
    var sLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_";
    console.log(sLetter.length);
    for (var i = 0; i < sLetter.length; i++) {
        // console.log("before", ScrabbleTiles[sLetter[i]].number_remaining, ScrabbleTiles[sLetter[i]].original_distribution);
        ScrabbleTiles[sLetter[i]].number_remaining = ScrabbleTiles[sLetter[i]].original_distribution;
        // console.log("after",ScrabbleTiles[sLetter[i]].number_remaining, ScrabbleTiles[sLetter[i]].original_distribution);
    }
    // reset everything to default;
    WordCheck = "";
    word_length = 0;
    word_score = 0;
    GenerateBoard();
    GenerateTiles();
    UpdateRemainWord();
    $(".error").html("");
}

var LetterOnRack = [
]; // holds the letter's value

var sLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_";
// This function use to generate 7 random letters from ScrabblesTiles array
function GenerateTiles() {
    var tiles = "";

    tiles += '<table id="RackWord"><tr>';
    LetterOnRack = [];
    for (var i = 0; i < 7; i++) {
        // http://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array

        var index = Math.floor(Math.random() * sLetter.length); // get random index in from sLetter

        // Check if the letter from Array is still have letter left
        while (ScrabbleTiles[sLetter[index]].number_remaining === 0) {
            index = Math.floor(Math.random() * sLetter.length);
        }
        // Get letter link
        var letter_url = "img/Scrabble_Tiles" + sLetter[index] + ".png";
        tiles += "<td><img id='tile_drag_" + i + "' class='board_piece_" + sLetter[index] + "' src='" + letter_url + "' /></img></td>";

        // update the remainning value in ScrabbleTiles array
        ScrabbleTiles[sLetter[index]].number_remaining = ScrabbleTiles[sLetter[index]].number_remaining - 1;

        LetterOnRack.push({"Letter": sLetter[index], "id" : "tile_drag_" + i, "pos": i, "value" : ScrabbleTiles[sLetter[index]].value, "Link" : "<img id='tile_drag_" + i + "' class='board_piece_" + sLetter[index] + "' src='" + letter_url + "' /></img>"});
        // console.log(i, LetterOnRack[i]);

    }
    tiles += '</tr></table>';
    $("#score").html(word_score);   // display the score
    $("#tiles-rack").html(tiles);   // display the Letter on rack
    UpdateRemainWord();
}
