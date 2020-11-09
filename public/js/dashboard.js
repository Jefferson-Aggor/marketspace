const displayNone = function (elem) {
  return (elem.style.display = "none");
};
const displayShow = function (elem) {
  return (elem.style.display = "block");
};

// Render preview
const preview = document.getElementById("preview");

// preview about
const about_preview = document.getElementById("preview-about");
const about_shop = document.getElementById("about-shop");

const preview_about_placeholder = document.getElementById(
  "preview-about-placeholder"
);
const preview_about_image = document.getElementById("about-preview-image");

// Functions
const showNumber = function (handle) {
  const nextsibling = handle.nextElementSibling;

  if (handle.textLength >= 0.9 * Number(handle.maxLength)) {
    nextsibling.style.color = "orangered";
  } else {
    nextsibling.style.color = "#0e7c7bff";
  }
  return (nextsibling.innerText = `${handle.value.length}/${handle.maxLength}`);
};

const renderTexts = function (handle, placeholder, message) {
  if (placeholder.innerText == "") {
    placeholder.innerText = message;
  }

  if (handle.innerHTML !== "") {
    placeholder.innerText = handle.innerHTML;
  }

  return handle.addEventListener("keyup", (e) => {
    e.preventDefault();

    if (e.target.maxLength > 0) {
      showNumber(e.target);
    }
    if (e.target.id === "about-shop") {
      displayShow(about_preview);
    }

    if (e.target.id === "product-name") {
      displayShow(preview_product);
    }

    if (handle.value != "") {
      return (placeholder.innerText = handle.value);
    }

    if (e.target.id === "product-name" && e.target.innerText == "") {
      displayNone(preview_product);
    }

    placeholder.innerText = message;
  });
};

renderTexts(about_shop, preview_about_placeholder, "Tell us about your shop");
