---
layout: default
title: AI Safety Evaluation Frameworks
---

{% include hero.html %}

<section class="problem-section">
    <div class="problem-content">
        <h2>Your internal testing caught the obvious problems. We catch the ones you missed.</h2>
        <p class="problem-stat">When your AI system could <strong>hurt or kill people</strong>, you need independent proof it's safe.</p>
        <p class="problem-detail">You've run evaluations and stress-tested edge cases. But regulators and stakeholders won't take your word for it. They need validation from experts with no stake in your product's success.</p>
        <p class="problem-solution">We provide that proof, or show you exactly where it fails before anyone gets harmed.</p>
    </div>
</section>

<section id="framework" class="framework-section">
    <div class="framework-content">
        <h2>What you get from an engagement</h2>
        <p class="framework-intro">Independent safety evaluations combining clinical expertise with technical research. Documentation you can defend to regulators, investors, and the public.</p>

        <div class="framework-approach">
            <h3>Four Concrete Deliverables</h3>
            <div class="methodology-grid">
                <div class="method-card">
                    <h4>Specific Failure Modes You Missed</h4>
                    <p>Systematic testing using evidence-based scenarios reveals where your system breaks down before real users encounter those failures.</p>
                </div>
                <div class="method-card">
                    <h4>Regulatory-Ready Documentation</h4>
                    <p>Peer-reviewable reports following academic standards (PRISMA, Delphi consensus) that satisfy regulatory scrutiny and due diligence.</p>
                </div>
                <div class="method-card">
                    <h4>Actionable Implementation Roadmap</h4>
                    <p>Defensible guidelines for fixes, prioritized by risk severity and validated by domain experts.</p>
                </div>
                <div class="method-card">
                    <h4>Third-Party Credibility</h4>
                    <p>Independent validation from a cooperative with no VC pressure, no equity stake in your success. Just rigorous evaluation and honest findings.</p>
                </div>
            </div>
        </div>

        <div class="framework-impact">
            <h3>Proven track record</h3>
            <p>We've applied this approach to AI systems in mental health, emergency healthcare, and other domains where mistakes cost lives. Our frameworks prevent harm.</p>
        </div>
    </div>
</section>

<section class="cooperative-section">
    <div class="cooperative-content">
        <h2>Why the cooperative model matters</h2>
        <p class="cooperative-intro">Worker-owned and democratically governed. No venture capital pressure. No compromised research integrity.</p>

        <div class="cooperative-benefits">
            <div class="benefit-card">
                <h3>No VC Pressure</h3>
                <p>Bootstrapped and independent. Never pressured to compromise safety for profit or growth metrics.</p>
            </div>
            <div class="benefit-card">
                <h3>Democratic Governance</h3>
                <p>Equal ownership and decision-making power. Collective accountability for our work's integrity.</p>
            </div>
            <div class="benefit-card">
                <h3>Aligned Incentives</h3>
                <p>Profit-sharing means every contributor is invested in delivering rigorous research.</p>
            </div>
        </div>

        <p class="cooperative-value">In AI safety research, independence isn't just a business model. It's a moral imperative.</p>

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
        <h2>Ready to validate your AI system?</h2>
        <p class="contact-description">
            We work with AI companies, research institutes, and government agencies deploying systems in high-stakes domains. If failure could harm people, we can prove it's safe or fix it before launch.
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
            <p>Every engagement delivers documentation you can defend to regulators, stakeholders, and the public. No conflicts of interest. No compromises on rigor.</p>
        </div>

        <div class="contact-cta">
            <a href="mailto:{{ site.email }}" class="cta-button primary large">Get Independent Validation</a>
        </div>
    </div>
</section>
