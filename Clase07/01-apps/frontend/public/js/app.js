// Application state
let backend1Url = '';

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    loadBackendUrl();
});

// Load backend1 URL from the server
async function loadBackendUrl() {
    try {
        const response = await fetch('/api/backend1-url');
        const data = await response.json();
        if (data.success) {
            backend1Url = data.backend1_url;
            console.log('Backend1 URL loaded:', backend1Url);
        }
    } catch (error) {
        console.error('Error loading backend URL:', error);
        showError('Failed to load backend configuration');
    }
}

// Load products from backend1
async function loadProducts() {
    if (!backend1Url) {
        showError('Backend URL not configured');
        return;
    }

    showLoading(true);
    hideError();
    hideEmptyState();

    try {
        const response = await fetch(`${backend1Url}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
            displayProducts(data.data);
            updateStatistics(data);
        } else {
            throw new Error(data.message || 'Failed to load products');
        }
    } catch (error) {
        console.error('Error loading products:', error);
        showError(`Error loading products: ${error.message}`);
        showEmptyState();
    } finally {
        showLoading(false);
    }
}

// Display products in the grid
function displayProducts(products) {
    const container = document.getElementById('products-container');

    if (!products || products.length === 0) {
        showEmptyState();
        return;
    }

    container.innerHTML = products.map(product => createProductCard(product)).join('');
    hideEmptyState();
}

// Create a product card HTML
function createProductCard(product) {
    const categoryClass = `category-${product.category.toLowerCase().replace(/\s+/g, '-')}`;
    const stockColor = product.stock > 10 ? 'success' : product.stock > 5 ? 'warning' : 'danger';
    const sourceColor = getSourceFromId(product.id) === 'backend1' ? 'success' : 'info';
    const sourceText = getSourceFromId(product.id) === 'backend1' ? 'Backend 1' : 'Backend 2';

    return `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card product-card ${categoryClass}">
                <div class="position-relative">
                    <div class="product-image">
                        <i class="fas fa-box"></i>
                    </div>
                    <span class="badge bg-${stockColor} stock-badge">${product.stock} in stock</span>
                    <span class="badge bg-${sourceColor} source-badge">${sourceText}</span>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text text-muted">${product.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="price">$${product.price}</span>
                        <span class="badge bg-secondary">${product.category}</span>
                    </div>
                    <div class="mt-3">
                        <button class="btn btn-primary btn-sm w-100" onclick="viewProduct(${product.id})">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Determine source based on product ID (simple logic: 1-2 = backend1, 3+ = backend2)
function getSourceFromId(id) {
    return id <= 2 ? 'backend1' : 'backend2';
}

// Update statistics
function updateStatistics(data) {
    const total = data.total || 0;
    const backend1Count = data.sources?.backend1 || 0;
    const backend2Count = data.sources?.backend2 || 0;

    document.getElementById('total-products').textContent = total;
    document.getElementById('backend1-products').textContent = backend1Count;
    document.getElementById('backend2-products').textContent = backend2Count;

    document.getElementById('stats-section').style.display = 'block';
}

// View product details
async function viewProduct(productId) {
    try {
        const response = await fetch(`${backend1Url}/${productId}`);
        const data = await response.json();

        if (data.success) {
            alert(`Product Details:\n\nName: ${data.data.name}\nPrice: $${data.data.price}\nCategory: ${data.data.category}\nStock: ${data.data.stock}\nDescription: ${data.data.description}\nSource: ${data.source}`);
        } else {
            alert('Product not found');
        }
    } catch (error) {
        alert('Error loading product details');
    }
}

// Check health status
async function checkHealth() {
    const healthStatus = document.getElementById('health-status');
    healthStatus.innerHTML = '<div class="text-center"><div class="spinner-border" role="status"></div></div>';

    const modal = new bootstrap.Modal(document.getElementById('healthModal'));
    modal.show();

    const services = [
        { name: 'Frontend', url: '/health' },
        { name: 'Backend1', url: `${backend1Url}/health` }
    ];

    let statusHTML = '<div class="list-group">';

    for (const service of services) {
        try {
            const response = await fetch(service.url);
            const isHealthy = response.ok;
            const statusClass = isHealthy ? 'success' : 'danger';
            const statusIcon = isHealthy ? 'check-circle' : 'times-circle';
            const statusText = isHealthy ? 'Healthy' : 'Unhealthy';

            statusHTML += `
                <div class="list-group-item">
                    <div class="d-flex justify-content-between align-items-center">
                        <span><strong>${service.name}</strong></span>
                        <span class="badge bg-${statusClass}">
                            <i class="fas fa-${statusIcon}"></i> ${statusText}
                        </span>
                    </div>
                </div>
            `;
        } catch (error) {
            statusHTML += `
                <div class="list-group-item">
                    <div class="d-flex justify-content-between align-items-center">
                        <span><strong>${service.name}</strong></span>
                        <span class="badge bg-danger">
                            <i class="fas fa-times-circle"></i> Error
                        </span>
                    </div>
                </div>
            `;
        }
    }

    statusHTML += '</div>';
    healthStatus.innerHTML = statusHTML;
}

// Utility functions
function showLoading(show) {
    document.getElementById('loading').style.display = show ? 'block' : 'none';
}

function showError(message) {
    document.getElementById('error-message').textContent = message;
    document.getElementById('error-alert').style.display = 'block';
}

function hideError() {
    document.getElementById('error-alert').style.display = 'none';
}

function showEmptyState() {
    document.getElementById('empty-state').style.display = 'block';
    document.getElementById('stats-section').style.display = 'none';
}

function hideEmptyState() {
    document.getElementById('empty-state').style.display = 'none';
}
