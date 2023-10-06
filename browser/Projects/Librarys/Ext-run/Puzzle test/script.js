var rows = 10;
var columns = 10;

var currTile;
var otherTile;

let correctPuzzleAnswer = [];
// Jigsaw puzzle from https://www.youtube.com/watch?v=S6GNtMGNcUE by Kenny Yip Coding
window.onload = function() {
    //initialize the board
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.src = "./images/blank.jpg";

            tile.addEventListener("dragstart", dragStart); 
            tile.addEventListener("dragover", dragOver);   
            tile.addEventListener("dragenter", dragEnter); 
            tile.addEventListener("dragleave", dragLeave); 
            tile.addEventListener("drop", dragDrop);       
            tile.addEventListener("dragend", dragEnd);     

            document.getElementById("board").append(tile);
        }
    }


    document.getElementById("board").style.width = rows * 81 + "px";
    document.getElementById("board").style.height = columns * 81 + "px";

    document.getElementById("pieces").style.width = rows * 81 + "px";

    // Splits the image and sets each corresponding image piece to puzzle pieces.
    var img = new Image();
    img.src = "./images/image.jpg";
    img.onload = function() {
        var pieceWidth = img.width / columns;
        var pieceHeight = img.height / rows;

        let pieces = [];
        for (let i = 1; i <= rows * columns; i++) {
            pieces.push(i.toString());
        }

        let correctOrder = [];
        // Have to have this here since in the next step we are shuffling the pieces which would make the puzzle very easy to solve.
        for (let i = 0; i < pieces.length; i++) {
            let pieceIndex = parseInt(pieces[i]) - 1;
            let pieceRow = Math.floor(pieceIndex / columns);
            let pieceColumn = pieceIndex % columns;

            let canvas = document.createElement("canvas");
            canvas.width = pieceWidth;
            canvas.height = pieceHeight;
            let ctx = canvas.getContext("2d");

            // Copying piece of the image to canvas puzzle piece.
            ctx.drawImage(img, pieceColumn * pieceWidth, pieceRow * pieceHeight, pieceWidth, pieceHeight, 0, 0, pieceWidth, pieceHeight);

            correctOrder.push(canvas.toDataURL());
        }

        pieces.reverse();
        for (let i = 0; i < pieces.length; i++) {
            let j = Math.floor(Math.random() * pieces.length);

            // Swap
            let tmp = pieces[i];
            pieces[i] = pieces[j];
            pieces[j] = tmp;
        }

        for (let i = 0; i < pieces.length; i++) {
            let tile = document.createElement("img");
            tile.width = pieceWidth;
            tile.height = pieceHeight;

            // Using the correctorder we made before shuffling so the answer wont be the shuffled version..
            correctPuzzleAnswer.push(correctOrder[i]);

            tile.src = correctOrder[parseInt(pieces[i]) - 1];

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);  
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);      
            tile.addEventListener("dragend", dragEnd);    

            document.getElementById("pieces").append(tile);
        }
    };
}

function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {
}

function dragDrop() {
    otherTile = this;
}


function isPuzzleCompleted() {
    let pieces = document.getElementById("board").querySelectorAll("img");

    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i].src !== correctPuzzleAnswer[i]) {
            return false;
        }
    }

    return true;
}

function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }

    let currImg = currTile.src;
    let otherImg = otherTile.src;

    currTile.src = otherImg;
    otherTile.src = currImg;

    // Check if the puzzle is completed
    if (isPuzzleCompleted()) {
        alert("Congratulations! You've completed the puzzle.");
    }
}