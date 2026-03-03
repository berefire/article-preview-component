export function initShareToggle () {
    const shareButton = document.querySelector(".share-button");
    const shareToast = document.querySelector(".share-toast");

    if (!shareButton || !shareToast) return;

    shareButton.addEventListener("click", () => {
        shareButton.classList.toggle("is-active");
        shareToast.classList.toggle("is-visible");
    });
}