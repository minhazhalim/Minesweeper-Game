document.addEventListener('DOMContentLoaded',() => {
     const grid = document.querySelector('.grid');
     const flagsLeft = document.querySelector('#flags-left');
     const result = document.querySelector('#result');
     let width = 10;
     let bombAmount = 20;
     let flags = 0;
     let squares = [];
     let isGameOver = false;
     function createBoard(){
          flagsLeft.innerHTML = bombAmount;
          const bombsArray = Array(bombAmount).fill('bomb');
          const emptyArray = Array(width * width - bombAmount).fill('valid');
          const gameArray = emptyArray.concat(bombsArray);
          const shuffledArray = gameArray.sort(() => Math.random() -0.5);
          for(let i=0;i<width*width;i++){
               const square = document.createElement('div');
               square.setAttribute('id',i);
               square.classList.add(shuffledArray[i]);
               grid.appendChild(square);
               squares.push(square);
               square.addEventListener('click',function(event){
                    click(square);
               });
               square.oncontextmenu = function(event){
                    event.preventDefault();
                    addFlag(square);
               }
          }
          for(let i=0;i<squares.length;i++){
               let total = 0;
               const isLeftEdge = (i % width === 0);
               const isRightEdge = (i % width === width -1);
               if(squares[i].classList.contains('valid')){
                    if(i>0 && !isLeftEdge && squares[i -1].classList.contains('bomb')){
                         total++;
                    }
                    if(i>9 && !isRightEdge && squares[i +1 -width].classList.contains('bomb')){
                         total++;
                    }
                    if(i>10 && squares[i -width].classList.contains('bomb')){
                         total++;
                    }
                    if(i>11 && !isLeftEdge && squares[i -1 -width].classList.contains('bomb')){
                         total++;
                    }
                    if(i<98 && !isRightEdge && squares[i +1].classList.contains('bomb')){
                         total++;
                    }
                    if(i<90 && !isLeftEdge && squares[i -1 +width].classList.contains('bomb')){
                         total++;
                    }
                    if(i<88 && !isRightEdge && squares[i +1 +width].classList.contains('bomb')){
                         total++;
                    }
                    if(i<89 && squares[i +width].classList.contains('bomb')){
                         total++;
                    }
                    squares[i].setAttribute('data',total);
               }
          }
     }
     createBoard();
     function addFlag(square){
          if(isGameOver){
               return;
          }
          if(!square.classList.contains('checked') && (flags<bombAmount)){
               if(!square.classList.contains('flag')){
                    square.classList.add('flag');
                    square.innerHTML = '🚩';
                    flags++;
                    flagsLeft.innerHTML = bombAmount- flags;
                    checkForWin();
               }else{
                    square.classList.remove('flag');
                    square.innerHTML = '';
                    flags--;
                    flagsLeft.innerHTML = bombAmount- flags;
               }
          }
     }
     function click(square){
          let currentID = square.id;
          if(isGameOver){
               return;
          }
          if(square.classList.contains('checked') || square.classList.contains('flag')){
               return;
          }
          if(square.classList.contains('bomb')){
               gameOver(square);
          }else{
               let total = square.getAttribute('data');
               if(total !=0){
                    square.classList.add('checked');
                    if(total == 1){
                         square.classList.add('one');
                    }
                    if(total == 2){
                         square.classList.add('two');
                    }
                    if(total == 3){
                         square.classList.add('three');
                    }
                    if(total == 4){
                         square.classList.add('four');
                    }
                    square.innerHTML = total;
                    return;
               }
               checkSquare(square,currentID);
          }
          square.classList.add('checked');
     }
     function checkSquare(square,currentID){
          const isLeftEdge = (currentID % width  === 0);
          const isRightEdge = (currentID % width === width -1);
          setTimeout(() => {
               if(currentID>0 && !isLeftEdge){
                    const newID = squares[parseInt(currentID) -1].id;
                    const newSquare = document.getElementById(newID);
                    click(newSquare);
               }
               if(currentID>9 && !isRightEdge){
                    const newID = squares[parseInt(currentID) +1 -width].id;
                    const newSquare = document.getElementById(newID);
                    click(newSquare);
               }
               if(currentID>10){
                    const newID = squares[parseInt(currentID -width)].id;
                    const newSquare = document.getElementById(newID);
                    click(newSquare);
               }
               if(currentID>11 && !isLeftEdge){
                    const newID = squares[parseInt(currentID) -1 -width].id;
                    const newSquare = document.getElementById(newID);
                    click(newSquare);
               }
               if(currentID<98 && !isRightEdge){
                    const newID = squares[parseInt(currentID) +1].id;
                    const newSquare = document.getElementById(newID);
                    click(newSquare);
               }
               if(currentID<90 && !isLeftEdge){
                    const newID = squares[parseInt(currentID) -1 +width].id;
                    const newSquare = document.getElementById(newID);
                    click(newSquare);
               }
               if(currentID<88 && !isRightEdge){
                    const newID = squares[parseInt(currentID) +1 +width].id;
                    const newSquare = document.getElementById(newID);
                    click(newSquare);
               }
               if(currentID<89){
                    const newID = squares[parseInt(currentID) +width].id;
                    const newSquare = document.getElementById(newID);
                    click(newSquare);
               }
          },10);
     }
     function gameOver(square){
          result.innerHTML = 'BOOM! Game Over!';
          isGameOver = true;
          squares.forEach(square => {
               if(square.classList.contains('bomb')){
                    square.innerHTML = '💣';
                    square.classList.remove('bomb');
                    square.classList.add('checked');
               }
          });
     }
     function checkForWin(){
          let matches = 0;
          for(let i=0;i<squares.length;i++){
               if(squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')){
                    matches++;
               }
               if(matches === bombAmount){
                    result.innerHTML = 'YOU WIN!';
                    isGameOver = true;
               }
          }
     }
});