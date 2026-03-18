const shareButton = document.getElementById("article-share-toggle");
const shareToast = document.getElementById("share-panel");

let isInitialized = false;
let boundHandleClickOutside = null;
let boundHandleEscape = null;

function toggleShare() {
  const isActive = shareToast.classList.toggle("is-active");

  shareToast.hidden = !isActive;

  shareButton.classList.toggle("is-active", isActive);
  shareButton.setAttribute("aria-expanded", String(isActive));

  if (isActive) {
    const firstLink = shareToast.querySelector("a");
    firstLink?.focus();
  }
}

function closeShare() {
  shareToast.classList.remove("is-active");
  shareToast.hidden = true;
  shareButton.classList.remove("is-active");
  shareButton.setAttribute("aria-expanded", "false");

  shareButton.focus();
}

function handleClickOutside(event) {
  if (
    !shareToast.contains(event.target) &&
    !shareButton.contains(event.target)
  ) {
    closeShare();
  }
}

function handleEscape(event) {
  if (event.key === "Escape") {
    closeShare();
  }
}

export function initShare() {

  if (!shareButton || !shareToast || isInitialized) return;

  boundHandleClickOutside = handleClickOutside.bind(this);
  boundHandleEscape = handleEscape.bind(this);

  shareButton.addEventListener("click", toggleShare);
  document.addEventListener("pointerdown", boundHandleClickOutside);
  document.addEventListener("keydown", boundHandleEscape);

  isInitialized = true;
}

export function destroyShare() {
  if (!isInitialized) return;
  // remove listeners to avoid leaks and duplicate handlers
  shareButton.removeEventListener("click", toggleShare);
  document.removeEventListener("pointerdown", boundHandleClickOutside);
  document.removeEventListener("keydown", boundHandleEscape);
  boundHandleClickOutside = null;
  boundHandleEscape = null;
  isInitialized = false;
}