import { useNavigate, useParams, useSearchParams } from "@solidjs/router";
import { Mark, Mode, Pieces } from "~/global";
import NotFound from "../[...404]";
import Board from "~/components/Board";
import Score from "~/components/Score";
import Menu from "~/components/Menu";
import { createSignal } from "solid-js";
import { checkWin } from "~/libs/checkWin";
import Popup from "~/components/ui/Popup";
import EndGameModal from "~/components/modals/EndGameModal";
import { cpuChoice } from "~/libs/cpuChoice";

const Game = () => {
  // === VALIDATIONS === //
  const modes: Mode[] = ["online", "cpu", "local"] as const;
  const params = useParams();
  const mode = params.mode;
  const valid = modes.includes(mode as Mode);
  if (!valid) return <NotFound />;

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const mark = searchParams.mark;
  if (mark !== "x" && mark !== "o") navigate("/", { replace: true });

  // === GAME STATES === //
  const [turn, setTurn] = createSignal<Mark>("x");
  const [turnCount, setTurnCount] = createSignal<number>(0);
  const [roundCount, setRoundCount] = createSignal<number>(1);
  const [paused, setPaused] = createSignal<boolean>(false);
  const [bloqued, setBloqued] = createSignal<boolean>(false);
  const [pieces, setPieces] = createSignal<Pieces>(Array(9).fill("0"));
  const [winners, setWinners] = createSignal<number[]>([]);
  const [scoreX, setScoreX] = createSignal<number>(0);
  const [scoreO, setScoreO] = createSignal<number>(0);
  const [ties, setTies] = createSignal<number>(0);

  const isCpuTurn = () => mode === "cpu" && turn() !== mark;

  // === HANDLERS === //
  const onPlay = (index: number) => {
    if (paused() || pieces()[index] !== "0" || bloqued() || isCpuTurn()) return;

    placePiece(index);

    const result = checkWin(turn(), pieces());
    if (result !== null) return onWin(result);
    if (turnCount() >= 8) return onTie();
    setTurnCount((prev) => prev + 1);

    setTurn((prev) => prev === "x" ? "o" : "x");

    playCpu();
  };

  const onWin = (result: number[]) => {
    setWinners(result);

    setTimeout(() => {
      setPaused(true);
    }, 400);

    if (turn() === "x") setScoreX((prev) => prev + 1);
    else setScoreO((prev) => prev + 1);
  };

  const onTie = () => {
    setPaused(true);
    setTies((prev) => prev + 1);
  };

  const onNext = () => {
    setRoundCount((prev) => prev + 1);
    setPieces(Array(9).fill("0"));
    setWinners([]);
    setTurn(roundCount() % 2 === 0 ? "o" : "x");
    setTurnCount(0);
    setBloqued(false);
    playCpu();
  };

  const onRestart = () => {
    setTurn("x");
    setScoreO(0);
    setScoreX(0);
    setTies(0);
    onNext();
    setRoundCount(1);
  };

  // === UTILS === //
  const playCpu = () => {
    if (isCpuTurn()) {
      setBloqued(true);
      setTimeout(() => {
        placePiece(cpuChoice(mark as Mark, pieces()));

        const result = checkWin(turn(), pieces());
        if (result !== null) return onWin(result);
        if (turnCount() >= 8) return onTie();
        setTurnCount((prev) => prev + 1);
        setTurn((prev) => prev === "x" ? "o" : "x");

        setBloqued(false);
      }, 500);
    }
  };

  const placePiece = (index: number) => {
    setPieces((prev) => {
      const newPieces = [...prev];
      newPieces[index] = turn();
      return newPieces;
    });
  };

  playCpu();

  return (
    <div class="w-full p-4 max-w-[460px] flex flex-col items-stretch gap-6 sm:gap-7">
      <Menu onRestart={onRestart} turn={turn()} />
      <Board
        winners={winners()}
        onPlay={onPlay}
        turn={turn()}
        pieces={pieces()}
      />
      <Score
        mode={mode as Mode}
        mark={mark as Mark}
        scoreO={scoreO()}
        scoreX={scoreX()}
        ties={ties()}
      />

      <Popup
        class="w-full"
        open={paused()}
        onClose={() => {}}
        modal={
          <EndGameModal
            mode={mode as Mode}
            mark={mark as Mark}
            winner={winners().length > 0 ? turn() : null}
            onClose={() => {
              setPaused(false);
              onNext();
            }}
          />
        }
      />
    </div>
  );
};

export default Game;
