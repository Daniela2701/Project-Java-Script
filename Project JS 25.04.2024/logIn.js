import { writeToLS, readFromLS, ckeckIfUserLoggedIn } from "./util.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const logBtn = document.getElementById("logBtn");
const registerBtn = document.getElementById("registerBtn");
const error = document.getElementById("error");

const users = readFromLS("users") || [];
const loggedInUser = readFromLS("loggedInUser") || {};

ckeckIfUserLoggedIn(loggedInUser);

logBtn.addEventListener("click", (e) => {
  e.preventDefault();
  ckeckLogInValid(users);
});

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.assign("./register.html");
});

const ckeckLogInValid = (users) => {
  users.forEach((element) => {
    if (
      element.emailInput === email.value.trim() &&
      element.passwordInput === btoa(password.value.trim())
    ) {
      window.location.assign("./home.html");
      writeToLS("loggedInUser", element);
      return;
    }

    if (element.emailInput !== email.value.trim()) {
      error.innerHTML = `<sup>*</sup> Email is incorrect!`;
    }

    if (element.passwordInput !== btoa(password.value.trim())) {
      error.innerHTML = `<sup>*</sup> Password is incorrect!`;
    }
  });
};
