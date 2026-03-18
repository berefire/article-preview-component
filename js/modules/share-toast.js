let shareButton;
let shareToast;

let isInitialized = false;
let boundHandleClickOutsideRef = null;
let boundHandleEscapeRef = null;

function toggleShare() {
  const isActive = shareToast.classList.toggle("toast--is-active");

  shareToast.hidden = !isActive;

  shareButton.classList.toggle("button--is-active", isActive);
  shareButton.setAttribute("aria-expanded", String(isActive));

  if (isActive) {
    const firstLink = shareToast.querySelector("a");
    firstLink?.focus();
  }
}

function closeShare() {
  shareToast.classList.remove("toast--is-active");
  shareToast.hidden = true;
  shareButton.classList.remove("button--is-active");
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

  if (isInitialized) return;

  shareButton = document.getElementById("article-share-toggle");
  shareToast = document.getElementById("share-panel");

  if (!shareButton || !shareToast) return;

  boundHandleClickOutsideRef = handleClickOutside;
  boundHandleEscapeRef = handleEscape;

  shareButton.addEventListener("click", toggleShare);
  document.addEventListener("pointerdown", boundHandleClickOutsideRef);
  document.addEventListener("keydown", boundHandleEscapeRef);

  isInitialized = true;
}

export function destroyShare() {
  if (!isInitialized) return;

  // remove listeners to avoid leaks and duplicate handlers
  shareButton.removeEventListener("click", toggleShare);
  document.removeEventListener("pointerdown", boundHandleClickOutsideRef);
  document.removeEventListener("keydown", boundHandleEscapeRef);
  boundHandleClickOutsideRef = null;
  boundHandleEscapeRef = null;
  isInitialized = false;
}