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
let pendingCheckoutAfterLogin = false;

// Inject Dynamic UI Overlays (Login Gate, Payment Window & Order Confirmation Animation)
(function injectFlipkartUI() {
    const style = document.createElement('style');
    style.innerHTML = `
        .fk-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.72); backdrop-filter: blur(4px); display: none; align-items: center; justify-content: center; z-index: 5000; padding: 16px; }
        .fk-overlay.active { display: flex; }
        .fk-card { background: #fff; width: 100%; max-width: 400px; border-radius: 16px; padding: 28px 24px; text-align: center; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.35); animation: popScale 0.32s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes popScale { from { opacity: 0; transform: scale(0.88); } to { opacity: 1; transform: scale(1); } }
        .check-circle { width: 74px; height: 74px; border-radius: 50%; background: #dcfce7; color: #16a34a; display: flex; align-items: center; justify-content: center; font-size: 36px; margin: 0 auto 16px; animation: pulseRing 1.2s ease-out; }
        @keyframes pulseRing { 0% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.5); } 100% { box-shadow: 0 0 0 20px rgba(22, 163, 74, 0); } }
        .pay-opt-btn { width: 100%; padding: 13px; border-radius: 10px; border: 1.5px solid #e2e8f0; background: #f8fafc; font-weight: 600; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; transition: 0.2s; }
        .pay-opt-btn:hover { border-color: #801b1b; background: #fff1f2; }
    `;
    document.head.appendChild(style);

    const modalsHTML = `
        <!-- Mandatory Checkout Login Gate -->
        <div class="fk-overlay" id="loginGateModal">
            <div class="fk-card">
                <div style="width:54px; height:54px; border-radius:14px; background:#fef2f2; color:#801b1b; display:inline-flex; align-items:center; justify-content:center; font-size:24px; margin-bottom:14px;">
                    <i class="fas fa-user-lock"></i>
                </div>
                <h3 style="font-size:20px; margin-bottom:6px;">Login Required to Order</h3>
                <p style="font-size:13.5px; color:#64748b; margin-bottom:20px;">Sign in with Google to place your order, track live delivery, and save your basket.</p>
                <button onclick="loginFromGate()" style="width:100%; padding:12px; background:#801b1b; color:#fff; border:none; border-radius:8px; font-weight:700; font-size:15px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:10px;">
                    <i class="fab fa-google"></i> Continue with Google
                </button>
                <button onclick="document.getElementById('loginGateModal').classList.remove('active')" style="margin-top:12px; background:none; border:none; color:#64748b; font-size:13px; cursor:pointer;">Cancel</button>
            </div>
        </div>

        <!-- Secure Online Payment Gateway Modal -->
        <div class="fk-overlay" id="paymentGatewayModal">
            <div class="fk-card" style="text-align:left;">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #e2e8f0; padding-bottom:12px; margin-bottom:16px;">
                    <div>
                        <strong style="font-size:16px;">Anchal Spices Pay</strong>
                        <div style="font-size:12px; color:#64748b;">100% Encrypted Checkout</div>
                    </div>
                    <strong id="gwAmount" style="font-size:18px; color:#801b1b;">₹0</strong>
                </div>
                <p style="font-size:12.5px; color:#475569; margin-bottom:12px; font-weight:600;">Select Payment Mode:</p>
                <button class="pay-opt-btn" onclick="processSimulatedPayment('UPI (GPay / PhonePe / Paytm)')">
                    <span><i class="fas fa-mobile-alt" style="color:#801b1b; width:22px;"></i> Instant UPI (GPay / PhonePe)</span>
                    <i class="fas fa-chevron-right" style="color:#94a3b8;"></i>
                </button>
                <button class="pay-opt-btn" onclick="processSimulatedPayment('Credit / Debit Card')">
                    <span><i class="fas fa-credit-card" style="color:#801b1b; width:22px;"></i> Credit / Debit / ATM Card</span>
                    <i class="fas fa-chevron-right" style="color:#94a3b8;"></i>
                </button>
                <button class="pay-opt-btn" onclick="processSimulatedPayment('Net Banking')">
                    <span><i class="fas fa-university" style="color:#801b1b; width:22px;"></i> Net Banking</span>
                    <i class="fas fa-chevron-right" style="color:#94a3b8;"></i>
                </button>
                <div id="gwStatus" style="display:none; text-align:center; padding:12px; background:#f8fafc; border-radius:8px; margin-top:10px; font-size:13.5px; font-weight:600; color:#0f172a;">
                    <i class="fas fa-spinner fa-spin" style="color:#801b1b; margin-right:6px;"></i> Verifying payment with bank...
                </div>
                <button onclick="document.getElementById('paymentGatewayModal').classList.remove('active')" style="width:100%; margin-top:10px; padding:9px; background:#f1f5f9; border:none; border-radius:8px; color:#475569; font-weight:600; cursor:pointer;">Cancel Payment</button>
            </div>
        </div>

        <!-- Flipkart-Style Order Confirmed Animation Modal -->
        <div class="fk-overlay" id="orderSuccessModal">
            <div class="fk-card">
                <div class="check-circle"><i class="fas fa-check"></i></div>
                <h2 style="font-size:22px; color:#0f172a; margin-bottom:6px;">Order Placed Successfully!</h2>
                <p style="font-size:13.5px; color:#64748b; margin-bottom:16px;">Thank you for shopping with <strong>Anchal Spices</strong>. Your fresh spices are being packed.</p>
                <div style="background:#f8fafc; border:1px dashed #cbd5e1; padding:12px; border-radius:10px; margin-bottom:18px;">
                    <div style="font-size:12px; color:#64748b;">ORDER ID</div>
                    <strong id="confirmedOrderId" style="font-size:18px; color:#801b1b; letter-spacing:1px;">AS000000</strong>
                    <div id="confirmedOrderMeta" style="font-size:12.5px; color:#334155; margin-top:4px;"></div>
                </div>
                <button onclick="document.getElementById('orderSuccessModal').classList.remove('active')" style="width:100%; padding:12px; background:#16a34a; color:#fff; border:none; border-radius:8px; font-weight:700; font-size:14.5px; cursor:pointer;">
                    Continue Shopping
                </button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalsHTML);
})();

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
    if (category === 'all') displayProducts(products);
    else displayProducts(products.filter(p => p.category === category));
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const packIndex = document.getElementById(`weight-${id}`).value;
    const selectedPack = product.packs[packIndex];
    cart.push({ name: product.name, weight: selectedPack.weight, price: selectedPack.price });
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

// ================= MANDATORY CHECKOUT LOGIN (FLIPKART STYLE) =================
function checkout() {
    if (cart.length === 0) return alert("Please add at least one spice pack to your basket first.");
    
    // Check if user is logged in
    if (!window.currentUser) {
        pendingCheckoutAfterLogin = true;
        document.getElementById('cartSidebar').classList.remove('open');
        document.getElementById('loginGateModal').classList.add('active');
        return;
    }

    openCheckoutForm();
}

async function loginFromGate() {
    if (!window.firebaseServices) return alert("Please wait 2 seconds for services to load...");
    const user = await window.firebaseServices.loginWithGoogle();
    if (user) {
        document.getElementById('loginGateModal').classList.remove('active');
        if (pendingCheckoutAfterLogin) {
            pendingCheckoutAfterLogin = false;
            openCheckoutForm();
        }
    }
}

function openCheckoutForm() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('modalTotal').innerText = `₹${total}`;
    document.getElementById('cartSidebar').classList.remove('open');
    document.getElementById('checkoutModal').classList.add('active');

    const saved = JSON.parse(localStorage.getItem('anchal_user_address') || '{}');
    if (saved.name) document.getElementById('custName').value = saved.name;
    else if (window.currentUser?.displayName) document.getElementById('custName').value = window.currentUser.displayName;
    if (saved.phone) document.getElementById('custPhone').value = saved.phone;
    if (saved.address) document.getElementById('custAddress').value = saved.address;
}

function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('active');
}

let pendingOrderPayload = null;

async function placeOrder(event) {
    event.preventDefault();
    if (!window.currentUser) return checkout();

    const name = document.getElementById('custName').value;
    const phone = document.getElementById('custPhone').value;
    const address = document.getElementById('custAddress').value;
    const payment = document.getElementById('paymentMethod').value;
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const orderId = "AS" + Math.floor(100000 + Math.random() * 900000);

    pendingOrderPayload = {
        id: orderId,
        name: name,
        phone: phone,
        address: address,
        payment: payment,
        items: cart.map(i => `${i.name} (${i.weight})`).join(", "),
        total: total,
        status: "Order Confirmed & Freshly Packed by Anchal Spices"
    };

    // If Online Payment selected, open Secure Payment Window first (do NOT confirm before payment)
    if (payment === "UPI") {
        closeCheckout();
        document.getElementById('gwAmount').innerText = `₹${total}`;
        document.getElementById('gwStatus').style.display = 'none';
        document.getElementById('paymentGatewayModal').classList.add('active');
        return;
    }

    // If COD selected, confirm directly
    await finalizeConfirmedOrder(pendingOrderPayload);
}

async function processSimulatedPayment(methodLabel) {
    const statusBox = document.getElementById('gwStatus');
    statusBox.style.display = 'block';
    setTimeout(async () => {
        document.getElementById('paymentGatewayModal').classList.remove('active');
        pendingOrderPayload.payment = `Paid Online (${methodLabel})`;
        await finalizeConfirmedOrder(pendingOrderPayload);
    }, 1800);
}

async function finalizeConfirmedOrder(orderData) {
    localStorage.setItem(orderData.id, JSON.stringify(orderData));
    if (window.firebaseServices) {
        await window.firebaseServices.saveOrderToDB(orderData);
    }

    cart = [];
    updateCartUI();
    document.getElementById('orderForm').reset();
    closeCheckout();

    // Show Flipkart-Style Animated Order Confirmation Modal
    document.getElementById('confirmedOrderId').innerText = orderData.id;
    document.getElementById('confirmedOrderMeta').innerText = `Amount: ₹${orderData.total} • ${orderData.payment}`;
    document.getElementById('orderSuccessModal').classList.add('active');
}

// ================= ORDER TRACKING =================
function openTrackModal() { document.getElementById('trackModal').classList.add('active'); }
function closeTrackModal() {
    document.getElementById('trackModal').classList.remove('active');
    document.getElementById('trackResult').innerHTML = "";
}

async function checkOrderStatus() {
    const id = document.getElementById('trackOrderId').value.trim().toUpperCase();
    const resultDiv = document.getElementById('trackResult');
    if (!id) return;

    resultDiv.innerHTML = `<p style="color:#666;">Fetching live order status...</p>`;
    let order = null;
    if (window.firebaseServices) order = await window.firebaseServices.trackOrderById(id);
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
                <strong>Status:</strong> <span style="color:#047857; font-weight:bold;">${order.status}</span>
            </div>`;
    } else {
        resultDiv.innerHTML = `<p style="color:#801b1b;">Order ID not found. Please check your ID (e.g. AS123456).</p>`;
    }
}

