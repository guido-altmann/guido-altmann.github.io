// Date utility functions
const DateChecker = {
    /**
     * Get the current date
     * @returns {Object} Object with year, month (1-12), and day
     */
    getCurrentDate() {
        const now = new Date();
        return {
            year: now.getFullYear(),
            month: now.getMonth() + 1, // 1-12
            day: now.getDate()
        };
    },

    /**
     * Check if a specific door should be accessible
     * @param {number} doorDay - Day number (1-24)
     * @returns {string} - 'locked', 'unlocked'
     */
    getDoorState(doorDay) {
        const current = this.getCurrentDate();

        // Only active in December
        if (current.month !== 12) {
            return 'locked';
        }

        // Before December 1st
        if (current.day < 1) {
            return 'locked';
        }

        // After December 24th, all doors accessible
        if (current.day > 24) {
            return 'unlocked';
        }

        // Future doors are locked
        if (doorDay > current.day) {
            return 'locked';
        }

        // Current and past doors are unlocked
        return 'unlocked';
    },

    /**
     * Check if it's currently December
     * @returns {boolean}
     */
    isDecember() {
        const current = this.getCurrentDate();
        return current.month === 12;
    },

    /**
     * Get today's door number (if in December)
     * @returns {number|null} Door number (1-24) or null
     */
    getTodaysDoor() {
        const current = this.getCurrentDate();
        if (current.month === 12 && current.day >= 1 && current.day <= 24) {
            return current.day;
        }
        return null;
    },

    /**
     * Format date for display
     * @param {Object} date - Date object with year, month, day
     * @returns {string} Formatted date string
     */
    formatDate(date) {
        return `${date.day}. Dezember ${date.year}`;
    }
};

// For testing purposes - uncomment to test with specific date
// Example: Test with December 5th, 2025
// DateChecker.getCurrentDate = () => ({ year: 2025, month: 12, day: 5 });
