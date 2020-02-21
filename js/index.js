const dataPlatns = [
  {
    name: "Aloe Vera 1",
    description: "In Mini Prospect Planter",
    price: 100.5,
    amount: 10,
    images: [
      { img: "assets/img/aloe-vera-1.jpg", color: "white", active: true },
      { img: "assets/img/aloe-vera-2.jpg", color: "red", active: false },
      { img: "assets/img/aloe-vera-3.jpg", color: "green", active: false }
    ]
  },
  {
    name: "Aloe Vera 2",
    description: "In Mini Prospect Planter",
    price: 35,
    amount: 0,
    images: [
      { img: "assets/img/aloe-vera-1.jpg", color: "white", active: false },
      { img: "assets/img/aloe-vera-2.jpg", color: "red", active: true },
      { img: "assets/img/aloe-vera-3.jpg", color: "green", active: false }
    ]
  }
]; //own data

const items = document.querySelector(".items");
const bagBadge = document.querySelector(".badge");

//check the availability of data in localStorage
if (localStorage.getItem("items") === null) {
  localStorage.setItem("items", JSON.stringify(dataPlatns)); 
}

//get data from localStorage
let localStorageData = JSON.parse(localStorage.getItem("items"));

const addItem = () => {
  while (items.children.length > 0) {
    items.removeChild(items.lastChild);
  }

  localStorageData.map(plant => {
    let item = document.createElement("div");
    let imageWrap = document.createElement("div");
    let itemInfo = document.createElement("div");
    let itemTopInfo = document.createElement("div");
    let itemTitle = document.createElement("p");
    let itemPrice = document.createElement("p");
    let itemDescription = document.createElement("p");
    let colors = document.createElement("div");
    let availability = document.createElement("div");
    let isAvailability = document.createElement("p");
    let buyItem = document.createElement("button");

    item.className = "item";
    itemInfo.className = "item__info";
    itemTopInfo.className = "item__top-info";
    itemTitle.className = "item__title";
    itemPrice.className = "item__price";
    itemDescription.className = "item__desc";
    colors.className = "colors";
    availability.className = "availability";
    buyItem.className = "buy-item button";
    imageWrap.className = "image-wrap";

    itemTitle.innerHTML = plant.name;
    itemPrice.innerHTML = `$<span>${plant.price}</span>`;
    itemDescription.innerHTML = plant.description;
    buyItem.innerHTML = "В корзину";

    if (plant.amount !== 0) {
      isAvailability.innerHTML = "Есть в наличии";
      isAvailability.className = "success";
    } else {
      isAvailability.innerHTML = "Нет в наличии";
      isAvailability.className = "error";
      buyItem.setAttribute("disabled", "disabled");
    }

    plant.images.map(i => {
      let image = document.createElement("img");
      let color = document.createElement("div");
      image.className = "item__image";

      if (i.active) {
        color.className = `color color-${i.color} color-active`;
        image.style.display = "block";
      } else {
        color.className = `color color-${i.color}`;
        image.style.display = "none";
      }

      image.setAttribute("src", `${i.img}`);
      imageWrap.appendChild(image);
      colors.appendChild(color);
    });

    let pickButton = colors.querySelectorAll(".color");

    for (let i = 0; i < pickButton.length; i++) {
      pickButton[i].addEventListener("click", () => {
        plant.images.map((item, id) => {
          if (`color-${item.color}` === pickButton[i].classList[1]) {
            item.active = true;
            localStorage.setItem("items", JSON.stringify(localStorageData));
            addItem();
          } else {
            item.active = false;
            localStorage.setItem("items", JSON.stringify(localStorageData));
            addItem();
          }
        });
      });
    }

    buyItem.addEventListener("click", e => {
      plant.amount = plant.amount - 1;
      bagBadge.innerHTML = +bagBadge.innerHTML + 1;
      addItem();
    });

    itemTopInfo.appendChild(itemTitle);
    itemTopInfo.appendChild(itemPrice);
    availability.appendChild(isAvailability);
    itemInfo.appendChild(itemTopInfo);
    itemInfo.appendChild(itemDescription);
    itemInfo.appendChild(colors);
    itemInfo.appendChild(availability);
    itemInfo.appendChild(buyItem);
    item.appendChild(imageWrap);
    item.appendChild(itemInfo);
    items.appendChild(item);
  });
};

addItem();

const getNewItem = () => {
  const modalWindow = document.querySelector(".new-item");
  const openModal = document.querySelector(".add-item");
  const closeModalWindow = document.querySelector(".new-item .close");
  const addItemButton = document.querySelector(".add-button");
  const name = document.querySelector(".new-item .name");
  const description = document.querySelector(".new-item .description");
  const price = document.querySelector(".new-item .price");
  const amount = document.querySelector(".new-item .amount");
  const image = document.querySelector(".upload-file");
  const warning = document.querySelector(".new-item__content .warning");

  openModal.addEventListener("click", () => {
    modalWindow.style.display = "block";
  });

  const isCover = () => {
    modalWindow.style.display = "none";
    name.value = "";
    description.value = "";
    amount.value = "";
    price.value = "";
    warning.style.display = "none";
  };

  closeModalWindow.addEventListener("click", () => {
    isCover();
  });

  window.addEventListener("click", e => {
    if (e.target == modalWindow) {
      isCover();
    }
  });

  if (modalWindow.style.display === "") {
  }

  addItemButton.addEventListener("click", e => {
    if (
      !name.value.trim() ||
      !description.value.trim() ||
      !price.value ||
      !amount.value
    ) {
      warning.style.display = "block";
      return;
    } else {
      warning.style.display = "none";
      modalWindow.style.display = "none";
    }

    let newItem = {
      name: name.value,
      description: description.value,
      price: +price.value,
      amount: +amount.value,
      images: [
        { img: "assets/img/aloe-vera-1.jpg", color: "white", active: true },
        { img: "assets/img/aloe-vera-2.jpg", color: "red", active: false },
        { img: "assets/img/aloe-vera-3.jpg", color: "green", active: false }
      ]
    };

    localStorageData.push(newItem);
    console.log(localStorageData);

    localStorage.setItem("items", JSON.stringify(localStorageData));
    addItem();
  });
};

getNewItem();

let isSortPrice = true;

const sortPrice = () => {
  if (isSortPrice) {
    localStorageData.sort((a, b) => (a.price > b.price ? 1 : -1));
    isSortPrice = false;
  } else {
    localStorageData.sort((a, b) => (a.price < b.price ? 1 : -1));
    isSortPrice = true;
  }

  addItem();
};

const filterSort = document.querySelector(".filter__sort");

filterSort.addEventListener("click", e => {
  sortPrice();
});
