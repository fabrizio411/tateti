import { Component, createSignal, Show } from "solid-js";
import ShadowCard from "../ui/ShadowCard";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import ArrowIcon from "../../assets/arrow.svg";
import CloseIcon from "../../assets/close.svg";
import { useNavigate } from "@solidjs/router";
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";

interface Props {
  onClose: () => void;
}

const NewOnlineGame: Component<Props> = (props) => {
  const codeLength = 5;

  const [actual, setActual] = createSignal<null | "join" | "create">(null);

  return (
    <div class="w-[95%] max-w-[500px]">
      <ShadowCard shadowClass="bg-background w-full ">
        <div class="bg-muted-background p-8 pt-14 rounded-2xl">
          <Show
            when={actual() !== null}
            fallback={
              <Icon
                icon={CloseIcon}
                onclick={props.onClose}
                class="size-12 fill-muted-foreground hover:fill-foreground transition-colors absolute top-5 left-5 cursor-pointer"
              />
            }
          >
            <Icon
              icon={ArrowIcon}
              onclick={() => setActual(null)}
              class="size-12 fill-muted-foreground hover:fill-foreground transition-colors absolute top-5 left-5 cursor-pointer"
            />
          </Show>
          <h1 class="font-bold text-4xl text-center">ONLINE</h1>

          {/* MENU */}
          <div class="mt-14 h-32">
            <Show
              when={actual() === null}
              fallback={
                <Show
                  when={actual() === "join"}
                  fallback={<CreateRoom />}
                >
                  <JoinRoom
                    codeLength={codeLength}
                  />
                </Show>
              }
            >
              <div class="flex flex-col gap-6">
                <Button
                  onclick={() => setActual("create")}
                  class="w-full text-xl"
                  variant="primary"
                >
                  CREATE ROOM
                </Button>
                <Button
                  onclick={() => setActual("join")}
                  class="w-full text-xl"
                  variant="secondary"
                >
                  JOIN ROOM
                </Button>
              </div>
            </Show>
          </div>
        </div>
      </ShadowCard>
    </div>
  );
};

export default NewOnlineGame;
