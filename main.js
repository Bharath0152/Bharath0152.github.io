document.addEventListener('DOMContentLoaded', () => {

    // --- STATE MANAGEMENT ---
    let subjects = JSON.parse(localStorage.getItem('subjects')) || [];
    let settings = JSON.parse(localStorage.getItem('settings')) || { defaultPercent: 75, theme: 'light' };
    let currentEditSubjectId = null;

    // --- ELEMENT REFERENCES ---
    const body = document.body;
    const openMenuBtn = document.getElementById('open-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const sideMenu = document.getElementById('slide-out-menu');
    const overlay = document.getElementById('page-overlay');
    const navButtons = document.querySelectorAll('.nav-button');
    const menuViews = document.querySelectorAll('.menu-view');
    const subjectForm = document.getElementById('add-subject-form');
    const formTitle = document.getElementById('form-title');
    const formSubmitBtn = document.getElementById('form-submit-btn');
    const cardsContainer = document.getElementById('subject-cards-container');
    const defaultPercentInput = document.getElementById('default-attendance-input');
    const themeToggle = document.getElementById('theme-toggle-checkbox');
    const clearDataBtn = document.getElementById('clear-data-btn');

    // --- INITIALIZATION ---
    function initializeApp() {
        loadSettings();
        // renderSubjectCards(); // We will add this back later
        setupEventListeners();
        console.log("App initialized successfully.");
    }

    function loadSettings() {
        if (settings.theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.checked = true;
        }
        defaultPercentInput.value = settings.defaultPercent;
        // Apply default to the main form
        document.getElementById('min-attendance').value = settings.defaultPercent;
    }

    // --- EVENT LISTENERS SETUP ---
    function setupEventListeners() {
        openMenuBtn.addEventListener('click', openSideMenu);
        closeMenuBtn.addEventListener('click', closeSideMenu);
        overlay.addEventListener('click', closeSideMenu);
        // subjectForm.addEventListener('submit', handleFormSubmit); // We will add this back
        clearDataBtn.addEventListener('click', clearAllData);
        themeToggle.addEventListener('change', toggleTheme);
        defaultPercentInput.addEventListener('change', saveDefaultPercent);
        
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const view = button.dataset.view;
                switchMenuView(view);
            });
        });
    }

    // --- MENU AND VIEW FUNCTIONS ---
    function openSideMenu() {
        sideMenu.classList.add('open');
        overlay.classList.add('active');
    }

    function closeSideMenu() {
        sideMenu.classList.remove('open');
        overlay.classList.remove('active');
        // Reset form to "Add" mode when menu is closed
        if (currentEditSubjectId) {
            switchToState('add');
        }
    }

    function switchMenuView(viewId) {
        menuViews.forEach(view => view.classList.remove('active'));
        document.getElementById(viewId).classList.add('active');
        navButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.view === viewId);
        });
    }
    
    // --- SETTINGS LOGIC ---
    function toggleTheme() {
        settings.theme = themeToggle.checked ? 'dark' : 'light';
        body.classList.toggle('dark-mode', themeToggle.checked);
        saveSettings();
    }

    function saveDefaultPercent() {
        const percent = parseInt(defaultPercentInput.value);
        if(percent >= 0 && percent <= 100) {
            settings.defaultPercent = percent;
            saveSettings();
            // Update the form field if user changes setting
            if(!currentEditSubjectId) {
                document.getElementById('min-attendance').value = settings.defaultPercent;
            }
        }
    }

    function clearAllData() {
        if (confirm("Are you sure you want to delete ALL subjects?\nThis action cannot be undone.")) {
            subjects = [];
            saveAndRerender();
        }
    }

    // --- DATA PERSISTENCE ---
    function saveAndRerender() {
        localStorage.setItem('subjects', JSON.stringify(subjects));
        // renderSubjectCards(); // Will be called later
        window.location.reload(); // Simple solution for now
    }

    function saveSettings() {
        localStorage.setItem('settings', JSON.stringify(settings));
    }
    
    // All other functions for adding, editing, and rendering cards will go here in our next steps.

    // --- START THE APP ---
    initializeApp();
});