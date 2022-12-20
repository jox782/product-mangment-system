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
console.log(allInputs[1]);

//* Get total
function getTotal() {
  if (price.value) {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "a00d02";
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
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  dataPro.push(newPro);
  // Save Local Storage
  localStorage.setItem("product", JSON.stringify(dataPro));
  clearData();
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
  let table = "";
  let dataProLength = dataPro.length;
  for (let i = 0; i < dataProLength; i++) {
    table += `<tr>
              <td>${i}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button id="update">update</button></td>
              <td><button id="delete">delete</button></td>
            </tr>`;
    console.log(table);
  }
  document.getElementById("tbody").innerHTML = table;
}
showData();
//* Count
//* Delete
//* Update
//* Search
//* Clean Data
