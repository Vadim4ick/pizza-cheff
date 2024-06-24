const burger = document.getElementById("hamburger");
const navbar = document.getElementById("navbar");
const formDelivery = document.getElementById("formDelivery");

const nameInput = document.getElementById("inpName");
const addressInput = document.getElementById("inpAddress");
const phoneInput = document.getElementById("inpPhone");

const nameError = document.getElementById("nameError");
const adressError = document.getElementById("addressError");
const phoneError = document.getElementById("phoneError");

const popupOverlay = document.getElementById("popupOverlay");
const popupMessage = document.getElementById("popupMessage");

const phonePattern = /^\+?[0-9\s-]{7,15}$/;

function init() {
  // Lightbox
  new SimpleLightbox(".pizzas-list__link", {
    nav: false,
    //   animationSpeed: 300,
    fadeSpeed: 300,
    scaleImageToRatio: true,
    showCounter: false,
  });
  // /Lightbox

  setupEventListeners();
}

function setupEventListeners() {
  popupOverlay.addEventListener("click", popupClose);
  burger.addEventListener("click", burgerToggle);
  nameInput.addEventListener("keypress", banPoint);
  formDelivery.addEventListener("submit", submitForm);
}

function burgerToggle() {
  this.classList.toggle("open");
  navbar.classList.toggle("open");
  document.body.classList.toggle("hidden");
}

function banPoint(e) {
  if (e.key === ".") {
    e.preventDefault();
  }
}

function submitForm(e) {
  e.preventDefault();

  resetError();

  let isValid = true;

  if (!nameInput.value.trim()) {
    isValid = false;
    nameError.textContent = "Пожалуйста, введите имя.";
  }

  if (!addressInput.value.trim()) {
    isValid = false;
    adressError.textContent = "Пожалуйста, введите адрес.";
  }

  if (!phoneInput.value.trim()) {
    isValid = false;
    phoneError.textContent = "Пожалуйста, введите телефон.";
  } else if (!phonePattern.test(phoneInput.value.trim())) {
    isValid = false;
    phoneError.textContent =
      "Пожалуйста, введите действительный номер телефона.";
  }

  console.log("isValid", isValid);

  if (isValid) {
    const formData = new FormData(formDelivery);

    // Фейковый AJAX запрос
    setTimeout(function () {
      popupOpen();

      console.log(
        "Form Data Submitted:",
        Object.fromEntries(formData.entries())
      );

      resetForm();
    }, 1000); // Имитируем задержку в 1 секунду

    // !!! ЕСЛИ БЫЛ БЫ РЕАЛЬНЫЙ СЕРВЕР, ТО ЗАПРОС БЫЛ БЫ ПРИМЕРНО ТАКИМ (Вместо setTimeout-а): !!!
    // fetch("ссылка на сервер", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    // popupOverlay.style.display = "block";
    // popupMessage.style.display = "block";
    // resetForm();
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  } else {
    setTimeout(() => {
      resetError();
    }, 3000);
  }
}

// Reset inputError / Form
function resetError() {
  nameError.textContent = "";
  adressError.textContent = "";
  phoneError.textContent = "";
}

function resetForm() {
  nameInput.value = "";
  addressInput.value = "";
  phoneInput.value = "";
  // /Reset inputError / Form
}

// Popup
function popupOpen() {
  popupOverlay.style.display = "block";
  popupMessage.style.display = "block";
}

function popupClose() {
  popupOverlay.style.display = "none";
  popupMessage.style.display = "none";
}
// /Popup

init();
