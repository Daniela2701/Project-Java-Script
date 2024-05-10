import {
  writeToLS,
  readFromLS,
  validateEmail,
  validatePassword,
  ckeckIfUserLoggedIn,
  checkTextInput,
} from "./util.js";

const userName = document.getElementById("userName");
const email = document.getElementById("email");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const password = document.getElementById("password");
const age = document.getElementById("age");
const registerBtn = document.getElementById("registerBtn");
const error = document.getElementById("error");

const users = readFromLS("users") || [];
const loggedInUser = readFromLS("loggedInUser") || {};

ckeckIfUserLoggedIn(loggedInUser);

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const userInfo = {
    userNameInput: userName.value,
    emailInput: email.value,
    firstNameInput: firstName.value,
    lastNameInput: lastName.value,
    passwordInput: btoa(password.value),
    ageInput: age.value,
    favorite: [],
  };

  const isNameTaken = users.some(
    (user) => user.userNameInput === userInfo.userNameInput
  );
  const isEmailTaken = users.some(
    (user) => user.emailInput === userInfo.emailInput
  );

  const areFieldsEmpty = !!(
    userInfo.userNameInput === "" ||
    userInfo.emailInput === "" ||
    userInfo.firstNameInput === "" ||
    userInfo.lastNameInput === "" ||
    userInfo.passwordInput === "" ||
    userInfo.ageInput === ""
  );

  if (areFieldsEmpty) {
    error.innerHTML = `<sup>*</sup> Complete each field of the form`;
    return;
  }

  if (!checkTextInput(userInfo.userNameInput)) {
    error.innerHTML = `<sup>*</sup> User name is not valid`;
    return;
  }

  if (!checkTextInput(userInfo.firstNameInput)) {
    error.innerHTML = `<sup>*</sup> First name is not valid`;
    return;
  }

  if (!checkTextInput(userInfo.lastNameInput)) {
    error.innerHTML = `<sup>*</sup> Last name is not valid`;
    return;
  }

  if (!validateEmail(userInfo.emailInput)) {
    error.innerHTML = `<sup>*</sup> Email is not valid`;
    return;
  }

  if (!validatePassword(userInfo.passwordInput)) {
    return;
  }

  const birthday = new Date(userInfo.ageInput);
  const currentDate = new Date();

  const years = currentDate.getFullYear() - birthday.getFullYear();

  if (years < 18) {
    error.innerHTML = `<sup>*</sup> Age is not valid`;
    return;
  }

  if (years > 120) {
    error.innerHTML = `<sup>*</sup> Age is not valid`;
    return;
  }

  if (isNameTaken) {
    error.innerHTML = `<sup>*</sup> User name is taken`;
    return;
  }

  if (isEmailTaken) {
    error.innerHTML = `<sup>*</sup> Email name is taken`;
    return;
  }

  users.push(userInfo);
  writeToLS("users", users);

  window.location.assign("./home.html");

  writeToLS("loggedInUser", userInfo);
});
