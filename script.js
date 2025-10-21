// DOM elements
const pageLoading = document.getElementById('pageLoading');
const companyLogo = document.getElementById('companyLogo');
const topMenu = document.getElementById('topMenu');
const searchContainer = document.getElementById('searchContainer');
const searchBar = document.getElementById('searchBar');
const searchInput = document.getElementById('searchInput');
const searchToggle = document.getElementById('searchToggle');
const closeSearch = document.getElementById('closeSearch');
const menuToggle = document.getElementById('menuToggle');
const dropdownMenu = document.getElementById('dropdownMenu');
const overlays = document.querySelectorAll('.overlay');
const contents = document.querySelectorAll('.content');
const navButtons = document.querySelectorAll('.nav-bar button');
const productGrid = document.getElementById('productGrid');
const pagination = document.getElementById('pagination');
const prevPage = document.getElementById('prevPage');
const nextPage = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');
const searchResults = document.getElementById('searchResults');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const imageModal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const modalProductTitle = document.getElementById('modalProductTitle');
const modalProductDescription = document.getElementById('modalProductDescription');
const modalPrice = document.getElementById('modalPrice');
const modalImage = document.getElementById('modalImage');
const modalInfo = document.getElementById('modalInfo');
const closeModalBtn = document.getElementById('closeModal');
const infoToggle = document.getElementById('infoToggle');
const contactForm = document.getElementById('contactForm');

// State variables
let currentPage = 1;
const productsPerPage = 6;
let allProducts = [];
let filteredProducts = [];
let cart = [];
let isSearchExpanded = false;

