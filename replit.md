# Creative Studio Portfolio Website

## Overview

This is a static website for a professional graphic design studio showcasing their portfolio across multiple design categories including logos, business cards, flyers/brochures, and website design. The site is built with pure HTML, CSS, and JavaScript without any frameworks, focusing on clean design and smooth user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Pure HTML/CSS/JavaScript**: No frameworks or build tools, keeping the architecture simple and lightweight
- **Multi-page Structure**: Separate HTML files for different portfolio categories (logos, business cards, flyers, websites)
- **Responsive Design**: Mobile-first approach with CSS media queries for different screen sizes
- **Modern CSS**: Utilizes CSS Grid, Flexbox, and modern properties like `backdrop-filter` for glass morphism effects

### File Structure
```
/
├── index.html          # Main homepage
├── logos.html          # Logo portfolio page
├── business-cards.html # Business card portfolio page
├── flyers.html         # Flyer/brochure portfolio page
├── websites.html       # Website design portfolio page
├── styles.css          # Main stylesheet
├── websites.css        # Website portfolio specific styles
└── script.js           # JavaScript functionality
```

## Key Components

### Navigation System
- Fixed header navigation with glass morphism effect
- Responsive hamburger menu for mobile devices
- Smooth scrolling between sections
- Dynamic background changes based on scroll position

### Portfolio Structure
- **Homepage**: Hero section, about, work gallery, and contact sections
- **Category Pages**: Dedicated pages for each design category with breadcrumb navigation
- **Consistent Layout**: Shared navigation and styling across all pages

### Interactive Features
- Mobile-responsive hamburger menu
- Smooth scrolling navigation
- Dynamic navbar styling on scroll
- Gallery filtering functionality (prepared but not fully implemented)

## Data Flow

### Static Content Flow
1. User navigates to the website
2. HTML pages load with embedded content
3. CSS provides styling and responsive behavior
4. JavaScript enhances user interactions (navigation, scrolling, mobile menu)

### Navigation Flow
- Main page serves as hub with anchor links to sections
- Portfolio category pages are separate HTML files
- Breadcrumb navigation provides clear user orientation
- All portfolio pages link back to main homepage

## External Dependencies

### Fonts
- **Google Fonts**: 
  - Poppins (300, 400, 500, 600, 700 weights)
  - Playfair Display (400, 500, 600, 700 weights)

### Icon Library
- **Font Awesome 6.0.0**: CDN-hosted for scalable vector icons

### No Backend Dependencies
- Pure frontend implementation
- No database requirements
- No server-side processing
- No authentication system

## Deployment Strategy

### Static Hosting Compatible
The website is designed for static hosting platforms such as:
- GitHub Pages
- Netlify
- Vercel
- Traditional web hosting

### Deployment Requirements
- No build process required
- Direct file upload to hosting provider
- Standard web server with HTML/CSS/JS support
- No server-side configuration needed

### Performance Considerations
- Lightweight codebase with minimal dependencies
- Optimized for fast loading with efficient CSS
- Google Fonts preloaded for performance
- Responsive images and modern CSS techniques

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Uses contemporary CSS features like `backdrop-filter`
- Progressive enhancement approach for older browsers