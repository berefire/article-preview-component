const shareButton = document.querySelector(".share-button");
const shareToast = document.querySelector(".share-toast");

function toggleShare() {
  const isActive = shareToast.classList.toggle("is-active");

  shareButton.classList.toggle("is-active", isActive);
  shareButton.setAttribute("aria-expanded", String(isActive));

  if (isActive) {
    const firstLink = shareToast.querySelector("a");
    firstLink?.focus();
  }
}

function closeShare() {
  shareToast.classList.remove("is-active");
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
  if (!shareButton || !shareToast) return;

  shareButton.addEventListener("click", toggleShare);
  document.addEventListener("pointerdown", handleClickOutside);
  document.addEventListener("keydown", handleEscape);
}