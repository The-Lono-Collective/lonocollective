import { initNavigation, initSmoothScrolling } from './components/navigation.js';
import { initContactForm } from './contact-form.js';

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSmoothScrolling();
    initContactForm();
});
