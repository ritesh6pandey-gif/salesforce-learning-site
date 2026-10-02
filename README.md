# Ritesh's Learning Platform

A free, independent Salesforce learning site built with [Docusaurus](https://docusaurus.io/).
Version 1 ships one course, **Salesforce Integration**, with ten lesson pages, Mermaid
diagrams, code samples, "common mistakes" sections, links to official Trailhead
modules, and a self-grading quiz component.

No ads, no tracking, no logins, no payments. Not affiliated with or endorsed by
Salesforce.

## Running it locally

```bash
npm install
npm start
```

This starts a local dev server (default: `http://localhost:3000`) and reloads
automatically as you edit files.

To produce the optimized static build (what you'd actually deploy):

```bash
npm run build
npm run serve   # preview the production build locally
```

## Project layout

```
docs/salesforce-integration/   one .md file per lesson, in sidebar order
src/pages/index.js              home page with the course cards
src/components/CourseCard/      the card shown on the home page per course
src/components/Quiz/            the quiz component used on lesson pages
src/data/quizzes/                one JSON file per topic's quiz questions
static/downloads/                put PDFs/PPTs here; linked from lesson pages
```

## How to add a new lesson to an existing course

1. Create a new file in `docs/salesforce-integration/`, e.g.
   `docs/salesforce-integration/my-new-topic.md`.
2. Start it with frontmatter, following the existing lessons:
   ```md
   ---
   sidebar_position: 11
   title: My New Topic
   description: One sentence describing the lesson.
   ---

   # My New Topic

   Your content here...
   ```
3. Add a Mermaid diagram with a fenced code block:
   ````md
   ```mermaid
   flowchart TD
       A[Start] --> B[End]
   ```
   ````
4. Open `sidebars.js` and add `'salesforce-integration/my-new-topic'` to the `items`
   array, in the position you want it to appear.
5. Save — the dev server (`npm start`) picks it up automatically.

## How to add a downloadable PDF/PPT to a lesson

1. Copy the file into `static/downloads/`, e.g. `static/downloads/my-slides.pdf`.
2. In the lesson's `.md` file, add a link:
   ```md
   [Download the slides (PDF)](/downloads/my-slides.pdf)
   ```
3. If you're linking a `.ppt`/`.pptx` and a PDF version also exists, say so explicitly,
   e.g.:
   ```md
   [Download the slides (PPT)](/downloads/my-slides.pptx) — a PDF version is also available.
   ```

## How to add quiz questions

**Adding more questions to an existing quiz** (e.g. Integration Patterns or Outbound
Callouts) needs no code changes — just edit its JSON file:

1. Open `src/data/quizzes/<topic>.json` (e.g. `integration-patterns.json`).
2. Add another object to the `questions` array, matching the existing shape:
   ```json
   {
     "question": "Your question text?",
     "options": ["Option A", "Option B", "Option C", "Option D"],
     "correctIndex": 0,
     "explanation": "Why that's the right answer."
   }
   ```
3. Save — the quiz on that lesson page automatically includes it.

**Adding a quiz for a topic that doesn't have one yet** needs one small code edit:

1. Create `src/data/quizzes/<topic>.json` with the same `{ "questions": [...] }` shape.
2. Open `src/components/Quiz/index.js` and:
   - Add an import at the top: `import myTopic from '@site/src/data/quizzes/<topic>.json';`
   - Add it to the `QUIZ_MAP` object: `'<topic>': myTopic,`
3. In the lesson's `.md` file, add near the bottom:
   ```md
   import Quiz from '@site/src/components/Quiz';

   ## Quiz

   <Quiz quizId="<topic>" />
   ```
   (The `import` line must go right after the frontmatter, at the top of the file —
   see any existing lesson with a quiz for the exact placement.)

## How to add a new course

Version 1 only wires up "Salesforce Integration," but the site is built to grow:

1. Create a new folder under `docs/`, e.g. `docs/lwc/`.
2. Add a `_category_.json` file inside it:
   ```json
   {
     "label": "Lightning Web Components",
     "position": 2,
     "link": { "type": "doc", "id": "lwc/intro" }
   }
   ```
3. Add lesson `.md` files inside that folder, same format as the integration lessons.
4. Open `sidebars.js` and add a new top-level entry (copy the existing
   `salesforceIntegrationSidebar` block as a template, pointing at your new doc IDs).
5. Open `docusaurus.config.js` and add a navbar item for the new sidebar, similar to
   the existing "Salesforce Integration" entry.
6. Open `src/pages/index.js` and change that course's entry in the `COURSES` array from
   `status: 'coming-soon'` to `status: 'available'`, and add a `to:` pointing at the
   new course's first lesson.

## Deployment

This site is deployed as a static build (`npm run build` produces a `build/` folder),
so it works on any static host. These are the steps for **Cloudflare Pages** (free
tier, no credit card required):

1. **Build locally first to confirm it's clean:**
   ```bash
   npm run build
   ```
2. **Install the Cloudflare CLI (one-time):**
   ```bash
   npm install -g wrangler
   ```
3. **Log in to Cloudflare** (opens a browser to authenticate — you'll need a free
   Cloudflare account):
   ```bash
   wrangler login
   ```
4. **Deploy the build folder:**
   ```bash
   wrangler pages deploy build --project-name=salesforce-learning-hub
   ```
   Wrangler will print a live `*.pages.dev` URL when it finishes.
5. **Future updates:** re-run `npm run build` then the same `wrangler pages deploy`
   command — it creates a new deployment each time.

> This repo does not deploy anything on its own. Nothing above runs until you (or
> Claude, with your explicit go-ahead at that time) executes it.

### If you'd rather use GitHub Pages or Netlify instead

- **GitHub Pages** needs a GitHub repository first (`git init`, create a repo on
  GitHub, `git push`), then `npm run deploy` (already wired up in `package.json`,
  using Docusaurus's built-in GitHub Pages deploy command).
- **Netlify** can deploy by dragging the `build/` folder onto
  [app.netlify.com/drop](https://app.netlify.com/drop), or via the Netlify CLI
  (`netlify deploy --prod --dir=build`) after `netlify login`.

## What's intentionally not included (v1)

- No analytics, ads, or tracking scripts.
- No login/auth of any kind.
- No payment or e-commerce integration.
- No Salesforce logos, trademarks, or copied Trailhead/documentation text — lessons
  are original explanations that link out to the matching official Trailhead module.
