import { initNavigation, initSmoothScrolling } from './components/navigation.js';
import { initContactForm } from './contact-form.js';
import { initScrollDots } from './scroll-dots.js';
import { initRiskMatrix } from './risk-matrix.js';

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSmoothScrolling();
    initContactForm();
    initScrollDots();
    initRiskMatrix();
});
