// Contact form AJAX submission handler
export function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        const formData = new FormData(form);

        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showSuccessMessage();
            } else {
                const data = await response.json();
                showErrorMessage(data.errors || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            showErrorMessage('Network error. Please check your connection and try again.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Inquiry';
        }
    });
}

function showSuccessMessage() {
    const form = document.querySelector('.contact-form');
    const container = form.parentElement;

    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'form-message form-success fade-in-up';
    successDiv.innerHTML = `
        <div class="message-icon">✓</div>
        <h3>Message sent successfully!</h3>
        <p>Thank you for reaching out. We'll review your inquiry and get back to you within 1-2 business days.</p>
        <button class="cta-button secondary" onclick="location.reload()">Send Another Message</button>
    `;

    // Replace form with success message
    form.style.display = 'none';
    container.insertBefore(successDiv, form);

    // Trigger animation
    setTimeout(() => successDiv.classList.add('animate'), 10);
}

function showErrorMessage(errors) {
    // Remove any existing error messages
    const existingError = document.querySelector('.form-error');
    if (existingError) existingError.remove();

    const form = document.querySelector('.contact-form');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-message form-error';

    let errorText = 'Please check your form and try again.';
    if (typeof errors === 'string') {
        errorText = errors;
    } else if (Array.isArray(errors)) {
        errorText = errors.map(e => e.message).join(', ');
    }

    errorDiv.innerHTML = `
        <div class="message-icon">✕</div>
        <p><strong>Error:</strong> ${errorText}</p>
    `;

    form.insertBefore(errorDiv, form.firstChild);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        errorDiv.style.opacity = '0';
        setTimeout(() => errorDiv.remove(), 300);
    }, 5000);
}
