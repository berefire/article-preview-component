document.addEventListener("DOMContentLoaded", () => {
  import("./modules/share-toast.js").then((module) => {
    module.initShare();
  });
});

