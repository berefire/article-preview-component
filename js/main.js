import { initShare} from "./modules/share-toast.js";

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initShare);
} else {
  initShare();
}