// Product data
const products = [
    {
        id: 1,
        title: "Floral Summer Dress",
        category: "Dresses",
        price: 49.99,
        originalPrice: 69.99,
        rating: 4,
        badge: "sale",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop",
        description: "Lightweight floral dress perfect for summer days. Made from breathable cotton blend.",
        details: "100% Cotton • Machine Wash • Available in 4 colors"
    },
    {
        id: 2,
        title: "Classic Denim Jacket",
        category: "Jackets",
        price: 79.99,
        originalPrice: null,
        rating: 5,
        badge: "new",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
        description: "Timeless denim jacket with a comfortable fit. Perfect for layering.",
        details: "100% Denim • Classic Fit • Metal Buttons"
    },
    {
        id: 3,
        title: "Sport Running Shoes",
        category: "Footwear",
        price: 89.99,
        originalPrice: 109.99,
        rating: 4,
        badge: "sale",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
        description: "High-performance running shoes with advanced cushioning technology.",
        details: "Breathable Mesh • Rubber Sole • Cushioned Insole"
    },
    {
        id: 4,
        title: "Leather Handbag",
        category: "Accessories",
        price: 129.99,
        originalPrice: null,
        rating: 4,
        badge: null,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop",
        description: "Elegant leather handbag with multiple compartments. Perfect for everyday use.",
        details: "Genuine Leather • Gold Hardware • Adjustable Strap"
    },
    {
        id: 5,
        title: "Silk Blouse",
        category: "Tops",
        price: 45.99,
        originalPrice: 59.99,
        rating: 5,
        badge: "sale",
        image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=300&fit=crop",
        description: "Luxurious silk blouse with a delicate drape. Ideal for formal occasions.",
        details: "100% Silk • Hand Wash Only • Pearl Buttons"
    },
    {
        id: 6,
        title: "Wool Winter Coat",
        category: "Outerwear",
        price: 159.99,
        originalPrice: 199.99,
        rating: 4,
        badge: "sale",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=300&fit=crop",
        description: "Warm wool coat perfect for winter. Features a tailored fit and premium lining.",
        details: "Wool Blend • Double-Breasted • Inner Pocket"
    },
    {
        id: 7,
        title: "Casual Sneakers",
        category: "Footwear",
        price: 69.99,
        originalPrice: null,
        rating: 4,
        badge: "new",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop",
        description: "Comfortable everyday sneakers with modern design. Great for casual wear.",
        details: "Canvas Upper • Rubber Sole • Padded Collar"
    },
    {
        id: 8,
        title: "Evening Gown",
        category: "Dresses",
        price: 129.99,
        originalPrice: 149.99,
        rating: 5,
        badge: "sale",
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop",
        description: "Elegant evening gown with sequin detailing. Perfect for special events.",
        details: "Polyester Blend • Sequined • Floor Length"
    },
    {
        id: 9,
        title: "Knit Sweater",
        category: "Tops",
        price: 55.99,
        originalPrice: null,
        rating: 4,
        badge: null,
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop",
        description: "Cozy knit sweater made from soft merino wool. Perfect for chilly days.",
        details: "Merino Wool • Ribbed Cuffs • Crew Neck"
    },
    {
        id: 10,
        title: "Designer Sunglasses",
        category: "Accessories",
        price: 89.99,
        originalPrice: 119.99,
        rating: 5,
        badge: "sale",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
        description: "Luxury sunglasses with UV protection and polarized lenses.",
        details: "Polarized Lenses • UV400 Protection • Metal Frame"
    },
    {
        id: 11,
        title: "Linen Pants",
        category: "Bottoms",
        price: 49.99,
        originalPrice: null,
        rating: 4,
        badge: "new",
        image: "https://images.unsplash.com/photo-1542272456-9c0d923bcf47?w=400&h=300&fit=crop",
        description: "Breathable linen pants with a relaxed fit. Ideal for warm weather.",
        details: "100% Linen • Elastic Waist • Drawstring"
    },
    {
        id: 12,
        title: "Evening Clutch",
        category: "Accessories",
        price: 39.99,
        originalPrice: 49.99,
        rating: 4,
        badge: "sale",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop",
        description: "Sparkling evening clutch with chain strap. Fits essentials perfectly.",
        details: "Sequined • Chain Strap • Magnetic Closure"
    },
    {
        id: 13,
        title: "Cotton T-Shirt",
        category: "Tops",
        price: 24.99,
        originalPrice: null,
        rating: 4,
        badge: null,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
        description: "Classic cotton t-shirt with a comfortable fit. Essential for every wardrobe.",
        details: "100% Cotton • Regular Fit • Pre-shrunk"
    },
    {
        id: 14,
        title: "High Heels",
        category: "Footwear",
        price: 79.99,
        originalPrice: 99.99,
        rating: 5,
        badge: "sale",
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop",
        description: "Elegant high heels with a comfortable block heel. Perfect for formal events.",
        details: "Synthetic Leather • 3-inch Heel • Padded Insole"
    },
    {
        id: 15,
        title: "Winter Scarf",
        category: "Accessories",
        price: 29.99,
        originalPrice: null,
        rating: 4,
        badge: "new",
        image: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=400&h=300&fit=crop",
        description: "Warm winter scarf made from soft acrylic wool. Extra long for wrapping.",
        details: "Acrylic Wool • Fringe Details • 70 inches Long"
    },
    {
        id: 16,
        title: "Designer Jeans",
        category: "Bottoms",
        price: 89.99,
        originalPrice: 119.99,
        rating: 5,
        badge: "sale",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop",
        description: "Premium designer jeans with a slim fit and stretch comfort.",
        details: "Denim with Stretch • Slim Fit • Five Pockets"
    }
];

function getSavedTheme() {
    return localStorage.getItem('theme') || 'light'; // Default to light theme
}

function saveTheme(theme) {
    localStorage.setItem('theme', theme);
}

function applySavedTheme() {
    const savedTheme = getSavedTheme();
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        updateThemeIcons('dark');
    } else {
        document.body.classList.remove('dark-theme');
        updateThemeIcons('light');
    }
}

function updateThemeIcons(theme) {
    const themeIcons = document.querySelectorAll('#themeIcon, .theme-toggle i');
    themeIcons.forEach(icon => {
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    });
}

function toggleTheme() {
    const isDarkTheme = document.body.classList.toggle('dark-theme');
    
    // Save theme preference
    if (isDarkTheme) {
        saveTheme('dark');
        updateThemeIcons('dark');
    } else {
        saveTheme('light');
        updateThemeIcons('light');
    }

    dropdownMenu.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', function () {
    applySavedTheme();
    
    setTimeout(() => {
        pageLoading.classList.add('hidden');
    }, 1500);

    initializeProducts();
    showContent('shop');
    createParticles();
    setupEventListeners();
});

