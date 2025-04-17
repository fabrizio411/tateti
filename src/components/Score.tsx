import { Component } from "solid-js";
import { Mark, Mode } from "~/global";

interface Props {
  mode: Mode;
  mark: Mark;
  scoreO: number;
  scoreX: number;
  ties: number;
}

const Score: Component<Props> = (props) => {
  const xLabel = props.mode === "cpu"
    ? (props.mark === "x" ? "YOU" : "CPU")
    : (props.mark === "x" ? "Player 1" : "Player 2");

  const oLabel = props.mode === "cpu"
    ? (props.mark === "o" ? "YOU" : "CPU")
    : (props.mark === "o" ? "Player 1" : "Player 2");

  return (
    <div class="grid grid-cols-3 gap-4 sm:gap-6">
      <div class="flex flex-col items-center bg-accent-1 rounded-xl py-2 h-16 justify-between text-muted-background">
        <p>
          X ({xLabel})
        </p>
        <h3 class="font-bold" id="x-player-wins">{props.scoreX}</h3>
      </div>
      <div class="flex flex-col items-center bg-muted-foreground rounded-xl py-2 h-16 justify-between text-muted-background">
        <p>TIES</p>
        <h3 class="font-bold" id="ties">{props.ties}</h3>
      </div>
      <div class="flex flex-col items-center bg-accent-2 rounded-xl py-2 h-16 justify-between text-muted-background">
        <p>
          O ({oLabel})
        </p>
        <h3 class="font-bold" id="o-player-wins">{props.scoreO}</h3>
      </div>
    </div>
  );
};

export default Score;
