# Ritesh's Learning Platform

A free, independent Salesforce learning site built with [Docusaurus](https://docusaurus.io/).
Version 1 ships one course, **Salesforce Integration**, with ten lesson pages, Mermaid
diagrams, code samples, "common mistakes" sections, links to official Trailhead
modules, a self-grading quiz on every lesson (5 questions each), a per-browser
progress tracker, and a small original icon for each topic.

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
docs/salesforce-integration/     one .md file per lesson, in sidebar order
src/pages/index.js                home page with the course cards
src/components/CourseCard/        the card shown on the home page per course
src/components/Quiz/              the quiz component used on lesson pages
src/components/LessonComplete/    the "mark this lesson complete" toggle
src/components/CourseProgress/    the progress checklist on the course landing page
src/components/TopicIcon/         the per-topic icon set (icons.js) + circular Badge
src/data/quizzes/                  one JSON file per topic's quiz questions
src/data/courseTopics.js           ordered list of lessons — used by progress tracking
src/utils/progressStore.js         localStorage read/write for lesson completion
src/pages/materials.js             the "Course Materials" page (navbar: Course Materials)
src/components/LessonDownloads/    the download box shown on a lesson if material exists
scripts/generate-materials-manifest.mjs   scans static/downloads/, runs before start/build
static/downloads/                  put PDFs/PPTs here, named after the lesson's slug
```

## How to add a new lesson to an existing course

1. Create a new file in `docs/salesforce-integration/`, e.g.
   `docs/salesforce-integration/my-new-topic.md`.
2. Start it with frontmatter and the standard imports, following the existing lessons:
   ```md
   ---
   sidebar_position: 11
   title: My New Topic
   description: One sentence describing the lesson.
   ---

   import Quiz from '@site/src/components/Quiz';
   import LessonComplete from '@site/src/components/LessonComplete';
   import TopicIconBadge from '@site/src/components/TopicIcon/Badge';

   <TopicIconBadge id="my-new-topic" />

   # My New Topic

   Your content here...
   ```
   (`<TopicIconBadge id="my-new-topic" />` will show a plain dot until you add an icon
   for that id — see "How to add/change a topic icon" below.)
3. Add a Mermaid diagram with a fenced code block:
   ````md
   ```mermaid
   flowchart TD
       A[Start] --> B[End]
   ```
   ````
4. End the file with a quiz and the completion toggle:
   ```md
   ## Quiz

   <Quiz quizId="my-new-topic" />

   <LessonComplete topicId="my-new-topic" />
   ```
   (See "How to add quiz questions" below for the JSON file this needs.)
5. Open `sidebars.js` and add `'salesforce-integration/my-new-topic'` to the `items`
   array, in the position you want it to appear.
6. Open `src/data/courseTopics.js` and add `{id: 'my-new-topic', title: 'My New Topic'}`
   to `SALESFORCE_INTEGRATION_TOPICS`, in the same position — this is what makes the
   lesson show up in the course progress checklist and the homepage progress count.
7. Save — the dev server (`npm start`) picks it up automatically.

## How to add course material (PDF/PPT uploads)

There's a visible **Course Materials** page (linked in the navbar and footer, at
`/materials`) listing every lesson and whether material has been uploaded for it. Each
lesson page also shows a "Download the slides" box automatically once material exists
for it — you don't write any download links by hand.

**The only rule: name the file after the lesson's URL slug.**

1. Find the slug for the lesson you want (it's the file name in
   `docs/salesforce-integration/`, e.g. `integration-patterns.md` → slug
   `integration-patterns`; the full list is also in `src/data/courseTopics.js`).
2. Upload a file to `static/downloads/` named exactly `<slug>.pdf` and/or
   `<slug>.pptx` (or `.ppt`). You can upload both — the materials page and the
   lesson page will then show both a PDF and a PPT download link automatically.
3. That's it — no other file needs editing. A small script
   (`scripts/generate-materials-manifest.mjs`) scans `static/downloads/` and wires
   everything up automatically, every time the site starts or builds.

**To upload without using a terminal at all**, do it straight from GitHub's web UI:

1. Go to the repo's `static/downloads/` folder on github.com.
2. Click **Add file → Upload files**, drag your PDF/PPT in (named per step 2 above),
   and commit directly to `main`.
3. The file is now in the repo — see "Publishing a change" below for how it gets onto
   the live site.

> **Current limitation:** the live site is deployed with a manual command (see
> Deployment below), not auto-deployed on every GitHub push yet. So after uploading on
> github.com, the fastest way to get it live today is to ask Claude to pull the latest
> commit and redeploy (a one-line request, takes under a minute). Wiring up true
> auto-deploy-on-push needs a one-time connection between this Cloudflare Pages project
> and the GitHub repo, done from the Cloudflare dashboard (it requires your own GitHub
> authorization, so it isn't something that can be scripted end-to-end) — ask if you
> want to set that up.

## How to add quiz questions

Every lesson already has a 5-question quiz (`src/data/quizzes/<topic>.json`).

**Adding more questions to an existing quiz** needs no code changes — just edit its
JSON file:

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

## How progress tracking works

Each lesson ends with a "Mark this lesson complete" toggle
(`src/components/LessonComplete/`), and the Salesforce Integration landing page
(`integration-patterns.md`) shows a full checklist with a progress bar
(`src/components/CourseProgress/`). The Salesforce Integration card on the home page
also shows a live "X of 10 lessons complete" line once you've checked off at least one.

This is all stored in the visitor's own browser via `localStorage`
(`src/utils/progressStore.js`) — nothing is sent to a server, there's no account, and
it won't carry over to a different browser or device. It's meant as a lightweight
self-check, not a real LMS. If you add or remove a lesson, update
`src/data/courseTopics.js` to match (see step 6 in "How to add a new lesson" above) —
that list is the single source of truth the checklist and progress bar read from.

## How to add/change a topic icon

Icons are small, hand-drawn SVGs (no icon library, no Salesforce marks) defined in
`src/components/TopicIcon/icons.js`.

1. Open `src/components/TopicIcon/icons.js`.
2. Add or edit an entry keyed by topic id, e.g.:
   ```js
   'my-new-topic': (
     <>
       <circle cx="12" cy="12" r="8" />
       <path d="M8 12h8" />
     </>
   ),
   ```
   Keep paths within the 24x24 viewBox and use `currentColor`-friendly strokes (i.e.
   don't hardcode a fill/stroke color) so the icon adapts to light/dark mode and to
   wherever it's used (lesson header, progress checklist, home page card).
3. Save — it shows up anywhere `<TopicIcon id="my-new-topic" />` or
   `<TopicIconBadge id="my-new-topic" />` is used.

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
   new course's first lesson. It already has an `iconId` (`'lwc'` or `'agentforce'` —
   see `src/components/TopicIcon/icons.js`); `trackProgress: true` is only meaningful
   once that course has its own `courseTopics`-style list and progress components, so
   leave it off unless you build that out for the new course too.

## Deployment

**Live site:** https://salesforce-learning-hub.pages.dev — hosted on **Cloudflare
Pages** (free tier, no credit card).

This site deploys as a static build (`npm run build` produces a `build/` folder), so
it works on any static host. It's currently deployed via direct upload (Wrangler CLI),
**not** auto-deployed from GitHub — pushing to `main` does not update the live site by
itself. See "Publishing a change" below for the actual update flow, and the note at
the end of this section if you want to change that.

### Publishing a change (what actually updates the live site today)

```bash
npm run build
npx wrangler pages deploy build --project-name=salesforce-learning-hub
```

That's it — no login needed after the first time (Wrangler remembers it). This is
what to run (or ask Claude to run) any time docs, materials, or code change and you
want the live site updated.

### First-time setup (already done for this project)

1. `npx wrangler login` — opens a browser to authorize Wrangler with your free
   Cloudflare account. No terminal command ever sees your password.
2. `npx wrangler pages project create salesforce-learning-hub --production-branch=main --force`
   — creates the Pages project. (`--force` is only needed this one time, to use
   classic Direct Upload Pages instead of Wrangler's newer Workers-based flow, which
   hits an npm peer-dependency conflict with this project's search plugin.)
3. `npx wrangler pages deploy build --project-name=salesforce-learning-hub` — the
   first real deploy (same command as "Publishing a change" above).

> This repo does not deploy anything on its own. Nothing above runs until you (or
> Claude, with your explicit go-ahead at that time) executes it.

### Going further: auto-deploy whenever you push to GitHub

Right now, uploading a file or editing a doc on github.com does **not** make it live
by itself — someone still has to run the "Publishing a change" command above. To make
every push to `main` deploy automatically, the Cloudflare Pages project needs to be
connected to the GitHub repo. That's a one-time step done in the Cloudflare dashboard
(Workers & Pages → salesforce-learning-hub → Settings → Build & deployments → connect
to Git) and requires *your* GitHub authorization — it's not something that can be
scripted end-to-end on your behalf. Ask if you'd like help walking through it.

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
