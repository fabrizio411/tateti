import { A, useNavigate, useParams, useSearchParams } from "@solidjs/router";
import { Mark, Mode, Pieces } from "~/global";
import NotFound from "../[...404]";
import Board from "~/components/Board";
import Score from "~/components/Score";
import Menu from "~/components/Menu";
import { createSignal, onCleanup, onMount, Show } from "solid-js";
import { checkWin } from "~/libs/checkWin";
import Popup from "~/components/ui/Popup";
import EndGameModal from "~/components/modals/EndGameModal";
import { cpuChoice } from "~/libs/cpuChoice";
import Button from "~/components/ui/Button";
import { getRequestEvent } from "solid-js/web";

const Game = () => {
  // === VALIDATIONS === //
  const modes: Mode[] = ["online", "cpu", "local"] as const;
  const params = useParams();
  const mode = params.mode;
  const valid = modes.includes(mode as Mode);
  if (!valid) return <NotFound />;
  const isOnline = mode === "online";
  const isCpu = mode === "cpu";

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mark, setMark] = createSignal<Mark>();
  if (!isOnline && searchParams.mark !== "x" && searchParams.mark !== "o") {
    navigate("/", { replace: true });
  } else {
    setMark(searchParams.mark as Mark);
  }

  const event = getRequestEvent();
  const roomId = searchParams.roomId;
  const playerId =
    typeof window !== "undefined" && window.localStorage.getItem("playerId") ||
    crypto.randomUUID();
  if (typeof window !== "undefined") {
    window.localStorage.setItem("playerId", playerId);
  }

  // === GAME STATES === //
  const [roomFull, setRoomFull] = createSignal<boolean>(false);
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
  const isCpuTurn = () => isCpu && turn() !== mark();
  let interval: any;

  // === API === //
  const fetchState = async () => {
    if (!roomId) return;
    const res = await fetch(`/api/rooms/${roomId}`);
    if (res.ok) {
      const data = await res.json();
      setPieces(data.pieces);
      setTurn(data.turn);
      setPaused(data.paused);
      setWinners(data.winners || []);
      setScoreX(data.score.x);
      setScoreO(data.score.o);
      setTies(data.score.ties);
    }
  };

  const sendMove = async (index: number) => {
    if (!roomId) return;
    const res = await fetch(`/api/rooms/${roomId}/move`, {
      method: "POST",
      body: JSON.stringify({ index, player: mark() }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      const data = await res.json();
      setPieces(data.pieces);
      setTurn(data.turn);
      setPaused(data.paused);
      setWinners(data.winners || []);
      setScoreX(data.score.x);
      setScoreO(data.score.o);
      setTies(data.score.ties);
    }
  };

  // === EFFECTS === //
  onMount(async () => {
    if (mode === "online" && roomId) {
      const res = await fetch(`/api/rooms/${roomId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerId }),
      });
      if (res.status === 403) return setRoomFull(true);
      const data = await res.json();
      setMark(data.playerRoles[playerId]);
      console.log(mark());
      fetchState();
      interval = setInterval(fetchState, 1000);
    }
  });

  onCleanup(() => clearInterval(interval));

  // === HANDLERS === //
  const onPlay = async (index: number) => {
    if (paused() || pieces()[index] !== "0" || bloqued() || isCpuTurn()) return;

    if (isOnline) {
      sendMove(index);
    } else {
      placePiece(index);
      const result = checkWin(turn(), pieces());
      if (result !== null) return onWin(result);
      if (turnCount() >= 8) return onTie();
      setTurnCount((prev) => prev + 1);
      setTurn((prev) => (prev === "x" ? "o" : "x"));
      playCpu();
    }
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

  const onNext = async () => {
    if (isOnline) {
      return await fetch(`/api/rooms/${roomId}/next`, {
        method: "POST",
      });
    }
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
        placePiece(cpuChoice(mark() as Mark, pieces()));

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
    <Show
      when={!roomFull()}
      fallback={
        <div class="flex flex-col items-center gap-8 bg-black/20 py-16 w-full">
          <h3 class="text-5xl font-bold">THIS ROOM IS FULL!</h3>
          <A href="/">
            <Button variant="primary">BACK TO HOME</Button>
          </A>
        </div>
      }
    >
      <div class="w-full p-4 max-w-[460px] flex flex-col items-stretch gap-6 sm:gap-7">
        <Menu onRestart={onRestart} turn={turn()} />
        <Board
          winners={winners()}
          onPlay={onPlay}
          turn={turn()}
          pieces={pieces()}
          hideHover={isOnline && turn() !== mark()}
        />
        <Score
          mode={mode as Mode}
          mark={mark() as Mark}
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
              mark={mark() as Mark}
              winner={winners().length > 0 ? turn() : null}
              onClose={() => {
                setPaused(false);
                onNext();
              }}
            />
          }
        />
      </div>
    </Show>
  );
};

export default Game;
