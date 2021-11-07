//this id is used to represent each object, access the object gotten by doing allObjects[the number in the pos - 2]
let ID = 2;
//the page to inject games
const gamePage = document.querySelector(".games article");
//the page for journals
const journal_article = document.querySelector(".journal-view article");
const journal_page = document.querySelector(".journal-view");
//this class would be used for each object
class Interactable {
  constructor(x, y, name, journal, challengeFxnId, isGold = false) {
    this.x = x;
    this.y = y + config.collision_offset;
    this.name = name;
    this.completed = false;
    this.journal = journal;
    //all funtions will be prototypes here and used to identify the fuction the user chooses
    this.challengeFxnId = challengeFxnId;
    mappedArray[y + config.collision_offset][100 - x] = ID++;
    this.isGold = isGold;
  }
  runGame() {
    const runPrograms = () => {
      if (this.challengeFxnId === 1) {
        this.simpleGame();
      }
    };
    if (this.isGold) {
      let allCompleted = 0;
      for (let i = 0; i < allObjects.length; i++) {
        if (allObjects[i].completed === true) {
          allCompleted++;
        }
      }
      let shouldRun = allCompleted === allObjects.length - 1;
      if (shouldRun) {
        runPrograms();
      } else {
        const template = document.querySelector("#goldWaiting");
        let clone = template.content.cloneNode(true);
        gamePage.append(clone);
        document.querySelector(".completed_task").innerText = `${allCompleted}`;
        document.querySelector(".total_task").innerText = `${
          allObjects.length - 1
        }`;
      }
    } else {
      runPrograms();
    }
  }
  simpleGame() {
    const template = document.querySelector("#simplegame");
    let clone = template.content.cloneNode(true);
    gamePage.append(clone);
    $addEventListener(
      document.body.querySelector(".template1"),
      "change",
      (e) => {
        console.log(e.target, e, e.target.value);
        if (e.target.value === String(1)) {
          this.complete();
        }
      }
    );
  }
  complete() {
    use(2, "isEnabled", "isNotEnabled", game);
    this.completed = true;
    gamePage.innerHTML = "";
    this.displayJournal();
    object = detectObject();
    drawBoard(context);
  }
  displayJournal() {
    use(1, "isEnabled", "isNotEnabled", journal_page);
    journal_article.innerHTML = `<h1>${this.name + " Challenge"}</h1><p>${
      this.journal
    }</p>`;
  }
}
//this would contain the list of all instances of interactables in the game
const allObjects = [
  new Interactable(65, 39, "Closet", "Hi, this is a journal", 1),
  new Interactable(
    10,
    6,
    "Closet",
    `You just uncovered one of the clues. This clue speaks about...    
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex nihil quia, alias ipsa maiores ducimus molestias tenetur placeat adipisci ut doloribus iste repudiandae soluta dicta sit quae amet dolorum tempora!
  Numquam, itaque, voluptates nulla delectus enim fugit voluptas optio tempora fugiat quo sapiente magni animi nemo! Reiciendis voluptatibus eligendi qui odit aperiam impedit ipsam inventore maiores doloribus modi, distinctio eum.
  Optio facere veniam vitae ea esse totam! Tenetur similique sint nulla perferendis veniam ad voluptates atque eos quia rerum. Officia aliquam quae ducimus dolorem quis ratione sunt animi et odio.
  Minus, a nostrum reiciendis doloribus tempora libero, beatae atque praesentium ea quisquam quam facilis ex iure accusantium! Fugiat numquam perspiciatis, enim veritatis sapiente magni, dolorum, sint porro voluptates nisi animi.
  Voluptatibus voluptates doloremque atque consequuntur nostrum repudiandae eius harum culpa et ipsa debitis fugit dicta tempora nobis voluptatum pariatur officia exercitationem, perferendis ab ipsam eaque architecto. Placeat sint impedit optio.
  Officia magni distinctio rerum officiis amet nobis voluptatum, ea molestias hic. Facere eligendi quibusdam blanditiis voluptatibus, laborum ratione suscipit molestiae nisi aperiam facilis, veniam architecto numquam, inventore aspernatur autem accusamus.
  Necessitatibus eos saepe numquam consectetur assumenda itaque odit exercitationem cumque maxime illo culpa, tempora laborum facilis mollitia quaerat? Omnis corrupti, sed sint similique repellendus voluptate eveniet dolorem ipsum expedita. Corporis!
  Voluptatum, neque vitae maiores aut nulla doloribus, totam ab quaerat, laboriosam architecto quas modi! In sunt laborum officia asperiores magni dolorum cupiditate fugit libero, obcaecati, temporibus iure odit delectus cum!
  Repudiandae iure quo dolorem! Laborum doloremque quam consequuntur eius aperiam quia. Adipisci praesentium voluptates quae nostrum natus reprehenderit aliquid, veniam impedit, accusantium perferendis molestiae necessitatibus recusandae illo iure! Repellendus, sed.
  Error suscipit odio ducimus nihil amet. Ipsum nam, modi, facere reiciendis, nihil illo repudiandae id at minima magni cumque culpa eum! Beatae explicabo molestias, necessitatibus ea velit numquam at eaque.`,
    1
  ),
  new Interactable(
    15,
    6,
    "Computer mission",
    `We have finally uncovered what went on here, nice work team. The people went missing because ...    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex nihil quia, alias ipsa maiores ducimus molestias tenetur placeat adipisci ut doloribus iste repudiandae soluta dicta sit quae amet dolorum tempora!
  Numquam, itaque, voluptates nulla delectus enim fugit voluptas optio tempora fugiat quo sapiente magni animi nemo! Reiciendis voluptatibus eligendi qui odit aperiam impedit ipsam inventore maiores doloribus modi, distinctio eum.
  Optio facere veniam vitae ea esse totam! Tenetur similique sint nulla perferendis veniam ad voluptates atque eos quia rerum. Officia aliquam quae ducimus dolorem quis ratione sunt animi et odio.
  Minus, a nostrum reiciendis doloribus tempora libero, beatae atque praesentium ea quisquam quam facilis ex iure accusantium! Fugiat numquam perspiciatis, enim veritatis sapiente magni, dolorum, sint porro voluptates nisi animi.
  Voluptatibus voluptates doloremque atque consequuntur nostrum repudiandae eius harum culpa et ipsa debitis fugit dicta tempora nobis voluptatum pariatur officia exercitationem, perferendis ab ipsam eaque architecto. Placeat sint impedit optio.
  Officia magni distinctio rerum officiis amet nobis voluptatum, ea molestias hic. Facere eligendi quibusdam blanditiis voluptatibus, laborum ratione suscipit molestiae nisi aperiam facilis, veniam architecto numquam, inventore aspernatur autem accusamus.
  Necessitatibus eos saepe numquam consectetur assumenda itaque odit exercitationem cumque maxime illo culpa, tempora laborum facilis mollitia quaerat? Omnis corrupti, sed sint similique repellendus voluptate eveniet dolorem ipsum expedita. Corporis!
  Voluptatum, neque vitae maiores aut nulla doloribus, totam ab quaerat, laboriosam architecto quas modi! In sunt laborum officia asperiores magni dolorum cupiditate fugit libero, obcaecati, temporibus iure odit delectus cum!
  Repudiandae iure quo dolorem! Laborum doloremque quam consequuntur eius aperiam quia. Adipisci praesentium voluptates quae nostrum natus reprehenderit aliquid, veniam impedit, accusantium perferendis molestiae necessitatibus recusandae illo iure! Repellendus, sed.
  Error suscipit odio ducimus nihil amet. Ipsum nam, modi, facere reiciendis, nihil illo repudiandae id at minima magni cumque culpa eum! Beatae explicabo molestias, necessitatibus ea velit numquam at eaque.`,
    1,
    true
  ),
];

//functions for adding to the map
function horizontal_add(from, to, at, val = 1) {
  let array = mappedArray[at];
  for (let i = from; i < to; i++) {
    array[i] = 1;
  }
}
function vertical_add(from, to, at, val = 1) {
  for (let i = from; i < to; i++) {
    mappedArray[i][at] = 1;
  }
}

//add the objects as dots on the page as blinking lights
