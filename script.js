// Enhanced JavaScript from lizer-d-cool-head
class BoroTechWebsite {
    constructor() {
        try {
            // Initialize memory-efficient particle tracking
            this.particles = []; // Legacy array for compatibility
            this.navParticles = []; // Legacy array for compatibility
            this.particleTimers = []; // Legacy timers for cleanup
            this.navParticleTimers = []; // Legacy timers for cleanup
            
            // New pool-based tracking
            this.particlePool = [];
            this.activeParticles = new Set();
            this.navParticlePool = [];
            this.activeNavParticles = new Set();
            this.particleInterval = null;
            this.navParticleInterval = null;
            
            this.animationFrameId = null;
            this.isDestroyed = false;
            
            // DOM element cache for performance optimization
            this.domCache = {
                navLinks: null,
                ctaPrimary: null,
                ctaSecondary: null,
                serviceCards: null,
                navContainer: null,
                heroSection: null,
                heroVisual: null,
                processNodes: null,
                advantageCards: null,
                missionCards: null,
                sections: null
            };
            
            // Performance optimization flags
            this.performanceOptimizations = {
                useRequestAnimationFrame: true,
                throttleScrollDelay: 200, // Increased from 100ms
                debounceResizeDelay: 250,
                maxConcurrentAnimations: 10
            };
            
            // Memory monitoring
            this.memoryMonitor = {
                lastCheck: Date.now(),
                particleCount: 0,
                navParticleCount: 0
            };
            
            this.init();
            this.setupEventListeners();
        } catch (error) {
            console.error('Error initializing BoroTechWebsite:', error);
            this.handleInitializationError(error);
        }
    }

    init() {
        try {
            console.log('Boro-tech website initialized');
            this.currentSection = 'hero';
            
            // Initialize DOM cache for performance
            this.initializeDOMCache();
            
            this.initParticleSystem();
            this.initStunningEffects();
            
            // Start monitoring systems
            this.monitorMemory();
            this.monitorPerformance();
        } catch (error) {
            console.error('Error in init():', error);
            this.handleInitializationError(error);
        }
    }
    
    // Initialize DOM element cache for performance optimization
    initializeDOMCache() {
        try {
            // Cache frequently accessed DOM elements
            this.domCache.navLinks = document.querySelectorAll('.nav-link');
            this.domCache.ctaPrimary = document.getElementById('ctaPrimary');
            this.domCache.ctaSecondary = document.getElementById('ctaSecondary');
            this.domCache.serviceCards = document.querySelectorAll('.service-card');
            this.domCache.navContainer = document.querySelector('.nav-container');
            this.domCache.heroSection = document.querySelector('.hero-section');
            this.domCache.heroVisual = document.querySelector('.hero-visual');
            this.domCache.processNodes = document.querySelectorAll('.process-node');
            this.domCache.advantageCards = document.querySelectorAll('.advantage-card');
            this.domCache.missionCards = document.querySelectorAll('.mission-card');
            this.domCache.sections = document.querySelectorAll('section[id]');
            
            console.log('DOM cache initialized successfully');
        } catch (error) {
            console.error('Error initializing DOM cache:', error);
        }
    }
    
    // Get cached DOM element or query if not cached
    getCachedElement(selector, useQuerySelector = true) {
        try {
            if (this.domCache[selector]) {
                return this.domCache[selector];
            }
            
            // Cache miss - query and cache
            const element = useQuerySelector ? 
                document.querySelector(selector) : 
                document.getElementById(selector);
            
            if (element) {
                this.domCache[selector] = element;
            }
            
            return element;
        } catch (error) {
            console.error('Error getting cached element:', error);
            return null;
        }
    }

    setupEventListeners() {
        try {
            // Futuristic navigation interactions
            this.setupFuturisticNavigation();
            
            // Navigation smooth scrolling
            this.setupNavigationListeners();
            
            // CTA buttons
            this.setupCTAButtons();
            
            // Scroll events for navigation highlighting
            this.setupScrollListeners();
            
            // Service card interactions
            this.setupServiceCardListeners();
        } catch (error) {
            console.error('Error setting up event listeners:', error);
        }
    }

