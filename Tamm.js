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
    const totalPriceElement = document.querySelector('.total-price');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let count = cart.length;

    function updateCartCount() {
        cartCount.textContent = count;
        if (count > 0) {
            cartCount.style.display = 'inline-block';
        } else {
            cartCount.style.display = 'none';
        }
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = "";
        let totalPrice = 0;
        cart.forEach(item => {
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
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn increase">+</button>
                </div>
                <button class="remove-btn"><i class="fa-solid fa-trash-can"></i></button>
            `;
            cartItemsContainer.appendChild(itemElement);

            // تحديث السعر الإجمالي
            totalPrice += item.price * item.quantity;

            // إضافة التعامل مع الأزرار داخل السلة
            const decreaseButton = itemElement.querySelector(".decrease");
            const increaseButton = itemElement.querySelector(".increase");
            const quantityElement = itemElement.querySelector(".quantity");
            const removeButton = itemElement.querySelector(".remove-btn");

            decreaseButton.addEventListener("click", () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    quantityElement.textContent = item.quantity;
                    localStorage.setItem("cart", JSON.stringify(cart));
                    renderCartItems();
                }
            });

            increaseButton.addEventListener("click", () => {
                item.quantity++;
                quantityElement.textContent = item.quantity;
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCartItems();
            });

            removeButton.addEventListener("click", () => {
                cart = cart.filter(cartItem => cartItem !== item);
                localStorage.setItem("cart", JSON.stringify(cart));
                count--;
                updateCartCount();
                renderCartItems();
            });
        });
        totalPriceElement.textContent = `التكلفة الكلية: رس ${totalPrice}`;
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            const price = parseFloat(this.getAttribute('data-price'));
            const image = this.getAttribute('data-image');

            const existingItem = cart.find(item => item.product === product);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ product, price, image, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            count = cart.length;
            updateCartCount();
            renderCartItems();
        });
    });

    updateCartCount(); // تحديث عدد المنتجات عند تحميل الصفحة
    renderCartItems();
});
