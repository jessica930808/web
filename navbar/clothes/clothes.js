

// 登入
const users = [
    { username: 'test', password: '1234' }, // 模擬用戶數據
];

let isLoggedIn = false; // 初始為未登入

document.getElementById('loginForm').addEventListener('submit', event => {
    event.preventDefault(); // 防止表單提交刷新頁面
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        alert('登入成功！');
        isLoggedIn = true; // 設置為已登入
        localStorage.setItem('isLoggedIn', true); // 儲存登入狀態
        localStorage.setItem('username', username); // 儲存使用者名稱
        updateUIForLoggedInUser(username); // 更新 UI
        const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        modal.hide(); // 隱藏模態框
    } else {
        alert('帳號或密碼錯誤！');
    }
});

// 更新登入後的 UI
function updateUIForLoggedInUser(username) {
    const loginNavLink = document.querySelector('.nav-item .nav-link[data-bs-target="#loginModal"]');
    loginNavLink.innerHTML = `<i class="bi bi-person-circle"></i> ${username}`;
    loginNavLink.removeAttribute('data-bs-target'); // 禁用再次打開登入框
    loginNavLink.setAttribute('href', '#'); // 防止點擊跳轉

    // 如果登出按鈕已存在，不需要再新增
    if (!document.getElementById('logoutButton')) {
        // 添加登出按鈕
        const logoutButton = document.createElement('a');
        logoutButton.id = 'logoutButton';
        logoutButton.className = 'nav-link text-danger';
        logoutButton.href = '#';
        logoutButton.innerHTML = `<i class="bi bi-box-arrow-right"></i> 登出`;
        logoutButton.addEventListener('click', handleLogout);

        // 插入登出按鈕到導覽列
        const navList = loginNavLink.parentElement.parentElement; // 找到 <ul> 父容器
        const newNavItem = document.createElement('li');
        newNavItem.className = 'nav-item';
        newNavItem.appendChild(logoutButton);
        navList.appendChild(newNavItem); // 插入登出按鈕
    }
}


function handleLogout() {
    localStorage.removeItem('isLoggedIn'); // 移除登入狀態
    localStorage.removeItem('username'); // 移除使用者名稱
    localStorage.removeItem('orderItems'); // 清空訂單資料
    alert('您已成功登出');
    location.reload(); // 重新載入頁面
}


//初始化登入檢查
document.addEventListener('DOMContentLoaded', () => {
    const savedLoginStatus = localStorage.getItem('isLoggedIn');
    const savedUsername = localStorage.getItem('username');
    if (savedLoginStatus === 'true' && savedUsername) {
        isLoggedIn = true;
        updateUIForLoggedInUser(savedUsername);
    }
});





// 購物車資料
const cart = [];
// 商品資料
const products = [
    {
        name: "韓國 馬海毛 字母 針織 毛衣",
        price: 1180,
        image: "/image/上衣1.png",
        description: "這款馬海毛針織毛衣，擁有舒適的質感和時尚的字母設計，讓你穿上不僅保暖，還能展現個性。",
        colors: ["紅色", "藍色", "綠色"],
        sizes: ["S", "M", "L"]
    },
    {
        name: "韓國 星型 做舊 落肩 薄長袖",
        price: 980,
        image: "/image/上衣2.png",
        description: "星型做舊設計，展現休閒與個性兼具的風格，適合日常穿搭。",
        colors: ["黑色", "白色"],
        sizes: ["S", "M", "L"]
    },
    {
        name: "WBI Sun Protection Sheer",
        price: 780,
        image: "/image/上衣3.png",
        description: "輕薄透氣的防曬上衣，提供日常防護，適合戶外活動。",
        colors: ["淺藍", "粉紅", "白色"],
        sizes: ["S", "M", "L"]
    },
    {
        name: "霧感 漸變 暈染 寬鬆 帽T",
        price: 1280,
        image: "/image/上衣4.png",
        description: "寬鬆的帽T設計，結合漸變霧感染色，展現潮流風格。",
        colors: ["灰色", "藍色"],
        sizes: ["M", "L", "XL"]
    },
    {
        name: "韓國 寬鬆 日月 水洗 薄長袖",
        price: 1180,
        image: "/image/上衣5.png",
        description: "水洗效果打造復古感，日月設計增添神秘氣息。",
        colors: ["白色", "灰色"],
        sizes: ["S", "M", "L"]
    },
    {
        name: "韓國 字母 天鵝絨 運動 薄長袖",
        price: 880,
        image: "/image/上衣6.png",
        description: "柔軟天鵝絨材質，搭配字母印花，適合日常休閒穿搭。",
        colors: ["藍色", "紅色"],
        sizes: ["S", "M", "L"]
    },
    {
        name: "韓國 刷破 洞洞 針織 連帽 外套",
        price: 1380,
        image: "/image/上衣7.png",
        description: "刷破洞洞設計的針織外套，結合復古與現代感。",
        colors: ["黑色", "白色"],
        sizes: ["S", "M", "L"]
    },
    {
        name: "韓國 光暈 染料 印花 簡約 短袖",
        price: 780,
        image: "/image/上衣8.png",
        description: "簡約設計短袖，光暈染料印花展現獨特個性。",
        colors: ["灰色", "白色"],
        sizes: ["S", "M", "L"]
    },
    {
        name: "VINTAGE 水洗 做舊 薄長袖",
        price: 980,
        image: "/image/上衣9.png",
        description: "水洗效果與做舊設計，展現復古氣質。",
        colors: ["灰色", "藍色"],
        sizes: ["S", "M", "L"]
    },
    {
        name: "吊染 漸層 洞洞 毛衣",
        price: 1180,
        image: "/image/上衣10.png",
        description: "這款吊染漸層毛衣，獨特的洞洞設計帶來透氣感，搭配漸層色調展現個性。",
        colors: ["灰色", "白色", "黑色"],
        sizes: ["S", "M", "L"]
    },
    {
        name: "VINTAGE 破壞 華夫格 薄長袖",
        price: 780,
        image: "/image/上衣11.png",
        description: "破壞設計與華夫格紋結合，打造潮流復古風。",
        colors: ["灰色", "藍色"],
        sizes: ["S", "M", "L"]
    },
    {
        name: "龐克 vintage 兩件式 薄長袖",
        price: 1080,
        image: "/image/上衣12.png",
        description: "兩件式設計，龐克風格與復古氣息相互結合，適合多層次搭配。",
        colors: ["黑色", "灰色"],
        sizes: ["S", "M", "L"]
    }
];

