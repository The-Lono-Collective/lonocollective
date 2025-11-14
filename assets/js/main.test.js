/**
 * @jest-environment jsdom
 */

import { initNavigation, initSmoothScrolling } from './components/navigation.js';

// Mock the navigation module
jest.mock('./components/navigation.js', () => ({
    initNavigation: jest.fn(),
    initSmoothScrolling: jest.fn()
}));

describe('main.js', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();

        // Reset DOM
        document.body.innerHTML = '';
    });

    test('calls initNavigation on DOMContentLoaded', () => {
        // Import main.js to execute its code
        require('./main.js');

        // Dispatch DOMContentLoaded event
        document.dispatchEvent(new Event('DOMContentLoaded'));

        expect(initNavigation).toHaveBeenCalledTimes(1);
    });

    test('calls initSmoothScrolling on DOMContentLoaded', () => {
        // Import main.js to execute its code
        require('./main.js');

        // Dispatch DOMContentLoaded event
        document.dispatchEvent(new Event('DOMContentLoaded'));

        expect(initSmoothScrolling).toHaveBeenCalledTimes(1);
    });

    test('initializes both functions in correct order', () => {
        const callOrder = [];

        initNavigation.mockImplementation(() => {
            callOrder.push('initNavigation');
        });

        initSmoothScrolling.mockImplementation(() => {
            callOrder.push('initSmoothScrolling');
        });

        // Import main.js to execute its code
        require('./main.js');

        // Dispatch DOMContentLoaded event
        document.dispatchEvent(new Event('DOMContentLoaded'));

        expect(callOrder).toEqual(['initNavigation', 'initSmoothScrolling']);
    });
});
