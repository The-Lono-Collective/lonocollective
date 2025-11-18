---
layout: default
title: Mental Health AI Safety Evaluation
---

{% include hero.html %}

<section class="problem-section">
    <div class="problem-content fade-in-up">
        <h2>Why Mental Health AI Requires Specialized Evaluation</h2>
        <p class="problem-stat">When AI systems make suicide risk assessments, crisis decisions, or psychiatric diagnoses, <strong>generic AI evaluation isn't enough</strong>.</p>
        <p class="problem-detail">Mental health AI operates in environments where ambiguity is the norm, incomplete information is expected, and judgment calls determine whether someone lives or dies. Your vendor showed you impressive accuracy numbers on clean test datasets. We help you understand what happens when their system encounters the edge cases that matter most in real clinical settings.</p>
        <p class="problem-solution">We're developing evaluation frameworks specifically designed for mental health AI—combining clinical expertise with rigorous research methodology to identify failure modes before they harm patients.</p>
    </div>
</section>

<section id="framework" class="framework-section">
    <div class="framework-content">
        <h2 class="fade-in-up">What Pilot Clients Receive</h2>
        <p class="framework-intro fade-in-up">We're seeking early partners to validate our evaluation frameworks in real-world settings. Pilot engagements combine clinical expertise with systematic research methodology.</p>

        <div class="framework-approach">
            <h3 class="fade-in-up">Four Deliverables</h3>
            <div class="methodology-grid">
                <div class="method-card fade-in-up">
                    <h4>Mental Health-Specific Failure Mode Analysis</h4>
                    <p>Systematic testing using evidence-based clinical scenarios (validated against tools like the C-SSRS for suicide risk assessment). We identify where your system breaks down in ambiguous presentations, incomplete information, and crisis situations requiring immediate judgment.</p>
                </div>
                <div class="method-card fade-in-up">
                    <h4>Research-Grade Documentation</h4>
                    <p>Evaluation reports following academic research standards (PRISMA systematic reviews, Delphi expert consensus methodology). Documentation designed to withstand regulatory scrutiny, stakeholder due diligence, and legal challenges.</p>
                </div>
                <div class="method-card fade-in-up">
                    <h4>Clinical Expert Consensus Report</h4>
                    <p>Validation from our network of board-certified psychiatrists, licensed clinical psychologists, and emergency medicine physicians. Expert assessment of clinical appropriateness, risk factors, and edge case handling.</p>
                </div>
                <div class="method-card fade-in-up">
                    <h4>Independent Third-Party Credibility</h4>
                    <p>Worker-owned cooperative with no VC pressure, no equity stake in your success or your vendor's success. Just rigorous evaluation and honest findings you can defend to regulators and stakeholders.</p>
                </div>
            </div>
        </div>

        <div class="framework-impact fade-in-up">
            <h3>Why Mental Health AI Needs Different Evaluation</h3>
            <p><strong>Generic AI safety evaluation misses what matters in mental health contexts</strong>:</p>
            <ul>
                <li><strong>Ambiguity is the norm</strong>: Unlike radiology or pathology where ground truth exists, mental health assessment inherently involves subjective clinical judgment. Your evaluation needs clinicians, not just ML engineers.</li>
                <li><strong>Cultural and demographic factors are critical</strong>: Symptom presentation, help-seeking behavior, and crisis expression vary dramatically across populations. Evaluation must test for bias and appropriateness across diverse patient groups.</li>
                <li><strong>Stakes are immediate and irreversible</strong>: Medication errors in other domains might be caught and corrected. A missed suicide risk assessment or inappropriate crisis intervention can kill someone within hours.</li>
                <li><strong>Legal and regulatory complexity</strong>: Mental health AI intersects with informed consent, involuntary commitment laws, HIPAA privacy protections, and liability frameworks that don't apply to general healthcare AI.</li>
            </ul>
        </div>
    </div>
</section>

<section class="settings-section">
    <div class="settings-content">
        <h2 class="fade-in-up">Where Mental Health AI Operates—And Where It Fails</h2>
        <p class="settings-intro fade-in-up">We evaluate systems across five high-risk deployment settings where mental health AI is already being used to make life-or-death decisions:</p>

        <div class="settings-grid">
            <div class="setting-card fade-in-up">
                <h3>Correctional Mental Health</h3>
                <p>Suicide risk screening in jails and prisons, where mental health crises are common, resources are limited, and failures result in preventable deaths and massive liability.</p>
            </div>
            <div class="setting-card fade-in-up">
                <h3>Hospital Psychiatric Units</h3>
                <p>AI-assisted triage, suicide risk assessment, and discharge planning in inpatient psychiatric settings where clinical decisions determine whether someone is safe to leave or at imminent risk.</p>
            </div>
            <div class="setting-card fade-in-up">
                <h3>Community Mental Health Centers</h3>
                <p>AI tools supporting clinicians in outpatient settings serving high-risk populations—individuals with serious mental illness, substance use disorders, and trauma histories.</p>
            </div>
            <div class="setting-card fade-in-up">
                <h3>Telehealth and Crisis Lines</h3>
                <p>AI-powered crisis chatbots, virtual therapy platforms, and suicide prevention hotlines where remote assessment must identify risk without in-person clinical observation.</p>
            </div>
            <div class="setting-card fade-in-up">
                <h3>Primary Care Mental Health Integration</h3>
                <p>AI screening tools used in general medical settings to identify depression, anxiety, and suicide risk—often by providers with limited mental health training.</p>
            </div>
        </div>
    </div>
