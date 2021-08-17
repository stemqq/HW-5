//File: Board.js
//GUI Assignment: Implementing a Bit of Scrabble with Drag-and-Drop
//Ssuna Mulindwa, UMass Lowell Computer Science, ssuna_mulindwa@student.uml.edu
//Copyright (c) 2021 by ssunaMulindwa. All rights reserved. May be freely copied or
//excerpted for educational purposes with credit to the author.
//updated by SM on August 15, 2021 at 9:23 AM




function GenerateBoard() {
    var table = ""; // create variable with empty string
    $("#game_board").html(table);   // update the board with empty string
    table += '<table id="tbBoard">';
    table += '<tr><td class="TxWord NWord 1"></td>';    // TxWord = x3 word and NWord = normal
    table += '<td class="NWord 2"></td>';
    table += '<td class="DxLetter NWord 3"></td>';      // DxLetter = x2 letter
    table += '<td class="NWord 4"></td>';
    table += '<td class="DxWord NWord 5"></td>';        // DxWord = x2 word
    table += '<td class="NWord 6"></td>';
    table += '<td class="TxLetter NWord 7"></td>';      // TxLetter = x3 letter
    table += '<td class="NWord 8"></td>';
    table += '<td class="NWord 9"></td>';
    table += '<td class="DxLetter NWord 10"></td>';
    table += '<td class="NWord 11"></td>';
    table += '<td class="DxLetter NWord 12"></td>';     // DxLetter = x2 letter
    table += '<td class="NWord 13"></td>';
    table += '<td class="NWord 14"></td>';
    table += '<td class="TxWord NWord 15"></td><tr>';   // TxWord = x3 word
    table += '</table>';
    $("#game_board").html(table); // update the board with updated string
    table = "";     // reset the table variable
}
