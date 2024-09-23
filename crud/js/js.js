// Declare DOM elements at the top to ensure they are correctly referenced
let ddlcategory = document.getElementById('ddlcategory');
let category = document.getElementById('category');
let product = document.getElementById('product');
let quntity = document.getElementById('quntity');
let price = document.getElementById('price');
let old_price = document.getElementById('old_price');
let total = document.getElementById('total');
let id = document.getElementById('id');
let brand = document.getElementById('brand');
let details = document.getElementById('details');
let img = document.getElementById('img');
let img_hover = document.getElementById('img_hover');

let CategoryArry = [];
let ProductArry = [];

let btnStatus = "Create";
let proID;

if (localStorage.Category != null) {
    CategoryArry = JSON.parse(localStorage.Category);
}

if (localStorage.Product != null) {
    ProductArry = JSON.parse(localStorage.Product);
}

console.log(CategoryArry);
console.log(ProductArry);

// Save Category
function SaveCategory() {
    let objCategory = {
        category: category.value
    };

    CategoryArry.push(objCategory);
    localStorage.setItem('Category', JSON.stringify(CategoryArry));
    ResetCategory();
    ShowCategory();
    ShowTableCategory();
    CountCategory();
}

// Reset Category
function ResetCategory() {
    category.value = '';
}

// Show Data
function ShowCategory() {
    let item = '<option value="">Select Category........</option>';
    for (let i = 0; i < CategoryArry.length; i++) {
        item += `<option value="${i}">${CategoryArry[i].category}</option>`;
    }
    ddlcategory.innerHTML = item;
}

// Show Table Category
function ShowTableCategory() {
    let Table = '';
    for (let i = 0; i < CategoryArry.length; i++) {
        Table += `
        <tr>
        <td>${i}</td>
        <td>${CategoryArry[i].category}</td>
        <td>
            <button class="btn btn-danger" onclick="DeleteCategory(${i})">
                <i class="fas fa-trash"></i>
            </button>
        </td>
        </tr>`;
    }
    document.getElementById('bodyCate').innerHTML = Table;
}

// Delete Category
function DeleteCategory(id) {
    if (confirm('Are you sure you want to delete?')) {
        CategoryArry.splice(id, 1);
        localStorage.Category = JSON.stringify(CategoryArry);
        ShowTableCategory();
        ShowCategory();
        CountCategory();
    }
}

// Count Category
function CountCategory() {
    document.getElementById('countCategory').innerHTML = `-Total Category (${CategoryArry.length})`;
}

// Validation Category
function ValidationCategory() {
    let valid = true;
    if (category.value === '') {
        alert('Enter Name Category.....');
        valid = false;
    } else {
        SaveCategory();
    }
    return valid;
}

// Get Total
function GetTotal() {
    if (price.value != 0) {
        let Total = (quntity.value * price.value);
        total.value = Total;
        total.className = "form-control bg-success text-center";
    } else {
        total.value = 0;
        total.className = "form-control bg-danger text-center";
    }
}

// Save Product
function SaveProduct() {
    let NewProduct = {
        brand: brand.value,
        id: id.value,
        ddlcategory: ddlcategory.options[ddlcategory.selectedIndex].text,
        product: product.value,
        quntity: quntity.value,
        price: price.value,
        old_price: old_price.value,
        total: total.value,
        img: img.value,
        img_hover: img_hover.value,
        details: details.value
    };

    if (btnStatus === "Create") {
        ProductArry.push(NewProduct);
    } else {
        ProductArry[proID] = NewProduct;
        btnStatus = "Create";
        document.getElementById('btnSave').innerText = 'Save';
    }

    localStorage.setItem("Product", JSON.stringify(ProductArry));
    ResetProduct();
    ShowTableProduct();
    CountProduct();
    GetTotal();
}

// Reset Product
function ResetProduct() {
    ddlcategory.selectedIndex = 0;
    product.value = '';
    quntity.value = 0;
    price.value = 0;
    old_price.value = 0;
    total.value = 0;
    brand.value = '';
    details.value = '';
    img.value = '';
    img_hover.value = '';
    document.getElementById('btnSave').className = 'btn btn-success w-25';
    document.getElementById('btnSave').innerText = 'Save';
}

