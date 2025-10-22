// Leal API Documentation - JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSearch();
    initializeCopyButtons();
    initializeScrollSpy();
    initializeMobileMenu();
    initializeAnimations();
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without triggering page reload
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });
    
    // Handle direct URL access with hash
    const hash = window.location.hash;
    if (hash) {
        const targetLink = document.querySelector(`a[href="${hash}"]`);
        if (targetLink) {
            navLinks.forEach(l => l.classList.remove('active'));
            targetLink.classList.add('active');
            
            setTimeout(() => {
                const targetSection = document.querySelector(hash);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 100);
        }
    }
}

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const navSections = document.querySelectorAll('.nav-section');
    
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const query = this.value.toLowerCase().trim();
        
        searchTimeout = setTimeout(() => {
            filterNavigation(query);
        }, 300);
    });
    
    function filterNavigation(query) {
        navSections.forEach(section => {
            const sectionTitle = section.querySelector('h3').textContent.toLowerCase();
            const links = section.querySelectorAll('.nav-link');
            let hasVisibleLinks = false;
            
            if (!query) {
                // Show all if no query
                section.style.display = 'block';
                links.forEach(link => {
                    link.style.display = 'block';
                });
                return;
            }
            
            // Check section title
            const sectionMatches = sectionTitle.includes(query);
            
            // Check individual links
            links.forEach(link => {
                const linkText = link.textContent.toLowerCase();
                const linkMatches = linkText.includes(query) || sectionMatches;
                
                link.style.display = linkMatches ? 'block' : 'none';
                if (linkMatches) hasVisibleLinks = true;
            });
            
            // Show/hide section based on matches
            section.style.display = (hasVisibleLinks || sectionMatches) ? 'block' : 'none';
        });
    }
    
    // Clear search on escape
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            this.value = '';
            filterNavigation('');
            this.blur();
        }
    });
}

// Copy to clipboard functionality
function initializeCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', async function() {
            const codeBlock = this.closest('.code-example').querySelector('code');
            const text = codeBlock.textContent;
            
            try {
                await navigator.clipboard.writeText(text);
                showCopySuccess(this);
            } catch (err) {
                // Fallback for older browsers
                fallbackCopy(text);
                showCopySuccess(this);
            }
        });
    });
}

function showCopySuccess(button) {
    const originalText = button.textContent;
    button.textContent = '¡Copiado!';
    button.style.background = 'var(--success-color)';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = 'var(--primary-color)';
    }, 2000);
}

function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Fallback copy failed:', err);
    }
    
    document.body.removeChild(textArea);
}

// Scroll spy functionality
function initializeScrollSpy() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const correspondingLink = document.querySelector(`a[href="#${sectionId}"]`);
                
                if (correspondingLink) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                    
                    // Update URL
                    if (history.replaceState) {
                        history.replaceState(null, null, `#${sectionId}`);
                    }
                }
            }
        });
    }, {
        rootMargin: '-50px 0px -50px 0px',
        threshold: 0.1
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    // Create mobile menu button if screen is small
    if (window.innerWidth <= 1024) {
        createMobileMenuButton();
    }
    
    // Handle window resize
    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth <= 1024) {
            createMobileMenuButton();
        } else {
            removeMobileMenuButton();
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.remove('open');
        }
    }, 250));
}

