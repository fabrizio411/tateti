import { Component } from "solid-js";
import Button from "../ui/Button";

interface Props {
  onClose: () => void;
  onReset: () => void;
}

const RestartModal: Component<Props> = (props) => {
  return (
    <div class="h-64 w-full px-4 bg-background flex flex-col items-center justify-center gap-10">
      <h1 class=" text-4xl font-bold text-muted-foreground select-none">
        RESTART GAME?
      </h1>
      <div class="flex gap-6">
        <Button onclick={props.onClose} class="px-8" variant="invert">
          <h3>CANCEL</h3>
        </Button>
        <Button onclick={props.onReset} class="px-8" variant="secondary">
          <h3>RESTART</h3>
        </Button>
      </div>
    </div>
  );
};

export default RestartModal;
