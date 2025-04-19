import { Component, Index } from "solid-js";
import Tile from "./Tile";
import { Mark, Pieces } from "~/global";

interface Props {
  pieces: Pieces;
  turn: Mark;
  onPlay: (index: number, e: Event) => void;
  winners: number[];
  hideHover: boolean;
}

const Board: Component<Props> = (props) => {
  return (
    <div class="grid grid-cols-3 grid-rows-3 w-full aspect-square gap-4 sm:gap-6">
      <Index each={props.pieces}>
        {(item, index) => (
          <Tile
            highlighted={props.winners.includes(index)}
            onclick={[props.onPlay, index]}
            turn={props.turn}
            content={item()}
            hideHover={props.hideHover}
          />
        )}
      </Index>
    </div>
  );
};

export default Board;
