document.addEventListener('DOMContentLoaded', () => {
    // --- STATE MANAGEMENT ---
    const state = {
        products: [],
        cart: [], // { id, name, price, imageUrl, quantity }
    };

    // --- DOM ELEMENTS ---
    const appRoot = document.getElementById('app-root');
    const cartButton = document.getElementById('cart-button');
    const cartModal = document.getElementById('cart-modal');
    const closeCartButton = document.getElementById('close-cart-button');
    const cartCountEl = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartModalFooter = document.getElementById('cart-modal-footer');

    // --- TEMPLATES / RENDER FUNCTIONS ---
    const renderHomePage = () => {
        const productsHtml = state.products.map(product => `
            <div class="product-card">
                <a href="#product/${product.id}">
                    <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <div>
                            <h3>${product.name}</h3>
                        </div>
                        <p class="price">$${product.price.toFixed(2)}</p>
                    </div>
                </a>
            </div>
        `).join('');

        appRoot.innerHTML = `
            <h1>Our Bouquets</h1>
            <div class="product-grid">${productsHtml}</div>
        `;
    };

    const renderProductDetailPage = (productId) => {
        const product = state.products.find(p => p.id === productId);
        if (!product) {
            appRoot.innerHTML = `<h2>Product not found</h2>`;
            return;
        }

        appRoot.innerHTML = `
            <div>
                <a href="#">&larr; Back to Products</a>
                <div class="product-detail-container" style="margin-top: 20px;">
                    <div class="product-detail-image">
                        <img src="${product.imageUrl}" alt="${product.name}">
                    </div>
                    <div class="product-detail-info">
                        <h1>${product.name}</h1>
                        <p class="price">$${product.price.toFixed(2)}</p>
                        <p>${product.description}</p>
                        <button class="btn add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
    };
    
    const renderCheckoutPage = () => {
        appRoot.innerHTML = `
            <div class="checkout-form">
                <h2>Checkout</h2>
                <form id="checkout-form">
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" required>
                    </div>
                    <div class="form-group">
                        <label for="address">Address</label>
                        <input type="text" id="address" required>
                    </div>
                     <div class="form-group">
                        <label for="card">Credit Card</label>
                        <input type="text" id="card" placeholder="0000 0000 0000 0000" required>
                    </div>
                    <button type="submit" class="btn">Place Order</button>
                </form>
            </div>
        `;
    };
    
    const renderConfirmationPage = () => {
         appRoot.innerHTML = `
            <div class="confirmation-page">
                <h1>Thank You!</h1>
                <p>Your order has been placed successfully.</p>
                <a href="#" class="btn">Continue Shopping</a>
            </div>
        `;
    }

    const renderCart = () => {
        const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountEl.textContent = totalItems;

        if (state.cart.length === 0) {
            cartItemsContainer.innerHTML = `<p>Your cart is empty.</p>`;
            cartModalFooter.innerHTML = '';
            return;
        }

        const cartItemsHtml = state.cart.map(item => `
            <div class="cart-item">
                <img src="${item.imageUrl}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="update-quantity-btn" data-id="${item.id}" data-change="-1">-</button>
                    <span>${item.quantity}</span>
                    <button class="update-quantity-btn" data-id="${item.id}" data-change="1">+</button>
                </div>
            </div>
        `).join('');

        const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        cartItemsContainer.innerHTML = cartItemsHtml;
        cartModalFooter.innerHTML = `
            <div class="cart-total">
                <span>Subtotal:</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <a href="#checkout" id="checkout-btn" class="btn">Go to Checkout</a>
        `;
    };

    // --- ROUTING ---
    const router = () => {
        const path = location.hash || '#';
        if (path.startsWith('#product/')) {
            const productId = path.split('/')[1];
            renderProductDetailPage(productId);
        } else if (path === '#checkout') {
            renderCheckoutPage();
        } else if (path === '#confirmation') {
             renderConfirmationPage();
        } else {
            renderHomePage();
        }
    };

    // --- CART LOGIC ---
    const addToCart = (productId) => {
        const product = state.products.find(p => p.id === productId);
        const cartItem = state.cart.find(item => item.id === productId);

        if (cartItem) {
            cartItem.quantity++;
        } else {
            state.cart.push({ ...product, quantity: 1 });
        }
        renderCart();
        showCart();
    };

    const updateQuantity = (productId, change) => {
        const cartItem = state.cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity += change;
            if (cartItem.quantity <= 0) {
                state.cart = state.cart.filter(item => item.id !== productId);
            }
        }
        renderCart();
    };
    
    const placeOrder = () => {
        state.cart = [];
        renderCart();
        location.hash = '#confirmation';
    }

    // --- MODAL VISIBILITY ---
    const showCart = () => cartModal.classList.add('open');
    const hideCart = () => cartModal.classList.remove('open');

    // --- EVENT LISTENERS ---
    window.addEventListener('hashchange', router);
    window.addEventListener('load', router);

    cartButton.addEventListener('click', showCart);
    closeCartButton.addEventListener('click', hideCart);
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            hideCart();
        }
    });

    appRoot.addEventListener('click', (e) => {
        if (e.target.matches('.add-to-cart-btn')) {
            addToCart(e.target.dataset.id);
        }
    });
    
    appRoot.addEventListener('submit', (e) => {
        if (e.target.matches('#checkout-form')) {
            e.preventDefault();
            placeOrder();
        }
    });

    document.body.addEventListener('click', (e) => {
         if (e.target.matches('.update-quantity-btn')) {
            const id = e.target.dataset.id;
            const change = parseInt(e.target.dataset.change, 10);
            updateQuantity(id, change);
        }
        if (e.target.matches('#checkout-btn')) {
            hideCart();
        }
    })

    // --- INITIALIZATION ---
    const init = async () => {
        try {
            const response = await fetch('assets/dummy-data.json');
            if(!response.ok) throw new Error('Data not found');
            state.products = await response.json();
            router();
            renderCart();
        } catch (error) {
            appRoot.innerHTML = `<h2>Error loading products. Please try again later.</h2>`;
            console.error(error);
        }
    };

    init();
});