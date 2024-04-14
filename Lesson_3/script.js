//Array - Mảng
//Object

// const jsaAge = [1, 2, 3, 4]
// index      = [0, 1, 2, 3]

// let pT1 = jsaAge[2]
// console.log(jsaAge.concat(10))

// for (let i = 0; i < array.length; i++) {
//     const element = array[i];

// }
//pop
//shift
//join

// let myName = "DucNhan"
// const myArr = [e, f, g, h]

// for (let i = 0; i <= myName.length; i++) {
//     const myNameElement = myName[i];
//     console.log(i)
//     console.log(myNameElement)
// }

// for (const i in myArr) {
//     if (Object.hasOwnProperty.call(myArr, i)) {
//         const myArrElement = myArr[i];
//         console.log(myArrElement)
//     }
// }

// lấy data render ra giao diện

const container = document.querySelector(".wrapper")

const searchBtn = document.querySelector("#search-btn")

const handleSearch = () => {
    const inputValue = document.getElementById('search-input').value.trim();
    if (inputValue == "") {
        alert('You must enter anything here')
        return
    }
}

let html = ''

// for (const product of products) {
//     let productName = product.name;
//     let productPrice = product.price;
//     let productDesc = product.desc;

//     const productEl = `
//     <div class="product">
//         <h1 class="product-name">${productName}</h1>
//         <h2 class="product-price">${productPrice}</h2>
//         <p class="product-desc">${productDesc}</p>
//     </div>`;

//     const productEl = document.createElement("div");
//     productEl.classList.add("product");

//     const productNameEl = document.createElement("h1");
//     productNameEl.classList.add("product-name");
//     productNameEl.innerText = productName;

//     const productElPrice = document.createElement("h2");
//     productElPrice.classList.add("product-price");
//     productElPrice.innerText = productPrice;

//     console.log(productEl)

//     container.innerHTML += productEl;

//     container.appendChild(productEl)
// }

products.forEach((product) => {
    let productName = product.name;
    let productPrice = product.price;
    let productDesc = product.desc;

    const productEl =
        `<div class="product">
        <h1 class="product-name">${productName}</h1>
        <h2 class="product-price">${productPrice}</h2>
        <p class="product-desc">${productDesc}</p>
    </div>`;

    container.innerHTML += productEl;
});

searchBtn.addEventListener('click', handleSearch);
