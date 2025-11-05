---
layout: default
title: Healthcare Equity Through Process Intelligence
---

<section id="ocpi" class="ocpi-section">
    <div class="ocpi-content">
        <div class="section-header">
            <span class="section-label">Healthcare Equity Research</span>
            <h2>{{ site.data.projects[0].title }}</h2>
            <p class="section-subtitle">{{ site.data.projects[0].subtitle }}</p>
        </div>

        <div class="ocpi-problem">
            <h3>The Challenge</h3>
            <p>{{ site.data.projects[0].problem }}</p>
        </div>

        <div class="ocpi-innovation">
            <h3>{{ site.data.projects[0].innovation }}</h3>
            <p class="innovation-approach">{{ site.data.projects[0].approach }}</p>
        </div>

        <div class="ocpi-differentiators">
            <h3>Key Innovations</h3>
            <div class="differentiator-grid">
                {% for diff in site.data.projects[0].key_differentiators %}
                <div class="diff-card">
                    <h4>{{ diff.label }}</h4>
                    <p>{{ diff.description }}</p>
                </div>
                {% endfor %}
            </div>
        </div>

        <div class="ocpi-methodology">
            <h3>Research Methodology</h3>
            <p class="methodology-intro">A 30-month phased approach combining technical innovation with community-based participatory research</p>
            <div class="methodology-timeline">
                {% for phase in site.data.projects[0].methodology.phases %}
                <div class="phase-card">
                    <div class="phase-duration">{{ phase.duration }}</div>
                    <h4>{{ phase.name }}</h4>
                    <p>{{ phase.deliverable }}</p>
                </div>
                {% endfor %}
            </div>
        </div>

        <div class="ocpi-community">
            <h3>Community-Based Participatory Research</h3>
            <p>{{ site.data.projects[0].community_based }}</p>
        </div>

        <div class="ocpi-impact">
            <h3>Expected Impact</h3>
            <div class="impact-timeline">
                <div class="impact-stage">
                    <h4>Immediate</h4>
                    <ul>
                        {% for item in site.data.projects[0].expected_impact.immediate %}
                        <li>{{ item }}</li>
                        {% endfor %}
                    </ul>
                </div>
                <div class="impact-stage">
                    <h4>Medium-Term</h4>
                    <ul>
                        {% for item in site.data.projects[0].expected_impact.medium_term %}
                        <li>{{ item }}</li>
                        {% endfor %}
                    </ul>
                </div>
                <div class="impact-stage">
                    <h4>Transformative</h4>
                    <ul>
                        {% for item in site.data.projects[0].expected_impact.transformative %}
                        <li>{{ item }}</li>
                        {% endfor %}
                    </ul>
                </div>
            </div>
        </div>

        <div class="ocpi-status">
            <div class="status-badge seeking-funding">{{ site.data.projects[0].status }}</div>
            <p class="status-text">{{ site.data.projects[0].timeline }} implementation timeline</p>
        </div>

        <div class="back-link" style="text-align: center; margin-top: 60px;">
            <a href="{{ '/' | relative_url }}" class="cta-button secondary">← Back to Home</a>
        </div>
    </div>
</section>