</section>

<section class="cooperative-section">
    <div class="cooperative-content">
        <h2 class="fade-in-up">Why the cooperative model matters</h2>
        <p class="cooperative-intro fade-in-up">Worker-owned and democratically governed. No venture capital pressure. No compromised research integrity.</p>

        <div class="cooperative-benefits">
            <div class="benefit-card fade-in-up">
                <h3>No VC Pressure</h3>
                <p>Bootstrapped and independent. Never pressured to soften findings, rush timelines, or compromise safety for profit or growth metrics.</p>
            </div>
            <div class="benefit-card fade-in-up">
                <h3>No Equity Stakes</h3>
                <p>We don't take equity in the companies we evaluate. We don't have partnerships with AI vendors. Our only incentive is rigorous, honest evaluation.</p>
            </div>
            <div class="benefit-card fade-in-up">
                <h3>Democratic Governance</h3>
                <p>Equal ownership and decision-making power among all worker-owners. Collective accountability for our work's integrity and clinical appropriateness.</p>
            </div>
        </div>

        <p class="cooperative-value fade-in-up">In mental health AI safety evaluation, independence isn't just a business model. It's a moral imperative. Lives depend on honest findings.</p>
    </div>
</section>

<section id="team" class="team-section">
    <div class="section-header fade-in-up">
        <h2>Core Team</h2>
        <p class="section-subtitle">Clinical research, emergency medicine, legal compliance, and AI safety expertise</p>
    </div>

    <div class="team-grid">
        {% for member in site.data.team %}
        <div class="team-member fade-in-up">
            {% if member.image %}
            <div class="member-avatar">
                <img src="{{ member.image | relative_url }}" alt="{{ member.name }}">
            </div>
            {% else %}
            <div class="member-avatar">{{ member.initials }}</div>
            {% endif %}
            <div class="member-info">
                <h3>{{ member.name }}</h3>
                <p class="member-title">{{ member.title }}</p>
                <p class="member-credentials">{{ member.credentials }}</p>
                <p class="member-expertise">{{ member.expertise }}</p>
            </div>
        </div>
        {% endfor %}
    </div>

    <div class="clinical-advisory fade-in-up">
        <p><strong>Clinical Advisory Network</strong>: Our evaluation frameworks are developed in consultation with board-certified psychiatrists, licensed clinical psychologists, and emergency medicine physicians who specialize in suicide risk assessment and crisis intervention.</p>
    </div>
</section>

<section id="contact" class="contact-section">
    <div class="contact-content">
        <h2 class="fade-in-up">Start With a Complimentary Risk Assessment</h2>
        <p class="contact-description fade-in-up">
            We're seeking pilot clients—hospitals, healthcare organizations, and AI vendors deploying mental health AI systems. Book a 45-minute consultation where we'll review your system, identify potential failure modes, and explain our evaluation approach. No obligation. No sales pitch. Just an honest assessment of whether rigorous evaluation would benefit your deployment.
        </p>

        <form class="contact-form fade-in-up" action="https://formspree.io/f/xqanepdw" method="POST">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required placeholder="Your name">
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required placeholder="your.email@organization.com">
            </div>

            <div class="form-group">
                <label for="organization">Organization</label>
                <input type="text" id="organization" name="organization" placeholder="Hospital, health system, or AI vendor">
            </div>

            <div class="form-group">
                <label for="system">Mental Health AI System Type</label>
                <select id="system" name="system-type">
                    <option value="">Select system type (optional)</option>
                    <option value="suicide-risk">Suicide Risk Assessment</option>
                    <option value="crisis-triage">Crisis Triage/Hotline AI</option>
                    <option value="diagnostic">Psychiatric Diagnosis Support</option>
                    <option value="treatment-planning">Treatment Planning/Recommendations</option>
                    <option value="screening">Mental Health Screening Tools</option>
                    <option value="other">Other Mental Health AI</option>
                </select>
            </div>

            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" name="message" rows="6" required placeholder="Tell us about your mental health AI system and deployment context..."></textarea>
            </div>

            <button type="submit" class="cta-button primary large">Request Risk Assessment</button>
        </form>

        <div class="contact-value fade-in-up">
            <p>Early pilot clients help us validate our frameworks in real-world settings. In exchange, you receive rigorous evaluation at significantly reduced rates and documentation you can use with regulators, legal counsel, and stakeholders.</p>
        </div>

        <div class="contact-alternative fade-in-up">
            <p>Prefer email? Reach us directly at <a href="mailto:{{ site.email }}">{{ site.email }}</a></p>
        </div>
    </div>
</section>
