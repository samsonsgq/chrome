const addressInput = document.getElementById("address");
const frame = document.getElementById("frame");
const status = document.getElementById("status");
const backButton = document.getElementById("back");
const forwardButton = document.getElementById("forward");
const reloadButton = document.getElementById("reload");
const tabTitle = document.getElementById("tab-title");

const historyStack = [];
let historyIndex = -1;

const setStatus = (text) => {
  status.textContent = text;
};

const normalizeUrl = (value) => {
  const trimmed = value.trim();
  if (!trimmed) {
    return "about:blank";
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  if (trimmed.includes(".")) {
    return `https://${trimmed}`;
  }

  return `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`;
};

const updateControls = () => {
  backButton.disabled = historyIndex <= 0;
  forwardButton.disabled = historyIndex >= historyStack.length - 1;
};

const navigateTo = (value, fromHistory = false) => {
  const url = normalizeUrl(value);
  if (!fromHistory) {
    historyStack.splice(historyIndex + 1);
    historyStack.push(url);
    historyIndex = historyStack.length - 1;
  }
  addressInput.value = url;
  frame.src = url;
  setStatus("Loading...");
  updateControls();
};

addressInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    navigateTo(addressInput.value);
  }
});

backButton.addEventListener("click", () => {
  if (historyIndex > 0) {
    historyIndex -= 1;
    navigateTo(historyStack[historyIndex], true);
  }
});

forwardButton.addEventListener("click", () => {
  if (historyIndex < historyStack.length - 1) {
    historyIndex += 1;
    navigateTo(historyStack[historyIndex], true);
  }
});

reloadButton.addEventListener("click", () => {
  frame.contentWindow?.location.reload();
});

frame.addEventListener("load", () => {
  setStatus("Loaded");
  tabTitle.textContent = frame.contentDocument?.title || "New Tab";
});

window.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key.toLowerCase() === "l") {
    event.preventDefault();
    addressInput.focus();
    addressInput.select();
  }
});

updateControls();
