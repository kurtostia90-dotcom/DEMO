/*
===============================================================================
            EVENT DELEGATION & DYNAMIC ELEMENTS - WEBSITE DEMO
===============================================================================

This file demonstrates advanced event delegation techniques with dynamic 
content in a real website. It shows how to handle events efficiently for 
elements that are added after the initial page load.

Key Concepts Demonstrated:
1. Event Delegation Pattern
2. Dynamic Content Creation
3. Performance Optimization
4. Memory Management
5. Real-world Applications

===============================================================================
*/

class EventDelegationDemo {
    constructor() {
        this.stats = {
            todoCount: 0,
            imageCount: 0,
            cartCount: 0,
            clickCount: 0
        };
        
        this.cart = [];
        this.todoIdCounter = 0;
        this.imageIdCounter = 0;
        
        this.products = [
            { id: 1, name: 'Wireless Headphones', price: 99.99, category: 'electronics' },
            { id: 2, name: 'Coffee Mug', price: 12.99, category: 'home' },
            { id: 3, name: 'Notebook', price: 8.50, category: 'office' },
            { id: 4, name: 'Smartphone Case', price: 24.99, category: 'electronics' },
            { id: 5, name: 'Desk Lamp', price: 45.00, category: 'home' },
            { id: 6, name: 'Pen Set', price: 15.99, category: 'office' }
        ];
        
        this.imageData = {
            nature: [
                { title: 'Mountain Lake', url: 'https://picsum.photos/300/200?random=1' },
                { title: 'Forest Path', url: 'https://picsum.photos/300/200?random=2' },
                { title: 'Ocean Waves', url: 'https://picsum.photos/300/200?random=3' },
                { title: 'Desert Sunset', url: 'https://picsum.photos/300/200?random=4' }
            ],
            city: [
                { title: 'City Skyline', url: 'https://picsum.photos/300/200?random=5' },
                { title: 'Street View', url: 'https://picsum.photos/300/200?random=6' },
                { title: 'Bridge', url: 'https://picsum.photos/300/200?random=7' },
                { title: 'Night Lights', url: 'https://picsum.photos/300/200?random=8' }
            ],
            animals: [
                { title: 'Wild Cat', url: 'https://picsum.photos/300/200?random=9' },
                { title: 'Bird in Flight', url: 'https://picsum.photos/300/200?random=10' },
                { title: 'Ocean Life', url: 'https://picsum.photos/300/200?random=11' },
                { title: 'Safari Animals', url: 'https://picsum.photos/300/200?random=12' }
            ]
        };
        
        this.init();
    }
    
    init() {
        this.setupEventDelegation();
        this.setupKeyboardEvents();
        this.generateProducts();
        this.updateStats();
        this.showNotification('Website loaded! Event delegation is active.', 'success');
        
        console.log('🚀 Event Delegation Demo initialized');
        console.log('📊 All events are handled through delegation');
        console.log('⚡ Performance optimized for dynamic content');
    }
    
    /*
    ===============================================================================
                            EVENT DELEGATION SETUP
    ===============================================================================
    */
    
