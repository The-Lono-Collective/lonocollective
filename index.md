---
layout: default
title: AI Safety Evaluation Frameworks
---

{% include hero.html %}

<section class="problem-section">
    <div class="problem-content">
        <h2>High-risk AI systems need rigorous evaluation before deployment</h2>
        <p class="problem-stat">AI systems are increasingly deployed in <strong>high-stakes domains</strong>—from mental health support to medical diagnosis to child welfare decisions.</p>
        <p class="problem-detail">Yet most AI safety evaluation relies on ad-hoc testing and post-deployment monitoring. When AI systems interact with vulnerable populations or make decisions that affect human wellbeing, reactive approaches are insufficient.</p>
        <p class="problem-solution">We develop evidence-based frameworks that prevent harm before deployment.</p>
    </div>
</section>

<section id="framework" class="framework-section">
    <div class="framework-content">
        <h2>Our Evaluation Methodology</h2>
        <p class="framework-intro">We combine clinical expertise with technical research to develop comprehensive, peer-reviewable frameworks for evaluating high-risk AI systems before deployment.</p>

        <div class="framework-approach">
            <h3>Evidence-Based Approach</h3>
            <div class="methodology-grid">
                <div class="method-card">
                    <h4>Systematic Literature Review</h4>
                    <p>PRISMA-compliant analysis of existing research and interventions, identifying gaps and establishing evidence-based benchmarks for your domain.</p>
                </div>
                <div class="method-card">
                    <h4>Standardized Scenario Testing</h4>
                    <p>Vignette-based assessment using validated test cases, comparing AI system responses against clinical standards and best practices.</p>
                </div>
                <div class="method-card">
                    <h4>Expert Consensus Building</h4>
                    <p>Structured Delphi process with domain specialists to establish rigorous, defensible guidelines for responsible AI implementation.</p>
                </div>
                <div class="method-card">
                    <h4>Stakeholder Validation</h4>
                    <p>Collaborative review with technical teams, domain experts, and regulatory stakeholders to ensure actionable, auditable frameworks.</p>
                </div>
            </div>
        </div>

        <div class="framework-impact">
            <h3>Proven Expertise</h3>
            <p>Our frameworks have been applied to AI safety evaluation in mental health, healthcare process intelligence, and other high-stakes domains where technical rigor meets real-world impact.</p>
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
            <p>Our research extends beyond AI safety to healthcare equity, applying similar frameworks to emergency department process intelligence. <a href="{{ '/research/ocpi/' | relative_url }}" class="teaser-link">View research →</a></p>
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
