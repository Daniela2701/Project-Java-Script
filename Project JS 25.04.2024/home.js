import { readFromLS, renderFlats, ckeckIfUserLoggedIn } from "./util.js";

const welcome = document.getElementById("welcome");
const logOut = document.getElementById("logOut");
const profileUpdate = document.getElementById("profileUpdate");
const allFlatsBtn = document.getElementById("allFlatsBtn");
const newFlatsBtn = document.getElementById("newFlatsBtn");
const homeBtn = document.getElementById("homeBtn");

const loggedInUser = readFromLS("loggedInUser");

ckeckIfUserLoggedIn(loggedInUser);

welcome.innerText = `Welcome ${loggedInUser.userNameInput}, on this page are your favorite apartments`;

logOut.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
});

profileUpdate.addEventListener("click", () => {
  window.location.assign("./profileUpdate.html");
});

allFlatsBtn.addEventListener("click", () => {
  window.location.assign("./allFlats.html");
});

newFlatsBtn.addEventListener("click", () => {
  window.location.assign("./newFlats.html");
});

homeBtn.addEventListener("click", () => {
  window.location.assign("./home.html");
});

function logoutUser() {
  localStorage.removeItem("loggedInUser");
  const loggedInUser = readFromLS("loggedInUser");
  ckeckIfUserLoggedIn(loggedInUser);
  alert("You have been logged out due to inactivity.");
}

const timeoutDuration = 30 * 60 * 1000;

let lastActivityTimestamp = Date.now();

function handleUserActivity() {
  lastActivityTimestamp = Date.now();
}

document.addEventListener("mousemove", handleUserActivity);
document.addEventListener("keypress", handleUserActivity);

let inactivityTimer = setTimeout(logoutUser, timeoutDuration);

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);

  inactivityTimer = setTimeout(logoutUser, timeoutDuration);
}

document.addEventListener("mousemove", resetInactivityTimer);
document.addEventListener("keypress", resetInactivityTimer);

const tableFlats = document.getElementById("tableFlats");
const empty = document.getElementById("notFlat");
const tHead = document.createElement("thead");
const tBody = document.createElement("tbody");
const headRow = document.createElement("tr");

const tableHeaderNames = [
  "City",
  "Street Name",
  "Street Number",
  "Are size",
  "Has AC?",
  "Year Build",
  "Rent price",
  "Date available",
  "Action",
];

tableHeaderNames.forEach((element) => {
  const th = document.createElement("th");
  th.textContent = element;
  headRow.appendChild(th);
});

tHead.appendChild(headRow);
tableFlats.append(tHead, tBody);

if (loggedInUser.favorite.length === 0) {
  empty.innerHTML = `<sup>*</sup>There are no favorit apartments.`;
}

function renderFavorite() {
  renderFlats(loggedInUser.favorite);
}

renderFavorite();
