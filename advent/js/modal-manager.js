const ModalManager = {
    modal: null,
    modalBody: null,
    currentDay: null,
    lastFocusedElement: null,

    /**
     * Initialize modal system
     */
    init() {
        this.createModalStructure();
        this.attachEventListeners();
        console.log('✅ Modal-System initialisiert');
    },

    /**
     * Create modal DOM structure and append to body
     */
    createModalStructure() {
        const modalHTML = `
            <div class="modal-backdrop" id="contentModal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
                <div class="modal-container" role="document">
                    <div class="modal-header">
                        <h2 class="modal-title" id="modalTitle">Türchen</h2>
                        <button class="modal-close" aria-label="Schließen" title="Schließen (ESC)">
                            ×
                        </button>
                    </div>
                    <div class="modal-body" id="modalBody">
                        <!-- Content will be loaded here -->
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('contentModal');
        this.modalBody = document.getElementById('modalBody');
    },

    /**
     * Attach event listeners for modal interactions
     */
    attachEventListeners() {
        // Close button
        const closeButton = this.modal.querySelector('.modal-close');
        closeButton.addEventListener('click', () => this.hide());

        // ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('show')) {
                this.hide();
            }
        });

        // Backdrop click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hide();
            }
        });

        // Prevent modal container clicks from closing
        const container = this.modal.querySelector('.modal-container');
        container.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    },

    /**
     * Show modal with content for specific day
     * @param {number} day - Day number (1-24)
     */
    async show(day) {
        this.currentDay = day;
        this.lastFocusedElement = document.activeElement;

        // Update modal title
        const modalTitle = this.modal.querySelector('.modal-title');
        modalTitle.textContent = `Türchen ${day}`;

        // Show modal with loading state
        this.modalBody.innerHTML = '<div class="modal-loading"></div>';
        this.modal.classList.add('show');
        document.body.style.overflow = 'hidden';

        // Load content
        try {
            const content = await this.loadContent(day);
            this.modalBody.innerHTML = content;

            // Apply syntax highlighting if Prism is available
            if (window.Prism) {
                Prism.highlightAllUnder(this.modalBody);
            }

            // Focus management
            const closeButton = this.modal.querySelector('.modal-close');
            closeButton.focus();

            console.log(`📖 Türchen ${day} geöffnet`);
        } catch (error) {
            this.showError(day, error);
        }
    },

    /**
     * Hide modal
     */
    hide() {
        this.modal.classList.remove('show');
        document.body.style.overflow = '';

        // Return focus to element that opened modal
        if (this.lastFocusedElement) {
            this.lastFocusedElement.focus();
        }

        // Clear content after animation
        setTimeout(() => {
            this.modalBody.innerHTML = '';
            this.currentDay = null;
        }, 300);

        console.log('✅ Modal geschlossen');
    },

    /**
     * Load content from HTML file
     * @param {number} day - Day number
     * @returns {Promise<string>} HTML content
     */
    async loadContent(day) {
        const contentPath = `content/day-${day}.html`;

        try {
            const response = await fetch(contentPath);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const html = await response.text();
            return html;
        } catch (error) {
            console.error(`Fehler beim Laden von ${contentPath}:`, error);
            throw error;
        }
    },

    /**
     * Show error message in modal
     * @param {number} day - Day number
     * @param {Error} error - Error object
     */
    showError(day, error) {
        const errorHTML = `
            <div class="modal-error">
                <h3>🎁 Inhalt nicht gefunden</h3>
                <p>Der Inhalt für Türchen ${day} ist noch nicht verfügbar.</p>
                <p>Bitte versuche es später erneut!</p>
                <p style="font-size: 0.875rem; color: #666; margin-top: 1.5rem;">
                    Technischer Hinweis: ${error.message}
                </p>
            </div>
        `;

        this.modalBody.innerHTML = errorHTML;
        console.error(`❌ Fehler beim Laden von Türchen ${day}:`, error);
    }
};
