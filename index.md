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

        <div class="research-teaser">
            <p>Our research extends beyond AI safety to healthcare equity, applying similar frameworks to emergency department process intelligence. <a href="/research/ocpi" class="teaser-link">View research →</a></p>
        </div>
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
