// 8-Bit Mario Bros Portfolio - JavaScript
// Gaming Navigation, Sound Effects, dan Interactive Elements

class PixelPortfolio {
    constructor() {
        this.currentWorld = 'home';
        this.score = 7500;
        this.timer = 999;
        this.soundEnabled = true;
        this.particles = [];
        this.gameStarted = false;
        this.motionPreference = 'full'; // full, reduced, minimal
        this.currentLanguage = 'id'; // default Indonesian
        this.content = {}; // will hold loaded content
        
        this.init();
    }

    init() {
        this.setupLanguageSelection();
        this.detectMotionPreference();
        this.setupEventListeners();
        this.setupMotionControls();
        this.initializeBossHealth();
        this.setupFormValidation();
        this.startGameTimer();
        this.setupMobileFooter();
    }

    // Loading Sequence
    startLoadingSequence() {
        const loadingScreen = document.getElementById('loading-screen');
        const progressBar = document.querySelector('.loading-progress');
        
        // Simulate loading progress
        let progress = 0;
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingInterval);
                
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    
                    // Show main portfolio content
                    document.querySelector('.game-header').style.display = 'block';
                    document.querySelector('.game-world').style.display = 'block';
                    
                    this.gameStarted = true;
                    this.playSound('gameStart');
                    this.animateSkillBars();
                }, 500);
            }
            progressBar.style.width = `${progress}%`;
        }, 200);
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Navigation buttons
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const world = e.target.getAttribute('data-world');
                this.navigateToWorld(world);
            });
        });

        // Start button
        const startBtn = document.querySelector('.start-btn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.navigateToWorld('about');
            });
        }

        // Sound toggle
        const soundToggle = document.getElementById('soundToggle');
        if (soundToggle) {
            soundToggle.addEventListener('click', () => {
                this.toggleSound();
            });
        }

        // Contact form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                this.handleFormSubmission(e);
            });
        }

        // Form inputs for real-time validation
        const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                this.validateInput(e.target);
            });
            input.addEventListener('blur', (e) => {
                this.validateInput(e.target);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });

        // Resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    // World Navigation
    navigateToWorld(worldName) {
        if (worldName === this.currentWorld) return;

        this.playSound('worldTransition');
        
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-world="${worldName}"]`).classList.add('active');

        // Update world indicator
        const worldIndicators = document.querySelectorAll('.world-value');
        const worldMap = {
            'home': '1-1',
            'about': '1-2',
            'skills': '1-3',
            'projects': '1-4',
            'contact': '1-5'
        };
        worldIndicators.forEach(indicator => {
            indicator.textContent = worldMap[worldName] || '1-1';
        });

        // Hide current world
        const currentSection = document.getElementById(this.currentWorld);
        if (currentSection) {
            currentSection.classList.remove('active');
        }

        // Show new world
        setTimeout(() => {
            const newSection = document.getElementById(worldName);
            if (newSection) {
                newSection.classList.add('active');
                
                // Trigger world-specific animations
                this.triggerWorldAnimations(worldName);
            }
            this.currentWorld = worldName;
            
            // Update score based on world
            this.updateScore(worldName);
        }, 300);
    }

    // World-specific animations
    triggerWorldAnimations(worldName) {
        switch(worldName) {
            case 'skills':
                setTimeout(() => this.animateSkillBars(), 500);
                break;
            case 'projects':
                setTimeout(() => this.animateProjectCards(), 500);
                break;
            case 'contact':
                setTimeout(() => this.initializeBossHealth(), 500);
                break;
            case 'about':
                setTimeout(() => this.animateAchievements(), 500);
                break;
        }
    }

    // Skill Bar Animations
    animateSkillBars() {
        const skillProgressBars = document.querySelectorAll('.skill-progress');
        skillProgressBars.forEach((bar, index) => {
            setTimeout(() => {
                const skillLevel = bar.getAttribute('data-skill');
                bar.style.width = `${skillLevel}%`;
                this.playSound('skillUp');
            }, index * 200);
        });
    }

    // Project Cards Animation
    animateProjectCards() {
        const projectCards = document.querySelectorAll('.level-card');
        projectCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0px)';
                this.playSound('levelAppear');
                
                // Remove inline styles after animation to allow CSS hover to work
                setTimeout(() => {
                    card.style.removeProperty('transform');
                    card.style.removeProperty('transition');
                }, 500);
            }, index * 150);
        });
    }

    // Achievement Animation
    animateAchievements() {
        const achievements = document.querySelectorAll('.achievement-item');
        achievements.forEach((achievement, index) => {
            achievement.style.opacity = '0';
            achievement.style.transform = 'translateX(-30px)';
            
            setTimeout(() => {
                achievement.style.transition = 'all 0.5s ease-out';
                achievement.style.opacity = '1';
                achievement.style.transform = 'translateX(0px)';
                this.playSound('achievement');
            }, index * 100);
        });
    }

    // Boss Health Initialization
    initializeBossHealth() {
        const bossHealth = document.getElementById('bossHealth');
        if (bossHealth) {
            bossHealth.style.width = '100%';
        }
    }

    // Form Validation
    setupFormValidation() {
        this.validationRules = {
            name: {
                required: true,
                minLength: 2,
                pattern: /^[a-zA-Z\s]+$/
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            },
            project: {
                required: true
            },
            message: {
                required: true,
                minLength: 10
            }
        };
    }

    validateInput(input) {
        const fieldName = input.name;
        const value = input.value.trim();
        const rules = this.validationRules[fieldName];
        const formGroup = input.closest('.form-group');
        
        let isValid = true;
        let errorMessage = '';

        if (rules) {
            // Required validation
            if (rules.required && !value) {
                isValid = false;
                errorMessage = 'Field ini wajib diisi!';
            }

            // Pattern validation
            if (isValid && rules.pattern && value && !rules.pattern.test(value)) {
                isValid = false;
                if (fieldName === 'email') {
                    errorMessage = 'Format email tidak valid!';
                } else if (fieldName === 'name') {
                    errorMessage = 'Nama hanya boleh mengandung huruf!';
                }
            }

            // Min length validation
            if (isValid && rules.minLength && value && value.length < rules.minLength) {
                isValid = false;
                errorMessage = `Minimal ${rules.minLength} karakter!`;
            }
        }

        // Update UI
        formGroup.classList.remove('valid', 'invalid');
        if (value) {
            formGroup.classList.add(isValid ? 'valid' : 'invalid');
        }

        // Remove existing error message
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add error message if invalid
        if (!isValid && value) {
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = errorMessage;
            errorElement.style.cssText = `
                color: var(--mario-red);
                font-size: 7px;
                margin-top: 5px;
                padding: 3px;
                background: rgba(255, 0, 0, 0.1);
                border: 1px solid var(--mario-red);
            `;
            formGroup.appendChild(errorElement);
            this.playSound('error');
        } else if (isValid && value) {
            this.playSound('success');
        }

        return isValid;
    }

    // Form Submission
    handleFormSubmission(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const formValues = Object.fromEntries(formData.entries());
        
        // Validate all fields
        let allValid = true;
        Object.keys(this.validationRules).forEach(fieldName => {
            const input = e.target.querySelector(`[name="${fieldName}"]`);
            if (input && !this.validateInput(input)) {
                allValid = false;
            }
        });

        if (!allValid) {
            this.playSound('error');
            this.showMessage('Mohon perbaiki field yang tidak valid!', 'error');
            return;
        }

        // Boss battle sequence
        this.startBossBattle(formValues);
    }

    // Boss Battle Animation
    startBossBattle(formData) {
        const bossHealth = document.getElementById('bossHealth');
        const attackBtn = document.querySelector('.boss-attack-btn');
        const victoryMessage = document.getElementById('victoryMessage');
        
        // Disable form
        attackBtn.disabled = true;
        attackBtn.textContent = 'ATTACKING...';
        
        this.playSound('attack');
        
        // Damage animation
        let damage = 0;
        const attackInterval = setInterval(() => {
            damage += Math.random() * 25;
            if (damage >= 100) {
                damage = 100;
                clearInterval(attackInterval);
                
                // Boss defeated
                bossHealth.style.width = '0%';
                this.playSound('victory');
                
                setTimeout(() => {
                    victoryMessage.classList.add('show');
                    this.playSound('levelComplete');
                    
                    // Simulate form submission (in real app, send to server)
                    this.submitFormData(formData);
                }, 1000);
            } else {
                bossHealth.style.width = `${100 - damage}%`;
            }
        }, 300);
    }

    // Submit form data (placeholder for real implementation)
    submitFormData(formData) {
        // In a real application, you would send this data to a server
        console.log('Form data submitted:', formData);
        
        // For demo purposes, just log the data
        // In production, replace with actual API call:
        /*
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));
        */
    }

    // Keyboard Navigation
    handleKeyboardNavigation(e) {
        const worldKeys = {
            '1': 'home',
            '2': 'about',
            '3': 'skills',
            '4': 'projects',
            '5': 'contact'
        };

        if (worldKeys[e.key]) {
            this.navigateToWorld(worldKeys[e.key]);
        }

        // Arrow key navigation (Left/Right only)
        if (e.key === 'ArrowRight') {
            this.navigateNext();
        } else if (e.key === 'ArrowLeft') {
            this.navigatePrevious();
        }
        
        // Up/Down arrows for content scrolling (let browser handle naturally)
        // No preventDefault for Up/Down to allow normal scroll behavior

        // Sound toggle with 'M' key
        if (e.key.toLowerCase() === 'm') {
            this.toggleSound();
        }
    }

    navigateNext() {
        const worlds = ['home', 'about', 'skills', 'projects', 'contact'];
        const currentIndex = worlds.indexOf(this.currentWorld);
        const nextIndex = (currentIndex + 1) % worlds.length;
        this.navigateToWorld(worlds[nextIndex]);
    }

    navigatePrevious() {
        const worlds = ['home', 'about', 'skills', 'projects', 'contact'];
        const currentIndex = worlds.indexOf(this.currentWorld);
        const prevIndex = currentIndex === 0 ? worlds.length - 1 : currentIndex - 1;
        this.navigateToWorld(worlds[prevIndex]);
    }

    // Language Selection and Content Loading System
    setupLanguageSelection() {
        const languageScreen = document.getElementById('language-screen');
        const languageButtons = document.querySelectorAll('.language-btn');
        
        // TEMPORARY: Clear localStorage for testing
        localStorage.removeItem('selectedLanguage');
        
        // For testing, comment out localStorage check temporarily
        /*
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage) {
            this.currentLanguage = savedLanguage;
            // Hide language screen immediately
            languageScreen.classList.add('hidden');
            document.getElementById('loading-screen').classList.remove('hidden');
            this.loadContent(savedLanguage);
            return;
        }
        */
        
        // Setup language selection event listeners
        languageButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const selectedLang = btn.dataset.lang;
                this.selectLanguage(selectedLang);
                this.playSound('menuClick');
            });
        });
        
        // Preload images during language selection
        this.preloadImages();
    }
    
    selectLanguage(language) {
        this.currentLanguage = language;
        localStorage.setItem('selectedLanguage', language);
        
        // Hide language screen, show loading screen
        const languageScreen = document.getElementById('language-screen');
        const loadingScreen = document.getElementById('loading-screen');
        
        languageScreen.classList.add('hidden');
        loadingScreen.style.display = 'flex';
        
        // Load content and start sequence
        this.loadContent(language);
    }
    
    async loadContent(language) {
        try {
            // For now, we'll use embedded content objects
            await this.loadContentFromFiles(language);
            
            // Apply content to page
            this.applyContent();
            
            // Start loading sequence
            this.startLoadingSequence();
            
        } catch (error) {
            console.error('Failed to load content:', error);
            // Fallback to embedded content  
            this.loadEmbeddedContent(language);
            this.applyContent();
            this.startLoadingSequence();
        }
    }
    
    async loadContentFromFiles(language) {
        // For production, you'd fetch from markdown files
        // For now, we'll create embedded content objects based on the markdown structure
        this.content = this.getEmbeddedContent(language);
        return Promise.resolve(); // Ensure this returns a resolved promise
    }
    
    getEmbeddedContent(language) {
        if (language === 'id') {
            return {
                loading_text: "MEMULAI PETUALANGAN...",
                score_label: "SKOR",
                world_label: "DUNIA", 
                time_label: "WAKTU",
                motion_header: "PENGATURAN PERMAINAN",
                motion_full: "GERAK PENUH",
                motion_reduced: "MODE HALUS",
                motion_minimal: "MODE FOKUS",
                nav_home: "🏠 BERANDA",
                nav_about: "👤 TENTANG", 
                nav_skills: "⚡ KEAHLIAN",
                nav_projects: "🎮 PROYEK",
                nav_contact: "📞 KONTAK",
                title_main: "RAFI \"V\"",
                subtitle: "PENGEMBANG AI & INOVATOR LEGAL TECH",
                start_button: "MULAI PETUALANGAN",
                unique_value_text: "KOMBINASI LANGKA: PEMAHAMAN HUKUM + KETERAMPILAN TEKNIS AI",
                stats: [
                    { number: "7+", label: "KLIEN AKTIF" },
                    { number: "3", label: "SERTIFIKASI AI" },
                    { number: "8+", label: "PROYEK SELESAI" }
                ],
                // About section
                section_title_about: "PROFIL PEMAIN",
                level_indicator_about: "DUNIA 1-2",
                character_name: "RAFI \"V\" | RFXLAMIA",
                character_class: "PENGEMBANG AI & INOVATOR LEGAL TECH",
                bio_text: "Mahasiswa hukum dengan passion mendalam pada etika AI. Perpaduan unik kepakaran hukum dan keterampilan teknis AI untuk membangun solusi teknologi yang bukan hanya inovatif, tapi juga etis dan patuh hukum.",
                achievements_title: "PENCAPAIAN TERBUKA",
                // Skills section  
                section_title_skills: "STATISTIK KARAKTER",
                level_indicator_skills: "DUNIA 1-3",
                technical_abilities_title: "KEAHLIAN TEKNIS",
                certifications_title: "SERTIFIKASI KHUSUS",
                power_ups_title: "PENINGKATAN KEMAMPUAN",
                // Projects section
                section_title_projects: "DAFTAR MISI",
                level_indicator_projects: "DUNIA 1-4",
                // Contact section
                section_title_contact: "PERTEMPURAN BOSS",
                level_indicator_contact: "TAHAP AKHIR",
                boss_health_label: "BOSS KOLABORASI",
                form_header: "KALAHKAN BOSS DENGAN PESANMU!",
                form_description: "Kirim proposal kolaborasi untuk mengurangi HP bos!",
                name_label: "NAMA",
                email_label: "ALAMAT EMAIL",
                project_label: "JENIS PROYEK",
                project_placeholder: "Pilih misimu...",
                message_label: "STRATEGI BERTARUNG (PESAN)",
                message_placeholder: "Jelaskan proyek, kebutuhan, dan cara kita bisa kolaborasi...",
                submit_button: "LUNCURKAN SERANGAN!",
                victory_title: "BOSS TERKALAHKAN! 🎉",
                victory_text_1: "Pesanmu berhasil terkirim!",
                victory_text_2: "Rafi akan membalas proposal kolaborasimu segera.",
                contact_link_text: "linktr.ee/rfxlamia",
                // Footer
                copyright: "© 2025 RAFI \"V\" | RFXLAMIA",
                social_text: "LINKTR.EE/RFXLAMIA",
                credits: "DIDUKUNG OLEH MSSTROMLABS"
            };
        } else {
            return {
                loading_text: "LOADING WORLD...",
                score_label: "SCORE",
                world_label: "WORLD",
                time_label: "TIME", 
                motion_header: "GAME SETTINGS",
                motion_full: "FULL MOTION",
                motion_reduced: "GENTLE MODE",
                motion_minimal: "FOCUS MODE",
                nav_home: "🏠 HOME",
                nav_about: "👤 ABOUT",
                nav_skills: "⚡ SKILLS", 
                nav_projects: "🎮 PROJECTS",
                nav_contact: "📞 CONTACT",
                title_main: "RAFI \"V\"",
                subtitle: "AI DEVELOPER & LEGAL TECH INNOVATOR", 
                start_button: "START ADVENTURE",
                unique_value_text: "RARE COMBINATION: LEGAL EXPERTISE + AI TECHNICAL SKILLS",
                stats: [
                    { number: "7+", label: "ACTIVE CLIENTS" },
                    { number: "3", label: "AI CERTIFICATIONS" },
                    { number: "8+", label: "PROJECTS DELIVERED" }
                ]
            };
        }
    }
    
    applyContent() {
        // Apply content to elements with data-text attributes
        document.querySelectorAll('[data-text]').forEach(element => {
            const key = element.getAttribute('data-text');
            if (this.content[key]) {
                element.textContent = this.content[key];
            }
        });
        
        // Apply content to specific elements
        this.updateGameHeader();
        this.updateNavigation(); 
        this.updateStats();
        this.updateSectionTitles();
        this.updateAboutSection();
        this.updateSkillsSection();
        this.updateProjectsSection();
        this.updateContactSection();
        this.updateFooter();
    }
    
    updateGameHeader() {
        const scoreLabel = document.querySelector('.score-label');
        const worldLabel = document.querySelector('.world-label');
        const timeLabel = document.querySelector('.time-label');
        
        if (scoreLabel) scoreLabel.textContent = this.content.score_label;
        if (worldLabel) worldLabel.textContent = this.content.world_label;
        if (timeLabel) timeLabel.textContent = this.content.time_label;
    }
    
    updateNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        const navKeys = ['nav_home', 'nav_about', 'nav_skills', 'nav_projects', 'nav_contact'];
        
        navButtons.forEach((btn, index) => {
            if (this.content[navKeys[index]]) {
                btn.innerHTML = this.content[navKeys[index]];
            }
        });
    }
    
    updateStats() {
        const statItems = document.querySelectorAll('.stat-item');
        statItems.forEach((item, index) => {
            if (this.content.stats && this.content.stats[index]) {
                const numberEl = item.querySelector('.stat-number');
                const labelEl = item.querySelector('.stat-label');
                
                if (numberEl) numberEl.textContent = this.content.stats[index].number;
                if (labelEl) labelEl.textContent = this.content.stats[index].label;
            }
        });
    }
    
    updateSectionTitles() {
        // About section title
        const aboutTitle = document.querySelector('#about .section-title');
        if (aboutTitle && this.content.section_title_about) {
            aboutTitle.textContent = this.content.section_title_about;
        }
        
        // Skills section title  
        const skillsTitle = document.querySelector('#skills .section-title');
        if (skillsTitle && this.content.section_title_skills) {
            skillsTitle.textContent = this.content.section_title_skills;
        }
        
        // Projects section title
        const projectsTitle = document.querySelector('#projects .section-title');
        if (projectsTitle && this.content.section_title_projects) {
            projectsTitle.textContent = this.content.section_title_projects;
        }
        
        // Contact section title
        const contactTitle = document.querySelector('#contact .section-title');
        if (contactTitle && this.content.section_title_contact) {
            contactTitle.textContent = this.content.section_title_contact;
        }
    }
    
    updateAboutSection() {
        // Character details
        const characterName = document.querySelector('.character-name');
        if (characterName && this.content.character_name) {
            characterName.textContent = this.content.character_name;
        }
        
        const characterClass = document.querySelector('.character-class');
        if (characterClass && this.content.character_class) {
            characterClass.textContent = this.content.character_class;
        }
        
        const bioText = document.querySelector('.bio-text');
        if (bioText && this.content.bio_text) {
            bioText.textContent = this.content.bio_text;
        }
        
        const achievementsTitle = document.querySelector('.achievements-title');
        if (achievementsTitle && this.content.achievements_title) {
            achievementsTitle.textContent = this.content.achievements_title;
        }
    }
    
    updateSkillsSection() {
        const techAbilitiesTitle = document.querySelector('#skills .category-title');
        if (techAbilitiesTitle && this.content.technical_abilities_title) {
            techAbilitiesTitle.textContent = this.content.technical_abilities_title;
        }
        
        const certificationsTitles = document.querySelectorAll('#skills .category-title');
        if (certificationsTitles[1] && this.content.certifications_title) {
            certificationsTitles[1].textContent = this.content.certifications_title;
        }
        
        const powerUpsTitles = document.querySelectorAll('#skills .category-title');
        if (powerUpsTitles[2] && this.content.power_ups_title) {
            powerUpsTitles[2].textContent = this.content.power_ups_title;
        }
    }
    
    updateProjectsSection() {
        // Projects section already handled by section titles
    }
    
    updateContactSection() {
        const bossHealthLabel = document.querySelector('.health-label');
        if (bossHealthLabel && this.content.boss_health_label) {
            bossHealthLabel.textContent = this.content.boss_health_label;
        }
        
        const formHeader = document.querySelector('.form-header h3');
        if (formHeader && this.content.form_header) {
            formHeader.textContent = this.content.form_header;
        }
        
        const formDescription = document.querySelector('.form-header p');
        if (formDescription && this.content.form_description) {
            formDescription.textContent = this.content.form_description;
        }
        
        // Form labels
        const nameLabel = document.querySelector('label[for="name"]');
        if (nameLabel && this.content.name_label) {
            nameLabel.textContent = this.content.name_label;
        }
        
        const emailLabel = document.querySelector('label[for="email"]');
        if (emailLabel && this.content.email_label) {
            emailLabel.textContent = this.content.email_label;
        }
        
        const projectLabel = document.querySelector('label[for="project"]');
        if (projectLabel && this.content.project_label) {
            projectLabel.textContent = this.content.project_label;
        }
        
        const messageLabel = document.querySelector('label[for="message"]');
        if (messageLabel && this.content.message_label) {
            messageLabel.textContent = this.content.message_label;
        }
        
        // Form placeholders
        const projectSelect = document.querySelector('#project option[value=""]');
        if (projectSelect && this.content.project_placeholder) {
            projectSelect.textContent = this.content.project_placeholder;
        }
        
        const messageTextarea = document.querySelector('#message');
        if (messageTextarea && this.content.message_placeholder) {
            messageTextarea.placeholder = this.content.message_placeholder;
        }
        
        // Submit button
        const submitButton = document.querySelector('.attack-text');
        if (submitButton && this.content.submit_button) {
            submitButton.textContent = this.content.submit_button;
        }
        
        // Victory messages
        const victoryTitle = document.querySelector('.victory-content h3');
        if (victoryTitle && this.content.victory_title) {
            victoryTitle.textContent = this.content.victory_title;
        }
        
        const victoryTexts = document.querySelectorAll('.victory-content p');
        if (victoryTexts[0] && this.content.victory_text_1) {
            victoryTexts[0].textContent = this.content.victory_text_1;
        }
        if (victoryTexts[1] && this.content.victory_text_2) {
            victoryTexts[1].textContent = this.content.victory_text_2;
        }
    }
    
    updateFooter() {
        const copyright = document.querySelector('.copyright span');
        if (copyright && this.content.copyright) {
            copyright.textContent = this.content.copyright;
        }
        
        const socialText = document.querySelector('.social-text');
        if (socialText && this.content.social_text) {
            socialText.textContent = this.content.social_text;
        }
        
        const credits = document.querySelector('.credits-text');
        if (credits && this.content.credits) {
            credits.textContent = this.content.credits;
        }
    }
    
    // Smart Mobile Footer Management (Enhanced Sensitivity)
    setupMobileFooter() {
        if (window.innerWidth > 768) return; // Only for mobile
        
        const footer = document.querySelector('.game-footer');
        if (!footer) return;
        
        let lastScrollTop = 0;
        let scrollTimeout;
        
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // Show footer when scrolling up or near bottom
            if (scrollTop < lastScrollTop || scrollTop + windowHeight >= documentHeight - 50) {
                footer.classList.remove('hidden');
            } 
            // Hide footer when scrolling down (lower threshold for faster response)
            else if (scrollTop > lastScrollTop && scrollTop > 50) {
                footer.classList.add('hidden');
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        };
        
        // More responsive scroll event (reduced delay)
        window.addEventListener('scroll', () => {
            if (scrollTimeout) return;
            scrollTimeout = setTimeout(() => {
                handleScroll();
                scrollTimeout = null;
            }, 50); // Reduced from 100ms to 50ms
        });
        
        // Show footer on resize if changing to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                footer.classList.remove('hidden');
            }
        });
    }
    
    preloadImages() {
        const images = [
            'https://i.imgur.com/BQg1BIZ.png', // Mario sprite
            'https://i.imgur.com/H6so7ce.png', // Character sprite
            'https://i.imgur.com/4tDpwlY.png'  // Profile avatar
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // Motion Preference Detection and Control
    detectMotionPreference() {
        // Check system preference first
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.motionPreference = 'reduced';
        }
        
        // Check localStorage for user override
        const savedPreference = localStorage.getItem('motionPreference');
        if (savedPreference && ['full', 'reduced', 'minimal'].includes(savedPreference)) {
            this.motionPreference = savedPreference;
        }
        
        this.applyMotionPreference();
    }
    
    setupMotionControls() {
        const motionBtn = document.getElementById('motionBtn');
        const motionPanel = document.getElementById('motionPanel');
        const motionOptions = document.querySelectorAll('.motion-option');
        
        // Toggle motion panel
        motionBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            motionPanel.classList.toggle('show');
            this.playSound('menuClick');
        });
        
        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!motionPanel.contains(e.target) && !motionBtn.contains(e.target)) {
                motionPanel.classList.remove('show');
            }
        });
        
        // Motion option selection
        motionOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const preference = option.dataset.motion;
                this.setMotionPreference(preference);
                
                // Update active state
                motionOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                motionPanel.classList.remove('show');
                this.playSound('powerUp');
            });
        });
        
        // Set initial active state
        const activeOption = document.querySelector(`[data-motion="${this.motionPreference}"]`);
        if (activeOption) {
            document.querySelectorAll('.motion-option').forEach(opt => opt.classList.remove('active'));
            activeOption.classList.add('active');
        }
    }
    
    setMotionPreference(preference) {
        this.motionPreference = preference;
        localStorage.setItem('motionPreference', preference);
        this.applyMotionPreference();
        
        // Show feedback
        this.showMotionFeedback(preference);
    }
    
    applyMotionPreference() {
        const body = document.body;
        
        // Remove existing motion classes
        body.classList.remove('motion-full', 'motion-reduced', 'motion-minimal');
        
        // Apply motion class
        body.classList.add(`motion-${this.motionPreference}`);
        
        // Apply CSS custom property for JS-controlled animations
        body.style.setProperty('--motion-preference', this.motionPreference);
    }
    
    showMotionFeedback(preference) {
        const feedbackTexts = {
            'full': '⚡ FULL MOTION ACTIVATED!',
            'reduced': '🌊 GENTLE MODE ACTIVATED!',
            'minimal': '🔇 FOCUS MODE ACTIVATED!'
        };
        
        // Create feedback element
        const feedback = document.createElement('div');
        feedback.className = 'motion-feedback';
        feedback.textContent = feedbackTexts[preference];
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--mario-black);
            border: 3px solid var(--mario-yellow);
            padding: 20px;
            color: var(--mario-yellow);
            font-family: var(--pixel-font);
            font-size: 12px;
            z-index: 9999;
            text-align: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(feedback);
        
        // Animate in
        setTimeout(() => feedback.style.opacity = '1', 100);
        
        // Remove after delay
        setTimeout(() => {
            feedback.style.opacity = '0';
            setTimeout(() => feedback.remove(), 300);
        }, 2000);
    }

    // Score System
    updateScore(worldName) {
        const scoreMap = {
            'home': 7500,
            'about': 15000,
            'skills': 22500,
            'projects': 35000,
            'contact': 50000
        };
        
        const targetScore = scoreMap[worldName] || 7500;
        const scoreElement = document.getElementById('score');
        
        this.animateScoreChange(this.score, targetScore, scoreElement);
        this.score = targetScore;
    }

    animateScoreChange(from, to, element) {
        const duration = 1000;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentScore = Math.floor(from + (to - from) * progress);
            element.textContent = currentScore.toString().padStart(7, '0');
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }

    // Timer System
    startGameTimer() {
        setInterval(() => {
            if (this.gameStarted && this.timer > 0) {
                this.timer--;
                const timerElement = document.getElementById('timer');
                if (timerElement) {
                    timerElement.textContent = this.timer.toString();
                    
                    // Warning when time is low
                    if (this.timer <= 100) {
                        timerElement.style.color = 'var(--mario-red)';
                        timerElement.style.animation = 'blink 0.5s infinite';
                    }
                }
            }
        }, 1000);
    }


    // Sound System
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        const soundBtn = document.getElementById('soundToggle');
        const soundIcon = soundBtn.querySelector('.sound-icon');
        
        if (this.soundEnabled) {
            soundIcon.textContent = '🔊';
            soundBtn.classList.remove('muted');
            this.playSound('soundOn');
        } else {
            soundIcon.textContent = '🔇';
            soundBtn.classList.add('muted');
        }
    }

    playSound(soundType) {
        if (!this.soundEnabled) return;
        
        // Create Web Audio API context for 8-bit sounds
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        const soundMap = {
            gameStart: { frequency: 523.25, duration: 0.5, type: 'square' },
            worldTransition: { frequency: 659.25, duration: 0.3, type: 'sawtooth' },
            skillUp: { frequency: 783.99, duration: 0.2, type: 'square' },
            levelAppear: { frequency: 440, duration: 0.3, type: 'triangle' },
            achievement: { frequency: 880, duration: 0.4, type: 'square' },
            attack: { frequency: 220, duration: 0.6, type: 'sawtooth' },
            victory: { frequency: 1046.50, duration: 1.0, type: 'square' },
            levelComplete: { frequency: 523.25, duration: 0.8, type: 'triangle' },
            error: { frequency: 146.83, duration: 0.5, type: 'sawtooth' },
            success: { frequency: 698.46, duration: 0.3, type: 'sine' },
            soundOn: { frequency: 880, duration: 0.2, type: 'square' },
            menuSelect: { frequency: 587.33, duration: 0.2, type: 'square' },
            menuBack: { frequency: 392.00, duration: 0.2, type: 'triangle' }
        };
        
        const sound = soundMap[soundType];
        if (!sound) return;
        
        try {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(sound.frequency, audioContext.currentTime);
            oscillator.type = sound.type;
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + sound.duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + sound.duration);
        } catch (error) {
            console.log('Audio not supported or error:', error);
        }
    }

    // Utility Functions
    showMessage(text, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `game-message ${type}`;
        messageDiv.textContent = text;
        messageDiv.style.cssText = `
            position: fixed;
            top: 150px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'error' ? 'var(--mario-red)' : 'var(--mario-green)'};
            color: var(--mario-white);
            padding: 10px 20px;
            border: 3px solid var(--mario-white);
            font-family: var(--pixel-font);
            font-size: 8px;
            z-index: 10000;
            animation: message-appear 0.3s ease-out;
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    handleResize() {
        // Handle window resize events
        // Reserved for future responsive adjustments
    }

    // Certificate Dropdown Toggle
    toggleCertificate(certType) {
        const dropdown = document.getElementById(`${certType}-dropdown`);
        const card = dropdown.closest('.cert-card');
        
        // Close all other dropdowns first
        document.querySelectorAll('.cert-dropdown').forEach(dd => {
            if (dd !== dropdown) {
                dd.classList.remove('active');
                dd.closest('.cert-card').classList.remove('active');
            }
        });
        
        // Toggle current dropdown
        const isActive = dropdown.classList.contains('active');
        
        if (isActive) {
            dropdown.classList.remove('active');
            card.classList.remove('active');
            this.playSound('menuBack');
        } else {
            dropdown.classList.add('active');
            card.classList.add('active');
            this.playSound('menuSelect');
        }
    }

    // Public methods for external access
    startGame() {
        this.navigateToWorld('about');
    }
}

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.pixelPortfolio = new PixelPortfolio();
});

