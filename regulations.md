---
layout: default
title: Mental Health AI Regulatory Tracker
---

<section class="regulations-page-hero">
    <div class="regulations-hero-content">
        <h1 class="fade-in-up">Mental Health AI Regulatory Tracker</h1>
        <p class="regulations-subtitle fade-in-up">Comprehensive tracking of federal, state, clinical, and international regulatory developments affecting mental health AI systems. Updated continuously as new regulations emerge.</p>
        <div class="regulatory-tracker-last-updated fade-in-up">Last Updated: November 2025</div>
    </div>
</section>

<section class="regulations-page-filters">
    <div class="filters-content">
        <div class="filter-group">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="federal">Federal</button>
            <button class="filter-btn" data-filter="state">State</button>
            <button class="filter-btn" data-filter="clinical">Clinical Standards</button>
            <button class="filter-btn" data-filter="international">International</button>
            <button class="filter-btn" data-filter="high-impact">High Impact Only</button>
        </div>
    </div>
</section>

<section class="regulations-page-content">
    <div class="regulations-timeline">
        {% for regulation in site.data.regulations %}
        <div id="{{ regulation.date | slugify }}" class="regulatory-item-full {{ regulation.category }} {% if regulation.high_impact %}high-impact{% endif %} fade-in-up" data-category="{{ regulation.category }}">
            <div class="regulatory-header">
                <div class="regulatory-date">{{ regulation.date }}</div>
                <div class="regulatory-badges">
                    {% if regulation.category == 'federal' %}
                    <span class="regulatory-badge federal">Federal</span>
                    {% elsif regulation.category == 'state' %}
                    <span class="regulatory-badge state">State</span>
                    {% elsif regulation.category == 'clinical' %}
                    <span class="regulatory-badge clinical">Clinical Standards</span>
                    {% elsif regulation.category == 'international' %}
                    <span class="regulatory-badge international">International</span>
                    {% endif %}
                    {% if regulation.high_impact %}
                    <span class="regulatory-badge high-impact">High Impact</span>
                    {% endif %}
                </div>
            </div>
            <h3 class="regulatory-title">{{ regulation.title }}</h3>
            <p class="regulatory-description">{{ regulation.description }}</p>
            {% if regulation.impact_note %}
            <div class="regulatory-impact-note">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                {{ regulation.impact_note }}
            </div>
            {% endif %}
            <div class="regulatory-source">
                <span class="regulatory-source-label">Source:</span>
                <a href="{{ regulation.source_url }}" class="regulatory-source-link" target="_blank" rel="noopener">{{ regulation.source_label }}</a>
            </div>
        </div>
        {% endfor %}
    </div>
</section>

<section class="regulations-cta">
    <div class="regulations-cta-content">
        <h2>Need Help Navigating Regulatory Compliance?</h2>
        <p>Our evaluation frameworks help mental health AI systems meet evolving regulatory requirements across federal, state, and clinical standards.</p>
        <a href="/#contact" class="cta-button primary large">Request Risk Assessment</a>
    </div>
</section>

<script src="{{ '/assets/js/regulations.js' | relative_url }}"></script>
