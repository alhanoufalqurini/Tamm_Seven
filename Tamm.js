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

    function addToCart(product, price, image) {
        cart.push({ product, price, image });
        localStorage.setItem('cart', JSON.stringify(cart));
        count++;
        updateCartCount();
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            const price = this.getAttribute('data-price');
            const image = this.getAttribute('data-image');
            addToCart(product, price, image);
        });
    });

    updateCartCount(); // تحديث عدد المنتجات عند تحميل الصفحة

    // مسح عداد السلة عند إغلاق الصفحة
    window.addEventListener('beforeunload', function() {
        localStorage.removeItem('cart');
    });

    // عرض المنتجات في صفحة السلة
    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) {
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <img src="./${item.image}" alt="${item.product}">
                <div class="cart-item-details">
                    <h3>${item.product}</h3>
                    <p class="cart-item-price">${item.price} ريال</p>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="decreaseQuantity('${item.product}')">-</button>
                    <span class="quantity">1</span>
                    <button class="quantity-btn" onclick="increaseQuantity('${item.product}')">+</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });
    }

    // التعامل مع تحديث الكميات
    window.decreaseQuantity = function(product) {
        // خفض الكمية للمنتج المحدد
        const cartItem = cart.find(item => item.product === product);
        if (cartItem && cartItem.quantity > 1) {
            cartItem.quantity--;
            localStorage.setItem('cart', JSON.stringify(cart));
            location.reload();
        }
    };

    window.increaseQuantity = function(product) {
        // زيادة الكمية للمنتج المحدد
        const cartItem = cart.find(item => item.product === product);
        if (cartItem) {
            cartItem.quantity++;
            localStorage.setItem('cart', JSON.stringify(cart));
            location.reload();
        }
    };
});