// Global function for start button
function startGame() {
    if (window.pixelPortfolio) {
        window.pixelPortfolio.startGame();
    }
}

// Global function for certificate dropdown toggle
function toggleCertificate(certType) {
    if (window.pixelPortfolio) {
        window.pixelPortfolio.toggleCertificate(certType);
    }
}

// Add CSS animations via JavaScript for message
const messageStyles = `
@keyframes message-appear {
    0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    100% { opacity: 1; transform: translateX(-50%) translateY(0px); }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = messageStyles;
document.head.appendChild(styleSheet);

// Service Worker Registration (optional, for offline functionality)
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
        if (entry.entryType === 'navigation') {
            console.log('Page load time:', entry.loadEventEnd - entry.loadEventStart);
        }
    });
});

try {
    performanceObserver.observe({ entryTypes: ['navigation'] });
} catch (e) {
    console.log('Performance Observer not supported');
}

// Accessibility enhancements
document.addEventListener('keydown', (e) => {
    // Skip to main content with Alt+S
    if (e.altKey && e.key.toLowerCase() === 's') {
        const mainContent = document.querySelector('.game-world');
        if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView();
        }
    }
});

// Case Study Navigation Function
function viewCaseStudy(projectId) {
    // For now, show alert - will be replaced with actual case study website
    const projectNames = {
        'buddy': 'Buddy Platform',
        'automation': 'Business Automation Suite', 
        'vocana': 'Agent Vocana',
        'custos': 'Agent Custos',
        'msstrom': 'Ms.Strom (Project Void)',
        'toolkit': 'Content Toolkit'
    };
    
    const projectName = projectNames[projectId] || 'Project';
    
    // Show coming soon message with professional styling
    const message = `📋 ${projectName} Case Study\n\n🚀 Detailed case study website in development!\n\nComing soon: Interactive case study with:\n• Technical deep-dive\n• Architecture diagrams  \n• Business impact metrics\n• Implementation insights\n\nStay tuned! ⭐`;
    
    alert(message);
    
    // TODO: Replace with actual navigation when case study website is ready
    // window.open(`/case-study/${projectId}`, '_blank');
}

// Add focus indicators for keyboard navigation
document.addEventListener('focus', (e) => {
    if (e.target.matches('.nav-btn, .start-btn, .boss-attack-btn, .contact-link')) {
        e.target.style.outline = '3px solid var(--mario-yellow)';
    }
}, true);

document.addEventListener('blur', (e) => {
    if (e.target.matches('.nav-btn, .start-btn, .boss-attack-btn, .contact-link')) {
        e.target.style.outline = 'none';
    }
}, true);

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PixelPortfolio;
}