// Main calendar initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎄 Adventskalender wird geladen...');

    // Initialize calendar
    initCalendar();

    // Add snow animation
    createSnowfall();

    // Display current date info
    displayDateInfo();

    // Check if it's December
    checkDecemberStatus();
});

/**
 * Initialize the advent calendar
 */
function initCalendar() {
    ModalManager.init(); // Initialize modal system first
    DoorManager.init();
    console.log('✅ Kalender initialisiert');
}

/**
 * Create snowfall animation
 */
function createSnowfall() {
    const snowContainer = document.querySelector('.snow-container');
    const isMobile = window.innerWidth < 768;
    const snowflakeCount = isMobile ? 20 : 50;

    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.innerHTML = '❄';
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
        snowflake.style.animationDelay = `${Math.random() * 2}s`;
        snowflake.style.opacity = Math.random();
        snowflake.style.fontSize = `${Math.random() * 10 + 10}px`;

        snowContainer.appendChild(snowflake);
    }

    console.log(`❄️ ${snowflakeCount} Schneeflocken erstellt`);
}

/**
 * Display current date information
 */
function displayDateInfo() {
    const current = DateChecker.getCurrentDate();
    const todaysDoor = DateChecker.getTodaysDoor();

    console.log(`📅 Heutiges Datum: ${DateChecker.formatDate(current)}`);

    if (todaysDoor) {
        console.log(`🎁 Heutiges Türchen: ${todaysDoor}`);
    } else {
        console.log('ℹ️ Kein Türchen verfügbar (nicht im Dezember oder außerhalb 1-24)');
    }
}

/**
 * Check if it's December and show appropriate message
 */
function checkDecemberStatus() {
    if (!DateChecker.isDecember()) {
        const message = 'Der Adventskalender ist nur im Dezember verfügbar. Komm im Dezember wieder! 🎅';
        console.log(`⚠️ ${message}`);
    } else {
        console.log('🎄 Willkommen im Dezember!');
    }
}
