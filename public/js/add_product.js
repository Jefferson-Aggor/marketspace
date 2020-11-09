// preview product selectors
const product_name = document.getElementById("product-name");
const product_description = document.getElementById("product-description");
const product_price = document.getElementById("product-price");
const product_currency = document.getElementById("product-currency");
const product_mainImage = document.getElementById("main-product-image");
const product_subImage1 = document.getElementById("sub-product-photo1");
const product_subImage2 = document.getElementById("sub-product-photo2");
const product_subImage3 = document.getElementById("sub-product-photo3");
const product_subImage4 = document.getElementById("sub-product-photo4");

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

const displayNone = function (elem) {
  return (elem.style.display = "none");
};
const displayShow = function (elem) {
  return (elem.style.display = "block");
};

const showNumber = function (handle) {
  const nextsibling = handle.nextElementSibling;

  if (handle.textLength >= 0.9 * Number(handle.maxLength)) {
    nextsibling.style.color = "orangered";
  } else {
    nextsibling.style.color = "#0e7c7bff";
  }
  return (nextsibling.innerText = `${handle.value.length}/${handle.maxLength}`);
};

const imageHandler = function (handle, placeholder) {
  const originalInnerText = handle.previousElementSibling.innerText;
  const originalSrc = placeholder.src;
  handle.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (e.target.id === "main-image") {
      renderTexts(mainText_1, mainText_1_placeholder, "insert main text");
    }

    if (e.target.id === "primary-image") {
      renderTexts(mainText_2, mainText_1_placeholder, "Insert main text 2");
    }
    if (e.target.id === "secondary-image") {
      renderTexts(mainText_3, mainText_1_placeholder, "Insert main text 3");
    }

    const splitType = file.type.split("/");

    if (file !== undefined) {
      let maxLen = 2000000;

      if (splitType[0] !== "image") {
        placeholder.src = originalSrc;
        return (e.target.previousElementSibling.innerHTML = `<span class='u-alert'>File must be an image </span>`);
      }

      if (file.size > maxLen) {
        placeholder.src = originalSrc;
        return (e.target.previousElementSibling.innerHTML = `<span class='u-alert'>File must be ${
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
    e.target.previousElementSibling.innerHTML = `<span>${originalInnerText}</span>`;
  });
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

    if (e.target.id === "product-price" && e.target.value != "") {
      let num = Number(e.target.value) - 0.01;
      return (placeholder.innerText = num);
    }

    if (handle.value != "") {
      return (placeholder.innerText = handle.value);
    }

    placeholder.innerText = message;
  });
};

product_currency.addEventListener("change", (e) => {
  e.preventDefault();
  preview_product_currency.innerText = e.target.value + " ";
});

imageHandler(product_mainImage, preview_product_image);
imageHandler(product_subImage1, "");
imageHandler(product_subImage2, "");
imageHandler(product_subImage3, "");
imageHandler(product_subImage4, "");

renderTexts(product_name, preview_product_name, "Name of product");
renderTexts(product_description, preview_product_description, "Description");
renderTexts(product_price, preview_product_price, "");