// Show Table
function ShowTableProduct() {
    let TablePro = '';
    for (let x = 0; x < ProductArry.length; x++) {
        TablePro += `
        <tr>
                <td>${x}</td>
                <td>${ProductArry[x].id}</td>
                <td>${ProductArry[x].brand}</td>
                <td>${ProductArry[x].ddlcategory}</td>
                <td>${ProductArry[x].product}</td>
                <td>${ProductArry[x].quntity}</td>
                <td>${ProductArry[x].price}</td>
                <td>${ProductArry[x].old_price}</td>
                <td>${ProductArry[x].total}</td>
                <td>${ProductArry[x].img}</td>
                <td>${ProductArry[x].img_hover}</td>
                <td>${ProductArry[x].details}</td>
                <td class="col-2">
                    <button class="btn btn-info" onclick="EditProduct(${x})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger" onclick="DeleteProduct(${x})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
        </tr>`;
    }
    document.getElementById('tablePro').innerHTML = TablePro;
}

// Delete Product
function DeleteProduct(id) {
    if (confirm('Are you sure you want to delete?')) {
        ProductArry.splice(id, 1);
        localStorage.Product = JSON.stringify(ProductArry);
        ShowTableProduct();
        CountProduct();
    }
}

// Edit Product
function EditProduct(id) {
    ddlcategory.value = CategoryArry.findIndex(category => category.category === ProductArry[id].ddlcategory);
    product.value = ProductArry[id].product;
    quntity.value = ProductArry[id].quntity;
    price.value = ProductArry[id].price;
    old_price.value = ProductArry[id].old_price;
    total.value = ProductArry[id].total;
    brand.value = ProductArry[id].brand;
    details.value = ProductArry[id].details;
    img.value = ProductArry[id].img;
    img_hover.value = ProductArry[id].img_hover;
    btnStatus = "Edit";
    proID = id;

    document.getElementById('btnSave').className = 'btn btn-info w-25';
    document.getElementById('btnSave').innerText = 'Update';
}

// Count Product
function CountProduct() {
    document.getElementById('countpro').innerHTML = `-TotalPro (${ProductArry.length})`;
}

// Validation Product
function ValidationProduct() {
    let lbcate = document.getElementById('lbcate');
    let lbProduct = document.getElementById('lbProduct');
    let lbqutity = document.getElementById('lbqutity');
    let lbPrice = document.getElementById('lbPrice');

    let valid = true;

    if (ddlcategory.options[ddlcategory.selectedIndex].text == 'Select Category........') {
        lbcate.innerHTML = 'Category : * [Required]';
        lbcate.style.color = 'red';
        valid = false;
    } else {
        lbcate.innerHTML = 'Category : *';
        lbcate.style.color = 'white';
    }

    if (product.value === '') {
        lbProduct.innerHTML = 'Product Name : * [Required]';
        lbProduct.style.color = 'red';
        valid = false;
    } else {
        lbProduct.innerHTML = 'Product Name : *';
        lbProduct.style.color = 'white';
    }

    if (quntity.value == 0) {
        lbqutity.innerHTML = 'Quantity : * [Required]';
        lbqutity.style.color = 'red';
        valid = false;
    } else {
        lbqutity.innerHTML = 'Quantity : *';
        lbqutity.style.color = 'white';
    }

    if (price.value == 0) {
        lbPrice.innerHTML = 'Price : * [Required]';
        lbPrice.style.color = 'red';
        valid = false;
    } else {
        lbPrice.innerHTML = 'Price : *';
        lbPrice.style.color = 'white';
    }

    if (valid) {
        SaveProduct();
    }

    return valid;
}

$(document).ready(function() {
    ShowCategory();
    ShowTableCategory();
    CountCategory();
    ShowTableProduct();
    CountProduct();
    $('#tablPro').DataTable();
});
localStorage.setItem('ProductData', JSON.stringify(ProductArry));