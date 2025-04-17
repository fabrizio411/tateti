import { Component, Show } from "solid-js";
import Button from "../ui/Button";
import { A } from "@solidjs/router";
import { Mark, Mode } from "~/global";
import Icon from "../ui/Icon";
import OIcon from "~/assets/icon-o.svg";
import XIcon from "~/assets/icon-x.svg";
import { twMerge } from "tailwind-merge";

interface Props {
  onClose: () => void;
  winner: Mark | null;
  mark: Mark;
  mode: Mode;
}

function getWinText(mark: Mark, mode: Mode, winner: Mark | null) {
  const isPlayer1 = (mark === "x" && winner === "x") ||
    (mark === "o" && winner !== "x");
  if (mode === "cpu") return isPlayer1 ? "GANASTE!" : "PERDISTE.";
  return isPlayer1 ? "JUGADOR 1 GANÓ!" : "JUGADOR 2 GANÓ!";
}

const EndGameModal: Component<Props> = (props) => {
  return (
    <div class="py-14 w-full px-4 bg-background flex flex-col items-center justify-center gap-10">
      <div class="flex flex-col items-center gap-2 justify-center">
        <Show
          when={props.winner !== null}
          fallback={
            <h1 class=" text-4xl font-bold text-muted-foreground select-none">
              ROUND TIED
            </h1>
          }
        >
          <h1 class="text-muted-foreground text-xl">
            {getWinText(props.mark, props.mode, props.winner)}
          </h1>
          <h1 class="flex gap-6 items-center">
            <Icon
              class={`size-12 sm:size-20 ${
                props.winner === "x" ? "fill-accent-1" : "fill-accent-2"
              }`}
              icon={props.winner === "x" ? XIcon : OIcon}
            />
            <span
              class={twMerge(
                "font-bold text-3xl sm:text-5xl",
                props.winner === "x" ? "text-accent-1" : "text-accent-2",
              )}
            >
              TAKES THE ROUND!
            </span>
          </h1>
        </Show>
      </div>
      <div class="flex gap-6">
        <A href="/">
          <Button class="px-8" variant="invert">
            <h3>QUIT</h3>
          </Button>
        </A>
        <Button onclick={props.onClose} class="px-8" variant="secondary">
          <h3>NEXT ROUND</h3>
        </Button>
      </div>
    </div>
  );
};

export default EndGameModal;
