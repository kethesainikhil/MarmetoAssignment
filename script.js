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

    // Create card element
    const card = document.createElement('div');
    card.classList.add('card');

    // Add product image
    const img = document.createElement('img');
    img.src = product.image;
    img.style.height = '267px';
    img.style.borderRadius = '5px';
    card.appendChild(img);

    // Add badge text
    const badgeText = document.createElement('div');
    badgeText.classList.add('badge');
    badgeText.textContent = product.badge_text || null;
    card.appendChild(badgeText);

    if (product.badge_text == null) {
        badgeText.style.display = 'none';
    } else {
        badgeText.style.padding = '5px 2px';
    }

    // Add product details
    const details = document.createElement('div');
    details.classList.add('details');

    // Add product title and vendor
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

    // Add product price and compare at price
    const price = document.createElement('div');
    price.classList.add('price');
    price.textContent = `Price: ₹${product.price}`;

    if (product.compare_at_price) {
        const compareAtPrice = document.createElement('div');
        compareAtPrice.classList.add('compare-price');
        compareAtPrice.id = 'compare-at-price';
        compareAtPrice.textContent = `₹${product.compare_at_price}`;

        // Calculate discount percentage
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
    
    // Append details to card
    const button = document.createElement('button');
    button.classList.add('button1');
    button.textContent = 'Add to cart';
    card.appendChild(button);

    container.appendChild(card);
};

const tabs = document.querySelectorAll('.tab');

// Iterate over each tab and add a click event listener
tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        const category = tab.innerText.trim(); 
        fetchAndDisplayProducts(category);
        
        // Remove black background and reset opacity for all tabs
        tabs.forEach(otherTab => {
            otherTab.style.backgroundColor = '';
            const otherImg = otherTab.querySelector('.icon');
            otherImg.style.opacity = '';
        });
        
        // Set the background color of the clicked tab to black
        tab.style.backgroundColor = 'black';
        
        // Get the image element inside the clicked tab
        const img = tab.querySelector('.icon');
        img.style.opacity = '1';
    });
});