// 顯示商品詳細介面
function showProductDetails(product) {
    const modalBody = document.querySelector('#productDetailModal .modal-body');
    modalBody.innerHTML = `
        <div class="product-details">
            <img src="${product.image}" class="img-fluid product-image" alt="${product.name}">
            <h5 class="product-name">${product.name}</h5>
            <p class="product-description">${product.description}</p>
            <p class="product-price">價格: <span id="productPrice">$${product.price}</span></p>

            <div class="mb-3">
                <label for="productColor" class="form-label">選擇顏色</label>
                <select id="productColor" class="form-select">
                    ${product.colors.map(color => `<option value="${color}">${color}</option>`).join('')}
                </select>
            </div>

            <div class="mb-3">
                <label for="productSize" class="form-label">選擇尺寸</label>
                <select id="productSize" class="form-select">
                    ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                </select>
            </div>

            <div class="mb-3">
                <label for="productQuantity" class="form-label">數量</label>
                <input type="number" id="productQuantity" class="form-control" value="1" min="1">
            </div>
            
            <button class="btn btn-buy" id="addToCartBtn">加入購物車</button>
        </div>

    `;

    document.getElementById('addToCartBtn').addEventListener('click', () => {
        if (!isLoggedIn) {
            alert('請先登入後才能將商品加入購物車！');
            return;
        }

        const color = document.getElementById('productColor').value;
        const size = document.getElementById('productSize').value;
        const quantity = parseInt(document.getElementById('productQuantity').value);

        addToCart(product.name, product.price, color, size, quantity);
    });
}

// 顯示商品詳細頁面
function openProductDetailModal(productIndex) {
    const product = products[productIndex];
    showProductDetails(product);
    const productDetailModal = new bootstrap.Modal(document.getElementById('productDetailModal'));
    productDetailModal.show();
}

// 為商品按鈕添加事件
document.querySelectorAll('.btn-buy').forEach((button, index) => {
    button.addEventListener('click', () => {
        openProductDetailModal(index);
    });
});

// 更新購物車視圖
function updateCartView() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    cartItems.innerHTML = ''; // 清空列表
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            ${item.name} (${item.color}, ${item.size}, x${item.quantity})
            <span>$${item.price * item.quantity}</span>
        `;
        cartItems.appendChild(li);
    });

    totalPrice.textContent = `$${total}`;
}

// 添加商品到購物車
function addToCart(productName, price, color, size, quantity) {
    const existingItem = cart.find(item => item.name === productName && item.color === color && item.size === size);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name: productName, price: price, color: color, size: size, quantity: quantity });
    }
    updateCartView();
    alert(`${productName} (${color}, ${size}) 已加入購物車`);
}

// 購物車按鈕
document.getElementById('cartButton').addEventListener('click', () => {
    if (!isLoggedIn) {
        alert('請先登入以查看購物車！');
        return;
    }
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
});

// 結帳按鈕
document.getElementById('checkoutButton').addEventListener('click', () => {
    if (!isLoggedIn) {
        alert('請先登入以進行結帳！');
        return;
    }

    if (cart.length === 0) {
        alert('購物車為空，無法結帳');
    } else {
        alert('結帳成功！感謝您的購買');
        localStorage.setItem('orderItems', JSON.stringify(cart)); // 將購物車內容存儲到 localStorage
        cart.length = 0; // 清空購物車
        updateCartView();
        window.location.href = 'order.html'; // 跳轉到訂單頁面
    }
});