    setupNavigationListeners() {
        try {
            const navLinks = this.domCache.navLinks;
            if (!navLinks || !navLinks.length) {
                console.warn('No navigation links found');
                return;
            }
            
            // Use event delegation for better performance
            const navContainer = this.domCache.navContainer;
            if (navContainer) {
                navContainer.addEventListener('click', (e) => {
                    try {
                        if (e.target.classList.contains('nav-link')) {
                            e.preventDefault();
                            const targetSection = e.target.getAttribute('data-section');
                            if (targetSection) {
                                this.scrollToSection(targetSection);
                            } else {
                                console.warn('Navigation link missing data-section attribute');
                            }
                        }
                    } catch (error) {
                        console.error('Error handling navigation click:', error);
                    }
                });
            }
        } catch (error) {
            console.error('Error setting up navigation listeners:', error);
        }
    }

    setupCTAButtons() {
        try {
            const ctaPrimary = this.domCache.ctaPrimary;
            if (ctaPrimary) {
                ctaPrimary.addEventListener('click', () => {
                    try {
                        this.scrollToSection('services');
                    } catch (error) {
                        console.error('Error handling primary CTA click:', error);
                    }
                });
            } else {
                console.warn('Primary CTA button not found');
            }

            const ctaSecondary = this.domCache.ctaSecondary;
            if (ctaSecondary) {
                ctaSecondary.addEventListener('click', () => {
                    try {
                        this.scrollToSection('mission');
                    } catch (error) {
                        console.error('Error handling secondary CTA click:', error);
                    }
                });
            } else {
                console.warn('Secondary CTA button not found');
            }
        } catch (error) {
            console.error('Error setting up CTA buttons:', error);
        }
    }

    setupScrollListeners() {
        try {
            // Use requestAnimationFrame for smoother scroll handling
            let scrollTimeout = null;
            let isScrolling = false;
            
            const optimizedScrollHandler = () => {
                if (!isScrolling) {
                    requestAnimationFrame(() => {
                        try {
                            this.updateActiveNavigation();
                            isScrolling = false;
                        } catch (error) {
                            console.error('Error updating active navigation:', error);
                            isScrolling = false;
                        }
                    });
                    isScrolling = true;
                }
                
                // Clear existing timeout
                if (scrollTimeout) {
                    clearTimeout(scrollTimeout);
                }
                
                // Set new timeout for cleanup
                scrollTimeout = setTimeout(() => {
                    isScrolling = false;
                }, this.performanceOptimizations.throttleScrollDelay);
            };
            
            window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
            
            // Store reference for cleanup
            this.scrollHandler = optimizedScrollHandler;
            
        } catch (error) {
            console.error('Error setting up scroll listeners:', error);
        }
    }

    setupServiceCardListeners() {
        try {
            const serviceCards = this.domCache.serviceCards;
            if (!serviceCards || !serviceCards.length) {
                console.warn('No service cards found');
                return;
            }
            
            // Use event delegation for better performance
            document.addEventListener('mouseenter', (e) => {
                try {
                    if (e.target && e.target.closest && e.target.closest('.service-card')) {
                        const card = e.target.closest('.service-card');
                        if (card) {
                            card.style.transform = 'translateY(-5px)';
                            card.style.transition = 'transform 0.3s ease';
                        }
                    }
                } catch (error) {
                    console.error('Error handling service card mouseenter:', error);
                }
            }, true);
            
            document.addEventListener('mouseleave', (e) => {
                try {
                    if (e.target && e.target.closest && e.target.closest('.service-card')) {
                        const card = e.target.closest('.service-card');
                        if (card) {
                            card.style.transform = 'translateY(0)';
                            card.style.transition = 'transform 0.3s ease';
                        }
                    }
                } catch (error) {
                    console.error('Error handling service card mouseleave:', error);
                }
            }, true);
            
        } catch (error) {
            console.error('Error setting up service card listeners:', error);
        }
    }

    setupFuturisticNavigation() {
        try {
            // Add particle effects to navigation
            this.createNavigationParticles();
        } catch (error) {
            console.error('Error setting up futuristic navigation:', error);
        }
    }

