# Ana Alia Portfolio — VS Code Guide

## 1. Run the site
1. Open the `portfolio` folder in VS Code.
2. Install the **Live Server** extension, or run a local web server from this folder.
3. Open `index.html` with Live Server.
4. The Google Fonts link uses the Space Grotesk and DM Sans typefaces; system-font fallbacks are included.

The site is built with plain HTML, CSS, and JavaScript. Three.js and the previous anime gallery are no longer used.

To create a single-file preview, run `python build_preview.py`. It creates `preview.html` in the portfolio folder.

## 2. Personalize your portfolio
| Goal | Where |
|---|---|
| Contact details | `js/main.js` → `contactDetails` |
| Project names, descriptions, and statuses | `js/main.js` → `projects` |
| Profile photo | Replace `assets/ana-alia.png` and update its alt text in `index.html` |
| Colors, typography, and layout | `css/style.css` → `:root` variables and component styles (charcoal grey, moonlit silver, and signal red) |
| Page sections and copy | `index.html` |

Contact links stay as plain placeholder text until valid details are added. Project detail and code links are intentionally not shown as links until real pages or repositories exist.

## 3. Contact form
The form validates its required fields in the browser and explains that it is a demo. It does not send or store messages. Connect a form service before inviting visitors to submit messages.

Project cards open accessible detail dialogs with concept/status labels and suggested learning areas. Real project, live-demo, and repository links are intentionally omitted until available.

## 4. Project structure
```text
portfolio/
├─ index.html
├─ css/style.css
├─ js/main.js
├─ assets/             ← hero portrait and original image files
├─ build_preview.py
└─ VSCODE_GUIDE.md
```
