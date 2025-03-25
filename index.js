// https://www.youtube.com/watch?v=XM2n1gu4530

let board;
let score = 0;
let rows = 4;
let columns = 4;

window.onload = function () {
  setGame();
};

// Jakmile se stránka načte, spustí se funkce setGame(), která nastaví hrací plochu.

function setGame() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];

  //   board = [
  //     [2, 2, 2, 2],
  //     [2, 2, 2, 2],
  //     [0, 0, 4, 4],
  //     [4, 4, 0, 0]
  //   ];

  // c = směr vpravo
  // r = směr dolů

  //   Vysvětlení:
  // Pro každou buňku v board:
  // Vytvoříme <div> element.
  // Přiřadíme mu unikátní id ve formátu "řádek.sloupec" (např. "0.0", "1.2").

  // Získáme číslo z board a aktualizujeme vzhled dlaždice (updateTile(tile, num)).

  // Přidáme dlaždici do div s id="board", který je v HTML.

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      // <div id='0.0'></div>
      let tile = document.createElement("div");
      tile.id = r.toString() + "." + c.toString();
      let num = board[r][c];
      updateTile(tile, num);
      document.getElementById("board").append(tile);
    }
  }
}

function setTwo() {
  let found = false;
  while (!found) {
    // random r, c
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);

    if (board[r][c] == 0) {
      board[r][c] = 2;
      let tile = document.getElementById(r.toString() + "." + c.toString());
      tile.innerText = "2";
      tile.classList.add("x2");
    }
  }
}

function updateTile(tile, num) {
  tile.innerText = "";
  //   Vyčistí dlaždici (innerText = "", odstranění tříd).
  tile.classList.value = "";

  // clear the classList
  tile.classList.add("tile");
  //   Přidá základní třídu "tile", což zajistí její vzhled.

  //   Pokud num není nula:
  if (num > 0) {
    tile.innerText = num;
    // Nastaví číslo jako text (tile.innerText = num).
    if (num < 4096) {
      tile.classList.add("x" + num.toString());
    } else {
      tile.classList.add("x8192");
      //   Čísla ≥ 4096 mají vždy třídu "x8192"
    }
  }
}

// Když hráč stiskne levou šipku, zavolá se slideLeft(), která posune čísla doleva.
document.addEventListener("keyup", (e) => {
  if (e.code === "ArrowLeft") {
    slideLeft();
  } else if (e.code === "ArrowRight") {
    slideRight();
  } else if (e.code === "ArrowUp") {
    slideUp();
  } else if (e.code === "ArrowDown") {
    slideDown();
  }
});

// Odstraní všechny nuly z pole.
// Např. [0, 2, 0, 4] → [2, 4].
function filterZero(row) {
  return row.filter((num) => num != 0);
}

// Metoda .filter() prochází všechny prvky pole a vytváří nové pole obsahující pouze prvky, které splňují podmínku v callback funkci. (bez nul)
// (num) => num != 0 je anonymní funkce, která vrací true, pokud num není nula, a false, pokud je.
// Vrátí nové pole, kde všechny nuly byly odstraněny.

// Funkce slide() - Spojování čísel:
function slide(row) {
  // [0, 2, 2, 2]
  row = filterZero(row);
  // get rid of zeroes => [2,2,2]

  //   slide
  for (let i = 0; i < row.length - 1; i++) {
    // check every 2
    // Projede řádek a spojí sousední stejné čísla:
    if (row[i] == row[i + 1]) {
      // vynásobí číslo 2
      row[i] *= 2;
      //   Druhé číslo nastaví na 0
      row[i + 1] = 0;
      //   Přičte hodnotu k score.
      score += row[i];
    }
  }
  // [2, 2, 2] => [4, 0, 2]
  row = filterZero(row);
  //   [4,2]

  //   add zeroes
  while (row.length < columns) {
    row.push(0);
  }
  // [4, 2, 0, 0]

  return row;
}

// Funkce slideLeft() - Posun řádku doleva

// Prochází každý řádek (board[r]) v poli board.

// Zavolá funkci slide(row), aby upravila řádek.

// Výsledek uloží zpět do board[r].
function slideLeft() {
  for (let r = 0; r < rows; r++) {
    // Projede každý řádek board[r]
    let row = board[r];
    // Aplikuje slide(row), aby spojil a posunul čísla doleva
    row = slide(row);
    // Aktualizuje board[r] novým řádkem
    board[r] = row;

    // Aktualizuje vzhled dlaždic v HTML.
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "." + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}
// Přiřadíme mu unikátní id ve formátu "řádek.sloupec" (např. "0.0", "1.2").

// Získáme číslo z board a aktualizujeme vzhled dlaždice (updateTile(tile, num)).

// Přidáme dlaždici do div s id="board", který je v HTML.

// směr vpravo => c
function slideRight() {
  for (let r = 0; r < rows; r++) {
    // Projede každý řádek board[r]
    let row = board[r];
    // Aplikuje slide(row), aby spojil a posunul čísla vpravo
    row.reverse();
    row = slide(row);
    // Aktualizuje board[r] novým řádkem
    row.reverse();
    board[r] = row;

    // Aktualizuje vzhled dlaždic v HTML.
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "." + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

// šikla nahoru  ( spojení čísel nahoru)

function slideUp() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row = slide(row);
    // board[0][c] = row[0];
    // board[1][c] = row[1];
    // board[2][c] = row[2];
    // board[3][c] = row[3];
    // Aktualizuje vzhled dlaždic v HTML.
    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "." + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideDown() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    row = slide(row);
    row.reverse();
    // board[0][c] = row[0];
    // board[1][c] = row[1];
    // board[2][c] = row[2];
    // board[3][c] = row[3];
    // Aktualizuje vzhled dlaždic v HTML.
    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "." + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}
