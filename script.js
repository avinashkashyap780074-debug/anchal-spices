 const products = [
    { 
        id: 1, 
        name: "Anchal Shuddh Khada Garam Masala (Zipper Pouch)", 
        desc: "100% Pure Whole Spices: Dalchini, Hari & Badi Elaichi, Laung, Kali Mirch, Javitri & Jeera",
        category: "garam", 
        img: "images/1.jpg.jpg",
        packs: [
            { weight: "100g", price: 199 },
            { weight: "250g", price: 399 }
        ]
    },
    { 
        id: 2, 
        name: "Anchal BPM Shuddh Khada Garam Masala", 
        desc: "Authentic Indian Kitchen Blend for Rich Aroma & Traditional Taste",
        category: "garam", 
        img: "images/2.jpg.jpg",
        packs: [
            { weight: "100g", price: 199 },
            { weight: "250g", price: 399 }
        ]
    },
    { 
        id: 3, 
        name: "Anchal Farm-Fresh Whole Garam Masala Mix", 
        desc: "Handpicked Unpolished Whole Spices Packed in Airtight Pouch",
        category: "garam", 
        img: "images/3.jpg.jpg",
        packs: [
            { weight: "100g", price: 199 },
            { weight: "250g", price: 399 }
        ]
    },
    { 
        id: 4, 
        name: "Anchal Royal Black Edition Khada Garam Masala", 
        desc: "Bharat ka Asli Swad - Premium Export Quality Whole Spices Blend",
        category: "garam", 
        img: "images/4.jpg.jpeg",
        packs: [
            { weight: "100g", price: 199 },
            { weight: "250g", price: 399 }
        ]
    },
    { 
        id: 5, 
        name: "Anchal Premium Green Cardamom (Hari Elaichi)", 
        desc: "Bold Aromatic Whole Green Cardamom Pods, Direct From Farm",
        category: "whole", 
        img: "images/5.jpg.jpg",
        packs: [
            { weight: "100g", price: 199 },
            { weight: "50g", price: 99 }
        ]
    },
    { 
        id: 6, 
        name: "Anchal Sabut Kali Mirch (Whole Black Pepper)", 
        desc: "Bold, Strong & Sun-Dried Pure Black Peppercorns",
        category: "whole", 
        img: "images/6.jpg.jpg",
        packs: [
            { weight: "100g", price: 399 },
            { weight: "50g", price: 199 }
        ]
    },
    { 
        id: 7, 
        name: "Anchal Classic Khada Garam Masala Pack", 
        desc: "Pure Whole Cinnamon, Cardamom, Star Anise, Cloves & Poppy Seeds",
        category: "garam", 
        img: "images/7.jpg.jpg",
        packs: [
            { weight: "100g", price: 199 },
            { weight: "50g", price: 99 }
        ]
    },
    { 
        id: 8, 
        name: "Anchal Value Saver Combo (Pack of 2)", 
        desc: "Double Pack of Shuddh Khada Garam Masala for Family Kitchens",
        category: "combo", 
        img: "images/8.jpg.jpg",
        packs: [
            { weight: "250g x 2 Pack", price: 749 },
            { weight: "250g x 1 Pack", price: 399 }
        ]
    }
];

let cart = [];

function displayProducts(items) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = items.map(product => {
        const defaultPack = product.packs[0];
        const optionsHtml = product.packs.map((pack, idx) => 
            `<option value="${idx}">Pack: ${pack.weight} — ₹${pack.price}</option>`
        ).join('');

        return `
            <div class="product-card">
                <img src="${product.img}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="spice-desc">${product.desc}</p>
                    <div class="price" id="price-display-${product.id}">₹${defaultPack.price} <small style="font-size:13px; color:#666;">(${defaultPack.weight})</small></div>
                    <select class="weight-select" id="weight-${product.id}" onchange="updateCardPrice(${product.id})">
                        ${optionsHtml}
                    </select>
                    <button class="add-btn" onclick="addToCart(${product.id})">Add to Basket</button>
                </div>
            </div>
        `;
    }).join('');
}

function updateCardPrice(id) {
    const product = products.find(p => p.id === id);
    const packIndex = document.getElementById(`weight-${id}`).value;
    const selectedPack = product.packs[packIndex];
    document.getElementById(`price-display-${id}`).innerHTML = `₹${selectedPack.price} <small style="font-size:13px; color:#666;">(${selectedPack.weight})</small>`;
}

