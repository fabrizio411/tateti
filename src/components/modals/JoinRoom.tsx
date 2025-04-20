import { Component, createSignal } from "solid-js";
import ShadowCard from "../ui/ShadowCard";
import Button from "../ui/Button";
import { useNavigate } from "@solidjs/router";

interface Props {
  codeLength: number;
}

const JoinRoom: Component<Props> = (props) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = createSignal("");
  const [errorMsg, setErrorMsg] = createSignal("");

  const joinRoom = () => {
    if (inputValue().length < props.codeLength) {
      setErrorMsg(`Code must be ${props.codeLength} digits`);
      setTimeout(() => {
        setErrorMsg("");
      }, 2000);
      return;
    }
    navigate(`/game/online?roomId=${inputValue()}`);
  };

  return (
    <div class="h-32 tems-center w-[80%] mx-auto flex flex-col gap-3 items-center">
      <p class="text-red-700 font-medium h-6">{errorMsg()}</p>
      <div class="flex gap-4 items-center">
        <ShadowCard shadowClass="w-full bg-black/50" class="">
          <div class="relative">
            <input
              class="bg-background w-full rounded-xl py-3 px-2 text-center outline-none text-2xl font-bold tracking-widest"
              type="text"
              maxLength={props.codeLength}
              placeholder="-"
              onInput={(e) => {
                const input = e.currentTarget;
                input.value = input.value.replace(/\D/g, ""); // elimina cualquier cosa que no sea dígito
                setInputValue(input.value);
              }}
            />
            <p class="font-bold text-2xl absolute top-1/2 -translate-y-1/2 left-4">
              #
            </p>
          </div>
        </ShadowCard>
        <Button
          onclick={joinRoom}
          variant="secondary"
          class="px-6 text-lg"
        >
          JOIN
        </Button>
      </div>
    </div>
  );
};

export default JoinRoom;
