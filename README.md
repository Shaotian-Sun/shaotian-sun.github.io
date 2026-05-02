# Shaotian Sun Academic Website

This repository hosts my personal academic website on GitHub Pages:

https://shaotian-sun.github.io

The site is a static, vanilla JavaScript single-page app for my mathematical notes, research and reading materials, programming projects, teaching timeline, and CV.

## Structure

- `index.html` loads the shared stylesheet and JavaScript app.
- `app.js` contains the hash-based router, page content, filters, theme toggle, animations, and canvas background.
- `site.css` contains the responsive visual system for the site.
- `notes.html`, `research.html`, and `cv.html` redirect legacy page URLs to the matching hash routes.
- `files/` stores downloadable PDFs used by the research and reading pages.
- `image/` stores preview images for research and reading cards.

## Routes

- `#/home` - homepage, contact links, programming projects, and teaching/research timeline.
- `#/notes` - course notes organized by term and filterable by subject.
- `#/research` - research and reading projects with local reports and notes.
- `#/cv` - link to the full academic CV.

## Local Preview

No build step is required. Open `index.html` directly in a browser, or serve the folder with any static file server, for example:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Update Log

- Initial version.
- Updated homepage on August 3, 2025.
- Uploaded notes and linked courses to personal or public course notes on December 17, 2025.
- Split the site into Notes, CV, and Research/Reading sections on December 17, 2025.
- Rebuilt the site as a hash-routed single-page GitHub Pages app with responsive styling, filters, theme toggle, research assets, project cards, and teaching/research timelines on May 1, 2026.
