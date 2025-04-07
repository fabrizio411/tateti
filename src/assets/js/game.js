export const handleGame = () => {
  // === PARAMS ===
  const params = new URLSearchParams(window.location.search);
  const mark = params.get("mark");
  const mode = window.location.pathname.split("/").pop();
  const winningCombinations = [
    [0, 1, 2], // fila 1
    [3, 4, 5], // fila 2
    [6, 7, 8], // fila 3
    [0, 3, 6], // columna 1
    [1, 4, 7], // columna 2
    [2, 5, 8], // columna 3
    [0, 4, 8], // diagonal
    [2, 4, 6], // diagonal
  ];

  // === ICONS ===
  const svg = {
    x: `<svg class="h-4/7 w-4/7 fill-accent-1 animate-pop" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"/></svg>`,
    o: `<svg class="h-4/7 w-4/7 fill-accent-2 animate-pop" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" /></svg>`,
    xDark: `<svg class="h-4/7 w-4/7 fill-muted-background" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"/></svg>`,
    oDark: `<svg class="h-4/7 w-4/7 fill-muted-background" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" /></svg>`,
    xHover: `<svg class="h-4/7 w-4/7" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M51.12 1.269c.511 0 1.023.195 1.414.586l9.611 9.611c.391.391.586.903.586 1.415s-.195 1.023-.586 1.414L44.441 32l17.704 17.705c.391.39.586.902.586 1.414 0 .512-.195 1.024-.586 1.415l-9.611 9.611c-.391.391-.903.586-1.415.586a1.994 1.994 0 0 1-1.414-.586L32 44.441 14.295 62.145c-.39.391-.902.586-1.414.586a1.994 1.994 0 0 1-1.415-.586l-9.611-9.611a1.994 1.994 0 0 1-.586-1.415c0-.512.195-1.023.586-1.414L19.559 32 1.855 14.295a1.994 1.994 0 0 1-.586-1.414c0-.512.195-1.024.586-1.415l9.611-9.611c.391-.391.903-.586 1.415-.586s1.023.195 1.414.586L32 19.559 49.705 1.855c.39-.391.902-.586 1.414-.586Z" stroke="#31C3BD" stroke-width="2" fill="none"/></svg>`,
    oHover: `<svg class="h-4/7 w-4/7" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><path d="M33 1c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C15.327 65 1 50.673 1 33 1 15.327 15.327 1 33 1Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" stroke="#F2B137" stroke-width="2" fill="none"/></svg>`,
    xEnd: `<svg class="h-16 w-16 fill-accent-1" viewbox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"/></svg>`,
    oEnd: `<svg class="h-16 w-16 fill-accent-2" viewbox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" /></svg>`,
  };

  // === CPU PARAMS ===
  const isVsCpu = mode === "cpu";
  const vsCpu = {
    mark: mark === "x" ? "o" : "x",
    hoverIcon: mark === "x" ? svg.xHover : svg.oHover,
    icon: mark === "x" ? svg.x : svg.o,
  };

  // === STATE ===
  let blocked = false;
  let turnX = true;
  let turnCount = 0;
  let roundCount = 1;
  let pieces = Array(9).fill("0");
  let xWins = 0,
    oWins = 0,
    ties = 0;

  // === DOM ===
  const tiles = document.querySelectorAll(".game-tile");
  const endMenu = document.querySelector("#end-menu");
  const endQuitBtn = document.querySelector("#end-quit");
  const endNextBtn = document.querySelector("#end-next");
  const endMenuContent = document.querySelector("#end-menu-content");
  const restartBtn = document.querySelector("#restart-btn");
  const restartMenu = document.querySelector("#restart-menu");
  const restartCancel = document.querySelector("#restart-cancel");
  const restartConfirm = document.querySelector("#restart-confirm");
  const turnShow = document.querySelector("#turn-show");

  // === INIT ===
  setPlayerLabels();
  if (isVsCpu) playCpu();

  tiles.forEach((tile) => {
    // Hover
    tile.addEventListener("mouseenter", () => {
      if (!tile.classList.contains("played"))
        tile.innerHTML = isVsCpu
          ? vsCpu.hoverIcon
          : turnX
          ? svg.xHover
          : svg.oHover;
    });
    tile.addEventListener("mouseleave", () => {
      if (!tile.classList.contains("played")) tile.innerHTML = "";
    });

    // Click
    tile.addEventListener("click", () => handleClick(tile));
  });

  // === HANDLERS ===
  function handleClick(tile) {
    if (tile.classList.contains("played") || blocked || isCpuTurn()) return;

    const position = +tile.dataset.position;
    placePiece(position, tile);

    if (checkWin()) {
      blocked = true;
      return setTimeout(() => {
        blocked = false;
        showEnd(false);
      }, 500);
    }

    if (++turnCount > 8) return showEnd(true);
    turnX = !turnX;
    turnShow.innerHTML = turnX ? "X" : "O";

    return playCpu();
  }

  function placePiece(position, thisTile) {
    pieces[position] = turnX ? "X" : "O";

    const tile = thisTile
      ? thisTile
      : document.querySelector(`#tile-${position}`);
    tile.innerHTML = turnX ? svg.x : svg.o;
    tile.classList.add("played");
  }

  function playCpu() {
    if (isCpuTurn()) {
      return setTimeout(() => {
        placePiece(getCpuPosition());

        if (checkWin()) {
          blocked = true;
          return setTimeout(() => {
            blocked = false;
            showEnd(false);
          }, 500);
        }

        if (++turnCount > 8) return showEnd(true);
        turnX = !turnX;
        turnShow.innerHTML = turnX ? "X" : "O";
      }, 400);
    }
  }

  function isCpuTurn() {
    return isVsCpu && mark !== (turnX ? "x" : "o");
  }

  // ====================
  // ====================
  function checkPosibleWin(player) {
    for (const combo of winningCombinations) {
      const values = combo.map((index) => pieces[index]);
      const playerCount = values.filter((v) => v === player).length;
      const emptyCount = values.filter((v) => v === "0").length;

      if (playerCount === 2 && emptyCount === 1) {
        const emptyIndex = combo.find((index) => pieces[index] === "0");
        return emptyIndex;
      }
    }

    return null;
  }

  function getCpuPosition() {
    let position = null;

    // Check for cpu win
    position = checkPosibleWin(mark === "o" ? "X" : "O");
    if (position !== null) return position;

    // Check defensive
    position = checkPosibleWin(mark.toUpperCase());
    if (position !== null) return position;

    // Elegir posición random entre las vacías
    const emptyPositions = pieces
      .map((val, i) => (val === "0" ? i : null))
      .filter((i) => i !== null);

    return emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
  }

  // ====================
  // ====================

  function showEnd(isTie) {
    endMenuContent.innerHTML = createEndMenu(isTie);
    endMenu.style.display = "flex";

    endQuitBtn.addEventListener(
      "click",
      () => {
        window.location.href = "/";
        restart();
      },
      { once: true }
    );

    endNextBtn.addEventListener(
      "click",
      () => {
        endMenu.style.display = "none";
        nextRound(isTie);
      },
      { once: true }
    );
  }

  function createEndMenu(isTie) {
    if (isTie)
      return `<h1 class="outfit-bold text-muted-foreground">ROUND TIED</h1>`;

    const icon = turnX ? svg.xEnd : svg.oEnd;
    const textColor = turnX ? "text-accent-1" : "text-accent-2";
    const winText = getWinText(turnX);

    return `
        <h3 class="text-muted-foreground">${winText}</h3>
        <h1 class="flex gap-6 items-center">
          ${icon}
          <span class="outfit-bold ${textColor}">GANA LA RONDA</span>
        </h1>`;
  }

  function getWinText(xTurn) {
    const isPlayer1 = (mark === "x" && xTurn) || (mark === "o" && !xTurn);
    if (mode === "cpu") return isPlayer1 ? "GANASTE!" : "PERDISTE.";
    return isPlayer1 ? "JUGADOR 1 GANÓ!" : "JUGADOR 2 GANÓ!";
  }

  function nextRound(isTie) {
    isTie ? ties++ : turnX ? xWins++ : oWins++;
    refresh();
    updateScore();
    roundCount++;
  }

  function setPlayerLabels() {
    turnShow.innerHTML = turnX ? "X" : "O";

    const xLabel = document.querySelector("#x-player");
    const oLabel = document.querySelector("#o-player");

    if (mode === "cpu") {
      xLabel.innerHTML = mark === "x" ? "TU" : "CPU";
      oLabel.innerHTML = mark === "o" ? "TU" : "CPU";
    } else {
      xLabel.innerHTML = mark === "x" ? "Jugador 1" : "Jugador 2";
      oLabel.innerHTML = mark === "o" ? "Jugador 1" : "Jugador 2";
    }
  }

  function updateScore() {
    document.querySelector("#x-player-wins").innerHTML = xWins;
    document.querySelector("#o-player-wins").innerHTML = oWins;
    document.querySelector("#ties").innerHTML = ties;
  }

  function refresh() {
    turnX = roundCount % 2 === 0;
    turnCount = 0;
    pieces.fill("0");
    tiles.forEach((tile) => {
      tile.innerHTML = "";
      tile.classList.remove("played");
      tile.classList.remove("highlight-x");
      tile.classList.remove("highlight-o");
    });

    return playCpu();
  }

  function restart() {
    xWins = oWins = ties = 0;
    roundCount = 1;
    updateScore();
    refresh();
  }

  // === OTHRES ===
  function showRestart() {
    restartMenu.style.display = "flex";

    restartCancel.addEventListener(
      "click",
      () => {
        restartMenu.style.display = "none";
      },
      { once: true }
    );

    restartConfirm.addEventListener(
      "click",
      () => {
        restart();
        restartMenu.style.display = "none";
      },
      { once: true }
    );
  }

  restartBtn.addEventListener("click", showRestart);

  // === WIN LOGIC ===
  function checkWin() {
    const player = turnX ? "X" : "O";

    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        pieces[a] === player &&
        pieces[b] === player &&
        pieces[c] === player
      ) {
        highlightWinningTiles([a, b, c]);
        return true;
      }
    }

    return false;
  }

  function highlightWinningTiles(indices) {
    indices.forEach((index) => {
      const tile = document.querySelector(`#tile-${index}`);
      if (tile) {
        const color = turnX ? "highlight-x" : "highlight-o";

        tile.classList.add(color);
        tile.innerHTML = turnX ? svg.xDark : svg.oDark;
      }
    });
  }
};
