---
layout: default
title: AI Safety Evaluation Frameworks
---

{% include hero.html %}

<section class="problem-section">
    <div class="problem-content">
        <h2>The cost of unsafe AI is measured in lives</h2>
        <p class="problem-stat">As of September 2025, at least <strong>five suicides</strong> have been attributed to conversations with AI language models—over half occurring in 2025 alone.</p>
        <p class="problem-detail">With 50% of U.S. adults using large language models and 40% engaging with them for mental health support, the stakes have never been higher. Yet little is known about how and why these models fail to identify suicide risk or, worse, encourage progression from ideation to action.</p>
        <p class="problem-solution">This is the problem we're solving.</p>
    </div>
</section>

<section id="framework" class="framework-section">
    <div class="framework-content">
        <h2>AI Crisis Intervention Framework</h2>
        <p class="framework-intro">Our flagship research project develops the first comprehensive, peer-reviewable framework for evaluating and implementing AI-based suicide detection and intervention systems.</p>

        <div class="framework-approach">
            <h3>Evidence-Based Methodology</h3>
            <div class="methodology-grid">
                <div class="method-card">
                    <h4>Systematic Literature Review</h4>
                    <p>PRISMA-compliant analysis of AI mental health interventions, identifying research gaps in suicide-specific applications.</p>
                </div>
                <div class="method-card">
                    <h4>Clinical Vignette Testing</h4>
                    <p>Standardized assessment using validated scenarios, comparing model responses against C-SSRS and other evidence-based crisis intervention standards.</p>
                </div>
                <div class="method-card">
                    <h4>Delphi Consensus Process</h4>
                    <p>Structured expert consensus with clinical and technical specialists to establish industry guidelines for responsible implementation.</p>
                </div>
                <div class="method-card">
                    <h4>Stakeholder Validation</h4>
                    <p>Review sessions with AI developers, clinical organizations, and regulatory experts to ensure actionable, defensible guidelines.</p>
                </div>
            </div>
        </div>

        <div class="framework-status">
            <div class="status-badge under-review">Under Review</div>
            <p class="status-text">Framework under review by major government AI safety institute</p>
        </div>

        <div class="framework-impact">
            <h3>Research Impact</h3>
            <p>This study will provide the first comprehensive framework for evaluating and implementing AI-based suicide detection systems, directly contributing to AI safety and public health outcomes.</p>
        </div>
    </div>
</section>

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
    </div>
</section>

<section class="cooperative-section">
    <div class="cooperative-content">
        <h2>Why the cooperative model matters</h2>
        <p class="cooperative-intro">Worker-owned and democratically governed, The Lono Collective operates without venture capital pressure, ensuring our research integrity remains uncompromised.</p>

        <div class="cooperative-benefits">
            <div class="benefit-card">
                <h3>No VC Pressure</h3>
                <p>Bootstrapped and independent, we're never pressured to compromise on safety for profit or growth metrics.</p>
            </div>
            <div class="benefit-card">
                <h3>Democratic Governance</h3>
                <p>Every member has equal ownership and decision-making power, ensuring collective accountability for our work's integrity.</p>
            </div>
            <div class="benefit-card">
                <h3>Aligned Incentives</h3>
                <p>Profit-sharing means every contributor is invested in delivering the highest quality, most rigorous research possible.</p>
            </div>
        </div>

        <p class="cooperative-value">In AI safety research, independence isn't just a business model; it's a moral imperative.</p>
    </div>
</section>

<section id="team" class="team-section">
    <div class="section-header">
        <h2>Multidisciplinary Expertise</h2>
        <p class="section-subtitle">Clinical, legal, technical, and research capabilities under one cooperative</p>
    </div>

    <div class="team-grid">
        {% for member in site.data.team %}
        <div class="team-member fade-in-up">
            <div class="member-avatar">{{ member.initials }}</div>
            <div class="member-info">
                <h3>{{ member.name }}</h3>
                <p class="member-title">{{ member.title }}</p>
                <p class="member-credentials">{{ member.credentials }}</p>
                <p class="member-expertise">{{ member.expertise }}</p>
            </div>
        </div>
        {% endfor %}
    </div>
</section>

<section id="contact" class="contact-section">
    <div class="contact-content">
        <h2>Work with us</h2>
        <p class="contact-description">
            We partner with AI companies, research institutes, and government agencies to develop evidence-based safety evaluation frameworks for high-risk AI systems.
        </p>

        <div class="contact-info">
            {% for method in site.data.contact %}
            <div class="contact-method fade-in-up">
                <h3>{{ method.title }}</h3>
                <p>{{ method.description }}</p>
            </div>
            {% endfor %}
        </div>

        <div class="contact-value">
            <p>Every engagement is structured to produce actionable, defensible guidelines that advance both AI safety and public health outcomes.</p>
        </div>

        <div class="contact-cta">
            <a href="mailto:{{ site.email }}" class="cta-button primary large">Partner With Us</a>
        </div>
    </div>
</section>
