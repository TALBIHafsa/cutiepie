

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-icon').onclick = () => {
    navbar.classList.toggle('active');
}


let header = document.querySelector('header');

window.addEventListener('scroll',()=>{
    header.classList.toggle('active',window.scrollY>0);
});

// ---------------------------------------------------------------------------
// let iconCart = document.querySelector('#cart-icon');
let listProductHTML = document.querySelector('.products-container');
let listCartHTML= document.querySelector('.listCart');
let iconCartSpan = document.getElementById('cart-icon').querySelector('span');

let listProducts = [];






// Function to adjust the width of the products section when the cart is opened or closed
function adjustProductSectionWidth(open) {
    const productsSection = document.querySelector('.products');
  
    if (open) {
      productsSection.style.width = '70%';
    } else {
      productsSection.style.width = '100%';
    }
  }
  
  // Function to handle opening/closing of cartTab
  document.addEventListener('DOMContentLoaded', function() {
      let body = document.querySelector('body');
      let cartIcon = document.querySelector('#cart-icon');
      let cartTab = document.querySelector('.cartTab');
      
      // Click event on body for handling .close clicks
      body.addEventListener('click', function(event) {
          if (event.target.classList.contains('close')) {
              body.classList.toggle('showCart');
              adjustProductSectionWidth(false); // Adjust the width when closing the cart
          }
      });
  
      cartIcon.addEventListener('click', () => {
          body.classList.toggle('showCart');
          adjustProductSectionWidth(body.classList.contains('showCart')); // Adjust the width when opening the cart
      });
  });
  
  // Existing code...
  











const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if (listProducts.length > 0) {
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('box');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
                <img src="${product.image}" alt="" />
                <h3>${product.name}</h3>
                <div class="content">
                    <span>${product.price}</span>
                    <a href="#p"class="addCart">Add to cart</a>
                </div>
            `;
            listProductHTML.appendChild(newProduct); // Append the new product to the container

            // console.log(newProduct); // Check if product elements are created
        });
    }
};
listProductHTML.addEventListener('click',(event)=>{
    let positionClick = event.target;
    if(positionClick.classList.contains('addCart')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        addToCart(product_id);
    }

})

let carts = [];
const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if(carts.length <= 0){
        carts = [{
            product_id: product_id,
            quantity:1
        }]
    }else if(positionThisProductInCart < 0){
        carts.push({
            product_id: product_id,
            quantity : 1
        });
    }else {
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
    }
    // let timeSave = "expires=Thu, 31 Dec 2025 23:59:59 UTC";
    // document.cookie = "carts=" + JSON.stringify(carts)+"; "+timeSave+"; path=/CUTIPIE/;";
    addCartToHTML();
    addCartToMemory();
}
const addCartToMemory = () => {
    localStorage.setItem('cart',JSON.stringify(carts));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            // Create a new div element for each cart item
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            let info = listProducts[positionProduct];
            newCart.innerHTML = `
                <div class="image">
                    <img src="${info.image}" alt="" />
                </div>
                <div class="name">${info.name}</div>
                <div class="totalPrice">${parseFloat(info.price) * cart.quantity} DH</div>
                <div class="quantity"  data-id="${info.id}">
                    <span class="minus"><</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
            listCartHTML.appendChild(newCart); // Append the newly created cart item to the list
        });
    }
    iconCartSpan.innerText = totalQuantity;
};
listCartHTML.addEventListener('click',(event)=>{
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.dataset.id;
        let type = 'minus';
        if (positionClick.classList.contains('plus')){
            type ='plus';
        }
        changeQuantity(product_id,type);
    }
})
const changeQuantity = (product_id, type) => {
    let positionItemInCart = carts.findIndex((value)=> value.product_id == product_id);
    if(positionItemInCart >= 0){
        switch(type){
            case 'plus':
                carts[positionItemInCart].quantity =carts[positionItemInCart].quantity +1;
                break;

            default: 
                let valueChange = carts[positionItemInCart].quantity -1;
                if(valueChange > 0){
                    carts[positionItemInCart].quantity = valueChange
                } else {
                    carts.splice(positionItemInCart, 1);
                }
                break;

        }
    }
    addCartToMemory();
    addCartToHTML();
}

const initApp = () => {
    // get data from json
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            listProducts = data;
            addDataToHTML();
            // get cart from memory
            if(localStorage.getItem('cart')){
                carts = JSON.parse(localStorage.getItem('cart'));
                addCartToHTML();
            }
        });

        
};

initApp();
// -----------------------------------------------------------------------------
// const checkoutButton = document.getElementById('checkOut');

// checkoutButton.addEventListener('click', () => {
//     return res.render("checkout");
// });

document.getElementById('checkOut').addEventListener('click', function() {
    // Redirect to the checkout page
    window.location.href = '/checkout';
});



function checkScroll() {
    const aboutSection = document.querySelector('#about');
    const aboutImg = document.querySelector('.about-img');
    const aboutText = document.querySelector('.about-text');
    const position = aboutSection.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;
  
    if (position < screenHeight / 2) {
      aboutImg.classList.add('active');
      aboutText.classList.add('active');
      window.removeEventListener('scroll', checkScroll);
    }
  }
  
  window.addEventListener('scroll', checkScroll);
  
  function checkScroll1() {
    const boxes = document.querySelectorAll('.products-container .box');
    const screenHeight = window.innerHeight;
  
    boxes.forEach((box, index) => {
      const position = box.getBoundingClientRect().top;
      if (position < screenHeight / 1.3) {
        box.classList.add('show');
      }
    });
  }
  
  window.addEventListener('scroll', checkScroll1);
  