
//登入
const users = [
    { username: 'test', password: '1234' }, // 模擬用戶數據
];

document.getElementById('loginForm').addEventListener('submit', event => {
    event.preventDefault(); // 防止表單提交刷新頁面
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        alert('登入成功！');
        document.getElementById('loginModal').classList.remove('show'); // 隱藏模態框
        document.body.classList.remove('modal-open');
        document.querySelector('.modal-backdrop').remove();

        // 更改 UI 狀態
        document.querySelector('.nav-item .nav-link[data-bs-target="#loginModal"]').innerHTML =
            `<i class="bi bi-person-circle"></i> ${username}`;
    } else {
        alert('帳號或密碼錯誤！');
    }
});



// 購物車資料
const cart = [];

// 添加商品到購物車
function addToCart(productName, price) {
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }
    updateCartView();
    alert(`${productName} 已加入購物車`);
}

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
    ${item.name} (x${item.quantity})
    <span>$${item.price * item.quantity}</span>
    `;
        cartItems.appendChild(li);
    });

    totalPrice.textContent = `$${total}`;
}

// 為按鈕添加事件監聽
document.querySelectorAll('.btn-buy').forEach(button => {
    button.addEventListener('click', event => {
        const productCard = event.target.closest('.card');
        const productName = productCard.querySelector('.card-title').innerText;
        const priceText = productCard.querySelector('.fw-bold').innerText;
        const price = parseInt(priceText.replace('$', ''), 10);
        addToCart(productName, price);
    });
});

// 結帳按鈕
document.getElementById('checkoutButton').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('購物車為空，無法結帳');
    } else {
        alert('結帳成功！感謝您的購買');
        cart.length = 0; // 清空購物車
        updateCartView();
    }
});