function setupEventListeners() {
    // Search functionality
    searchToggle.addEventListener('click', toggleSearch);
    closeSearch.addEventListener('click', closeSearchBar);
    searchInput.addEventListener('input', handleSearch);

    // Menu functionality
    menuToggle.addEventListener('click', toggleMenu);

    // Pagination
    prevPage.addEventListener('click', goToPrevPage);
    nextPage.addEventListener('click', goToNextPage);

    // Contact form
    contactForm.addEventListener('submit', handleContactForm);

    // Close dropdown when clicking outside
    document.addEventListener('click', function (event) {
        if (!menuToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('active');
        }
    });

    closeModalBtn.addEventListener('click', closeModal);
    infoToggle.addEventListener('click', toggleInfo);

    // Close modal when clicking outside the content
    imageModal.addEventListener('click', function (event) {
        if (event.target === imageModal) {
            closeModal();
        }
    });

    // Prevent closing when clicking inside modal content
    document.querySelector('.modal-content').addEventListener('click', function (event) {
        event.stopPropagation();
    });
}

function toggleSearch() {
    if (!isSearchExpanded) {
        expandSearch();
    } else {
        closeSearchBar();
    }
}

function expandSearch() {
    isSearchExpanded = true;
    searchContainer.classList.add('expanded');
    searchBar.classList.add('active');
    searchInput.focus();

    // Fade out logo and menu
    companyLogo.style.opacity = '0';
    topMenu.style.opacity = '0';
}

function closeSearchBar() {
    isSearchExpanded = false;
    searchContainer.classList.remove('expanded');
    searchBar.classList.remove('active');
    searchInput.value = '';

    // Fade in logo and menu
    companyLogo.style.opacity = '1';
    topMenu.style.opacity = '1';

    // Clear search results
    handleSearch();
}

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === '') {
        // If search is empty, show all products
        filteredProducts = [...allProducts];
        searchResults.textContent = '';
    } else {
        // Filter products based on search term
        filteredProducts = allProducts.filter(product =>
            product.title.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );

        // Update search results text
        if (filteredProducts.length === 0) {
            searchResults.textContent = `No results found for "${searchTerm}"`;
        } else {
            searchResults.textContent = `Found ${filteredProducts.length} result(s) for "${searchTerm}"`;
        }
    }

    // Reset to first page and display products
    currentPage = 1;
    displayProducts();
}

function toggleMenu() {
    dropdownMenu.classList.toggle('active');
}

function showContent(contentId) {
    contents.forEach(content => {
        content.classList.remove('active');
    });

    const selectedContent = document.getElementById(contentId);
    const selectedOverlay = selectedContent.closest('.overlay');

    // Find current active overlay
    const currentActiveOverlay = document.querySelector('.overlay.show');

    if (currentActiveOverlay && currentActiveOverlay !== selectedOverlay) {
        // Animate out the current active overlay
        currentActiveOverlay.style.clipPath = 'ellipse(0% 0% at 50% 100%)';

        const onTransitionEnd = () => {
            currentActiveOverlay.classList.remove('show');
            currentActiveOverlay.style.display = 'none';
            currentActiveOverlay.removeEventListener('transitionend', onTransitionEnd);

            // Now show the selected overlay
            showSelectedOverlay(selectedOverlay, contentId);
        };

        currentActiveOverlay.addEventListener('transitionend', onTransitionEnd);
    } else {
        // No current active or same as selected, just show it
        showSelectedOverlay(selectedOverlay, contentId);
    }

    // Update nav buttons
    navButtons.forEach(button => {
        button.classList.remove('active');
        if (button.textContent.trim().toLowerCase() === contentId) {
            button.classList.add('active');
        }
    });

    // Close dropdown menu
    dropdownMenu.classList.remove('active');

    // If showing cart, update cart display
    if (contentId === 'cart') {
        updateCartDisplay();
    }
}

function showSelectedOverlay(overlay, contentId) {
    overlay.style.display = 'block';
    overlay.classList.add('show');
    overlay.style.clipPath = 'ellipse(165% 90% at 50% 100%)';
    document.getElementById(contentId).classList.add('active');
}

