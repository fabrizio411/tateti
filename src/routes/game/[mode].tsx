import {
  redirect,
  useNavigate,
  useParams,
  useSearchParams,
} from "@solidjs/router";
import { Mark, Mode, Pieces } from "~/global";
import NotFound from "../[...404]";
import Board from "~/components/Board";
import Score from "~/components/Score";
import Menu from "~/components/Menu";
import { createSignal } from "solid-js";
import { checkWin } from "~/libs/checkWin";
import Popup from "~/components/ui/Popup";
import EndGameModal from "~/components/modals/EndGameModal";

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
  const [paused, setPaused] = createSignal<boolean>(false);
  const [pieces, setPieces] = createSignal<Pieces>(Array(9).fill("0"));
  const [winners, setWinners] = createSignal<number[]>([]);
  const [scoreX, setScoreX] = createSignal<number>(0);
  const [scoreO, setScoreO] = createSignal<number>(0);
  const [ties, setTies] = createSignal<number>(0);

  // === HANDLERS === //
  const onPlay = (index: number, e: Event) => {
    if (paused() || pieces()[index] !== "0") return;

    placePiece(index);

    const result = checkWin(turn(), pieces());
    if (result !== null) return onWin(result);
    if (turnCount() >= 8) return onTie();
    setTurnCount((prev) => prev + 1);

    setTurn((prev) => prev === "x" ? "o" : "x");
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
    setPieces(Array(9).fill("0"));
    setWinners([]);
    setTurn((prev) => prev === "x" ? "o" : "x");
    setTurnCount(0);
  };

  const onRestart = () => {
    onNext();
    setTurn("x");
    setScoreO(0);
    setScoreX(0);
    setTies(0);
  };

  // === UTILS === //
  const placePiece = (index: number) => {
    setPieces((prev) => {
      const newPieces = [...prev];
      newPieces[index] = turn();
      return newPieces;
    });
  };

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
