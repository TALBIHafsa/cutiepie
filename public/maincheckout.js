// Get the container element to append the cart items
const listContainer = document.querySelector('.list');
listContainer.innerHTML = ''; // Corrected variable name
let totalQuantity = 0; // Changed variable name to avoid confusion
let totalPrice = 0; // Changed variable name to avoid confusion

// Fetch product information from JSON file
fetch('products.json')
    .then(response => response.json())
    .then(products => {
        // Retrieve cart data from localStorage
        const cartData = localStorage.getItem('cart');

        // Parse cart data if it exists
        if (cartData) {
            const parsedCartData = JSON.parse(cartData);
            console.log(parsedCartData);

            // Loop through each item in the cart data and find matching product details
            parsedCartData.forEach((cartItem) => {
                const matchingProduct = products.find(product => String(product.id) === cartItem.product_id);
                console.log(matchingProduct);

                if (matchingProduct) {
                    // Create HTML using the details from the matching product
                    const cartItemHTML = `
                        <div class="item">
                            <img src="${matchingProduct.image}" alt="" />
                            <div class="info">
                                <div class="name">${matchingProduct.name}</div>
                                <div class="price">${parseFloat(matchingProduct.price) * cartItem.quantity} DH</div>
                            </div>
                            <div class="quantity">${cartItem.quantity}</div>
                        </div>
                    `;
                    totalQuantity += cartItem.quantity; // Accumulate quantity
                    totalPrice += parseFloat(matchingProduct.price) * cartItem.quantity; // Accumulate total price

                    // Append the HTML to the list container
                    listContainer.insertAdjacentHTML('beforeend', cartItemHTML);
                }
            });

            // Update total quantity and total price in the HTML after the loop
            let totalQuantityHTML = document.querySelector('.totalQuantity');
            let totalPriceHTML = document.querySelector('.totalPrice');
            totalQuantityHTML.innerText = totalQuantity;
            totalPriceHTML.innerText = totalPrice + ' DH'; // Added ' DH' to show the unit
        }
    })
.catch(error => {
    console.error('Error fetching product data:', error);
});


// Select the button using its class name
// const buttonCheckout = document.querySelector('.buttonCheckout');

// Add an event listener for the click event
// buttonCheckout.addEventListener('click', () => {
//     window.alert('Thank you for your purchase! Your order has been successfully processed.');
//     window.location.href = 'index.html'; // Replace 'index.html' with the correct path to your home page
// });

document.getElementById('checkoutbtn').addEventListener('click', function() {
  window.alert('Thank you for your purchase! Your order has been successfully processed.');

});




// Select the button using its class name
const buttonCheckout = document.querySelector('.buttonCheckout');

// Add an event listener to the checkout button
buttonCheckout.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default behavior of the button
    
    // Select the form element
    const orderForm = document.getElementById('orderForm');
    
    // Submit the form programmatically
    if (orderForm) {
        orderForm.submit(); // Trigger the form submission
    }
});