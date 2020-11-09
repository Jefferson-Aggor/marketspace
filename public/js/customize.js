// const displayNone = function (elem) {
//     return (elem.style.display = "none");
//   };
//   const displayShow = function (elem) {
//     return (elem.style.display = "block");
//   };

//   const imageHandler = function (handle, placeholder) {
//     const originalInnerText = handle.nextElementSibling.innerText;
//     const originalSrc = placeholder.src;
//     handle.addEventListener("change", (e) => {
//       const file = e.target.files[0];
//       const reader = new FileReader();

//       if (e.target.id === "main-image") {
//         renderTexts(mainText_1, mainText_1_placeholder, "insert main text");
//       }

//       if (e.target.id === "primary-image") {
//         renderTexts(mainText_2, mainText_1_placeholder, "Insert main text 2");
//       }
//       if (e.target.id === "secondary-image") {
//         renderTexts(mainText_3, mainText_1_placeholder, "Insert main text 3");
//       }

//       const splitType = file.type.split("/");

//       if (file !== undefined) {
//         let maxLen = 2000000;

//         if (splitType[0] !== "image") {
//           placeholder.src = originalSrc;
//           return (e.target.nextElementSibling.innerHTML = `<span class='u-alert'>File must be an image </span>`);
//         }

//         if (file.size > maxLen) {
//           placeholder.src = originalSrc;
//           return (e.target.nextElementSibling.innerHTML = `<span class='u-alert'>File must be ${
//             maxLen / 1000000
//           }mb or less </span>`);
//         }

//         reader.onload = function (e) {
//           if (e.target.id == "about-image") {
//             previewImage.setAttribute("src", e.target.result);
//           } else {
//             placeholder.setAttribute("src", e.target.result);
//           }
//         };

//         reader.readAsDataURL(file);
//       } else {
//         placeholder.src = originalSrc;
//       }
//       e.target.nextElementSibling.innerHTML = `<span>${originalInnerText}</span>`;
//     });
//   };

//   const renderTexts = function (handle, placeholder, message) {
//     if (placeholder.innerText == "") {
//       placeholder.innerText = message;
//     }

//     return handle.addEventListener("keyup", (e) => {
//       e.preventDefault();

//       if (e.target.maxLength > 0) {
//         showNumber(e.target);
//       }

//       if (handle.value != "") {
//         return (placeholder.innerText = handle.value);
//       }

//       if (e.target.id === "about-shop" && e.target.innerText == "") {
//         displayNone(about_preview);
//       }

//       placeholder.innerText = message;
//     });
//   };

// displayNone(preview_product);

// Text Handlers
const mainText_1 = document.getElementById("main-text-1");
const mainText_2 = document.getElementById("main-text-2");
const mainText_3 = document.getElementById("main-text-3");

// Text Placeholders
const mainText_1_placeholder = document.getElementById(
  "main-text-placeholder-1"
);

// Image Handlers
const mainImage = document.getElementById("main-image");
const primaryImage = document.getElementById("primary-image");
const secondaryImage = document.getElementById("secondary-image");
const previewImage = document.getElementById("preview-image");

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

const imageHandler = function (handle, placeholder) {
  const originalInnerText = handle.previousElementSibling.innerText;
  const originalSrc = placeholder.src;
  handle.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (e.target.id === "main-image") {
      renderTexts(mainText_1, mainText_1_placeholder, "Insert main text");
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
        placeholder.setAttribute("src", e.target.result);
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

    if (handle.value != "") {
      return (placeholder.innerText = handle.value);
    }

    placeholder.innerText = message;
  });
};

//  Function calls
imageHandler(mainImage, previewImage);
imageHandler(primaryImage, previewImage);
imageHandler(secondaryImage, previewImage);
