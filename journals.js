function journals() {
  page3.innerHTML = "";
  createLabel("Journals", page3, "3rem");
  const div_container = document.createElement("div");
  div_container.classList.add("contain-colors");
  div_container.classList.add("journal-notes-container");
  page3.append(div_container);
  let counter = 0;
  for (let obj of allObjects) {
    if (obj.completed) {
      counter++;
      const jour = document.createElement("div");
      jour.setAttribute("data-name", obj.completed ? obj.name : "Unknown");
      jour.classList.add("color_box");
      jour.classList.add("journal_box");

      div_container.append(jour);
      jour.innerHTML = note(obj.name, obj.journal);

      $addEventListener(jour, "click", () => {
        if (obj.completed) {
          obj.displayJournal();
        }
      });
    }
  }

  if (!counter) {
    div_container.classList.add("nothing-here");
    div_container.innerText = "Nothing to see here!";
  }
}
