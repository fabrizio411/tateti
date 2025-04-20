import SelectorButton from "~/components/ui/SelectorButton";
import ShadowCard from "~/components/ui/ShadowCard";
import Logo from "~/assets/logo.svg";
import OIcon from "~/assets/icon-o.svg";
import XIcon from "~/assets/icon-x.svg";
import { Mark } from "~/global";
import { createSignal } from "solid-js";
import Button from "~/components/ui/Button";
import Icon from "~/components/ui/Icon";
import { A } from "@solidjs/router";
import OnlineSelector from "~/components/OnlineSelector";

export default function Home() {
  const [mark, setMark] = createSignal<Mark>("x");

  const select = (selection: Mark, e: Event) => {
    setMark(selection);
  };

  const isSelected = (selection: Mark) => {
    return mark() === selection;
  };

  return (
    <div class="w-full p-4 max-w-[460px] flex flex-col items-center gap-10">
      <Logo />

      <ShadowCard
        shadowClass="bg-black/25 w-full"
        class="p-6 flex flex-col items-center gap-6 bg-muted-background"
      >
        <h2 class="font-bold text-lg text-center tracking-wide">
          CHOOSE PLAYER 1 ICON
        </h2>
        <div class="w-full bg-background flex gap-2 rounded-xl p-2">
          <SelectorButton selected={isSelected("o")} onclick={[select, "o"]}>
            <Icon class="size-10" icon={OIcon} />
          </SelectorButton>
          <SelectorButton selected={isSelected("x")} onclick={[select, "x"]}>
            <Icon class="size-10" icon={XIcon} />
          </SelectorButton>
        </div>
        <p>X GOES FIRST</p>
      </ShadowCard>

      <div class="flex flex-col gap-6 w-full">
        <OnlineSelector />
        <A href={`/game/cpu?mark=${mark()}`}>
          <Button variant="primary" class="w-full">
            <h3 class="text-lg">
              NEW GAME <span class="ml-1">(VS CPU)</span>
            </h3>
          </Button>
        </A>
        <A href={`/game/local?mark=${mark()}`}>
          <Button variant="secondary" class="w-full">
            <h3 class="text-lg">
              NEW GAME <span class="ml-1">(VS PLAYER)</span>
            </h3>
          </Button>
        </A>
      </div>
    </div>
  );
}
