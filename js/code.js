//section elements
var bookNameInput = document.getElementById("BookName");
var bookURLInput = document.getElementById("SiteURL");
var btn = document.getElementById("btn");
var tableRow = document.getElementById("tableRow ");
var websitARR = [];

if (localStorage.getItem("URL") != null) {
  websitARR = JSON.parse(localStorage.getItem("URL"));
}
display(websitARR);

btn.onclick = function () {
  addProduct();
  display(websitARR);
};

function addProduct() {
  var book = {
    bookName: bookNameInput.value,
    bookURL: bookURLInput.value,
  };

  if (isValidURL(book.bookURL)) websitARR.push(book);
  else {
    showBox();
  }
  localStorage.setItem("URL", JSON.stringify(websitARR));
}

function display(arr) {
  var box = "";
  for (var i = 0; i < arr.length; i++) {
    box += `
    
    <tr>
    <th>${i + 1}</th>
    <th>${arr[i].bookName}</th>
    
    <th><button class="btn btn-success " id='btn-url' onclick=visitFun(${i})><i class="fa-solid fa-eye pe-2"></i>Visit</button></th>
    <th><button class="btn btn-danger" onclick=deletFun(${i})><i class="fa-solid fa-trash-can pe-2" ></i>Delet</button>
</th>
</tr>
 
    `;
  }
  tableRow.innerHTML = box;
}

function deletFun(index) {
  websitARR.splice(index, 1);
  localStorage.setItem("URL", JSON.stringify(websitARR));

  display(websitARR);
}
function visitFun(index) {
  var url = websitARR[index].bookURL;

  var btnURL = document.getElementById("btn-url").setAttribute("data-url", url);
  window.open(url, "_blank");
}

function isValidURL(url) {
  // Regular expression for a simple URL pattern
  var urlPattern =
    /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/i;
  return urlPattern.test(url);
}

function isValidName(name) {
  var nameRegex = /^\w{3,}(\s+\w+)*$/;
  return nameRegex.test(name);
}
function checkURL() {
  if (isValidURL(bookURLInput.value)) {
    if (bookURLInput.classList.contains("form-control-red")) {
      bookURLInput.classList.remove("form-control-red");
    }
    bookURLInput.classList.add("form-control-green");
  } else {
    if (bookURLInput.classList.contains("form-control-green")) {
      bookURLInput.classList.remove("form-control-green");
    }
    bookURLInput.classList.add("form-control-red");
  }
}

function checkName() {
  if (isValidName(bookNameInput.value)) {
    if (bookNameInput.classList.contains("form-control-red")) {
      bookNameInput.classList.remove("form-control-red");
    }
    bookNameInput.classList.add("form-control-green");
  } else {
    if (bookNameInput.classList.contains("form-control-green")) {
      bookNameInput.classList.remove("form-control-green");
    }
    bookNameInput.classList.add("form-control-red");
  }
}

//box
var closeTap = document.getElementById("closeTap");
var BOX = document.querySelector(".light-box");
closeTap.addEventListener("click", function () {
  if (BOX.classList.contains("d-flex")) {
    BOX.classList.remove("d-flex");
  }

  BOX.classList.add("d-none");
});
function showBox() {
  if (BOX.classList.contains("d-none")) {
    BOX.classList.remove("d-none");
  }

  BOX.classList.add("d-flex");
}
