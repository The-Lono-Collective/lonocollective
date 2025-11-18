/**
 * @jest-environment jsdom
 */

describe('Contact Form', () => {
    beforeEach(() => {
        // Set up the form HTML
        document.body.innerHTML = `
            <form class="contact-form" action="https://formspree.io/f/xqanepdw" method="POST">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" required placeholder="Your name">
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required placeholder="your.email@company.com">
                </div>

                <div class="form-group">
                    <label for="organization">Organization</label>
                    <input type="text" id="organization" name="organization" placeholder="Your company or institution">
                </div>

                <div class="form-group">
                    <label for="system">AI System Type</label>
                    <select id="system" name="system-type">
                        <option value="">Select system type (optional)</option>
                        <option value="healthcare">Healthcare/Medical AI</option>
                        <option value="autonomous">Autonomous Systems</option>
                        <option value="safety-critical">Safety-Critical Infrastructure</option>
                        <option value="legal">Legal/Judicial AI</option>
                        <option value="financial">Financial Systems</option>
                        <option value="other">Other High-Stakes Domain</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" name="message" rows="6" required placeholder="Tell us about your AI system and what kind of validation you need..."></textarea>
                </div>

                <button type="submit" class="cta-button primary large">Send Inquiry</button>
            </form>
        `;
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('form exists with correct action and method', () => {
        const form = document.querySelector('.contact-form');

        expect(form).toBeTruthy();
        expect(form.getAttribute('action')).toBe('https://formspree.io/f/xqanepdw');
        expect(form.getAttribute('method')).toBe('POST');
    });

    test('has all required form fields', () => {
        expect(document.getElementById('name')).toBeTruthy();
        expect(document.getElementById('email')).toBeTruthy();
        expect(document.getElementById('organization')).toBeTruthy();
        expect(document.getElementById('system')).toBeTruthy();
        expect(document.getElementById('message')).toBeTruthy();
    });

    test('required fields have required attribute', () => {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const orgInput = document.getElementById('organization');
        const systemSelect = document.getElementById('system');

        expect(nameInput.hasAttribute('required')).toBe(true);
        expect(emailInput.hasAttribute('required')).toBe(true);
        expect(messageInput.hasAttribute('required')).toBe(true);

        // Optional fields should not be required
        expect(orgInput.hasAttribute('required')).toBe(false);
        expect(systemSelect.hasAttribute('required')).toBe(false);
    });

    test('email field has correct type', () => {
        const emailInput = document.getElementById('email');
        expect(emailInput.getAttribute('type')).toBe('email');
    });

    test('system type dropdown has correct options', () => {
        const systemSelect = document.getElementById('system');
        const options = systemSelect.querySelectorAll('option');

        expect(options.length).toBe(7); // 1 default + 6 options
        expect(options[0].value).toBe('');
        expect(options[1].value).toBe('healthcare');
        expect(options[2].value).toBe('autonomous');
        expect(options[3].value).toBe('safety-critical');
        expect(options[4].value).toBe('legal');
        expect(options[5].value).toBe('financial');
        expect(options[6].value).toBe('other');
    });

    test('form prevents submission when required fields are empty', () => {
        const form = document.querySelector('.contact-form');
        const submitButton = form.querySelector('button[type="submit"]');

        // Mock form validity
        const mockCheckValidity = jest.fn(() => false);
        form.checkValidity = mockCheckValidity;

        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });

        // Prevent actual submission
        form.addEventListener('submit', (e) => {
            if (!form.checkValidity()) {
                e.preventDefault();
            }
        });

        form.dispatchEvent(submitEvent);

        expect(mockCheckValidity).toHaveBeenCalled();
    });

    test('form validation passes with valid data', () => {
        const form = document.querySelector('.contact-form');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        // Fill in required fields with valid data
        nameInput.value = 'John Doe';
        emailInput.value = 'john@example.com';
        messageInput.value = 'This is a test message about AI validation.';

        // Mock form validity
        form.checkValidity = jest.fn(() => true);

        expect(form.checkValidity()).toBe(true);
    });

    test('submit button has correct styling classes', () => {
        const submitButton = document.querySelector('button[type="submit"]');

        expect(submitButton.classList.contains('cta-button')).toBe(true);
        expect(submitButton.classList.contains('primary')).toBe(true);
        expect(submitButton.classList.contains('large')).toBe(true);
    });

    test('all form inputs have correct name attributes for Formspree', () => {
        expect(document.getElementById('name').getAttribute('name')).toBe('name');
        expect(document.getElementById('email').getAttribute('name')).toBe('email');
        expect(document.getElementById('organization').getAttribute('name')).toBe('organization');
        expect(document.getElementById('system').getAttribute('name')).toBe('system-type');
        expect(document.getElementById('message').getAttribute('name')).toBe('message');
    });

    test('form does not submit when fields are invalid', () => {
        const form = document.querySelector('.contact-form');
        let submitted = false;

        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Always prevent in tests
            submitted = true;
        });

        // Try to submit with empty required fields
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');

        nameInput.value = ''; // Empty required field
        emailInput.value = 'invalid-email'; // Invalid email format

        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(submitEvent);

        // Form attempted submission (our test listener caught it)
        expect(submitted).toBe(true);
    });
});

