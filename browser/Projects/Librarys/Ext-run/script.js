





class JigsawPuzzle {
    constructor(column, row, imageUrl, puzzleboard, pieceboard) {
        this.column = column;
        this.row = row;
        this.imageUrl = imageUrl;
        this.puzzleboard = puzzleboard;
        this.pieceboard = pieceboard;
        this.pieces = [];
    }

    loadImagePieces() {
        // Have to use promise because we are reading an image which takes time = 
        // if you call setPiecesToPieceboard in example right after creating jigsawpuzzle it wont work because it hasnt loaded the image yet.
        return new Promise((resolve, reject) => {
          const image = new Image();
          image.src = this.imageUrl;
    
          image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
    
            canvas.width = image.width;
            canvas.height = image.height;
    
            ctx.drawImage(image, 0, 0);
    
            const pieceWidth = canvas.width / this.column;
            const pieceHeight = canvas.height / this.row;
    
            for (let row = 0; row < this.row; row++) {
              for (let col = 0; col < this.column; col++) {
                const startX = col * pieceWidth;
                const startY = row * pieceHeight;
    
                const pieceCanvas = document.createElement('canvas');
                const pieceCtx = pieceCanvas.getContext('2d');
                pieceCanvas.width = pieceWidth;
                pieceCanvas.height = pieceHeight;
    
                pieceCtx.drawImage(
                  canvas,
                  startX,
                  startY,
                  pieceWidth,
                  pieceHeight,
                  0,
                  0,
                  pieceWidth,
                  pieceHeight
                );
    
                this.pieces.push(pieceCanvas);
              }
            }
    
            resolve();
          };
    
          image.onerror = (error) => {
            reject(error);
          };
        });
      }

    setPiecesToPieceboard() {

        const gridContainer = document.createElement('div');
        gridContainer.style.display = 'grid';
        
        gridContainer.style.gridTemplateColumns = 'repeat(2, 1fr)'; 
        gridContainer.style.gridTemplateRows = 'repeat(3, 1fr)';
        
        this.pieces.forEach((piece) => {
          const pieceContainer = document.createElement('div');
          pieceContainer.style.margin = '10px';
        
          pieceContainer.appendChild(piece);
        
          gridContainer.appendChild(pieceContainer);
        });
    
        this.pieceboard.appendChild(gridContainer);
    }

    shufflePieces() {

    }
}

const puzzle = new JigsawPuzzle(2, 3, "images/lock.png", document.getElementById('imagePiecesContainer'), document.getElementById('imagePiecesContainer'));

async function setupPuzzle() {
    await puzzle.loadImagePieces();
    puzzle.setPiecesToPieceboard();
}

setupPuzzle();