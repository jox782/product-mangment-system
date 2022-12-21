//* Get elements
let allInputs = document.querySelectorAll("input");
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mode = "create";
let temp;

//* Get total
function getTotal() {
  if (price.value > 0) {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#90EE90";
  } else {
    total.style.background = "#CF6679";
    total.innerHTML = "";
  }
}

//* Create Product
let dataPro;
if (localStorage.product) {
  //   Retrieve Form Local Storage
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}
submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value.toLowerCase(),
    taxes: taxes.value.toLowerCase(),
    ads: ads.value.toLowerCase(),
    discount: discount.value.toLowerCase(),
    total: total.innerHTML.toLowerCase(),
    count: count.value.toLowerCase(),
    category: category.value.toLowerCase(),
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newPro.count < 100
  ) {
    if (mode === "create") {
      //count
      if (newPro.count > 1) {
        let count = newPro.count;
        for (let i = 0; i < count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[temp] = newPro;
      mode = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
    clearData();
  }
  // Save Local Storage
  localStorage.setItem("product", JSON.stringify(dataPro));
  showData();
};

//* Clear Inputs
function clearData() {
  for (let i in allInputs) {
    allInputs[i].value = "";
  }
  total.innerHTML = "";
  console.log("clear");
}

//* Read
function showData() {
  getTotal();
  let table = "";
  let dataProLength = dataPro.length;
  for (let i = 1; i < dataProLength; i++) {
    table += `<tr>
              <td>${i}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button onclick="updateData(${i})" id="update">update</button></td>
              <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDeleteAll = document.getElementById("deleteAll");
  if (dataPro) {
    btnDeleteAll.innerHTML = `<button onclick="deleteAll()">Delete All (${dataPro.length})</button>`;
  } else {
    btnDeleteAll.innerHTML = "";
  }
}
showData();

//* Delete
function deleteData(i) {
  dataPro.splice(i, 1);
  // Save Local Storage
  localStorage.product = JSON.stringify(dataPro);
  showData();
}

//* Delete All
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

//* Update
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "update";
  mode = "update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//* Search
let searchMode = "searchTitle";
let search = document.getElementById("search");
function getSearchMode(id) {
  searchMode = id;
  if (searchMode === "searchTitle") {
    search.placeholder = "Search By Title";
  } else {
    searchMode === "searchCategory";
    search.placeholder = "Search By Category";
  }
  search.focus();
  search.value = "";
  showData();
}
function searchData(value) {
  let table = "";
  if (searchMode === "searchTitle") {
    dataProLength = dataPro.length;
    for (let i = 0; i < dataProLength; i++) {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `<tr>
              <td>${i}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button onclick="updateData(${i})" id="update">update</button></td>
              <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>`;
      }
    }
  } else {
    dataProLength = dataPro.length;
    for (let i = 0; i < dataProLength; i++) {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `<tr>
              <td>${i}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button onclick="updateData(${i})" id="update">update</button></td>
              <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

//* Clean Data