function filterProducts(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    if (event && event.target && event.target.classList.contains('filter-btn')) {
        event.target.classList.add('active');
    }
    
    if (category === 'all') {
        displayProducts(products);
    } else {
        displayProducts(products.filter(p => p.category === category));
    }
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const packIndex = document.getElementById(`weight-${id}`).value;
    const selectedPack = product.packs[packIndex];

    cart.push({ 
        name: product.name, 
        weight: selectedPack.weight, 
        price: selectedPack.price 
    });
    updateCartUI();
    document.getElementById('cartSidebar').classList.add('open');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-msg">Your basket is empty.</p>';
        cartTotal.innerText = '₹0';
        return;
    }

    let total = 0;
    cartItems.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <small>Pack: ${item.weight} | ₹${item.price}</small>
                </div>
                <i class="fas fa-trash" style="color:#801b1b; cursor:pointer;" onclick="removeFromCart(${index})"></i>
            </div>
        `;
    }).join('');

    cartTotal.innerText = `₹${total}`;
}

function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('open');
}

document.getElementById('searchInput').addEventListener('input', function(e) {
    const keyword = e.target.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(keyword) || p.desc.toLowerCase().includes(keyword));
    displayProducts(filtered);
});

function checkout() {
    if (cart.length === 0) return alert("Pehle basket mein koi masala add karein!");
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('modalTotal').innerText = `₹${total}`;
    document.getElementById('cartSidebar').classList.remove('open');
    document.getElementById('checkoutModal').classList.add('active');
}

function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('active');
}

async function placeOrder(event) {
    event.preventDefault();
    const name = document.getElementById('custName').value;
    const phone = document.getElementById('custPhone').value;
    const address = document.getElementById('custAddress').value;
    const payment = document.getElementById('paymentMethod').value;
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const orderId = "AS" + Math.floor(100000 + Math.random() * 900000);

    const orderData = {
        id: orderId,
        name: name,
        phone: phone,
        address: address,
        payment: payment,
        items: cart.map(i => `${i.name} (${i.weight})`).join(", "),
        total: total,
        status: "Order Confirmed & Freshly Packed by Anchal Spices"
    };

    // 1. Firebase Cloud Database mein order save karein (aur backup ke liye localStorage mein bhi)
    localStorage.setItem(orderId, JSON.stringify(orderData));
    if (window.firebaseServices) {
        await window.firebaseServices.saveOrderToDB(orderData);
    }

    // 2. UPI Payment app kholein
    if (payment === "UPI") {
        const upiUrl = `upi://pay?pa=avinashgound2025@nyes&pn=AnchalSpices&am=${total}&cu=INR`;
        window.open(upiUrl, '_blank');
    }

    // 3. WhatsApp notification bhejein
    const shopWhatsApp = "918874472025"; 
    const msg = `New Spice Order on Anchal Spices!%0AOrder ID: ${orderId}%0AName: ${name}%0APhone: ${phone}%0AItems: ${orderData.items}%0ATotal: ₹${total}%0APayment: ${payment}%0AAddress: ${address}`;
    
    alert(`Dhanyawad ${name}! 🎉\nAapka Order (${orderId}) confirm ho gaya hai.`);
    window.open(`https://wa.me/${shopWhatsApp}?text=${msg}`, '_blank');

    cart = [];
    updateCartUI();
    document.getElementById('orderForm').reset();
    closeCheckout();
}

function openTrackModal() {
    document.getElementById('trackModal').classList.add('active');
}

function closeTrackModal() {
    document.getElementById('trackModal').classList.remove('active');
    document.getElementById('trackResult').innerHTML = "";
}

async function checkOrderStatus() {
    const id = document.getElementById('trackOrderId').value.trim().toUpperCase();
    const resultDiv = document.getElementById('trackResult');
    if (!id) return;

    resultDiv.innerHTML = `<p style="color:#666;">Order status check ho raha hai...</p>`;

    let order = null;

    // Pehle Firebase Database se live status check karein
    if (window.firebaseServices) {
        order = await window.firebaseServices.trackOrderById(id);
    }

    // Agar purana offline order ho toh localStorage check karein
    if (!order) {
        const saved = localStorage.getItem(id);
        if (saved) order = JSON.parse(saved);
    }

    if (order) {
        resultDiv.innerHTML = `
            <div style="background:#fdf8ee; padding:12px; border-radius:6px; border-left:4px solid #801b1b;">
                <strong>Order ID:</strong> ${order.id}<br>
                <strong>Customer:</strong> ${order.name}<br>
                <strong>Items:</strong> ${order.items}<br>
                <strong>Total:</strong> ₹${order.total || ''}<br>
                <strong>Status:</strong> <span style="color:#2a9d8f; font-weight:bold;">${order.status}</span>
            </div>
        `;
    } else {
        resultDiv.innerHTML = `<p style="color:#801b1b;">Order ID nahi mila. Kripya sahi ID dalein (jaise AS123456).</p>`;
    }
}

