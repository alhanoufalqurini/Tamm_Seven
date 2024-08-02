// فتح وإغلاق قائمة التنقل
function openNav() {
    document.getElementById("nav").style.display = "block";
}

function closeNav() {
    document.getElementById("nav").style.display = "none";
}

// فتح وإغلاق نموذج تسجيل الدخول
function openLoginForm() {
    var loginForm = document.getElementById('loginForm');
    loginForm.style.display = 'block';
}

function closeLoginForm() {
    var loginForm = document.getElementById('loginForm');
    loginForm.style.display = 'none';
}

window.onclick = function(event) {
    var loginForm = document.getElementById('loginForm');
    if (event.target == loginForm) {
        loginForm.style.display = 'none';
    }
}

// إعداد التمرير للمعرض
document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.querySelector('.gallery');
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');

    const containerWidth = document.querySelector('.container').offsetWidth;
    const numberOfBoxesToScroll = 3;
    const gap = parseInt(getComputedStyle(document.querySelector('.gallery')).gap, 10);
    const scrollAmount = (containerWidth + gap) * numberOfBoxesToScroll;

    nextButton.addEventListener('click', () => {
        const maxScrollLeft = gallery.scrollWidth - gallery.clientWidth;
        gallery.scrollBy({ left: Math.min(scrollAmount, maxScrollLeft - gallery.scrollLeft), behavior: 'smooth' });
    });

    prevButton.addEventListener('click', () => {
        gallery.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
});

// التعامل مع السلة
document.addEventListener('DOMContentLoaded', function() {
    const cartCount = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const totalCostElement = document.getElementById('total-cost');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let count = cart.length;

    function updateCartCount() {
        cartCount.textContent = count;
        cartCount.style.display = count > 0 ? 'inline-block' : 'none';
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = "";
        let totalCost = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.product}">
                <div class="details">
                    <h3>${item.product}</h3>
                    <p class="cart-item-price">رس ${item.price}</p>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn decrease">-</button>
                    <span class="quantity">${item.quantity || 1}</span>
                    <button class="quantity-btn increase">+</button>
                </div>
                <button class="remove-btn"><i class="fa-solid fa-trash-can"></i></button>
            `;
            cartItemsContainer.appendChild(itemElement);

            const decreaseButton = itemElement.querySelector(".decrease");
            const increaseButton = itemElement.querySelector(".increase");
            const quantityElement = itemElement.querySelector(".quantity");
            const removeButton = itemElement.querySelector(".remove-btn");

            let quantity = item.quantity || 1;

            decreaseButton.addEventListener("click", () => {
                if (quantity > 1) {
                    quantity--;
                    quantityElement.textContent = quantity;
                    item.quantity = quantity;
                    updateCart();
                }
            });

            increaseButton.addEventListener("click", () => {
                quantity++;
                quantityElement.textContent = quantity;
                item.quantity = quantity;
                updateCart();
            });

            removeButton.addEventListener("click", () => {
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                count--;
                updateCartCount();
                renderCartItems();
            });

            totalCost += item.price * quantity;
        });

        totalCostElement.textContent = `التكلفة الكلية: رس ${totalCost.toFixed(2)}`;
    }

    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            const price = parseFloat(this.getAttribute('data-price'));
            const image = this.getAttribute('data-image');

            const existingItem = cart.find(item => item.product === product);
            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 1) + 1;
            } else {
                cart.push({ product, price, image, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            count++;
            updateCartCount();
            renderCartItems();
        });
    });

    updateCartCount(); // تحديث عدد المنتجات عند تحميل الصفحة
    renderCartItems();

    // مسح عداد السلة عند إغلاق الصفحة
    window.addEventListener('beforeunload', function() {
        localStorage.removeItem('cart');
    });
});