    createNavigationParticles() {
        try {
            const navContainer = document.querySelector('.nav-container');
            if (!navContainer) {
                console.warn('Navigation container not found');
                return;
            }
            
            // Initialize navigation particle pool
            this.navParticlePool = [];
            this.activeNavParticles = new Set();
            this.maxNavParticles = 8; // Reduced from 20
            
            // Create navigation particle pool
            for (let i = 0; i < this.maxNavParticles; i++) {
                this.createNavParticlePool(navContainer);
            }
            
            // Start navigation particle animation
            this.startNavParticleAnimation();
            
        } catch (error) {
            console.error('Error creating navigation particles:', error);
        }
    }
    
    // Create navigation particle pool
    createNavParticlePool(container) {
        try {
            const particle = document.createElement('div');
            particle.className = 'nav-particle';
            particle.style.display = 'none'; // Initially hidden
            
            this.navParticlePool.push(particle);
            container.appendChild(particle);
            
        } catch (error) {
            console.error('Error creating navigation particle pool:', error);
        }
    }
    
    // Activate navigation particle from pool
    activateNavParticle() {
        try {
            if (this.isDestroyed || this.navParticlePool.length === 0) return;
            
            const particle = this.navParticlePool.pop();
            if (!particle) return;
            
            const duration = 3 + Math.random() * 4;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: #00ffff;
                border-radius: 50%;
                pointer-events: none;
                opacity: 0;
                animation: floatParticle ${duration}s linear infinite;
                left: ${x}%;
                top: ${y}%;
                display: block;
            `;
            
            // Fade in
            particle.style.transition = 'opacity 0.3s ease';
            particle.style.opacity = '0.6';
            
            this.activeNavParticles.add(particle);
            
            // Return to pool after animation
            setTimeout(() => {
                try {
                    if (this.isDestroyed || !this.activeNavParticles.has(particle)) return;
                    
                    particle.style.transition = 'opacity 0.3s ease';
                    particle.style.opacity = '0';
                    
                    setTimeout(() => {
                        if (this.isDestroyed) return;
                        
                        particle.style.display = 'none';
                        particle.style.transition = '';
                        this.activeNavParticles.delete(particle);
                        this.navParticlePool.push(particle);
                    }, 300);
                    
                } catch (error) {
                    console.error('Error in navigation particle lifecycle:', error);
                }
            }, duration * 1000);
            
        } catch (error) {
            console.error('Error activating navigation particle:', error);
        }
    }
    
    // Start navigation particle animation
    startNavParticleAnimation() {
        try {
            if (this.isDestroyed) return;
            
            const activateNavParticles = () => {
                if (this.isDestroyed) return;
                
                // Activate 1-2 navigation particles at a time
                const particlesToActivate = Math.min(2, this.navParticlePool.length);
                for (let i = 0; i < particlesToActivate; i++) {
                    this.activateNavParticle();
                }
            };
            
            // Initial activation
            activateNavParticles();
            
            // Set up interval for navigation particle activation
            this.navParticleInterval = setInterval(activateNavParticles, 3000); // Every 3 seconds
            
        } catch (error) {
            console.error('Error starting navigation particle animation:', error);
        }
    }



    scrollToSection(sectionId) {
        try {
            if (!sectionId) {
                console.warn('scrollToSection called without sectionId');
                return;
            }

            const section = document.getElementById(sectionId);
            if (!section) {
                console.warn(`Section with id '${sectionId}' not found`);
                return;
            }

            const navContainer = this.domCache.navContainer;
            if (!navContainer) {
                console.warn('Navigation container not found');
                return;
            }

            const navHeight = navContainer.offsetHeight;
            const targetPosition = section.offsetTop - navHeight;

            // Use requestAnimationFrame for smoother scrolling
            if (this.performanceOptimizations.useRequestAnimationFrame) {
                requestAnimationFrame(() => {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                });
            } else {
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }

            this.currentSection = sectionId;
        } catch (error) {
            console.error('Error scrolling to section:', error);
        }
    }

    updateActiveNavigation() {
        try {
            const sections = this.domCache.sections;
            const navLinks = this.domCache.navLinks;

            if (!sections || !sections.length) {
                console.warn('No sections with id found');
                return;
            }

            if (!navLinks || !navLinks.length) {
                console.warn('No navigation links found');
                return;
            }

            // Cache scroll position to avoid repeated queries
            const scrollY = window.pageYOffset;
            let current = '';
            
            // Optimize section checking with early exit
            for (let i = sections.length - 1; i >= 0; i--) {
                try {
                    const section = sections[i];
                    const sectionTop = section.offsetTop - 100;
                    if (scrollY >= sectionTop) {
                        current = section.getAttribute('id');
                        break; // Found current section, exit early
                    }
                } catch (error) {
                    console.error('Error processing section:', error);
                }
            }

            // Batch DOM updates for better performance
            const fragment = document.createDocumentFragment();
            navLinks.forEach(link => {
                try {
                    const isActive = link.getAttribute('data-section') === current;
                    if (isActive && !link.classList.contains('active')) {
                        link.classList.add('active');
                    } else if (!isActive && link.classList.contains('active')) {
                        link.classList.remove('active');
                    }
                } catch (error) {
                    console.error('Error updating navigation link:', error);
                }
            });
        } catch (error) {
            console.error('Error updating active navigation:', error);
        }
    }


    // D3.js data flow visualization removed - not needed

    // Enhanced Particle System with proper memory management
    initParticleSystem() {
        try {
            const heroSection = document.querySelector('.hero-section');
            if (!heroSection) {
                console.warn('Hero section not found');
                return;
            }
            
            // Store container reference for cleanup
            this.particleContainer = document.createElement('div');
            this.particleContainer.className = 'particle-container';
            this.particleContainer.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1;
            `;
            
            heroSection.appendChild(this.particleContainer);
            
            // Initialize particle pool for better memory management
            this.particlePool = [];
            this.activeParticles = new Set();
            this.maxParticles = 15; // Reduced from 50 to prevent memory issues
            
            // Create initial particle pool
            for (let i = 0; i < this.maxParticles; i++) {
                this.createParticlePool(this.particleContainer);
            }
            
            // Start particle animation loop
            this.startParticleAnimation();
        } catch (error) {
            console.error('Error initializing particle system:', error);
        }
    }

