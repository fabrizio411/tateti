import { Component, JSX, Show } from "solid-js";
import ShadowCard from "./ui/ShadowCard";
import { Mark } from "~/global";
import Icon from "./ui/Icon";
import OIcon from "~/assets/icon-o.svg";
import XIcon from "~/assets/icon-x.svg";
import OIconOutline from "~/assets/icon-o-outline.svg";
import XIconOutline from "~/assets/icon-x-outline.svg";
import { twMerge } from "tailwind-merge";

interface Props extends JSX.HTMLAttributes<HTMLDivElement> {
  content: "0" | Mark;
  turn: Mark;
  highlighted: boolean;
}

const Tile: Component<Props> = (props) => {
  const color = () => props.content === "x" ? "accent-1" : "accent-2";

  return (
    <ShadowCard
      shadowClass="bg-black/25 group"
      class={twMerge(
        "bg-muted-background h-full grid place-items-center cursor-pointer",
        `fill-${color()}`,
        props.highlighted &&
          `fill-muted-background bg-${color()} animate-highlighted`,
      )}
      {...props}
    >
      <Show
        when={props.content !== "0"}
        fallback={
          <Icon
            class="hidden group-hover:block size-[60%]"
            icon={props.turn === "x" ? XIconOutline : OIconOutline}
          />
        }
      >
        <Icon
          class={twMerge("size-[60%]", !props.highlighted && "animate-pop")}
          icon={props.content === "x" ? XIcon : OIcon}
        />
      </Show>
    </ShadowCard>
  );
};

export default Tile;
