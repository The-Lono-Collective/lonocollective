import { initNavigation, initSmoothScrolling } from './components/navigation.js';
import { initContactForm } from './contact-form.js';
import { initScrollDots } from './scroll-dots.js';
import { initRiskMatrix } from './risk-matrix.js';
import { initBlogFilter } from './components/blog-filter.js';

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSmoothScrolling();
    initContactForm();
    initScrollDots();
    initRiskMatrix();
    initBlogFilter(document, window.location.search);
});
