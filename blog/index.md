---
layout: default
title: Blog
description: Thought leadership and announcements from The Lono Collective on AI safety evaluation, mental health AI, and regulatory developments.
---

<div class="blog-container">
  <header class="blog-header">
    <h1>From the Collective</h1>
    <p>Thought leadership and updates on AI safety evaluation for mental health systems.</p>
  </header>

  <div class="blog-filter" role="group" aria-label="Filter posts by category">
    <button class="blog-filter-btn is-active" data-filter="all" aria-pressed="true">All</button>
    <button class="blog-filter-btn" data-filter="research" aria-pressed="false">Research</button>
    <button class="blog-filter-btn" data-filter="announcement" aria-pressed="false">Announcements</button>
  </div>

  <div class="blog-post-list" id="blog-post-list">
    {% assign posts = site.posts %}
    {% if posts.size == 0 %}
    <p class="blog-empty-state">No posts yet. Check back soon.</p>
    {% else %}
    {% for post in posts %}
    {% assign author = site.data.authors[post.author] %}
    <a href="{{ post.url }}" class="blog-post-card" data-category="{{ post.category }}">
      <div class="blog-card-meta">
        {% if post.category %}
        <span class="blog-category-badge blog-category-badge--{{ post.category }}">{{ post.category | capitalize }}</span>
        {% endif %}
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %-d, %Y" }}</time>
      </div>
      <h2 class="blog-card-title">{{ post.title }}</h2>
      {% if post.excerpt %}
      <p class="blog-card-excerpt">{{ post.excerpt }}</p>
      {% endif %}
      {% if author %}
      <span class="blog-card-author">{{ author.name }}</span>
      {% endif %}
    </a>
    {% endfor %}
    {% endif %}
  </div>
</div>

<script>
(function () {
  var buttons = document.querySelectorAll('.blog-filter-btn');
  var cards = document.querySelectorAll('.blog-post-card');
  var emptyState = document.querySelector('.blog-empty-state');

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');

      buttons.forEach(function (b) {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');

      var visibleCount = 0;
      cards.forEach(function (card) {
        var match = filter === 'all' || card.getAttribute('data-category') === filter;
        card.hidden = !match;
        if (match) visibleCount++;
      });

      if (emptyState) {
        emptyState.hidden = visibleCount > 0;
      }
    });
  });
}());
</script>