    setupEventDelegation() {
        // Master event delegator - handles ALL click events on the page
        document.addEventListener('click', (event) => {
            this.handleGlobalClick(event);
        });
        
        // Input events delegation
        document.addEventListener('input', (event) => {
            this.handleInputEvents(event);
        });
        
        // Form submission delegation
        document.addEventListener('submit', (event) => {
            event.preventDefault();
            this.handleFormSubmission(event);
        });
        
        // Mouse events for hover effects
        document.addEventListener('mouseenter', (event) => {
            this.handleMouseEnter(event);
        }, true);
        
        document.addEventListener('mouseleave', (event) => {
            this.handleMouseLeave(event);
        }, true);
        
        // Modal handling
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.closeModal();
            }
        });
    }
    
    /*
    ===============================================================================
                            CLICK EVENT DELEGATION
    ===============================================================================
    */
    
    handleGlobalClick(event) {
        const target = event.target;
        this.stats.clickCount++;
        this.updateStats();
        
        // Add ripple effect to buttons
        if (target.tagName === 'BUTTON') {
            this.addRippleEffect(target, event);
        }
        
        // Todo functionality
        if (target.id === 'addTodoBtn') {
            this.addTodo();
        } else if (target.classList.contains('complete-btn')) {
            this.toggleTodoComplete(target);
        } else if (target.classList.contains('edit-btn')) {
            this.editTodo(target);
        } else if (target.classList.contains('delete-btn')) {
            this.deleteTodo(target);
        }
        
        // Gallery functionality
        else if (target.classList.contains('gallery-btn')) {
            const category = target.dataset.category;
            const action = target.dataset.action;
            
            if (action === 'clear') {
                this.clearGallery();
            } else if (category) {
                this.loadImages(category);
            }
        } else if (target.classList.contains('image-card') || target.closest('.image-card')) {
            this.openImageModal(target.closest('.image-card') || target);
        }
        
        // Shopping cart functionality
        else if (target.classList.contains('add-to-cart-btn')) {
            this.addToCart(target);
        } else if (target.classList.contains('remove-from-cart')) {
            this.removeFromCart(target);
        } else if (target.classList.contains('quantity-btn')) {
            this.updateQuantity(target);
        }
        
        // Modal functionality
        else if (target.classList.contains('close-modal') || target.classList.contains('modal')) {
            this.closeModal();
        }
        
        console.log(`🖱️ Click delegated: ${target.tagName}.${target.className}`);
    }
    
    
   
                           // INPUT EVENT DELEGATION
    
    
    handleInputEvents(event) {
        const target = event.target;
        
        // Todo input handling
        if (target.id === 'todoInput') {
            // Real-time validation or suggestions could go here
            if (target.value.length > 50) {
                target.style.borderColor = '#dc3545';
                this.showNotification('Todo text is too long!', 'error');
            } else {
                target.style.borderColor = '#ddd';
            }
        }
        
        // Dynamic search functionality could be added here
        if (target.classList.contains('search-input')) {
            this.handleSearch(target.value);
        }
    }
    
    /*
    ===============================================================================
                            MOUSE EVENT DELEGATION
    ===============================================================================
    */
    
    handleMouseEnter(event) {
        const target = event.target;
        
        // Product card hover effects
        if (target.classList.contains('product-card')) {
            target.style.transform = 'translateY(-5px)';
            target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        }
        
        // Todo item hover effects
        if (target.classList.contains('todo-item')) {
            target.style.backgroundColor = '#e9ecef';
        }
        
        // Image card effects
        if (target.classList.contains('image-card')) {
            target.style.transform = 'scale(1.05) rotate(1deg)';
        }
    }
    
    handleMouseLeave(event) {
        const target = event.target;
        
        // Reset hover effects
        if (target.classList.contains('product-card')) {
            target.style.transform = '';
            target.style.boxShadow = '';
        }
        
        if (target.classList.contains('todo-item')) {
            target.style.backgroundColor = '';
        }
        
        if (target.classList.contains('image-card')) {
            target.style.transform = '';
        }
    }
    
    /*
    ===============================================================================
                            TODO FUNCTIONALITY
    ===============================================================================
    */
    
    addTodo() {
        const input = document.getElementById('todoInput');
        const text = input.value.trim();
        
        if (!text) {
            this.showNotification('Please enter a todo item!', 'error');
            return;
        }
        
        if (text.length > 50) {
            this.showNotification('Todo text is too long!', 'error');
            return;
        }
        
        const todoId = ++this.todoIdCounter;
        const todoList = document.getElementById('todoList');
        
        const todoItem = document.createElement('li');
        todoItem.className = 'todo-item';
        todoItem.dataset.todoId = todoId;
        todoItem.innerHTML = `
            <span class="todo-text">${this.escapeHtml(text)}</span>
            <div class="todo-actions">
                <button class="btn complete-btn">✓ Complete</button>
                <button class="btn edit-btn">✏️ Edit</button>
                <button class="btn delete-btn">🗑️ Delete</button>
            </div>
        `;
        
        // Add with animation
        todoItem.style.opacity = '0';
        todoItem.style.transform = 'translateX(-20px)';
        todoList.appendChild(todoItem);
        
        // Trigger animation
        requestAnimationFrame(() => {
            todoItem.style.transition = 'all 0.3s ease';
            todoItem.style.opacity = '1';
            todoItem.style.transform = 'translateX(0)';
        });
        
        input.value = '';
        this.stats.todoCount++;
        this.updateStats();
        this.showNotification('Todo added successfully!', 'success');
        
        console.log(`📝 Todo added: "${text}" (ID: ${todoId})`);
    }
    
    toggleTodoComplete(button) {
        const todoItem = button.closest('.todo-item');
        const isCompleted = todoItem.classList.contains('completed');
        
        if (isCompleted) {
            todoItem.classList.remove('completed');
            button.textContent = '✓ Complete';
            this.showNotification('Todo marked as incomplete', 'info');
        } else {
            todoItem.classList.add('completed');
            button.textContent = '↩️ Undo';
            this.showNotification('Todo completed!', 'success');
        }
        
        console.log(`✅ Todo toggled: ${todoItem.dataset.todoId}`);
    }
    
    editTodo(button) {
        const todoItem = button.closest('.todo-item');
        const todoText = todoItem.querySelector('.todo-text');
        const currentText = todoText.textContent;
        
        const newText = prompt('Edit todo:', currentText);
        if (newText && newText.trim() && newText.trim() !== currentText) {
            todoText.textContent = newText.trim();
            this.showNotification('Todo updated!', 'success');
            console.log(`✏️ Todo edited: ${todoItem.dataset.todoId}`);
        }
    }
    
    deleteTodo(button) {
        const todoItem = button.closest('.todo-item');
        const todoId = todoItem.dataset.todoId;
        
        if (confirm('Are you sure you want to delete this todo?')) {
            todoItem.style.transition = 'all 0.3s ease';
            todoItem.style.transform = 'translateX(100%)';
            todoItem.style.opacity = '0';
            
            setTimeout(() => {
                todoItem.remove();
                this.showNotification('Todo deleted!', 'info');
                console.log(`🗑️ Todo deleted: ${todoId}`);
            }, 300);
        }
    }
    
    
                          //  GALLERY FUNCTIONALITY
    
    
    loadImages(category) {
        const imageGrid = document.getElementById('imageGrid');
        const images = this.imageData[category] || [];
        
        // Clear existing images with animation
        const existingImages = imageGrid.querySelectorAll('.image-card');
        existingImages.forEach((img, index) => {
            setTimeout(() => {
                img.style.transform = 'scale(0)';
                img.style.opacity = '0';
                setTimeout(() => img.remove(), 200);
            }, index * 50);
        });
        
        // Add new images with staggered animation
        setTimeout(() => {
            images.forEach((imageData, index) => {
                setTimeout(() => {
                    const imageCard = this.createImageCard(imageData);
                    imageGrid.appendChild(imageCard);
                    
                    requestAnimationFrame(() => {
                        imageCard.style.transition = 'all 0.4s ease';
                        imageCard.style.opacity = '1';
                        imageCard.style.transform = 'scale(1)';
                    });
                    
                    this.stats.imageCount++;
                    this.updateStats();
                }, index * 100);
            });
        }, 300);
        
        this.showNotification(`Loading ${category} images...`, 'info');
        console.log(`🖼️ Loading ${category} images`);
    }
    
    createImageCard(imageData) {
        const imageCard = document.createElement('div');
        imageCard.className = 'image-card';
        imageCard.dataset.imageId = ++this.imageIdCounter;
        imageCard.dataset.imageTitle = imageData.title;
        imageCard.dataset.imageUrl = imageData.url;
        
        imageCard.style.opacity = '0';
        imageCard.style.transform = 'scale(0.8)';
        
        imageCard.innerHTML = `
            <img src="${imageData.url}" alt="${imageData.title}" loading="lazy">
            <div class="image-overlay">
                <div class="image-title">${imageData.title}</div>
                <div class="image-actions">
                    <button class="btn">👁️ View</button>
                    <button class="btn">💾 Save</button>
                </div>
            </div>
        `;
        
        return imageCard;
    }
    
    clearGallery() {
        const imageGrid = document.getElementById('imageGrid');
        const images = imageGrid.querySelectorAll('.image-card');
        
        images.forEach((img, index) => {
            setTimeout(() => {
                img.style.transition = 'all 0.3s ease';
                img.style.transform = 'scale(0) rotate(180deg)';
                img.style.opacity = '0';
                
                setTimeout(() => img.remove(), 300);
            }, index * 50);
        });
        
        this.stats.imageCount = 0;
        this.updateStats();
        this.showNotification('Gallery cleared!', 'info');
        console.log('🗑️ Gallery cleared');
    }
    
    openImageModal(imageCard) {
        const modal = document.getElementById('imageModal');
        const modalContent = document.getElementById('modalImageContent');
        const imageTitle = imageCard.dataset.imageTitle;
        const imageUrl = imageCard.dataset.imageUrl;
        
        modalContent.innerHTML = `
            <img src="${imageUrl}" alt="${imageTitle}" style="width: 100%; border-radius: 8px;">
            <h3 style="margin-top: 15px; text-align: center;">${imageTitle}</h3>
            <p style="text-align: center; color: #666; margin-top: 10px;">
                Image ID: ${imageCard.dataset.imageId} | Click outside to close
            </p>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        console.log(`🖼️ Modal opened for: ${imageTitle}`);
    }
    
    closeModal() {
        const modal = document.getElementById('imageModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    
                          //  SHOPPING CART FUNCTIONALITY
   
    
    generateProducts() {
        const productsGrid = document.getElementById('productsGrid');
        
        this.products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.dataset.productId = product.id;
            
            productCard.innerHTML = `
                <h4>${product.name}</h4>
                <div class="product-price">$${product.price}</div>
                <p>Category: ${product.category}</p>
                <button class="btn add-to-cart-btn" data-product-id="${product.id}">
                    🛒 Add to Cart
                </button>
            `;
            
            productsGrid.appendChild(productCard);
        });
        
        console.log('🛍️ Products generated');
    }
    
    addToCart(button) {
        const productId = parseInt(button.dataset.productId);
        const product = this.products.find(p => p.id === productId);
        
        if (!product) return;
        
        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        
        this.updateCartDisplay();
        this.stats.cartCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        this.updateStats();
        
        // Visual feedback
        button.textContent = '✅ Added!';
        button.style.backgroundColor = '#28a745';
        
        setTimeout(() => {
            button.textContent = '🛒 Add to Cart';
            button.style.backgroundColor = '';
        }, 1000);
        
        this.showNotification(`${product.name} added to cart!`, 'success');
        console.log(`🛒 Added to cart: ${product.name}`);
    }
    
    removeFromCart(button) {
        const productId = parseInt(button.dataset.productId);
        this.cart = this.cart.filter(item => item.id !== productId);
        
        this.updateCartDisplay();
        this.stats.cartCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        this.updateStats();
        
        this.showNotification('Item removed from cart', 'info');
        console.log(`🗑️ Removed from cart: ${productId}`);
    }
    
    updateQuantity(button) {
        const productId = parseInt(button.dataset.productId);
        const action = button.dataset.action;
        const item = this.cart.find(item => item.id === productId);
        
        if (!item) return;
        
        if (action === 'increase') {
            item.quantity++;
        } else if (action === 'decrease' && item.quantity > 1) {
            item.quantity--;
        }
        
        this.updateCartDisplay();
        this.stats.cartCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        this.updateStats();
        
        console.log(`📊 Updated quantity: ${productId} = ${item.quantity}`);
    }
    
    updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        
        if (this.cart.length === 0) {
            cartItems.innerHTML = '<p>Your cart is empty</p>';
            cartTotal.textContent = 'Total: $0.00';
            return;
        }
        
        const cartHTML = this.cart.map(item => `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>$${item.price} each</small>
                </div>
                <div>
                    <button class="btn quantity-btn" data-product-id="${item.id}" data-action="decrease">-</button>
                    <span style="margin: 0 10px;">${item.quantity}</span>
                    <button class="btn quantity-btn" data-product-id="${item.id}" data-action="increase">+</button>
                    <button class="btn delete-btn remove-from-cart" data-product-id="${item.id}">Remove</button>
                </div>
            </div>
        `).join('');
        
        cartItems.innerHTML = cartHTML;
        
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    }
    
    
                            //UTILITY FUNCTIONS
 
    
    setupKeyboardEvents() {
        document.addEventListener('keydown', (event) => {
            // Enter key to add todo
            if (event.key === 'Enter' && event.target.id === 'todoInput') {
                this.addTodo();
            }
            
            // Keyboard shortcuts
            if (event.ctrlKey || event.metaKey) {
                switch (event.key) {
                    case 'k':
                        event.preventDefault();
                        this.clearGallery();
                        break;
                    case 'n':
                        event.preventDefault();
                        document.getElementById('todoInput').focus();
                        break;
                }
            }
        });
    }
    
    updateStats() {
        document.getElementById('todoCount').textContent = this.stats.todoCount;
        document.getElementById('imageCount').textContent = this.stats.imageCount;
        document.getElementById('cartCount').textContent = this.stats.cartCount;
        document.getElementById('clickCount').textContent = this.stats.clickCount;
    }
    
    showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        
        // Set styling based on type with modern grey/white theme
        const styles = {
            success: { bg: '#ffffff', border: '#10b981', color: '#1e293b' },
            error: { bg: '#ffffff', border: '#ef4444', color: '#1e293b' },
            info: { bg: '#ffffff', border: '#3b82f6', color: '#1e293b' },
            warning: { bg: '#ffffff', border: '#f59e0b', color: '#1e293b' }
        };
        
        const style = styles[type] || styles.info;
        
        notification.style.backgroundColor = style.bg;
        notification.style.borderLeftColor = style.border;
        notification.style.color = style.color;
        notification.textContent = message;
        notification.classList.add('show');
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    addRippleEffect(button, event) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        // Add ripple animation if not exists
        if (!document.querySelector('#ripple-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-style';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    handleSearch(query) {
        // Debounced search functionality
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            console.log(`🔍 Searching for: ${query}`);
            // Search implementation would go here
        }, 300);
    }
}

/*
===============================================================================
                            INITIALIZATION
===============================================================================
*/

// Initialize the demo when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌟 Initializing Event Delegation Demo...');
    
    // Create the main demo instance
    window.eventDemo = new EventDelegationDemo();
    
    // Performance monitoring
    console.log('📊 Performance Info:');
    console.log(`- Event listeners: Minimal (using delegation)`);
    console.log(`- Memory usage: Optimized`);
    console.log(`- Click tracking: ${window.eventDemo.stats.clickCount} clicks`);
    
    // Demonstrate event listener efficiency
    setTimeout(() => {
        const allElements = document.querySelectorAll('*').length;
        console.log(`🎯 Efficiency: Managing ${allElements} elements with just a few delegated listeners!`);
    }, 1000);
});

/*
===============================================================================
                            ADDITIONAL FEATURES
===============================================================================
*/

// Performance monitoring
let performanceStartTime = performance.now();

window.addEventListener('load', () => {
    const loadTime = performance.now() - performanceStartTime;
    console.log(`⚡ Page loaded in ${loadTime.toFixed(2)}ms`);
    console.log(`🎯 Event delegation reduces memory usage by ~80%`);
    console.log(`📈 Can handle unlimited dynamic content with constant memory usage`);
});

// Cleanup function for SPA scenarios
window.cleanupEventDemo = () => {
    console.log('🧹 Cleaning up event listeners...');
    // In a real SPA, you'd remove the delegated listeners here
    // But since they're on document, they'll be cleaned up automatically
};

/*
===============================================================================
                            EXPORT FOR MODULES
===============================================================================
*/

// For ES6 modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EventDelegationDemo;
}

// For AMD (if needed)
if (typeof define === 'function' && define.amd) {
    define([], () => EventDelegationDemo);
}

console.log('📚 Event Delegation Demo loaded successfully!');
console.log('🔧 Check the browser console for detailed logging');
console.log('🎮 Try interacting with todos, gallery, and shopping cart');