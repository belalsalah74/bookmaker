var bookmarksList = JSON.parse(localStorage.getItem("bookmarksList")) || [];

var elements = {
  form: document.getElementById("form"),
  nameInput: document.getElementById("name"),
  urlInput: document.getElementById("url"),
  tableBody: document.getElementById("table-body"),
};

displayBookmarks();

function displayBookmarks() {
  elements.tableBody.innerHTML = "";
  for (var i = 0; i < bookmarksList.length; i++) {
    var item = bookmarksList[i];
    elements.tableBody.innerHTML += `
            <tr>
                  <td>${i + 1}</td>
                  <td class="text-capitalize">${item.name}</td>
                  <td>
                    <a href="${
                      item.url
                    }" target="_blank" class="btn btn-success icon-link"
                      ><i class="fa-solid fa-eye"></i>Visit</a
                    >
                  </td>
                  <td>
                    <button
                      class="btn btn-danger icon-link"
                      onclick="deleteBookmark(${i})"
                    >
                      <i class="fa-solid fa-trash" ></i> Delete
                    </button>
                  </td>
            </tr>
        `;
  }
}

function isValid(input) {
  var reg = {
    name: /^\w{3,}$/i,
    url: /[(http(s)?:\/\/)(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i,
  };

  var nameInvalidFeedback = document.querySelector("#name + .invalid-feedback");

  if (!reg[input.id].test(input.value)) {
    input.classList.add("is-invalid");
    nameInvalidFeedback.innerHTML =
      "Site name must be at least 3 charachters and can only containletters (a-z), numbers (0-9), and underscore (_)";
    return false;
  } else {
    input.classList.replace("is-invalid", "is-valid");
  }

  //check if sitename exists
  for (var i = 0; i < bookmarksList.length; i++) {
    if (
      bookmarksList[i].name.toLowerCase() ===
      elements.nameInput.value.toLowerCase()
    ) {
      elements.nameInput.classList.add("is-invalid");
      nameInvalidFeedback.innerHTML = "Sitename must be unique";
      return false;
    }
  }
  return true;
}

function addBookmark() {
  if (isValid(elements.nameInput) && isValid(elements.urlInput)) {
    var bookmarkItem = {
      name: elements.nameInput.value,
      url: elements.urlInput.value,
    };

    bookmarkItem.url = /^(http(s)?:\/+)/.test(bookmarkItem.url)
      ? bookmarkItem.url
      : `https://${bookmarkItem.url}`;

    bookmarksList.push(bookmarkItem);

    afterAction(true);
  }
}

function deleteBookmark(i) {
  bookmarksList.splice(i, 1);
  afterAction();
}
function clearAll() {
  bookmarksList = [];
  afterAction();
}

function updateLocalStorage() {
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarksList));
}

function resetForm() {
  elements.nameInput.value = "";
  elements.urlInput.value = "";
}

function afterAction(reset) {
  updateLocalStorage();
  displayBookmarks();
  if (reset) {
    resetForm();
  }
}



// Bootstrap toast
const toastTrigger = document.getElementById("liveToastBtn");
const toastLiveExample = document.getElementById("liveToast");

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastTrigger.addEventListener("click", () => {
    toastBootstrap.show();
  });
}