    // Create particle pool for memory-efficient particle management
    createParticlePool(container) {
        try {
            if (!container) {
                console.warn('Container not provided for particle creation');
                return;
            }
            
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.display = 'none'; // Initially hidden
            
            // Store particle in pool
            this.particlePool.push(particle);
            container.appendChild(particle);
            
        } catch (error) {
            console.error('Error creating particle pool:', error);
        }
    }
    
    // Activate particle from pool with animation
    activateParticle() {
        try {
            if (this.isDestroyed || this.particlePool.length === 0) return;
            
            const particle = this.particlePool.pop();
            if (!particle) return;
            
            // Configure particle properties
            const size = Math.random() * 4 + 2;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 15 + 8; // Reduced duration
            const opacity = Math.random() * 0.5 + 0.2;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, ${opacity});
                border-radius: 50%;
                left: ${x}%;
                top: ${y}%;
                animation: particleFloat ${duration}s ease-in-out infinite;
                box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
                display: block;
                opacity: 0;
            `;
            
            // Fade in
            particle.style.transition = 'opacity 0.5s ease';
            particle.style.opacity = '1';
            
            // Track active particle
            this.activeParticles.add(particle);
            
            // Return to pool after animation
            setTimeout(() => {
                try {
                    if (this.isDestroyed || !this.activeParticles.has(particle)) return;
                    
                    // Fade out
                    particle.style.transition = 'opacity 0.5s ease';
                    particle.style.opacity = '0';
                    
                    setTimeout(() => {
                        if (this.isDestroyed) return;
                        
                        // Reset and return to pool
                        particle.style.display = 'none';
                        particle.style.transition = '';
                        this.activeParticles.delete(particle);
                        this.particlePool.push(particle);
                    }, 500);
                    
                } catch (error) {
                    console.error('Error in particle lifecycle:', error);
                }
            }, duration * 1000);
            
        } catch (error) {
            console.error('Error activating particle:', error);
        }
    }
    
    // Start particle animation loop
    startParticleAnimation() {
        try {
            if (this.isDestroyed) return;
            
            // Activate particles at intervals
            const activateParticles = () => {
                if (this.isDestroyed) return;
                
                // Activate 2-3 particles at a time
                const particlesToActivate = Math.min(3, this.particlePool.length);
                for (let i = 0; i < particlesToActivate; i++) {
                    this.activateParticle();
                }
            };
            
            // Initial activation
            activateParticles();
            
            // Set up interval for continuous particle activation
            this.particleInterval = setInterval(activateParticles, 2000); // Every 2 seconds
            
        } catch (error) {
            console.error('Error starting particle animation:', error);
        }
    }


    // Enhanced Visual Effects
    initStunningEffects() {
        try {
            // Add parallax effect to hero visual
            this.initParallaxEffect();
            
            // Add interactive process node effects
            this.initProcessNodeInteractions();
            
            // Add scroll-triggered animations
            this.initScrollAnimations();
            
            // Add hover effects for service cards
            this.initServiceCardEffects();
        } catch (error) {
            console.error('Error initializing stunning effects:', error);
        }
    }

    initParallaxEffect() {
        try {
            const heroVisual = this.domCache.heroVisual;
            if (!heroVisual) {
                console.warn('Hero visual element not found');
                return;
            }

            // Optimized parallax with requestAnimationFrame
            let parallaxFrame = null;
            let lastScrollY = 0;
            
            this.handleParallaxScroll = () => {
                if (parallaxFrame) return; // Prevent multiple frames
                
                parallaxFrame = requestAnimationFrame(() => {
                    try {
                        if (this.isDestroyed) {
                            parallaxFrame = null;
                            return;
                        }
                        
                        const scrolled = window.pageYOffset;
                        
                        // Only update if scroll position changed significantly
                        if (Math.abs(scrolled - lastScrollY) > 1) {
                            const rate = scrolled * -0.3; // Reduced intensity for smoother effect
                            heroVisual.style.transform = `translateY(${rate}px)`;
                            lastScrollY = scrolled;
                        }
                        
                        parallaxFrame = null;
                    } catch (error) {
                        console.error('Error in parallax scroll handler:', error);
                        parallaxFrame = null;
                    }
                });
            };

            window.addEventListener('scroll', this.handleParallaxScroll, { passive: true });
        } catch (error) {
            console.error('Error initializing parallax effect:', error);
        }
    }

    initProcessNodeInteractions() {
        try {
            const processNodes = this.domCache.processNodes;
            
            if (!processNodes || !processNodes.length) {
                console.warn('No process nodes found');
                return;
            }
            
            // Use event delegation for better performance
            document.addEventListener('click', (e) => {
                try {
                    if (e.target.closest('.process-node')) {
                        const node = e.target.closest('.process-node');
                        const processName = node.getAttribute('data-process');
                        if (processName) {
                            this.showProcessInfo(processName);
                        } else {
                            console.warn('Process node missing data-process attribute');
                        }
                    }
                } catch (error) {
                    console.error('Error handling process node click:', error);
                }
            });
        } catch (error) {
            console.error('Error initializing process node interactions:', error);
        }
    }

    initScrollAnimations() {
        try {
            // Intersection Observer for scroll-triggered animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            this.scrollObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    try {
                        if (entry.isIntersecting && !this.isDestroyed) {
                            entry.target.classList.add('animate-in');
                            // Unobserve after animation to improve performance
                            this.scrollObserver.unobserve(entry.target);
                        }
                    } catch (error) {
                        console.error('Error in scroll observer callback:', error);
                    }
                });
            }, observerOptions);

            // Observe service cards using cached elements
            const serviceCards = this.domCache.serviceCards;
            if (serviceCards && serviceCards.length) {
                serviceCards.forEach(card => {
                    try {
                        this.scrollObserver.observe(card);
                    } catch (error) {
                        console.error('Error observing service card:', error);
                    }
                });
            }

            // Observe advantage cards using cached elements
            const advantageCards = this.domCache.advantageCards;
            if (advantageCards && advantageCards.length) {
                advantageCards.forEach(card => {
                    try {
                        this.scrollObserver.observe(card);
                    } catch (error) {
                        console.error('Error observing advantage card:', error);
                    }
                });
            }

            // Observe mission cards using cached elements
            const missionCards = this.domCache.missionCards;
            if (missionCards && missionCards.length) {
                missionCards.forEach(card => {
                    try {
                        this.scrollObserver.observe(card);
                    } catch (error) {
                        console.error('Error observing mission card:', error);
                    }
                });
            }
        } catch (error) {
            console.error('Error initializing scroll animations:', error);
        }
    }

    initServiceCardEffects() {
        try {
            const serviceCards = this.domCache.serviceCards;
            
            if (!serviceCards || !serviceCards.length) {
                console.warn('No service cards found for effects');
                return;
            }
            
            // Enhanced hover effects using event delegation
            document.addEventListener('mouseenter', (e) => {
                try {
                    if (e.target && e.target.closest && e.target.closest('.service-card')) {
                        const card = e.target.closest('.service-card');
                        if (card) {
                            card.style.transform = 'translateY(-8px) scale(1.02)';
                            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                            card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                        }
                    }
                } catch (error) {
                    console.error('Error handling service card mouseenter:', error);
                }
            }, true);
            
            document.addEventListener('mouseleave', (e) => {
                try {
                    if (e.target && e.target.closest && e.target.closest('.service-card')) {
                        const card = e.target.closest('.service-card');
                        if (card) {
                            card.style.transform = 'translateY(0) scale(1)';
                            card.style.boxShadow = 'var(--shadow-md)';
                        }
                    }
                } catch (error) {
                    console.error('Error handling service card mouseleave:', error);
                }
            }, true);
            
        } catch (error) {
            console.error('Error initializing service card effects:', error);
        }
    }

    showProcessInfo(processName) {
        try {
            if (!processName) {
                console.warn('showProcessInfo called without processName');
                return;
            }

            // Create a simple tooltip or info display
            const existingTooltip = document.querySelector('.process-tooltip');
            if (existingTooltip) {
                try {
                    existingTooltip.remove();
                } catch (error) {
                    console.error('Error removing existing tooltip:', error);
                }
            }

            const tooltip = document.createElement('div');
            tooltip.className = 'process-tooltip';
            tooltip.innerHTML = `
                <div class="tooltip-content">
                    <h4>${processName}</h4>
                    <p>Learn more about our ${processName.toLowerCase()} capabilities</p>
                </div>
            `;
            
            // Style the tooltip
            tooltip.style.cssText = `
                position: fixed;
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 1rem;
                border-radius: 8px;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            // Animate in
            setTimeout(() => {
                try {
                    tooltip.style.opacity = '1';
                } catch (error) {
                    console.error('Error animating tooltip in:', error);
                }
            }, 10);
            
            // Remove after 3 seconds
            setTimeout(() => {
                try {
                    tooltip.style.opacity = '0';
                    setTimeout(() => {
                        try {
                            if (tooltip.parentNode) {
                                tooltip.parentNode.removeChild(tooltip);
                            }
                        } catch (error) {
                            console.error('Error removing tooltip:', error);
                        }
                    }, 300);
                } catch (error) {
                    console.error('Error animating tooltip out:', error);
                }
            }, 3000);
        } catch (error) {
            console.error('Error showing process info:', error);
        }
    }

    // Utility function for throttling
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Memory monitoring and leak prevention
    monitorMemory() {
        try {
            if (this.isDestroyed) return;
            
            const now = Date.now();
            
            // Check memory usage every 30 seconds
            if (now - this.memoryMonitor.lastCheck > 30000) {
                this.memoryMonitor.lastCheck = now;
                
                // Update particle counts
                this.memoryMonitor.particleCount = this.activeParticles.size + this.particlePool.length;
                this.memoryMonitor.navParticleCount = this.activeNavParticles.size + this.navParticlePool.length;
                
                // Log memory status in development
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    console.log('Memory Status:', {
                        activeParticles: this.activeParticles.size,
                        particlePool: this.particlePool.length,
                        activeNavParticles: this.activeNavParticles.size,
                        navParticlePool: this.navParticlePool.length,
                        totalParticles: this.memoryMonitor.particleCount + this.memoryMonitor.navParticleCount
                    });
                }
                
                // Force garbage collection if particle counts are too high
                if (this.memoryMonitor.particleCount > 50 || this.memoryMonitor.navParticleCount > 20) {
                    console.warn('High particle count detected, forcing cleanup');
                    this.forceCleanup();
                }
            }
            
            // Schedule next check
            setTimeout(() => this.monitorMemory(), 5000);
            
        } catch (error) {
            console.error('Error in memory monitoring:', error);
        }
    }
    
    // Force cleanup when memory usage is high
    forceCleanup() {
        try {
            // Clear some active particles
            const particlesToClean = Array.from(this.activeParticles).slice(0, 5);
            particlesToClean.forEach(particle => {
                if (particle && particle.parentNode) {
                    particle.style.display = 'none';
                    this.activeParticles.delete(particle);
                    this.particlePool.push(particle);
                }
            });
            
            // Clear some navigation particles
            const navParticlesToClean = Array.from(this.activeNavParticles).slice(0, 3);
            navParticlesToClean.forEach(particle => {
                if (particle && particle.parentNode) {
                    particle.style.display = 'none';
                    this.activeNavParticles.delete(particle);
                    this.navParticlePool.push(particle);
                }
            });
            
            console.log('Forced cleanup completed');
            
        } catch (error) {
            console.error('Error in force cleanup:', error);
        }
    }
    
    // Performance monitoring for DOM operations
    monitorPerformance() {
        try {
            if (this.isDestroyed) return;
            
            // Track DOM query performance
            const performanceMetrics = {
                domQueries: 0,
                cachedQueries: 0,
                scrollEvents: 0,
                lastUpdate: Date.now()
            };
            
            // Log performance metrics in development
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.log('DOM Performance Metrics:', {
                    cachedElements: Object.keys(this.domCache).length,
                    activeParticles: this.activeParticles.size,
                    particlePool: this.particlePool.length,
                    scrollThrottleDelay: this.performanceOptimizations.throttleScrollDelay,
                    useRequestAnimationFrame: this.performanceOptimizations.useRequestAnimationFrame
                });
            }
            
            // Schedule next performance check
            setTimeout(() => this.monitorPerformance(), 30000); // Every 30 seconds
            
        } catch (error) {
            console.error('Error in performance monitoring:', error);
        }
    }

    // Comprehensive cleanup method to prevent memory leaks
    destroy() {
        try {
            this.isDestroyed = true;
            
            // Clear all intervals first
            try {
                if (this.particleInterval) {
                    clearInterval(this.particleInterval);
                    this.particleInterval = null;
                }
            } catch (error) {
                console.error('Error clearing particle interval:', error);
            }
            
            try {
                if (this.navParticleInterval) {
                    clearInterval(this.navParticleInterval);
                    this.navParticleInterval = null;
                }
            } catch (error) {
                console.error('Error clearing navigation particle interval:', error);
            }
            
            // Clear all legacy particle timers
            this.particleTimers.forEach(timer => {
                try {
                    clearTimeout(timer);
                } catch (error) {
                    console.error('Error clearing particle timer:', error);
                }
            });
            this.particleTimers = [];
            
            // Clear navigation particle timers
            this.navParticleTimers.forEach(timer => {
                try {
                    clearTimeout(timer);
                } catch (error) {
                    console.error('Error clearing navigation particle timer:', error);
                }
            });
            this.navParticleTimers = [];
            
            // Clear active particle sets
            this.activeParticles.clear();
            this.activeNavParticles.clear();
            
            // Remove all particles from DOM (legacy and pool-based)
            this.particles.forEach(particle => {
                try {
                    if (particle && particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                } catch (error) {
                    console.error('Error removing particle:', error);
                }
            });
            this.particles = [];
            
            // Remove navigation particles from DOM (legacy)
            this.navParticles.forEach(particle => {
                try {
                    if (particle && particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                } catch (error) {
                    console.error('Error removing navigation particle:', error);
                }
            });
            this.navParticles = [];
            
            // Remove pool-based particles from DOM
            this.particlePool.forEach(particle => {
                try {
                    if (particle && particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                } catch (error) {
                    console.error('Error removing pool particle:', error);
                }
            });
            this.particlePool = [];
            
            this.navParticlePool.forEach(particle => {
                try {
                    if (particle && particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                } catch (error) {
                    console.error('Error removing nav pool particle:', error);
                }
            });
            this.navParticlePool = [];
            
            // Remove particle container
            try {
                if (this.particleContainer && this.particleContainer.parentNode) {
                    this.particleContainer.parentNode.removeChild(this.particleContainer);
                }
            } catch (error) {
                console.error('Error removing particle container:', error);
            }
            
            // Disconnect scroll observer
            try {
                if (this.scrollObserver) {
                    this.scrollObserver.disconnect();
                }
            } catch (error) {
                console.error('Error disconnecting scroll observer:', error);
            }
            
            // Remove scroll event listeners
            try {
                if (this.scrollHandler) {
                    window.removeEventListener('scroll', this.scrollHandler);
                }
            } catch (error) {
                console.error('Error removing scroll event listener:', error);
            }
            
            try {
                if (this.handleParallaxScroll) {
                    window.removeEventListener('scroll', this.handleParallaxScroll);
                }
            } catch (error) {
                console.error('Error removing parallax scroll listener:', error);
            }
            
            // Clear DOM cache
            this.domCache = null;
            
            // Cancel any pending animation frames
            try {
                if (this.animationFrameId) {
                    cancelAnimationFrame(this.animationFrameId);
                }
            } catch (error) {
                console.error('Error canceling animation frame:', error);
            }
            
            // Clear memory monitor
            this.memoryMonitor = null;
            
            console.log('Boro-tech website cleaned up successfully with memory leak prevention');
        } catch (error) {
            console.error('Error during cleanup:', error);
        }
    }

    // Error handling for initialization failures
    handleInitializationError(error) {
        try {
            console.error('Initialization failed, attempting graceful degradation:', error);
            
            // Try to provide basic functionality even if some features fail
            this.isDestroyed = true;
            
            // Show user-friendly error message
            const errorDiv = document.createElement('div');
            errorDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #ff4444;
                color: white;
                padding: 1rem;
                border-radius: 8px;
                z-index: 10000;
                font-family: Arial, sans-serif;
                max-width: 300px;
            `;
            errorDiv.innerHTML = `
                <strong>Website Error</strong><br>
                Some features may not work properly. Please refresh the page.
            `;
            
            document.body.appendChild(errorDiv);
            
            // Remove error message after 5 seconds
            setTimeout(() => {
                try {
                    if (errorDiv.parentNode) {
                        errorDiv.parentNode.removeChild(errorDiv);
                    }
                } catch (e) {
                    console.error('Error removing error message:', e);
                }
            }, 5000);
        } catch (fallbackError) {
            console.error('Error in error handler:', fallbackError);
        }
    }
}

// Initialize when DOM is loaded
let websiteInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    try {
        websiteInstance = new BoroTechWebsite();
    } catch (error) {
        console.error('Failed to initialize website:', error);
        // Show fallback error message
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #ff4444;
            color: white;
            padding: 2rem;
            border-radius: 8px;
            z-index: 10000;
            font-family: Arial, sans-serif;
            text-align: center;
        `;
        errorDiv.innerHTML = `
            <h2>Website Error</h2>
            <p>Failed to load website features. Please refresh the page.</p>
        `;
        document.body.appendChild(errorDiv);
    }
});

// Cleanup on page unload to prevent memory leaks
window.addEventListener('beforeunload', () => {
    try {
        if (websiteInstance) {
            websiteInstance.destroy();
            websiteInstance = null;
        }
    } catch (error) {
        console.error('Error during page unload cleanup:', error);
    }
});

// Cleanup on page visibility change (when user switches tabs)
document.addEventListener('visibilitychange', () => {
    try {
        if (document.hidden && websiteInstance) {
            // Pause animations when tab is not visible
            websiteInstance.isDestroyed = true;
        } else if (!document.hidden && websiteInstance) {
            // Resume animations when tab becomes visible
            websiteInstance.isDestroyed = false;
        }
    } catch (error) {
        console.error('Error handling visibility change:', error);
    }
});
