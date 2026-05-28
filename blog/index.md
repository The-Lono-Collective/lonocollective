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

  {% if site.tags.size > 0 %}
  {% assign sorted_tags = site.tags | sort %}
  <div class="blog-tag-filter" role="group" aria-label="Filter posts by tag">
    <button class="blog-tag-btn is-active" data-tag="all" aria-pressed="true">All Tags</button>
    {% for tag in sorted_tags %}
    <button class="blog-tag-btn" data-tag="{{ tag[0] | slugify }}" aria-pressed="false">{{ tag[0] }}</button>
    {% endfor %}
  </div>
  {% endif %}

  <div class="blog-post-list" id="blog-post-list">
    {% assign posts = site.posts %}
    {% if posts.size == 0 %}
    <p class="blog-empty-state">No posts yet. Check back soon.</p>
    {% else %}
    {% for post in posts %}
    {% assign author = site.data.authors[post.author] %}
    <a href="{{ post.url }}" class="blog-post-card" data-category="{{ post.category }}" data-tags="{% for t in post.tags %}{{ t | slugify }} {% endfor %}">
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
