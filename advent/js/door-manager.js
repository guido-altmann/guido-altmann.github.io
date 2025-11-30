const DoorManager = {
    doors: [],
    openedDoors: new Set(),

    /**
     * Initialize door manager
     */
    init() {
        this.loadOpenedDoors();
        this.updateAllDoorStates();
        this.attachEventListeners();
    },

    /**
     * Load previously opened doors from localStorage
     */
    loadOpenedDoors() {
        const stored = localStorage.getItem('adventskalender_opened');
        if (stored) {
            try {
                const opened = JSON.parse(stored);
                this.openedDoors = new Set(opened);
            } catch (e) {
                console.error('Fehler beim Laden der geöffneten Türchen:', e);
            }
        }
    },

    /**
     * Save opened doors to localStorage
     */
    saveOpenedDoors() {
        const opened = Array.from(this.openedDoors);
        localStorage.setItem('adventskalender_opened', JSON.stringify(opened));
    },

    /**
     * Update all door states based on current date
     */
    updateAllDoorStates() {
        this.doors = document.querySelectorAll('.door');
        const todaysDoor = DateChecker.getTodaysDoor();

        this.doors.forEach(door => {
            const day = parseInt(door.getAttribute('data-day'));

            // Check if door was previously opened
            if (this.openedDoors.has(day)) {
                door.setAttribute('data-state', 'opened');
            } else {
                const state = DateChecker.getDoorState(day);
                door.setAttribute('data-state', state);
            }

            // Mark today's door with special class
            if (day === todaysDoor) {
                door.classList.add('today');
            }
        });
    },

    /**
     * Attach click event listeners to all doors
     */
    attachEventListeners() {
        this.doors.forEach(door => {
            door.addEventListener('click', (e) => this.handleDoorClick(e));

            // Keyboard support
            door.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleDoorClick(e);
                }
            });
        });
    },

    /**
     * Handle door click event
     * @param {Event} event - Click event
     */
    handleDoorClick(event) {
        const door = event.currentTarget;
        const day = parseInt(door.getAttribute('data-day'));
        const state = door.getAttribute('data-state');

        if (state === 'locked') {
            this.showLockedMessage(day);
            return;
        }

        if (state === 'unlocked') {
            this.openDoor(door, day);
        } else if (state === 'opened') {
            // Re-open content modal if already opened
            ModalManager.show(day);
        }
    },

    /**
     * Open a door and reveal content
     * @param {HTMLElement} door - Door element
     * @param {number} day - Day number
     */
    openDoor(door, day) {
        // Mark door as opened immediately
        door.setAttribute('data-state', 'opened');
        this.openedDoors.add(day);
        this.saveOpenedDoors();

        // Wait for door flip animation to complete, then show modal
        setTimeout(() => {
            ModalManager.show(day);
        }, 600); // Matches door flip animation duration
    },

    /**
     * Show message when trying to open locked door
     * @param {number} day - Day number
     */
    showLockedMessage(day) {
        const message = `Türchen ${day} kann erst am ${day}. Dezember geöffnet werden! 🔒`;
        alert('Noch nicht verfügbar!\n\n' + message);
    }
};
