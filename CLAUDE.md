# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static portfolio website for Guido Altmann, a senior software developer and architect based in Berlin, Germany. The website showcases his professional profile, services, and contact information.

## Architecture & Structure

The website is built as a modern static site using:

- **Frontend Framework**: Pure HTML5 with Bootstrap 5.3.2 (via CDN)
- **Styling**: Custom CSS with CSS custom properties for theming
- **JavaScript**: Vanilla JavaScript for smooth scrolling and navigation
- **Language**: German (lang="de")

### File Structure
```
/
├── index.html          # Main landing page with sections: About, Services, Contact
├── impressum.html      # Legal imprint page (required by German law)
├── css/
│   └── scrolling-nav.css  # Custom styles with modern CSS features
├── js/
│   └── scrolling-nav.js   # Smooth scrolling and navigation functionality
├── img/
│   ├── Foto_quadrat.jpg   # Portrait photo
│   └── Logo2_cut_orig.png # Header logo
├── robots.txt          # SEO robots configuration
└── sitemap.xml        # XML sitemap for search engines
```

## Key Features

- **Responsive Design**: Mobile-first approach with Bootstrap 5 grid system
- **Accessibility**: Includes skip links, ARIA labels, semantic HTML
- **SEO Optimized**: Meta tags, Open Graph, structured data (JSON-LD)
- **Dark Mode Support**: CSS custom properties with `prefers-color-scheme`
- **Social Integration**: LinkedIn, GitHub, FreelancerMap profiles
- **Smooth Scrolling**: Custom JavaScript for single-page navigation

## Development Approach

This is a **static website** with no build process or package management. Development is done directly on HTML, CSS, and JavaScript files.

### CSS Architecture
- Uses CSS custom properties (`:root` variables) for consistent theming
- Color palette defined with semantic names (--primary-color, --surface-bg, etc.)
- Modern CSS features: Grid, Flexbox, custom properties
- Print styles and reduced motion support included

### JavaScript Architecture
- Modern ES6+ vanilla JavaScript (no frameworks/libraries)
- Event delegation and performance-optimized scroll handling
- Bootstrap 5 integration for mobile menu functionality
- Smooth scrolling with proper offset calculations for fixed navbar

## Content Areas

1. **Header**: Logo display with gradient background
2. **About Section**: Professional background, skills, certifications
3. **Services Section**: Detailed service offerings in German
4. **Contact Section**: Email, social links, embedded meeting scheduler

## External Dependencies

- **Bootstrap 5.3.2**: CSS and JS from jsDelivr CDN
- **SimplyMeet.me**: Embedded iframe for meeting scheduling (https://app.simplymeet.me/guido-altmann/)
- **Social Platforms**: Direct links to GitHub, LinkedIn, FreelancerMap

## SEO & Legal Considerations

- **Structured Data**: JSON-LD schema for Person/Professional
- **German Legal Requirements**: Impressum page with business details
- **Meta Tags**: Comprehensive OpenGraph and Twitter Card support
- **Sitemap**: XML sitemap for search engine crawling

## Making Changes

When editing this website:
- Maintain German language content consistency
- Preserve accessibility features (ARIA labels, skip links)
- Update structured data if changing professional information
- Keep Bootstrap 5 CDN links current for security
- Test responsive behavior on mobile devices
- Validate HTML and ensure semantic structure

## Color Scheme

Primary colors are defined in CSS custom properties:
- Primary: #69b38f (green)
- Primary Dark: #5a9a7a
- Background: White with subtle gray variations
- Dark mode variants included via `prefers-color-scheme`