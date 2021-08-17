//File: Reminder.js
//GUI Assignment: Implementing a Bit of Scrabble with Drag-and-Drop
//Ssuna Mulindwa, UMass Lowell Computer Science, ssuna_mulindwa@student.uml.edu
//Copyright (c) 2021 by ssunaMulindwa. All rights reserved. May be freely copied or
//excerpted for educational purposes with credit to the author.
//updated by SM on August 15, 2021 at 9:23 AM
//Generate and update remaining letter




function UpdateRemainWord() {
    var remain = "";
    $("#bagtiles").html(remain);

    // This loop use to calculate the total letter remaining
    var totalLetter = 0;
    // var sLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_";
    for (var i = 0; i < sLetter.length; i++){
        totalLetter += ScrabbleTiles[sLetter[i]].number_remaining;
    }

    remain += '<table class="remainword">';
    // first row
    remain += '<tr><td class="RWord Remain" colspan="9">REMAINING LETTER: ' + totalLetter + '</td></td>';
    // second row
    remain += '<tr><td class="RWord">' + "A: " + ScrabbleTiles["A"].number_remaining + '</td>';
    remain += '<td class="RWord">' + "B: " + ScrabbleTiles["B"].number_remaining + '</td>';
    remain += '<td class="RWord">' + "C: " + ScrabbleTiles["C"].number_remaining + '</td>';
    remain += '<td class="RWord">' + "D: " + ScrabbleTiles["D"].number_remaining + '</td>';
    remain += '<td class="RWord">' + "E: " + ScrabbleTiles["E"].number_remaining + '</td>';
    remain += '<td class="RWord">' + "F: " + ScrabbleTiles["F"].number_remaining + '</td>';
    remain += '<td class="RWord">' + "G: " + ScrabbleTiles["G"].number_remaining + '</td>';
    remain += '<td class="RWord">' + "H: " + ScrabbleTiles["H"].number_remaining + '</td>';
    remain += '<td class="RWord">' + "I: " + ScrabbleTiles["I"].number_remaining + '</td></td>';

    // third row
    remain += '<tr><td class="RWord">' + "J: " + ScrabbleTiles["J"].number_remaining + '</td>';
    remain += '<td class="RWord">' + "K: " + ScrabbleTiles["K"].number_remaining + '</td>';
    remain += '<td class="RWord">' + "L: " + ScrabbleTiles["L"].number_remaining + '</td>';
    remain += '<td class="RWord">' + "M: " + ScrabbleTiles["M"].number_remaining + '</td>';
    remain += '<td class="RWord">' + "N: " + ScrabbleTiles["N"].number_remaining + '</td>';
    remain += '<td class="RWord">' + "O: " + ScrabbleTiles["O"].number_remaining + '</td>';
    remain += '<td class="RWord">' + "P: " + ScrabbleTiles["P"].number_remaining + '</td>';
    remain += '<td class="RWord">' + "Q: " + ScrabbleTiles["Q"].number_remaining + '</td>';
    remain += '<td class="RWord">' + "R: " + ScrabbleTiles["R"].number_remaining + '</td></td>';
    // forth row
    remain += '<tr><td class="RWord">' + "S: " + ScrabbleTiles["S"].number_remaining + '</td>';
    remain += '<td class="RWord">' + "T: " + ScrabbleTiles["T"].number_remaining + '</td>';
    remain += '<td class="RWord">' + "U: " + ScrabbleTiles["U"].number_remaining + '</td>';
    remain += '<td class="RWord">' + "V: " + ScrabbleTiles["V"].number_remaining + '</td>';
    remain += '<td class="RWord">' + "W: " + ScrabbleTiles["W"].number_remaining + '</td>';
    remain += '<td class="RWord">' + "X: " + ScrabbleTiles["X"].number_remaining + '</td>';
    remain += '<td class="RWord">' + "Y: " + ScrabbleTiles["Y"].number_remaining + '</td>';
    remain += '<td class="RWord">' + "Z: " + ScrabbleTiles["Z"].number_remaining + '</td>';
    remain += '<td class="RWord">' + "_: " + ScrabbleTiles["_"].number_remaining + '</td></td>';

    remain += '</table>';

    $("#bagtiles").html(remain);

}
