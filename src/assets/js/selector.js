export const handleSelector = () => {
  let selection = "o";

  // Update query string with selection
  const updateQueryString = () => {
    const newGameLinks = document.querySelectorAll(".new-game-btn");
    newGameLinks.forEach((link) => {
      const url = new URL(link.href);
      url.searchParams.set("mark", selection);
      link.href = url.toString();
    });
  };

  // Handle mark selectors
  const selectorsBtn = document.querySelectorAll("button.selector");
  updateQueryString();

  selectorsBtn.forEach((button) => {
    button.addEventListener("click", () => {
      selectorsBtn.forEach((b) => (b.ariaPressed = "false"));
      button.ariaPressed = "true";
      selection = button.value;
      updateQueryString();
    });
  });
};