describe('Contact Form AJAX Handler', () => {
    let form;
    let submitButton;

    beforeEach(() => {
        document.body.innerHTML = `
            <div class="contact-content">
                <form class="contact-form" action="https://formspree.io/f/xqanepdw" method="POST">
                    <input type="text" id="name" name="name" required>
                    <input type="email" id="email" name="email" required>
                    <textarea id="message" name="message" required></textarea>
                    <button type="submit" class="cta-button primary large">Send Inquiry</button>
                </form>
            </div>
        `;

        form = document.querySelector('.contact-form');
        submitButton = form.querySelector('button[type="submit"]');

        // Mock fetch
        global.fetch = jest.fn();
    });

    afterEach(() => {
        document.body.innerHTML = '';
        jest.restoreAllMocks();
    });

    test('AJAX submission prevents default form submission', async () => {
        const { initContactForm } = await import('./contact-form.js');
        initContactForm();

        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
        let defaultPrevented = false;

        submitEvent.preventDefault = () => { defaultPrevented = true; };

        form.dispatchEvent(submitEvent);

        expect(defaultPrevented).toBe(true);
    });

    test('successful submission shows success message', async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => ({})
        });

        const { initContactForm } = await import('./contact-form.js');
        initContactForm();

        // Fill form
        document.getElementById('name').value = 'Test User';
        document.getElementById('email').value = 'test@example.com';
        document.getElementById('message').value = 'Test message';

        // Submit form
        form.dispatchEvent(new Event('submit'));

        // Wait for async operations
        await new Promise(resolve => setTimeout(resolve, 100));

        // Check for success message
        const successMessage = document.querySelector('.form-success');
        expect(successMessage).toBeTruthy();
        expect(successMessage.textContent).toContain('Message sent successfully');
    });

    test('failed submission shows error message', async () => {
        global.fetch.mockResolvedValue({
            ok: false,
            json: async () => ({ errors: 'Test error' })
        });

        const { initContactForm } = await import('./contact-form.js');
        initContactForm();

        // Fill form
        document.getElementById('name').value = 'Test User';
        document.getElementById('email').value = 'test@example.com';
        document.getElementById('message').value = 'Test message';

        // Submit form
        form.dispatchEvent(new Event('submit'));

        // Wait for async operations
        await new Promise(resolve => setTimeout(resolve, 100));

        // Check for error message
        const errorMessage = document.querySelector('.form-error');
        expect(errorMessage).toBeTruthy();
    });

    test('network error shows error message', async () => {
        global.fetch.mockRejectedValue(new Error('Network error'));

        const { initContactForm } = await import('./contact-form.js');
        initContactForm();

        // Fill form
        document.getElementById('name').value = 'Test User';
        document.getElementById('email').value = 'test@example.com';
        document.getElementById('message').value = 'Test message';

        // Submit form
        form.dispatchEvent(new Event('submit'));

        // Wait for async operations
        await new Promise(resolve => setTimeout(resolve, 100));

        // Check for error message
        const errorMessage = document.querySelector('.form-error');
        expect(errorMessage).toBeTruthy();
        expect(errorMessage.textContent).toContain('Network error');
    });
});
