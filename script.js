        // Хуудас солих функцууд
        function showHome() {
            document.getElementById('home').style.display = 'block';
            document.getElementById('add-product').style.display = 'none';
            document.getElementById('cart').style.display = 'none';
            loadProducts();  // Бүтээгдэхүүнүүдийг ачаалуулах
        }
        
        function showAddProduct() {
            document.getElementById('home').style.display = 'none';
            document.getElementById('add-product').style.display = 'block';
            document.getElementById('cart').style.display = 'none';
        }
        
        function showCart() {
            document.getElementById('home').style.display = 'none';
            document.getElementById('add-product').style.display = 'none';
            document.getElementById('cart').style.display = 'block';
            loadCart();  // Сагсны мэдээллийг ачаалуулах
        }
        
        // Home хуудас дээр бүтээгдэхүүнүүдийг харах
        function loadProducts() {
            const products = JSON.parse(localStorage.getItem('products')) || [];
            const productList = document.getElementById('product-list');
            
            if (products.length === 0) {
                productList.innerHTML = '<p>Бүтээгдэхүүн байхгүй байна.</p>';
            } else {
                productList.innerHTML = '';
                products.forEach((product, index) => {
                    const productDiv = document.createElement('div');
                    productDiv.classList.add('product-item');
                    productDiv.innerHTML = `
                        <h2>${product.title}</h2>
                        <p>${product.introduction}</p>
                        <p>Үнэ: ${product.price}₮</p>
                        <img src="${product.imageUrl}" alt="${product.title}" style="width: 100px;">
                        <button onclick="editProduct(${index})">Засах</button>
                        <button onclick="deleteProduct(${index})">Устгах</button>
                        <button onclick="addToCart(${index})">Сагс руу оруулах</button>
                        <hr>
                    `;
                    productList.appendChild(productDiv);
                });
            }
        }
        
        // Бүтээгдэхүүн нэмэх
        document.getElementById('createButton').addEventListener('click', function() {
            const title = document.getElementById('title').value.trim();
            const introduction = document.getElementById('introduction').value.trim();
            const price = document.getElementById('price').value.trim();
            const imageUrl = document.getElementById('imageUrl').value.trim();
        
            if (!title || !introduction || !price || !imageUrl) {
                alert('Бүх талбарыг бөглөнө үү!');
                return;
            }
        
            const products = JSON.parse(localStorage.getItem('products')) || [];
            products.push({ title, introduction, price, imageUrl });
            localStorage.setItem('products', JSON.stringify(products));
        
            // Бүтээгдэхүүн нэмэгдсэний дараа form-ыг цэвэрлэж, Home руу буцааж очих
            document.getElementById('productForm').reset();
            showHome();
        });
        
        // Бүтээгдэхүүн засах
        function editProduct(index) {
            const products = JSON.parse(localStorage.getItem('products')) || [];
            const product = products[index];
            
            document.getElementById('title').value = product.title;
            document.getElementById('introduction').value = product.introduction;
            document.getElementById('price').value = product.price;
            document.getElementById('imageUrl').value = product.imageUrl;
        
            // Бүтээгдэхүүний индексийг хадгалах
            localStorage.setItem('editIndex', index);
            showAddProduct();
        }
        
        // Бүтээгдэхүүн устгах
        function deleteProduct(index) {
            const products = JSON.parse(localStorage.getItem('products')) || [];
            products.splice(index, 1);
            localStorage.setItem('products', JSON.stringify(products));
            loadProducts();  // Home хуудас дахин ачаалж, шинэчилнэ
        }
        
        // Сагс руу оруулах
        function addToCart(index) {
            const products = JSON.parse(localStorage.getItem('products')) || [];
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
            cart.push(products[index]);
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        
        // Сагс хуудас дээр бүтээгдэхүүнүүдийг харуулах
        function loadCart() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const cartList = document.getElementById('cart-list');
            
            if (cart.length === 0) {
                cartList.innerHTML = '<p>Сагс хоосон байна.</p>';
            } else {
                cartList.innerHTML = '';
                cart.forEach((product, index) => {
                    const cartDiv = document.createElement('div');
                    cartDiv.classList.add('cart-item');
                    cartDiv.innerHTML = `
                        <h2>${product.title}</h2>
                        <p>${product.introduction}</p>
                        <p>Үнэ: ${product.price}₮</p>
                        <img src="${product.imageUrl}" alt="${product.title}" style="width: 100px;">
                        <button onclick="removeFromCart(${index})">Устгах</button>
                        <hr>
                    `;
                    cartList.appendChild(cartDiv);
                });
            }
        }
        
        // Сагснаас бүтээгдэхүүн устгах
        function removeFromCart(index) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();  // Сагс хуудас дахин ачаалж, шинэчилнэ
        }
        
        // Эхлээд Home хуудас харуулах
        showHome();