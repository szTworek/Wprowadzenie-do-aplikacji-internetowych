async function fetchData(){
    return fetch("https://dummyjson.com/products", )
        .then(response =>{
            return response.json()
        })
        .then(products =>{
                return products.products
            }
        )
}

function tableManager(products,sortingType,filterInput) {
    let tableBody = document.querySelector("#output")
    let rows = ''
    tableBody.innerHTML = ''
    let listOfProducts = sorting(products, sortingType)
    listOfProducts=filterProducts(listOfProducts,filterInput)
    for (let product in listOfProducts) {
        let photos = '';

        // Iteruj po wszystkich zdjęciach produktu
        listOfProducts[product].images.forEach(image => {
            photos += `<img src="${image}" alt="product image" class="productImages" />`;
        });
        rows += `
            <tr>
                <td>${photos}</td>
                <td>${listOfProducts[product].title}</td>
                <td>${listOfProducts[product].description}</td>
            </tr>
            `
    }
    tableBody.innerHTML = rows
}

function sorting(products, type) {
    switch (type) {
        case "Ascending":
            return products.sort((a, b) => a.title.localeCompare(b.title))
        case "Descending":
            return products.sort((a, b) => b.title.localeCompare(a.title))
        default:
            return products
    }
}

function filterProducts(products,input){
    if (input===""){
        return products
    }
    else {
        return products.filter(product => {
             return product.title.toLowerCase().includes(input.toLowerCase()) || product.description.toLowerCase().includes(input.toLowerCase())
        })
    }
}

async function main() {
    let products = await fetchData()
    let sortSelector=document.querySelector("#sortSelector")
    let filterInput=document.querySelector("#filterInput")
    tableManager(products, "default",filterInput.value)

    sortSelector.addEventListener("change", ()=>{
        tableManager(products,sortSelector.value,filterInput.value)
    })

    filterInput.addEventListener("input",()=>{
        tableManager(products,sortSelector.value,filterInput.value)
    })
}

window.onload =main