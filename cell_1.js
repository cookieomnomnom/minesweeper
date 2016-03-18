var field;
var fieldTable;
var fieldHeight;
var fieldWidth;
var bombs; 
var cellsToOpen;


function startGame(width, height, bombsCount){
    field = null;
    if(fieldTable)
        fieldTable.parentElement.removeChild(fieldTable);
    fieldHeight = height;
    fieldWidth = width;
    field = makeField(height, width, bombsCount);
    bombs = bombsCount;
    cellsToOpen = width*height - bombsCount;
    setBombs(height, width, bombsCount); 
    setValues(field);
    drawField(height, width);
    document.getElementById("restart").style.visibility="visible";
}

function cell(coord){
    this.isBomb = false;
    this.coord = coord;
    this.value = 0;
}

function coordnate(x, y){
    this.x = x;
    this.y = y;
}

function getCoordinates(obj){
	var x = obj.parentElement.rowIndex;
    var y = obj.cellIndex;
    var coord = new coordnate(x, y);
    return coord;
}

function makeField(width, height, bombsCount){
    var arr = [];
    for (var i = 0; i < height+2; i++){
        var inArr = [];
        for (var j = 0; j < width+2; j++){
            var celll = new cell(coordnate(i, j));
            celll.value = 0;
            inArr[j] = celll;
        }
        arr[i] = inArr;     
    }
    return arr;
}


function drawField(width, height){
    fieldTable = document.createElement('table');
    document.getElementById('rrr').appendChild(fieldTable);
    for (var i = 0; i < height; i++){
        var row = document.createElement('tr');
        fieldTable.appendChild(row);
        for (var j = 0; j < width; j++){
            var cel = document.createElement('td');
            cel.className = "closed";
            row.appendChild(cel);
            cel.addEventListener("contextmenu", function() {
                makeFlag(this);
                return false;
            });
            cel.addEventListener("click", function(){
                cellClick(this);
            });
        }
    }
}
function makeFlag(cel){
    if(cel.className != 'flag'){
        cel.className = 'flag';
        cel.innerHTML = "?";
    }
    else cel.className = 'closed';
}

function setBombs(width, height, bombsCount){
    while (bombsCount != 0 ){
        var x = Math.floor(Math.random() * width) + 1;
        var y = Math.floor(Math.random() * height) + 1;
        if (field[x][y].isBomb === false){
            field[x][y].isBomb = true;
            bombsCount--;
        }
    }
}


function cellClick(cel){
    if(cel.className == 'flag')
        return;
    var coordnates = getCoordinates(cel);
    if (field[coordnates.x+1][coordnates.y+1].isBomb){
        cel.className = "bomb";
        alert('loooooooooooozer');
        startGame(fieldWidth,fieldHeight, bombs);
    }
    else {
        openCell(cel);
    }
}
function openCell(cel)
{
    if(cel.className == "opened" || cell.className == "flag")
        return;
    var coordnates = getCoordinates(cel);
    var x = coordnates.x;
    var y = coordnates.y;
    cel.className = "opened";
     cellsToOpen--;
    if(cellsToOpen <= 0){
        alert("win");
        return;
    }
        
    if (field[coordnates.x+1][coordnates.y+1].value != 0){
        cel.innerHTML = field[coordnates.x+1][coordnates.y+1].value;
    }
    else{
        if(x-1 >= 0 && y-1 >=0 && x-1 < fieldHeight && y-1 < fieldWidth){
            var northWestCell = fieldTable.children[x-1].children[y-1];
            openCell(northWestCell);
        } 
        if(x-1 >= 0 && y >=0 && x-1 < fieldHeight && y <  fieldWidth){
            var northCell = fieldTable.children[x-1].children[y];
            openCell(northCell);
        }
        if(x-1 >= 0 && y+1 >=0 && x-1 < fieldHeight && y+1 < fieldWidth) {
            var northEastCell = fieldTable.children[x-1].children[y+1];
            openCell(northEastCell);
        }
        if(x >= 0 && y+1 >=0 && x < fieldHeight && y+1 < fieldWidth) {
            var eastCell = fieldTable.children[x].children[y+1];
            openCell(eastCell);
        }
        if(x+1 >= 0 && y+1 >=0 && x+1 < fieldHeight && y+1 < fieldWidth) {
            var southEastCell = fieldTable.children[x+1].children[y+1];
            openCell(southEastCell);
        }
        if(x+1 >= 0 && y >=0 && x+1 < fieldHeight && y < fieldWidth) {
            var southCell = fieldTable.children[x+1].children[y];
            openCell(southCell);
        }
        if(x+1 >= 0 && y-1 >=0 && x+1 < fieldHeight && y-1 < fieldWidth) {
            var southWestCell = fieldTable.children[x+1].children[y-1];
            openCell(southWestCell);
        }
        if(x >= 0 && y-1 >=0 && x < fieldHeight && y-1 < fieldWidth) {
            var westCell = fieldTable.children[x].children[y-1];
            openCell(westCell);
        }
    }
}
function setValues(field){
    for (var i = 1; i < field.length-1; i++){
        for (var j = 1; j < field[i].length-1; j++){
            if (field[i][j].isBomb === false){
                field[i][j].value = bombIsNear(field, i, j);
            }
        }
    }
}

function bombIsNear(field, x, y){
    counter = 0;
    if (field[x-1][y-1].isBomb) {
        field[x][y].value++;
    }
    if (field[x][y-1].isBomb) {
        field[x][y].value++;
    }
    if (field[x+1][y-1].isBomb) {
        field[x][y].value++;
    }
    if (field[x-1][y].isBomb) {
        field[x][y].value++;
    }
    if (field[x+1][y].isBomb) {
        field[x][y].value++;
    }
    if (field[x-1][y+1].isBomb) {
        field[x][y].value++;
    }
    if (field[x][y+1].isBomb) {
        field[x][y].value++;
    }
    if (field[x+1][y+1].isBomb) {
        field[x][y].value++;
    }
    return field[x][y].value;
}  





        
