// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add active class to navigation links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    function updateActiveNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Update active link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initialize on load

    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.extension-card, .about-content, .contact-methods').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Copy to clipboard functionality for installation commands
    function createCopyButton(codeElement) {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.innerHTML = '📋';
        button.title = 'Copy to clipboard';
        
        button.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(codeElement.textContent);
                button.innerHTML = '✅';
                button.title = 'Copied!';
                setTimeout(() => {
                    button.innerHTML = '📋';
                    button.title = 'Copy to clipboard';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        });

        return button;
    }

    // Add copy buttons to code elements
    document.querySelectorAll('code').forEach(codeElement => {
        if (codeElement.textContent.length > 10) {
            const wrapper = document.createElement('div');
            wrapper.style.position = 'relative';
            wrapper.style.display = 'inline-block';
            
            codeElement.parentNode.insertBefore(wrapper, codeElement);
            wrapper.appendChild(codeElement);
            
            const copyBtn = createCopyButton(codeElement);
            copyBtn.style.position = 'absolute';
            copyBtn.style.top = '2px';
            copyBtn.style.right = '2px';
            copyBtn.style.background = 'rgba(0, 122, 204, 0.8)';
            copyBtn.style.border = 'none';
            copyBtn.style.borderRadius = '3px';
            copyBtn.style.color = 'white';
            copyBtn.style.padding = '2px 6px';
            copyBtn.style.fontSize = '10px';
            copyBtn.style.cursor = 'pointer';
            copyBtn.style.opacity = '0';
            copyBtn.style.transition = 'opacity 0.2s ease';
            
            wrapper.addEventListener('mouseenter', () => {
                copyBtn.style.opacity = '1';
            });
            
            wrapper.addEventListener('mouseleave', () => {
                copyBtn.style.opacity = '0';
            });
            
            wrapper.appendChild(copyBtn);
        }
    });

    // Add loading states for external links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function() {
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 1000);
        });
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Press 'G' to go to GitHub
        if (e.key.toLowerCase() === 'g' && !e.ctrlKey && !e.metaKey) {
            const githubLink = document.querySelector('a[href*="github.com/prgazevedo"]:not([href*="issues"]):not([href*="discussions"])');
            if (githubLink && document.activeElement.tagName !== 'INPUT') {
                window.open(githubLink.href, '_blank');
            }
        }
        
        // Press 'D' to download latest release
        if (e.key.toLowerCase() === 'd' && !e.ctrlKey && !e.metaKey) {
            const downloadLink = document.querySelector('a[href*="releases/latest"]');
            if (downloadLink && document.activeElement.tagName !== 'INPUT') {
                window.open(downloadLink.href, '_blank');
            }
        }
    });

    // Add visual feedback for keyboard shortcuts
    const shortcutHint = document.createElement('div');
    shortcutHint.style.position = 'fixed';
    shortcutHint.style.bottom = '20px';
    shortcutHint.style.right = '20px';
    shortcutHint.style.background = 'rgba(0, 0, 0, 0.8)';
    shortcutHint.style.color = 'white';
    shortcutHint.style.padding = '8px 12px';
    shortcutHint.style.borderRadius = '6px';
    shortcutHint.style.fontSize = '12px';
    shortcutHint.style.opacity = '0';
    shortcutHint.style.transition = 'opacity 0.3s ease';
    shortcutHint.style.pointerEvents = 'none';
    shortcutHint.style.zIndex = '1000';
    shortcutHint.innerHTML = 'Press <kbd>G</kbd> for GitHub • <kbd>D</kbd> to download';
    document.body.appendChild(shortcutHint);

    // Show keyboard shortcuts hint after a delay
    setTimeout(() => {
        shortcutHint.style.opacity = '0.7';
        setTimeout(() => {
            shortcutHint.style.opacity = '0';
        }, 5000);
    }, 3000);

    // Console easter egg
    console.log(`
    🚀 Claude Config Manager Website
    ================================
    
    Thanks for checking out the developer console!
    
    Quick shortcuts:
    • Press 'G' to visit GitHub
    • Press 'D' to download latest release
    
    Interested in the code? Check out:
    https://github.com/prgazevedo/VersionPlanExtension
    
    Built with vanilla JS, CSS Grid, and lots of ☕
    `);
});