displayProducts(products);
// ================= FLIPKART-STYLE PROFILE & ACCOUNT FEATURES =================

function toggleProfileMenu() {
    document.getElementById('profileSidebar').classList.toggle('open');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Google Login & Logout
async function handleGoogleLogin() {
    if (!window.firebaseServices) return alert("Firebase load ho raha hai, 2 second baad try karein.");
    const user = await window.firebaseServices.loginWithGoogle();
    if (user) {
        alert(`Swagat hai ${user.displayName}! 🎉`);
    }
}

async function handleLogout() {
    if (window.firebaseServices) {
        await window.firebaseServices.logoutUser();
        alert("Aap safaltapurvak Logout ho gaye hain.");
        toggleProfileMenu();
    }
}

// Login hone par Header aur Profile Drawer update karna
window.updateAuthUI = function(user) {
    const headerName = document.getElementById('headerUserName');
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const profileAvatar = document.getElementById('profileAvatar');
    const loginBtn = document.getElementById('drawerLoginBtn');
    const logoutItem = document.getElementById('drawerLogoutItem');

    if (user) {
        const firstName = user.displayName ? user.displayName.split(' ')[0] : 'User';
        headerName.innerText = firstName;
        profileName.innerText = user.displayName || 'Valued Customer';
        profileEmail.innerText = user.email;
        if (user.photoURL) {
            profileAvatar.innerHTML = `<img src="${user.photoURL}" alt="User">`;
        }
        loginBtn.style.display = 'none';
        logoutItem.style.display = 'flex';
    } else {
        headerName.innerText = 'Account';
        profileName.innerText = 'Welcome, Guest!';
        profileEmail.innerText = 'Login to sync your orders';
        profileAvatar.innerHTML = `<i class="fas fa-user"></i>`;
        loginBtn.style.display = 'flex';
        logoutItem.style.display = 'none';
    }
};

// My Orders dikhana (Firebase Database se)
async function openMyOrdersModal() {
    toggleProfileMenu();
    const modal = document.getElementById('myOrdersModal');
    const listDiv = document.getElementById('myOrdersList');
    modal.classList.add('active');

    if (!window.currentUser) {
        listDiv.innerHTML = `
            <div style="text-align:center; padding:20px;">
                <p style="margin-bottom:12px;">Apne saare purane orders dekhne ke liye pehle Google se Login karein.</p>
                <button class="place-order-btn" onclick="closeModal('myOrdersModal'); handleGoogleLogin();">
                    <i class="fab fa-google"></i> Login with Google
                </button>
            </div>
        `;
        return;
    }

    listDiv.innerHTML = `<p style="text-align:center; color:#666;">Aapke orders load ho rahe hain...</p>`;
    const orders = await window.firebaseServices.getMyOrders();

    if (orders.length === 0) {
        listDiv.innerHTML = `<p style="text-align:center; color:#666; padding:20px;">Aapne abhi tak is account se koi order nahi kiya hai.</p>`;
        return;
    }

    listDiv.innerHTML = orders.map(o => `
        <div class="order-history-card">
            <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                <strong>Order ID: ${o.id}</strong>
                <strong style="color:#801b1b;">₹${o.total}</strong>
            </div>
            <div style="color:#444; margin-bottom:5px;">${o.items}</div>
            <div style="font-size:12px; color:#2a9d8f; font-weight:bold;">Status: ${o.status}</div>
        </div>
    `).join('');
}

// Saved Address & Auto-fill Checkout
function openAddressModal() {
    toggleProfileMenu();
    const saved = JSON.parse(localStorage.getItem('anchal_user_address') || '{}');
    document.getElementById('savedName').value = saved.name || (window.currentUser ? window.currentUser.displayName : '');
    document.getElementById('savedPhone').value = saved.phone || '';
    document.getElementById('savedAddr').value = saved.address || '';
    document.getElementById('addressModal').classList.add('active');
}

function saveUserAddress(event) {
    event.preventDefault();
    const details = {
        name: document.getElementById('savedName').value,
        phone: document.getElementById('savedPhone').value,
        address: document.getElementById('savedAddr').value
    };
    localStorage.setItem('anchal_user_address', JSON.stringify(details));
    alert("Aapka Delivery Address save ho gaya hai! Agle order par ye apne aap bhar jayega.");
    closeModal('addressModal');
}

// Checkout khulte hi saved details auto-fill karna
const originalCheckout = checkout;
checkout = function() {
    originalCheckout();
    const saved = JSON.parse(localStorage.getItem('anchal_user_address') || '{}');
    if (saved.name) document.getElementById('custName').value = saved.name;
    else if (window.currentUser && window.currentUser.displayName) document.getElementById('custName').value = window.currentUser.displayName;
    if (saved.phone) document.getElementById('custPhone').value = saved.phone;
    if (saved.address) document.getElementById('custAddress').value = saved.address;
};

// About Us & Payments Info
function openInfoModal(type) {
    toggleProfileMenu();
    const title = document.getElementById('infoModalTitle');
    const body = document.getElementById('infoModalBody');

    if (type === 'about') {
        title.innerText = "About Anchal Spices";
        body.innerHTML = `
            <p><strong>Anchal Spices and Food Products</strong> Bharat ke har rasoi tak 100% shuddh, bina milawat ke khade masale (Whole Spices) aur authentic Garam Masala pahunchane ke liye samarpit hai.</p>
            <p style="margin-top:8px;"><strong>✓ Direct Farm Sourced:</strong> Sabut Dalchini, Hari & Badi Elaichi, Laung, Kali Mirch aur Javitri.</p>
            <p><strong>✓ Hygienic Zipper Packaging:</strong> Taaki masalon ki khushboo aur taazgi lambe samay tak bani rahe.</p>
            <p style="margin-top:8px; color:#801b1b;"><strong>FSSAI Lic. No.:</strong> 227222000084</p>
        `;
    } else if (type === 'payments') {
        title.innerText = "Payments & Refund Policy";
        body.innerHTML = `
            <p>Hum aapki suvidha ke liye surakshit payment options dete hain:</p>
            <ul style="margin:10px 0 10px 20px;">
                <li><strong>Cash on Delivery (COD):</strong> Order ghar pahunchne par nagad bhugtan karein.</li>
                <li><strong>Direct UPI Payment:</strong> GPay, PhonePe, Paytm (UPI ID: <code>avinashgound2025@nyes</code>).</li>
            </ul>
            <p style="font-size:12px; color:#666;">Note: Kisi bhi payment ya order samasya ke liye WhatsApp Support par turant sampark karein.</p>
        `;
    }
    document.getElementById('infoModal').classList.add('active');
}

// Customer Support & Share Website
function openWhatsAppSupport() {
    toggleProfileMenu();
    window.open("https://wa.me/918874472025?text=Namaste%20Anchal%20Spices!%20Mujhe%20ek%20jaankari%20chahiye.", "_blank");
}

function shareWebsite() {
    toggleProfileMenu();
    const shareUrl = "https://anchalspices.vercel.app";
    const shareText = `Anchal Spices se 100% Shuddh Khade Masale aur Garam Masala order karein! Yahan dekhein: ${shareUrl}`;
    if (navigator.share) {
        navigator.share({ title: "Anchal Spices", text: shareText, url: shareUrl });
    } else {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
    }
}// ================= LIVE PRODUCTS & STOCK SYNC FROM FIREBASE =================
const originalDisplayProducts = displayProducts;
displayProducts = function(items) {
    originalDisplayProducts(items);
    items.forEach(p => {
        if (p.inStock === false) {
            const btn = document.querySelector(`button[onclick="addToCart(${p.id})"]`);
            if (btn) {
                btn.innerText = "Out of Stock";
                btn.disabled = true;
                btn.style.background = "#999";
                btn.style.cursor = "not-allowed";
            }
        }
    });
};

async function syncProductsFromDatabase() {
    try {
        const res = await fetch(`https://firestore.googleapis.com/v1/projects/anchal-spices-pro/databases/(default)/documents/products`);
        const data = await res.json();
        if (data.documents && data.documents.length > 0) {
            const liveProducts = data.documents.map(doc => {
                const f = doc.fields;
                return {
                    id: Number(f.id.integerValue || f.id.stringValue),
                    name: f.name.stringValue,
                    desc: f.desc.stringValue,
                    category: f.category.stringValue,
                    img: f.img.stringValue,
                    inStock: f.inStock ? f.inStock.booleanValue : true,
                    packs: f.packs.arrayValue.values.map(v => ({
                        weight: v.mapValue.fields.weight.stringValue,
                        price: Number(v.mapValue.fields.price.integerValue || v.mapValue.fields.price.doubleValue)
                    }))
                };
            }).sort((a, b) => a.id - b.id);

            products.length = 0;
            products.push(...liveProducts);
            displayProducts(products);
        }
    } catch (e) {
        console.log("Using default local products");
    }
}
syncProductsFromDatabase();
