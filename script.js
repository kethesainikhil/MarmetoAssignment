const clearProductCards = () => {
    const container = document.querySelector('.product-container');
    container.innerHTML = '';
};

const fetchAndDisplayProducts = async (category) => {
    try {
        clearProductCards();
        const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
        const data = await response.json();

        const categoryProducts = data.categories.find(cat => cat.category_name.toLowerCase() === category.toLowerCase()).category_products;

        categoryProducts.forEach(product => {
            createProductCard(product);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

const createProductCard = (product) => {
    const container = document.querySelector('.product-container');

    const card = document.createElement('div');
    card.classList.add('card');
    const badgeText = document.createElement('div');
    badgeText.classList.add('badge');
    badgeText.textContent = product.badge_text || null;

    if (product.badge_text == null) {
        badgeText.style.padding = '8px 2px';
        badgeText.style.opacity = '0';
    } else {
        badgeText.style.padding = '8px 2px';
    }
    card.appendChild(badgeText)
    const img = document.createElement('img');
    img.src = product.image;
    img.style.height = '267px';
    img.style.borderRadius = '5px';
    card.appendChild(img);

   

    const details = document.createElement('div');
    details.classList.add('details');

    const titleVendor = document.createElement('div');
    titleVendor.classList.add('title-vendor');
    const productTitle = document.createElement('h3');
    const productVendor = document.createElement('p');

    if (product.title.length > 10) {
        product.title = product.title.substring(0, 10);
    }

    productTitle.textContent = `${product.title}`;
    productVendor.textContent = `${product.vendor}`;
    productVendor.style.fontWeight = "200";
    productVendor.style.fontSize = "15px";
    productVendor.classList.add('vendor');
    titleVendor.appendChild(productTitle);
    titleVendor.appendChild(productVendor);

    details.appendChild(titleVendor);

    const price = document.createElement('div');
    price.classList.add('price');
    price.textContent = `Price: ₹${product.price}`;

    if (product.compare_at_price) {
        const compareAtPrice = document.createElement('div');
        compareAtPrice.classList.add('compare-price');
        compareAtPrice.id = 'compare-at-price';
        compareAtPrice.textContent = `₹${product.compare_at_price}`;

        const discount = Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100);
        const discountText = document.createElement('span');
        discountText.classList.add('discount');
        discountText.id = 'discount-id';
        discountText.textContent = ` (${discount}% off)`;
        
        if (discount > 0) {
            discountText.style.color = 'red';
            discountText.style.textDecoration = 'none';
        } else {
            discountText.style.textDecoration = 'none';
        }

        const lastColumn = document.createElement('div');
        lastColumn.classList.add('last-column');
        lastColumn.appendChild(price);
        lastColumn.append(compareAtPrice); 
        lastColumn.append(discountText);
        
        details.appendChild(lastColumn);
    }

    card.appendChild(details);
    
    const button = document.createElement('button');
    button.classList.add('button1');
    button.textContent = 'Add to cart';
    card.appendChild(button);

    container.appendChild(card);
};

const tabs = document.querySelectorAll('.tab');

tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        const category = tab.innerText.trim(); 
        fetchAndDisplayProducts(category);
        
        tabs.forEach(otherTab => {
            otherTab.style.backgroundColor = '';
            const otherImg = otherTab.querySelector('.icon');
            otherImg.style.opacity = '';
        });
        
        tab.style.backgroundColor = 'black';
        
        const img = tab.querySelector('.icon');
        img.style.opacity = '1';
    });
});