// ================= PROFILE & ACCOUNT DRAWER =================
function toggleProfileMenu() { document.getElementById('profileSidebar').classList.toggle('open'); }
function closeModal(modalId) { document.getElementById(modalId).classList.remove('active'); }

async function handleGoogleLogin() {
    if (!window.firebaseServices) return alert("Services loading, please wait 2 seconds.");
    const user = await window.firebaseServices.loginWithGoogle();
    if (user && pendingCheckoutAfterLogin) {
        pendingCheckoutAfterLogin = false;
        document.getElementById('loginGateModal').classList.remove('active');
        openCheckoutForm();
    }
}

async function handleLogout() {
    if (window.firebaseServices) {
        await window.firebaseServices.logoutUser();
        toggleProfileMenu();
    }
}

window.updateAuthUI = function(user) {
    const headerName = document.getElementById('headerUserName');
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const profileAvatar = document.getElementById('profileAvatar');
    const loginBtn = document.getElementById('drawerLoginBtn');
    const logoutItem = document.getElementById('drawerLogoutItem');

    if (user) {
        headerName.innerText = user.displayName ? user.displayName.split(' ')[0] : 'Account';
        profileName.innerText = user.displayName || 'Valued Customer';
        profileEmail.innerText = user.email;
        if (user.photoURL) profileAvatar.innerHTML = `<img src="${user.photoURL}" alt="User">`;
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

async function openMyOrdersModal() {
    toggleProfileMenu();
    const modal = document.getElementById('myOrdersModal');
    const listDiv = document.getElementById('myOrdersList');
    modal.classList.add('active');

    if (!window.currentUser) {
        listDiv.innerHTML = `
            <div style="text-align:center; padding:20px;">
                <p style="margin-bottom:12px;">Sign in with Google to view your past orders.</p>
                <button class="place-order-btn" onclick="closeModal('myOrdersModal'); handleGoogleLogin();">
                    <i class="fab fa-google"></i> Login with Google
                </button>
            </div>`;
        return;
    }

    listDiv.innerHTML = `<p style="text-align:center; color:#666;">Loading your orders...</p>`;
    const orders = await window.firebaseServices.getMyOrders();
    if (orders.length === 0) {
        listDiv.innerHTML = `<p style="text-align:center; color:#666; padding:20px;">No orders found for this account yet.</p>`;
        return;
    }

    listDiv.innerHTML = orders.map(o => `
        <div class="order-history-card">
            <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                <strong>Order ID: ${o.id}</strong>
                <strong style="color:#801b1b;">₹${o.total}</strong>
            </div>
            <div style="color:#444; margin-bottom:5px;">${o.items}</div>
            <div style="font-size:12px; color:#047857; font-weight:bold;">Status: ${o.status}</div>
        </div>
    `).join('');
}

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
    localStorage.setItem('anchal_user_address', JSON.stringify({
        name: document.getElementById('savedName').value,
        phone: document.getElementById('savedPhone').value,
        address: document.getElementById('savedAddr').value
    }));
    closeModal('addressModal');
}

function openInfoModal(type) {
    toggleProfileMenu();
    const title = document.getElementById('infoModalTitle');
    const body = document.getElementById('infoModalBody');
    if (type === 'about') {
        title.innerText = "About Anchal Spices";
        body.innerHTML = `<p><strong>Anchal Spices and Food Products</strong> delivers 100% pure, unpolished whole spices and authentic Garam Masala directly from farms.</p><p style="margin-top:8px; color:#801b1b;"><strong>FSSAI Lic. No.:</strong> 227222000084</p>`;
    } else if (type === 'payments') {
        title.innerText = "Payments & Refund Policy";
        body.innerHTML = `<p>We support <strong>Cash on Delivery (COD)</strong> and <strong>Encrypted Online Payments (UPI / Cards / NetBanking)</strong>.</p>`;
    }
    document.getElementById('infoModal').classList.add('active');
}

function openWhatsAppSupport() {
    toggleProfileMenu();
    window.open("https://wa.me/918874472025?text=Hello%20Anchal%20Spices!%20I%20need%20help%20with%20my%20order.", "_blank");
}

function shareWebsite() {
    toggleProfileMenu();
    const shareUrl = "https://anchalspices.vercel.app";
    if (navigator.share) navigator.share({ title: "Anchal Spices", url: shareUrl });
    else window.open(`https://wa.me/?text=${encodeURIComponent(shareUrl)}`, "_blank");
}

// ================= LIVE PRODUCTS SYNC FROM FIREBASE =================
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

displayProducts(products);
syncProductsFromDatabase();