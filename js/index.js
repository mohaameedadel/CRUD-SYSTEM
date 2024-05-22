// array methods
/*
friends.sort();
friends.reverse();

friends.push()
friends.pop()

friends.unshift( "hammmmadaa" )
friends.shift(  )

friends.splice(   2    ,    3  ) // remove

friends.splice(   3    ,    0   ,   "ali"   ) // add

friends.splice(   3    ,    1   ,   "ali"   ) // add    + remove (update)

friends.includes( "ali" )
friends.indexOf("usama"   , 3 )
friends.lastIndexOf("usama"   , 3 )

friends.join(  " "  )

*/

//  0           1       2           3          4                5

var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var crud = document.getElementById("crud");
var btnAdd = document.getElementById("btnAdd");
var btnUpdate = document.getElementById("btnUpdate");

var indexOfUpdate = 0;
var productList = [];

if (localStorage.getItem("product")) {
  productList = JSON.parse(localStorage.getItem("product"));
  displayProduct();
}

function addProduct() {
  if (
    validationInputs(productName, "nameMsg") &&
    validationInputs(productPrice, "priceMsg") &&
    validationInputs(productCategory, "categoryMsg") &&
    validationInputs(productDescription, "descriptionMsg")
  ) {
    var product = {
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      description: productDescription.value,
    };

    productList.push(product);

    localStorage.setItem("product", JSON.stringify(productList));
    clearData();
    displayProduct();
    hideInputs();
  }
}

function clearData() {
  productName.value = null;
  productPrice.value = null;
  productCategory.value = null;
  productDescription.value = null;

  productName.classList.remove("is-valid");
  productPrice.classList.remove("is-valid");
  productCategory.classList.remove("is-valid");
  productDescription.classList.remove("is-valid");

  productName.classList.remove("is-invalid");
  productPrice.classList.remove("is-invalid");
  productCategory.classList.remove("is-invalid");
  productDescription.classList.remove("is-invalid");

  document.getElementById("nameMsg").classList.add("d-none");
  document.getElementById("priceMsg").classList.add("d-none");
  document.getElementById("categoryMsg").classList.add("d-none");
  document.getElementById("descriptionMsg").classList.add("d-none");
}

function displayProduct() {
  cartona = "";
  for (var i = 0; i < productList.length; i++) {
    cartona += `<tr>
            <td>${i + 1}</td>
            <td>${productList[i]["name"]}</td>
            <td>${productList[i]["price"]}</td>
            <td>${productList[i]["category"]}</td>
            <td>${productList[i]["description"]}</td>
            <td>
              <button class="btn btn-outline-warning btn-sm mb-2" onclick="setUpdateItem(${i})">Update</button>
              <button class="btn btn-outline-danger btn-sm mb-2" onclick="deleteItem(${i})">Delete</button>
            </td>
          </tr>`;
  }

  document.getElementById("productData").innerHTML = cartona;
}

function deleteItem(i) {
  productList.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(productList));
  displayProduct();
}

function searchData() {
  var search = document.getElementById("search");

  cartona = "";
  for (var i = 0; i < productList.length; i++) {
    if (
      productList[i].name.toLowerCase().includes(search.value.toLowerCase())
    ) {
      cartona += `<tr>
            <td>${i + 1}</td>
            <td>${productList[i]["name"]}</td>
            <td>${productList[i]["price"]}</td>
            <td>${productList[i]["category"]}</td>
            <td>${productList[i]["description"]}</td>
            <td>
              <button class="btn btn-outline-warning btn-sm mb-2" onclick="setUpdateItem(${i})">Update</button>
              <button class="btn btn-outline-danger btn-sm mb-2" onclick="deleteItem(${i})">Delete</button>
            </td>
          </tr>`;
    }
  }

  document.getElementById("productData").innerHTML = cartona;
}

function validationInputs(element, msgId) {
  var inputValue = element.value;
  var msg = document.getElementById(msgId);

  var regex = {
    productName: /^[A-Z][a-z0-9]{2,8}$/,
    productPrice: /^[1-9][0-9]{1,5}$/,
    productCategory: /^(TV|Mobile|Screens|Electronic)$/i,
    productDescription: /^.{3,}$/m,
  };

  if (regex[element.id].test(inputValue)) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    msg.classList.add("d-none");
    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    msg.classList.remove("d-none");
    return false;
  }
}

function showInputs() {
  crud.classList.remove("d-none");
}

function hideInputs() {
  crud.classList.add("d-none");
  btnAdd.classList.remove("d-none");
  btnUpdate.classList.add("d-none");
  clearData();
}

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    hideInputs();
  }
});

function setUpdateItem(i) {
  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none");

  showInputs();
  productName.value = productList[i]["name"];
  productPrice.value = productList[i]["price"];
  productCategory.value = productList[i]["category"];
  productDescription.value = productList[i]["description"];

  indexOfUpdate = i;
}

function updateProduct() {
  if (
    validationInputs(productName, "nameMsg") &&
    validationInputs(productPrice, "priceMsg") &&
    validationInputs(productCategory, "categoryMsg") &&
    validationInputs(productDescription, "descriptionMsg")
  ) {
    var product = {
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      description: productDescription.value,
    };

    productList.splice(indexOfUpdate, 1, product);

    localStorage.setItem("product", JSON.stringify(productList));
    
    displayProduct();
    hideInputs();
  }
}
