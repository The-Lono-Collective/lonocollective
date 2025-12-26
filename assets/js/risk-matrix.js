/**
 * Risk Matrix - Tap to toggle labels on mobile
 * On desktop, hover works. On mobile, tap toggles the labels.
 */

export function initRiskMatrix() {
    // Only activate on mobile/touch devices
    if (window.innerWidth > 768) return;

    const riskPoints = document.querySelectorAll('.risk-point');

    if (riskPoints.length === 0) return;

    riskPoints.forEach(point => {
        point.addEventListener('click', (e) => {
            e.stopPropagation();

            // Check if this point is already active
            const isActive = point.classList.contains('active');

            // Close all other labels first
            riskPoints.forEach(p => {
                if (p !== point) {
                    p.classList.remove('active');
                }
            });

            // Toggle this one
            point.classList.toggle('active', !isActive);
        });
    });

    // Close labels when tapping outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.risk-point') && !e.target.closest('.risk-label')) {
            riskPoints.forEach(p => {
                p.classList.remove('active');
            });
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            riskPoints.forEach(p => {
                p.classList.remove('active');
            });
        }
    });
}

// Re-check on resize (handles orientation changes)
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Remove active states when switching to desktop
        if (window.innerWidth > 768) {
            document.querySelectorAll('.risk-point.active').forEach(p => {
                p.classList.remove('active');
            });
        }
    }, 250);
});
