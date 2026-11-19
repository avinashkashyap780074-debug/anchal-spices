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
            { weight: "50", price: 99 }
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

function placeOrder(event) {
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
        items: cart.map(i => `${i.name} (${i.weight})`).join(", "),
        total: total,
        status: "Order Confirmed & Freshly Packed by Anchal Spices"
    };
    localStorage.setItem(orderId, JSON.stringify(orderData));

    if (payment === "UPI") {
        const upiUrl = `upi://pay?pa=avinashgound2025@nyes&pn=AnchalSpices&am=${total}&cu=INR`;
        window.open(upiUrl, '_blank');
    }

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

function checkOrderStatus() {
    const id = document.getElementById('trackOrderId').value.trim().toUpperCase();
    const saved = localStorage.getItem(id);
    const resultDiv = document.getElementById('trackResult');

    if (saved) {
        const order = JSON.parse(saved);
        resultDiv.innerHTML = `
            <div style="background:#fdf8ee; padding:12px; border-radius:6px; border-left:4px solid #801b1b;">
                <strong>Order ID:</strong> ${order.id}<br>
                <strong>Customer:</strong> ${order.name}<br>
                <strong>Items:</strong> ${order.items}<br>
                <strong>Status:</strong> <span style="color:#2a9d8f; font-weight:bold;">${order.status}</span>
            </div>
        `;
    } else {
        resultDiv.innerHTML = `<p style="color:#801b1b;">Order ID nahi mila. Kripya sahi ID dalein (jaise AS123456).</p>`;
    }
}

displayProducts(products);