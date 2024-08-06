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
     // التعامل مع السلة
document.addEventListener('DOMContentLoaded', function() {
    const cartCount = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const totalCostElement = document.getElementById('total-cost');
    const discountInfo = document.getElementById('discount-info');
    const couponCodeInput = document.getElementById('coupon-code');
    const applyCouponBtn = document.querySelector('.apply-coupon-btn');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let count = cart.reduce((acc, item) => acc + item.quantity, 0);

    function updateCartCount() {
        const cartCountElements = document.querySelectorAll('#cart-count');
        cartCountElements.forEach(cartCountElement => {
            cartCountElement.textContent = count;
            cartCountElement.style.display = count > 0 ? 'inline-block' : 'none';
        });
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
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn increase">+</button>
                </div>
                <button class="remove-btn"><i class="fa-solid fa-trash-can"></i></button>
            `;
            cartItemsContainer.appendChild(itemElement);

            const decreaseButton = itemElement.querySelector(".decrease");
            const increaseButton = itemElement.querySelector(".increase");
            const quantityElement = itemElement.querySelector(".quantity");
            const removeButton = itemElement.querySelector(".remove-btn");

            decreaseButton.addEventListener("click", () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    count--;
                    updateCart();
                }
            });

            increaseButton.addEventListener("click", () => {
                item.quantity++;
                count++;
                updateCart();
            });

            removeButton.addEventListener("click", () => {
                count -= item.quantity;
                cart.splice(index, 1);
                updateCartCount();
                updateCart();
            });

            totalCost += item.price * item.quantity;
        });

        totalCostElement.textContent = `التكلفة الكلية: رس ${totalCost.toFixed(2)}`;
    }

    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
        updateCartCount();
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            const price = parseFloat(this.getAttribute('data-price'));
            const image = this.getAttribute('data-image');

            const existingItem = cart.find(item => item.product === product);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ product, price, image, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            count++;
            updateCart();
        });
    });

    updateCart(); // تحديث عدد المنتجات وعرض السلة عند تحميل الصفحة

    window.addEventListener('beforeunload', function() {
        localStorage.removeItem('cart');
    });

    // تطبيق كود الخصم
    applyCouponBtn.addEventListener('click', function() {
        const couponCode = couponCodeInput.value;
        if (couponCode === 'تم15') { 
            const discountPercent = 15;
            const discountAmount = applyDiscount(discountPercent);
            discountInfo.innerHTML = `لقد حصلت على خصم 15% قدره <span class="discount-amount" style="color: red;">${discountAmount.toFixed(2)}</span> ريال`;
        } else {
            alert('كود الخصم غير صالح');
            discountInfo.textContent = '';
        }
    });

    function applyDiscount(discountPercent) {
        let total = calculateTotal();
        const discountAmount = total * (discountPercent / 100);
        total -= discountAmount;
        checkoutBtn.textContent = `الدفع: ${total.toFixed(2)} ريال`;
        return discountAmount;
    }

    function calculateTotal() {
        return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }
});
/***************/
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 24.7136, lng: 46.6753 }, // مركز الخريطة على الرياض
        zoom: 10
    });

    let marker;

    map.addListener('click', function(event) {
        const clickedLocation = event.latLng;
        if (marker) {
            marker.setPosition(clickedLocation);
        } else {
            marker = new google.maps.Marker({
                position: clickedLocation,
                map: map
            });
        }

        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'location': clickedLocation }, function(results, status) {
            if (status === 'OK' && results[0]) {
                document.getElementById('selected-location').textContent = 'مكان الاستلام: ' + results[0].formatted_address;
            } else {
                document.getElementById('selected-location').textContent = 'مكان الاستلام: لا يمكن تحديد العنوان بدقة.';
            }
        });
    });
}
/*******/

    document.getElementById('navigateServiceBtn').addEventListener('click', function() {
        window.location.href = 'service.html';
    });
/**/
document.getElementById('navigateServiceBtnn').addEventListener('click', function() {
    window.location.href = 'service222.html';
});
/**/
document.getElementById('navigateServiceBtnnn').addEventListener('click', function() {
    window.location.href = 'service2.html';
});
/**/
document.getElementById('navigateServiceBtnnnn').addEventListener('click', function() {
    window.location.href = 'service22.html';
});
/**/
document.getElementById('navigateServiceBtnnnnn').addEventListener('click', function() {
    window.location.href = 'service21.html';
});
/**/
document.getElementById('navigateServiceBtnnnnnn').addEventListener('click', function() {
    window.location.href = 'service12.html';
});
/**/
document.getElementById('navigateServiceBtnnnnnnn').addEventListener('click', function() {
    window.location.href = 'service112.html';
});
/**/
document.getElementById('navigateServiceBtnnnnnnnn').addEventListener('click', function() {
    window.location.href = 'service121.html';
});
/**/
document.getElementById('navigateServiceBtnnnnnnnnn').addEventListener('click', function() {
    window.location.href = 'service122.html';
});
/**/
document.getElementById('navigateServiceBtnnnnnnnnnn').addEventListener('click', function() {
    window.location.href = 'service01.html';
});
/**/
document.getElementById('navigateServiceBtnnnnnnnnnnn').addEventListener('click', function() {
    window.location.href = 'service012.html';
});
/**/
document.getElementById('navigateServiceBtnnnnnnnnnnnn').addEventListener('click', function() {
    window.location.href = 'service00.html';
});