function initializeProducts() {
    allProducts = products.map(p => ({
        ...p,
        onSale: p.badge === 'sale',
        isNew: p.badge === 'new'
    }));
    filteredProducts = [...allProducts];
    displayProducts();
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const badgeSale = product.onSale ? '<div class="sale-badge">SALE</div>' : '';
    const badgeNew = product.isNew ? '<div class="new-badge">NEW</div>' : '';

    const originalPrice = product.originalPrice ? `<span class="original-price">M${product.originalPrice.toFixed(2)}</span>` : '';

    const ratingStars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);

    card.innerHTML = `
                ${badgeSale}${badgeNew}
                <div class="product-image" onclick="openModal(${product.id})">
                    <div class="image-loading">
                        <div class="loading-spinner small"></div>
                    </div>
                    <img src="${product.image}" alt="${product.title}" loading="lazy" 
                         onload="this.classList.add('loaded'); this.parentNode.querySelector('.image-loading').style.display='none';"
                         onerror="this.src='https://images.unsplash.com/photo-1558769132-cb1a40c965d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'; this.classList.add('loaded'); this.parentNode.querySelector('.image-loading').style.display='none';">
                </div>
                <div class="product-title">${product.title}</div>
                <div class="product-category">${product.category}</div>
                <div class="product-price">
                    <span class="current-price">M${product.price.toFixed(2)}</span>
                    ${originalPrice ? `<br>${originalPrice}` : ''}
                </div>
                <div class="product-rating">
                    ${ratingStars}
                    <span>(${product.rating})</span>
                </div>
                <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
            `;

    return card;
}

function displayProducts() {
    // Calculate pagination
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);

    // Clear product grid
    productGrid.innerHTML = '';

    // Display products
    if (productsToShow.length === 0) {
        productGrid.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-search"></i>
                        <p>No products found</p>
                    </div>
                `;
    } else {
        productsToShow.forEach(product => {
            const productCard = createProductCard(product);
            productGrid.appendChild(productCard);
        });
    }

    updatePagination();
}

function updatePagination() {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevPage.disabled = currentPage === 1;
    nextPage.disabled = currentPage === totalPages || totalPages === 0;

    // Show/hide pagination based on number of pages
    pagination.style.display = totalPages <= 1 ? 'none' : 'flex';
}

function goToPrevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayProducts();
    }
}

function goToNextPage() {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayProducts();
    }
}

function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        showNotification(`${product.title} added to cart!`);

        // Update cart display if it's visible
        if (document.getElementById('cart').classList.contains('active')) {
            updateCartDisplay();
        }
    }
}

function updateCartDisplay() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = 'Total: M0.00';
        return;
    }

    let total = 0;
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const itemTotal = item.quantity * item.price;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">M${item.price.toFixed(2)} x ${item.quantity}</div>
                    </div>
                    <div class="cart-item-actions">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="quantity-btn" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = `Total: M${total.toFixed(2)}`;
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;

        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartDisplay();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function openModal(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
        modalImg.src = product.image;
        modalProductTitle.textContent = product.title;
        modalProductDescription.textContent = `${product.description} ${product.details}`;
        modalPrice.textContent = `M${product.price.toFixed(2)}`;

        // Reset modal state
        modalImage.classList.remove('blurry');
        modalInfo.classList.remove('active');
        closeModalBtn.classList.remove('hide-info');
        closeModalBtn.innerHTML = '<i class="fas fa-times"></i>';

        imageModal.classList.add('active');
    }
}

function closeModal() {
    imageModal.classList.remove('active');
}

function toggleInfo() {
    const isInfoActive = modalInfo.classList.contains('active');

    if (isInfoActive) {
        // Hide info
        modalInfo.classList.remove('active');
        modalImage.classList.remove('blurry');
        closeModalBtn.classList.remove('hide-info');
        closeModalBtn.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        // Show info
        modalInfo.classList.add('active');
        modalImage.classList.add('blurry');
        closeModalBtn.classList.add('hide-info');
        closeModalBtn.innerHTML = '<i class="fas fa-times"></i>';
    }
}

function addToCartFromModal() {
    const productTitle = modalProductTitle.textContent;
    const product = allProducts.find(p => p.title === productTitle);
    if (product) {
        addToCart(product.id);
        showNotification(`${product.title} added to cart!`);
        closeModal();
    }
}

function handleContactForm(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // For this demo, show a success message
    showNotification('Thank you for your message! We will get back to you soon.');

    // Reset form
    contactForm.reset();
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #4CAF50;
                color: white;
                padding: 15px 25px;
                border-radius: 5px;
                z-index: 10000;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                transform: translateX(150%);
                transition: transform 0.3s ease;
            `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function createParticles() {
    const particlesContainer = document.getElementById('particles-container');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random properties
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 20 + 10;
        const animationDelay = Math.random() * 5;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}vw`;
        particle.style.animationDuration = `${animationDuration}s`;
        particle.style.animationDelay = `${animationDelay}s`;

        particlesContainer.appendChild(particle);
    }
}