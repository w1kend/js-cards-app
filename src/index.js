import './scss/styles.scss'
var ph = {
  0: {
    theme: "Conversation",
    sourceText: "Do you speak a language other than English?",
    translation: "Говоришь ли ты на другом языке кроме английского?"
  },
  1: {
    theme: "Eating out",
    sourceText: "Excuse me. We would like to order, please.",
    translation: "Извините, мы бы хотели сделать заказ."
  },
  2: {
    theme: "Eating out",
    sourceText: "A table for two, please.",
    translation: "Столик на двоих, пожалуйста."
  },
  3: {
    theme: "Eating out",
    sourceText: "Is there a house specialty?",
    translation: "Есть ли у заведения фирменное блюдо?"
  },
  4: {
    theme: "Eating out",
    sourceText: "Goodbye, please come again.",
    translation: "До свидания, приходите ещë."
  },
  5: {
    theme: "Eating out",
    sourceText: "Excuse me, could you bring some more sugar, please?",
    translation: "Извините, могли бы вы принести сахар, пожалуйста."
  },
  6: {
    theme: "At the station",
    sourceText: "Where can I buy a bus ticket?",
    translation: "Где я могу купить билет на автобус?"
  },
  7: {
    theme: "At the station",
    sourceText: "Three tickets, please.",
    translation: "Три билета, пожалуйста."
  },
  8: {
    theme: "At the station",
    sourceText: "I would like to reserve a seat.",
    translation: "Я хочу забронировать место."
  },
  9: {
    theme: "Travel",
    sourceText: "Could you please show me where it is on the map?",
    translation: "Могли бы вы, пожалуйста, показать мне это на карте?"
  },
  10: {
    theme: "Travel",
    sourceText: "Is it far from here?",
    translation: "Это далеко отсюда?"
  },
  11: {
    theme: "Travel",
    sourceText: "Go straight and then turn right.",
    translation: "Идите прямо, а затем поверните направо."
  },
  12: {
    theme: "At the doctor",
    sourceText: "I need a sick note. It has gotten worse.",
    translation: "Мне нужна медицинская справка. Мне стало хуже."
  },
  13: {
    theme: "At the hotel",
    sourceText: "The heating does not work and my neighbour is too loud.",
    translation: "Тут не работает отопление и мой сосед слишком шумный."
  },
  14: {
    theme: "At the hotel",
    sourceText:
      "I would like to change my room, because I requested a room with a view.",
    translation:
      "Я хочу поменять свой номер, поскольку я просил комнату с красивым видом."
  },
  15: {
    theme: "At the hotel",
    sourceText: "I want to make a reservation for the room.",
    translation: "Я хочу забронировать номер."
  },
  16: {
    theme: "At the shopping mall",
    sourceText: "Can I try it on?",
    translation: "Можно я это примерю?"
  },
  17: {
    theme: "At the shopping mall",
    sourceText: "I would like another color.",
    translation: "Я бы хотел другой цвет."
  },
  18: {
    theme: "At the shopping mall",
    sourceText: "Where is the cashdesk?",
    translation: "Где касса?"
  },
  19: {
    theme: "At the shopping mall",
    sourceText: "I find it too expensive.",
    translation: "Я считаю, что это слишком дорого."
  },
  20: {
    theme: "At the shopping mall",
    sourceText: "I would like to return my purchase and get a refund.",
    translation: "Я хочу вернуть свою покупку и получить деньги обратно."
  }
};

// random sort Phrases keys for random filling containers
var keys = Object.keys(ph);
keys.sort(() => Math.random() - 0.49);
//create html card using ph[id] fields. Output: string with markup
function createCard(cardElement, id) {
  let { theme, sourceText } = cardElement,
    color = [
      "#42e8f4",
      "#41f4b8",
      "#f44167",
      "#c7f441",
      "#afafae",
      "#afafae",
      "#afafae",
      "#afafae"
    ];
  let randColor = color[Math.floor(Math.random() * 8)];
  return ` <div id="${id}" class="card" style="background-color: ${randColor}; border-radius: 2px;">
          <h2 class="theme">${theme}</h2>
          <p class="text source">${sourceText}</p>
          <div class="action" ><button class="edit mui-btn mui-btn--small">edit</button></div>
          </div>`;
}
//create card text for replacing input fields. Output: string with html markup
function cardText(cardElement) {
  let { theme, sourceText } = cardElement;
  return ` 
          <h2 class="theme">${theme}</h2>
          <p class="text source">${sourceText}</p>
          <div class="action"><button class="edit mui-btn mui-btn--small">edit</button></div>
          `;
}

// create Input fields for replacing card text to edit it. Output: string with html markup
function createInput(id) {
  return `<div class="mui-textfield">
          <label for="theme${id}">Theme</label>
          <input type="text" value="${ph[id].theme}" id="theme${id}">
          </input> </div>
          <div class="mui-textfield">
          <label>SourceText</label>
          <input type="text" value="${ph[id].sourceText}" id="source${id}">
          </input></div>
          <div class="mui-textfield">
          <label>Translate</label>
          <input type="text" value="${ph[id].translation}" id="translate${id}">
          </input></div>
          <div class="action">
          <button class="confirm mui-btn mui-btn--small">confirm </button></div>
  `;
}

