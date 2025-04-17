import { Component, JSX, Show } from "solid-js";
import Icon from "./ui/Icon";
import Logo from "~/assets/logo.svg";
import ShadowCard from "./ui/ShadowCard";
import OIcon from "~/assets/icon-o.svg";
import XIcon from "~/assets/icon-x.svg";
import { Mark } from "~/global";
import { A } from "@solidjs/router";
import Restart from "./Restart";

interface Props extends JSX.HTMLAttributes<HTMLDivElement> {
  turn: Mark;
  onRestart: () => void;
}

const Menu: Component<Props> = (props) => {
  return (
    <div class="grid grid-cols-3 place-items-center h-10 gap-4 sm:gap-6">
      <div class="w-full h-full flex items-center">
        <A href="/">
          <Icon class="hover:scale-110 transition-transform" icon={Logo} />
        </A>
      </div>

      <ShadowCard
        shadowClass="rounded-xl bg-black/25 h-full w-full"
        class="rounded-xl bg-muted-background h-full flex items-center justify-center gap-2 sm:gap-4"
      >
        <h4 class="select-none">TURN</h4>
        <Icon
          class="size-6 fill-muted-foreground"
          icon={props.turn === "x" ? XIcon : OIcon}
        />
      </ShadowCard>

      <Restart onRestart={props.onRestart} />
    </div>
  );
};

export default Menu;