function createMobileMenuButton() {
    // Check if button already exists
    if (document.querySelector('.mobile-menu-btn')) return;
    
    const button = document.createElement('button');
    button.className = 'mobile-menu-btn';
    button.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
        <span>Menú</span>
    `;
    
    // Add styles
    button.style.cssText = `
        position: fixed;
        top: 1rem;
        left: 1rem;
        z-index: 200;
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 0.75rem;
        border-radius: var(--radius);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        transition: all 0.2s;
    `;
    
    button.addEventListener('click', function() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('open');
        
        // Close sidebar when clicking outside
        if (sidebar.classList.contains('open')) {
            setTimeout(() => {
                document.addEventListener('click', closeSidebarOnOutsideClick);
            }, 100);
        }
    });
    
    document.body.appendChild(button);
}

function removeMobileMenuButton() {
    const button = document.querySelector('.mobile-menu-btn');
    if (button) {
        button.remove();
    }
}

function closeSidebarOnOutsideClick(e) {
    const sidebar = document.querySelector('.sidebar');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
        sidebar.classList.remove('open');
        document.removeEventListener('click', closeSidebarOnOutsideClick);
    }
}

// Animations
function initializeAnimations() {
    // Animate sections on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatedElements = document.querySelectorAll('.feature-card, .endpoint, .auth-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(el);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Copy code function (global for onclick handlers)
window.copyCode = function(button) {
    const codeBlock = button.closest('.code-example').querySelector('code');
    const text = codeBlock.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        showCopySuccess(button);
    }).catch(() => {
        fallbackCopy(text);
        showCopySuccess(button);
    });
};

// API Demo functionality (for interactive examples)
function initializeApiDemo() {
    const demoButtons = document.querySelectorAll('.demo-btn');
    
    demoButtons.forEach(button => {
        button.addEventListener('click', async function() {
            const endpoint = this.dataset.endpoint;
            const method = this.dataset.method || 'GET';
            const resultContainer = this.nextElementSibling;
            
            if (!resultContainer || !resultContainer.classList.contains('demo-result')) {
                return;
            }
            
            // Show loading state
            this.textContent = 'Ejecutando...';
            this.disabled = true;
            resultContainer.innerHTML = '<div class="loading">Cargando...</div>';
            
            try {
                // Simulate API call
                await simulateApiCall(endpoint, method);
                
                // Show mock response
                const mockResponse = getMockResponse(endpoint);
                resultContainer.innerHTML = `
                    <div class="demo-response">
                        <div class="response-status success">200 OK</div>
                        <pre><code class="language-json">${JSON.stringify(mockResponse, null, 2)}</code></pre>
                    </div>
                `;
                
                // Re-highlight code
                if (window.Prism) {
                    Prism.highlightElement(resultContainer.querySelector('code'));
                }
            } catch (error) {
                resultContainer.innerHTML = `
                    <div class="demo-response">
                        <div class="response-status error">Error</div>
                        <pre><code>${error.message}</code></pre>
                    </div>
                `;
            } finally {
                this.textContent = 'Probar API';
                this.disabled = false;
            }
        });
    });
}

async function simulateApiCall(endpoint, method) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    // Simulate occasional errors
    if (Math.random() < 0.1) {
        throw new Error('Error de conexión simulado');
    }
}

function getMockResponse(endpoint) {
    const responses = {
        '/v2/users': {
            data: [
                {
                    id: 'usr_1234567890',
                    email: 'usuario@ejemplo.com',
                    name: 'Juan Pérez',
                    points_balance: 1250,
                    tier: 'gold',
                    created_at: '2024-01-15T10:30:00Z',
                    last_activity: '2024-03-10T14:45:00Z'
                }
            ],
            meta: {
                page: 1,
                limit: 20,
                total: 156,
                total_pages: 8
            }
        },
        '/v2/loyalty/programs': {
            data: [
                {
                    id: 'prog_abc123',
                    name: 'Programa VIP',
                    description: 'Programa de lealtad para clientes frecuentes',
                    status: 'active'
                }
            ]
        }
    };
    
    return responses[endpoint] || { message: 'Respuesta de ejemplo' };
}

// Theme toggle (optional feature)
function initializeThemeToggle() {
    const toggleButton = document.createElement('button');
    toggleButton.className = 'theme-toggle';
    toggleButton.innerHTML = '🌙';
    toggleButton.style.cssText = `
        position: fixed;
        top: 1rem;
        right: 1rem;
        z-index: 200;
        background: var(--background);
        border: 1px solid var(--border-color);
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        font-size: 1.25rem;
        cursor: pointer;
        transition: all 0.2s;
        box-shadow: var(--shadow-md);
    `;
    
    toggleButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        this.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
        
        // Save preference
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        toggleButton.innerHTML = '☀️';
    }
    
    document.body.appendChild(toggleButton);
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    // Uncomment to enable theme toggle
    // initializeThemeToggle();
    
    // Initialize API demo if demo buttons exist
    if (document.querySelector('.demo-btn')) {
        initializeApiDemo();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
        }
    }
    
    // Escape to close mobile menu
    if (e.key === 'Escape') {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Tiempo de carga de la página: ${loadTime}ms`);
        }, 0);
    });
}
