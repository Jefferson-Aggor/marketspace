// Pagination
const leftArr1 = document.querySelector(".left-arrow-1");
const rightArr1 = document.querySelector(".right-arrow-1");
const leftArr2 = document.querySelector(".left-arrow-2");
const rightArr2 = document.querySelector(".right-arrow-2");
const leftArr3 = document.querySelector(".left-arrow-3");
const rightArr3 = document.querySelector(".right-arrow-3");

const page1 = document.getElementById("page-1");
const page2 = document.getElementById("page-2");
const page3 = document.getElementById("page-3");

const displayNone = function (elem) {
  return (elem.style.display = "none");
};
const displayShow = function (elem) {
  return (elem.style.display = "block");
};
displayNone(page2);
displayNone(page3);

const rightViewHandler = function (handle, hide1, hide2, show) {
  return handle.addEventListener("click", (e) => {
    e.preventDefault();
    displayNone(hide1);
    displayNone(hide2);
    displayShow(show);
  });
};
const leftViewHandler = function (handle, hide1, hide2, show) {
  return handle.addEventListener("click", (e) => {
    e.preventDefault();
    displayNone(hide1);
    displayNone(hide2);
    displayShow(show);
  });
};

const opacityAndVisibility = function (handle) {
  let hidden;
  hidden = handle.style.opacity = 0;
  hidden = handle.style.visibility = "hidden";
  return hidden;
};

opacityAndVisibility(leftArr1);
opacityAndVisibility(rightArr3);

rightViewHandler(rightArr1, page1, page3, page2);

leftViewHandler(leftArr2, page2, page3, page1);
rightViewHandler(rightArr2, page1, page2, page3);

leftViewHandler(leftArr3, page1, page3, page2);

// Render preview
const preview = document.getElementById("preview");

const leftArr = document.querySelector(".left-arrow");
const rightArr = document.querySelector(".right-arrow");

const primaryColor = document.getElementById("primary-color");
const secondaryColor = document.getElementById("secondary-color");
const tertiaryColor = document.getElementById("tertiary-color");

const mainText_1 = document.getElementById("main-text-1");
const sub_mainText_1 = document.getElementById("sub-main-text-1");

const mainText_2 = document.getElementById("main-text-2");
const sub_mainText_2 = document.getElementById("sub-main-text-2");

const mainText_3 = document.getElementById("main-text-3");
const sub_mainText_3 = document.getElementById("sub-main-text-3");

// preview about
const about_preview = document.getElementById("preview-about");
const about_image = document.getElementById("about-image");
const about_shop = document.getElementById("about-shop");
const about_shop_label = document.getElementById("about-shop-label");

// preview product selectors
const product_name = document.getElementById("product-name");
const product_description = document.getElementById("product-description");
const product_price = document.getElementById("product-price");
const product_currency = document.getElementById("product-currency");
const product_mainImage = document.getElementById("main-product-image");
const product_subImages = document.getElementById("sub-product-photos");
// preview products
const preview_product = document.getElementById("preview-product");
const preview_product_image = document.querySelector(".preview-product-image");
const preview_product_name = document.getElementById("preview-product-name");
const preview_product_description = document.getElementById(
  "preview-product-description"
);
const preview_product_price = document.getElementById("preview-product-price");
const preview_product_currency = document.getElementById(
  "preview-product-currency"
);

// Placeholders for texts
const mainText_1_placeholder = document.getElementById(
  "main-text-placeholder-1"
);
const sub_text_placeholder_1 = document.getElementById(
  "sub-text-placeholder-1"
);

const preview_about_placeholder = document.getElementById(
  "preview-about-placeholder"
);
const preview_about_image = document.getElementById("about-preview-image");

const mainImage = document.getElementById("main-image");
const primaryImage = document.getElementById("primary-image");
const secondaryImage = document.getElementById("secondary-image");
const previewImage = document.getElementById("preview-image");

const show_reviews = document.getElementById("show-reviews");
const reviews = document.getElementById("preview-ratings");

displayNone(preview_product);
displayNone(about_preview);
displayNone(reviews);

const showNumber = function (handle) {
  const nextsibling = handle.nextElementSibling;

  if (handle.textLength >= 0.9 * Number(handle.maxLength)) {
    nextsibling.style.color = "orangered";
  } else {
    nextsibling.style.color = "#0e7c7bff";
  }
  return (nextsibling.innerText = `${handle.value.length}/${handle.maxLength}`);
};
const check = function (handle, placeholder) {
  return handle.addEventListener("change", function () {
    if (handle.checked) {
      return displayShow(placeholder);
    }
    displayNone(placeholder);
  });
};

product_currency.addEventListener("change", (e) => {
  e.preventDefault();
  preview_product_currency.innerText = e.target.value + " ";
});

const imageHandler = function (handle, placeholder) {
  const originalInnerText = handle.nextElementSibling.innerText;
  const originalSrc = placeholder.src;
  handle.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (e.target.id === "main-image") {
      renderTexts(mainText_1, mainText_1_placeholder, "insert main text");
      renderTexts(sub_mainText_1, sub_text_placeholder_1, "insert sub text");
    }

    if (e.target.id === "primary-image") {
      renderTexts(mainText_2, mainText_1_placeholder, "Insert main text 2");
      renderTexts(sub_mainText_2, sub_text_placeholder_1, "insert sub image");
    }
    if (e.target.id === "secondary-image") {
      renderTexts(mainText_3, mainText_1_placeholder, "Insert main text 3");
      renderTexts(sub_mainText_3, sub_text_placeholder_1, "insert sub image");
    }

    const splitType = file.type.split("/");

    if (file !== undefined) {
      let maxLen = 2000000;

      if (splitType[0] !== "image") {
        placeholder.src = originalSrc;
        return (e.target.nextElementSibling.innerHTML = `<span class='u-alert'>File must be an image </span>`);
      }

      if (file.size > maxLen) {
        placeholder.src = originalSrc;
        return (e.target.nextElementSibling.innerHTML = `<span class='u-alert'>File must be ${
          maxLen / 1000000
        }mb or less </span>`);
      }

      reader.onload = function (e) {
        if (e.target.id == "about-image") {
          previewImage.setAttribute("src", e.target.result);
        } else {
          placeholder.setAttribute("src", e.target.result);
        }
      };

      reader.readAsDataURL(file);
    } else {
      placeholder.src = originalSrc;
    }
    e.target.nextElementSibling.innerHTML = `<span>${originalInnerText}</span>`;
  });
};

const renderTexts = function (handle, placeholder, message) {
  if (handle.value == "") {
    placeholder.innerText = message;
  } else {
    placeholder.innerText = handle.value;
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

    if (e.target.id === "about-shop" && e.target.innerText == "") {
      displayNone(about_preview);
    }

    placeholder.innerText = message;
  });
};

imageHandler(mainImage, previewImage);
imageHandler(about_image, preview_about_image);
imageHandler(primaryImage, previewImage);
imageHandler(secondaryImage, previewImage);
imageHandler(product_mainImage, preview_product_image);
imageHandler(product_subImages, "");

renderTexts(mainText_1, mainText_1_placeholder, "Insert main text");
renderTexts(sub_mainText_1, sub_text_placeholder_1, "insert sub image");
renderTexts(about_shop, preview_about_placeholder, "Tell us about your shop");
renderTexts(product_name, preview_product_name, "Name of product");
renderTexts(product_description, preview_product_description, "Description");
renderTexts(product_price, preview_product_price, "");

check(show_reviews, reviews);

// getColor(primaryColor);
// getColor(secondaryColor);
// getColor(tertiaryColor);