var timeOut = [];
// translane event
function translateEvent(target) {
  let child = target.children[1];
  let targetId = target.id;
  if (child.className.includes("source")) {
    child.innerText = ph[targetId].translation;
    child.setAttribute("class", "text translation");
    timeOut[targetId] = setTimeout(() => {
      child.innerText = ph[targetId].sourceText;
      child.setAttribute("class", "text source");
    }, 3000);
  } else if (child.className.includes("translation")) {
    child.innerText = ph[targetId].sourceText;
    child.setAttribute("class", "text source");
    clearTimeout(timeOut[targetId]);
  }
}
//using this massive to sort cards by words.length before filling containers
var phColumn = {
  left: [],
  center: [],
  right: []
};

function fillMass() {
  let len = [Math.round(Math.random() * (5 - 3) + 3)],
    i = 0;

  len.push(Math.floor(Math.random() * (keys.length - len[0] - 1) + 1));
  len.push(keys.length - len[0] - len[1]);

  while (i !== len[0]) {
    phColumn.left.push(keys[i++]);
  }
  while (i !== len[1] + len[0]) {
    phColumn.center.push(keys[i++]);
  }
  while (i !== keys.length) {
    phColumn.right.push(keys[i++]);
  }

  sort.call(phColumn.left);
  sort.call(phColumn.center);
  sort.call(phColumn.right);
} fillMass();

//sort by decrease
function sort() {
  this.sort(
    (a, b) =>
      ph[a].sourceText.split(" ").length - ph[b].sourceText.split(" ").length
  );
}

function insertByLength(parent, current) {
  for (let item of parent) {
    if (
      ph[current.id].sourceText.split(" ").length >
      ph[item.id].sourceText.split(" ").length
    ) {
      item.insertAdjacentElement("beforebegin", current);
      break;
    }
  }
}

function addElementsToContainer(elem, target, id = null) {
  let i = 0,
    div,
    container = document.querySelector(`#${target} .cards`),
    card;

  if (elem.length) {
    while (i < elem.length) {
      div = createCard(ph[elem[i]], elem[i]);
      container.insertAdjacentHTML("afterbegin", div);

      document
        .querySelector(`div[id="${elem[i]}"`)
        .addEventListener("click", e => {
          let id = e.currentTarget.id;
          card = document.getElementById(id);
          if (
            !e.target.className.includes("theme") &&
            !e.target.className.includes("text")
          )
            translateEvent(e.currentTarget);
          if (e.target.className.includes("edit")) {
            let input = createInput(id);
            card.innerHTML = input;
          }
          if (e.target.className.includes("confirm")) {
            ph[id].theme = e.currentTarget.children[0].children[1].value;
            ph[id].sourceText = e.currentTarget.children[1].children[1].value;
            ph[id].translation = e.currentTarget.children[2].children[1].value;
            div = cardText(ph[id]);
            card.innerHTML = div;
            insertByLength(card.closest("div[class='cards']").children, card);
          }
        });
      document.getElementById(elem[i++]).addEventListener("dblclick", e => {
        if (
          !e.target.className.includes("theme") &&
          !e.target.className.includes("text")
        )
          delete ph[e.currentTarget.id];
        e.currentTarget.remove();
      });
    }
  } else {
    div = createCard(elem, id);
    container.insertAdjacentHTML("beforeend", div);
    card = document.getElementById(id);
    let input = createInput(id);
    card.innerHTML = input;
    card.addEventListener("click", e => {
      let id = e.currentTarget.id;
      if (
        !e.target.className.includes("theme") &&
        !e.target.className.includes("text")
      )
        translateEvent(e.currentTarget);
      if (e.target.className.includes("edit")) {
        let input = createInput(id);
        card.innerHTML = input;
      }
      if (e.target.className.includes("confirm")) {
        ph[id].theme = e.currentTarget.children[0].children[1].value;
        ph[id].sourceText = e.currentTarget.children[1].children[1].value;
        ph[id].translation = e.currentTarget.children[2].children[1].value;
        div = cardText(ph[id]);
        card.innerHTML = div;
        insertByLength(card.closest("div[class='cards']").children, card);
      }
    });
    card.addEventListener("dblclick", e => {
      if (
        !e.target.className.includes("theme") &&
        !e.target.className.includes("text")
      )
        delete ph[e.currentTarget.id];
      e.currentTarget.remove();
    });
  }
}

//event to add new Card
function addCardEvent(id) {
  document.getElementById(id).addEventListener("click", e => {
    let keys = Object.keys(ph),
      newId = Number(keys[keys.length - 1]) + 1;
    ph[newId] = {
      theme: "",
      sourceText: "",
      translation: ""
    };
    addElementsToContainer(ph[newId], id.replace("Col", ""), newId);
  });
}


addCardEvent("leftCol");
addCardEvent("centerCol");
addCardEvent("rightCol");
addElementsToContainer(phColumn["left"], "left");
addElementsToContainer(phColumn["right"], "right");
addElementsToContainer(phColumn["center"], "center");
