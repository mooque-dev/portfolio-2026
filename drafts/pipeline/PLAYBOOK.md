# Application pipeline playbook

The daily run that turns new job leads into drafts for Allen to review, and
publishes the ones he approves. Allen is the reviewer: nothing goes live
until he approves it in the tracker, and nothing is ever sent to a company.
He applies himself.

Allen is non-technical. Anything you tell him is plain language, short, and
leads with what he needs to do.

## Where things live

- Portfolio repo: `/Users/mooque/Claude/mooque-2026`, working branch `v2`.
  Never stage `eslint.config.mjs` or `design/`; they are someone else's work.
- Live mirror: `https://mooque-dev.github.io/<slug>/`, published with
  `drafts/pipeline/publish-mirror.sh`. It keeps the mirror repo's `jungmin/`
  folder.
- Tracker: the Artifact `https://claude.ai/artifact/SK714oWqSkSAciJSoTFQZ7`.
  Read and write it with the ArtifactData tool, never by republishing the
  page. Pin every write to an existing doc with the `if_version` you read.
  The page source is `drafts/pipeline/tracker.html`. Republish it with the
  Artifact tool (`url` set) only if the page itself must change.
- Job radar: the latest issue in `mooque-dev/job-radar`
  (`gh issue list -R mooque-dev/job-radar --limit 1`), posted around 11:30
  Toronto time. Each lead has a fit score out of 100 and a link.

### Tracker data

Collection `roles`, doc id = slug. Fields: order, company, role, verdict
(Apply | Consider | Long shot | New), status (To prep | Ready to send |
Applied | Interviewing | Offer | Closed), why, pay, floor (above | below |
unknown, against his CA$120K floor), location, posting, postingNote, page,
resume, extra [{label, href}], lead[], watch[], next, notes (Allen's; never
overwrite), archived, updatedAt.

Review fields:
- `review`: `pending` (waiting for Allen), `changes` (Allen asked for
  changes, see `reviewNote`), `approved` (publish it), `passed` (he said
  no; leave it alone), `published` (done).
- `draft`: `{shot, resume, page}`, asset URLs for the preview image and the
  draft résumé PDF.
- `source`: who found it, e.g. "the job radar (fit 81)" or "you".

Collection `sites`, doc id = slug: order, company, variant, status (Live |
Retired), url, resume, visual, made, versions [{date, note}].

## Each run, in this order

### 1. Publish what Allen approved

For each role with `review: "approved"`:

1. `git checkout v2 && git pull -q`, then merge its draft branch
   (`git merge --no-ff draft/<slug>`). Resolve conflicts by keeping both
   sides (they are usually `ENTRY_PAGES` in `components/Header.tsx`,
   `drafts/resume/make-variants.py` and `app/globals.css`).
2. `npx tsc --noEmit`, add a `lib/changelog.ts` entry at the top (same voice
   as the others: what shipped, then why, no company-posting language),
   commit, `git push origin v2`.
3. `drafts/pipeline/publish-mirror.sh "Mirror v2: /<slug>" /<slug>/ /allen-kang-resume-<slug>.pdf`
   and confirm both print 200.
4. Update the role: `page`, `resume` (the live URLs), `status: "Ready to send"`,
   `review: "published"`, `next` (e.g. "Apply with the <Company> page and
   résumé."). Add or update its `sites` doc with a version
   `{date: "Mon D", note: "First version"}`.
5. Delete the draft branch locally and on origin.

A role approved with no page (résumé only) just gets the résumé published
the same way.

### 2. Revise what Allen sent back

For each role with `review: "changes"`: check out `draft/<slug>`, make the
changes his `reviewNote` asks for, regenerate the preview and résumé (step
3.4 onward), and set `review: "pending"` with the new `draft` links. Keep his
note in `lastNote` and clear `reviewNote`. If the note asks for something
you can't do honestly (a claim the résumé can't back), do the rest and say
why in `next`.

### 3. Draft new leads (at most 3 per run)

Sources, in this order:
1. Roles Allen added himself: `verdict: "New"` (he pastes a link in "New
   role"). These always get drafted.
2. Today's radar issue: leads marked "to apply" or "to consider". Skip any
   already in `roles` (match posting URL, or company plus title).

For each lead:

1. **Read the posting.** Fetch it (curl with a browser user agent, or
   WebFetch; for script-heavy boards use the ATS JSON API: Greenhouse
   `boards-api.greenhouse.io/v1/boards/<b>/jobs/<id>`, Ashby
   `api.ashbyhq.com/posting-api/job-board/<b>`, Lever
   `api.lever.co/v0/postings/<co>/<id>`). The `posting` link must return 200
   and show an Apply button. Note title, location, pay, and anything about
   Canada or visas.
2. **Give an honest read.** Apply, Consider or Long shot, against the facts
   below. Never inflate. Pay vs the CA$120K floor: `above` when the bottom
   of the range clears it, `below` when the top doesn't, otherwise
   `unknown` ("check pay"). Write `why` (one or two sentences), `lead` (2 to
   4 things to lead with, each tied to a real project), `watch` (real
   risks: location, level, domain, pay), `next`.
3. **Write the role doc** with `review: "pending"`, `status: "To prep"`, a
   `source`, and an `order` that sorts it near similar reads.
4. **Draft on a branch:** `git checkout v2 && git checkout -b draft/<slug>`.
   - **Résumé:** add a `ROLES` entry to `drafts/resume/make-variants.py`
     (reorder bullets and projects, pick one summary clause; never invent a
     bullet), run it, and print with
     `node drafts/pipeline/pdf.mjs drafts/resume/resume-<slug>.html public/allen-kang-resume-<slug>.pdf`.
     Give the entry `accent=` the company's brand ink (a colour that reads
     on white) when the role gets a page.
     It must be one page: check with
     `node drafts/pipeline/cap.mjs file://$PWD/drafts/resume/resume-<slug>.html /tmp/r.png body 700`
     (height must be 958 or less) and trim the variant if not.
   - **Page** (Apply and Consider only; Long shots get the résumé alone).
     Every page is a short settings file on one shared frame,
     `components/tailored/TailoredPage.tsx`, which owns the layout, the
     brand bands, the work list, the code paragraphs and the contact block.
     Never copy layout into a page; if the layout needs a fix, fix the frame
     and every page gets it. The steps:
     1. **Study their site** in the browser, or read
        `drafts/pipeline/brand-briefs/<slug>.md` if it exists (write one in
        the same format if not): canvas, display and text faces and their
        closest Google Fonts, button shape, colours, composition, and 3 to 5
        signature details.
     2. **Colours:** add an entry to `drafts/pipeline/brands.json` (keys in
        `frame.py`: button fill and text, ink for light and dark, the hero and
        contact band colours, band buttons). Light-canvas brands get a light
        band. Set the résumé's `accent` in `make-variants.py` to the brand ink.
     3. **Type and signature:** add an entry to `drafts/pipeline/themes.json`
        (Google Fonts family names for display, text and an optional mono or
        hand face, and one `sig`: glass, label, tone, cursor, em, brace,
        scribble, trail or none) and a `.theme-<slug>` block at the end of
        `app/globals.css` with the brief's canvas, ink, heading weight and
        tracking, button radius and the signature styling. Copy the shape of
        an existing block (`.theme-stripe`, `.theme-harvey`).
     4. **Spec:** write `drafts/pipeline/specs/<slug>.json` (fields in
        `new-page.py`; `ecobee.json` is the worked example) and run
        `python3 drafts/pipeline/new-page.py <slug>`. The opening object
        should come from the company's world. Reuse one when it fits:
        `PaymentCard`, `FloatCard`, `MetalCard`, `EngravedCard` (cards,
        fintech), `AskCard` (AI answers with citations), `Brief` (legal),
        `MatterFile` (legal practice; presets platform, insights),
        `BoardingPass` (travel), `SiteSign` (construction), `ShiftWeek`
        (scheduling), `Thermostat` (devices, home), `TokenCard` (design
        systems; presets visit, product), `TripLog` (fleet, logistics),
        `CommandK` (developer and internal tools), `MatchCard` (hiring,
        marketplaces), `AccountsPanel` (banking). Or build a small new one in
        `components/`, sized in container units with `max(11px, …cqw)` floors
        on small text, no company logos or marks. For extra character over
        the intro band (a grid, a cursor, a title block), pass `heroExtras`
        to the frame, as the Autodesk page does.
     5. Only a brand with very strong presence gets a fully bespoke page,
        the way `app/(portfolio)/mercury/page.tsx` is built. Never copy their
        logo, photos or copy.
   - **Avoid template tells.** No eyebrow labels over headings, no rows of
     feature cards with coloured rules, no gradient glows or dot grids, no
     clever subheads. The frame already leaves them out.
   - `npx tsc --noEmit` and `npx eslint` on the new files.
   - **Preview and check:** start a dev server on a spare port
     (`PORT=3123 npm run dev` in the background), wait for
     `curl localhost:3123/<slug>` to return 200, then run
     `node drafts/pipeline/check-pages.mjs http://localhost:3123 /tmp/check <slug>`.
     It loads the page at 375, 768, 1024, 1280 and 1440 wide, reports
     (and once more in dark mode, for button colours) sideways scrolling, anything past the screen edge, the headline running
     into the object, clipped headlines and small tap targets, and saves the
     first screen at each width as `/tmp/check/<slug>-<width>.png`. Fix every
     issue and look at the 375 and 1280 images yourself. Capture the review
     image with
     `node drafts/pipeline/hero.mjs http://localhost:3123/<slug> /tmp/<slug>.png 1280 860`,
     then stop the server.
   - Commit on the branch and `git push -u origin draft/<slug>`.
5. **Attach the preview to the tracker:** upload `/tmp/<slug>.png` and the
   résumé PDF with the Artifact tool (`url` = the tracker, `asset: true`,
   `file_paths`), then set `draft: {shot, resume}` on the role.

### 4. Tell Allen

End with a short plain-language summary: what's waiting for review (company,
role, read, pay), what went live (with links), what you revised, and
anything that needs him (a referral, a location question). If nothing
happened, say so in one line.

## Rules

- Facts only from his résumé (`drafts/resume/resume.html`) and the case
  studies. The numbers that exist: 8 years designing; last 5 on payments,
  finance and CRM tools (Keela, Aplos); 340+ components in Orchid used by
  three teams; two front-end engineers earned for Orchid; -70%
  categorization tickets; fee opt-in 75% to 92%; Automation +13% ARR, 30%
  of 355 organizations, 15 interviews, three rounds of testing; 161 merged
  pull requests on ARND (React Native, iOS, Android, web, five themes);
  Forkestrate zero to MVP in under three months; Toronto Yuwol used daily
  by a forty-person company for ten months; mentored one designer at Keela
  and two at Aplos. He has not managed a team, hired designers, or worked
  at an agency.
- No em-dashes anywhere. Human, feature-first voice. Don't echo phrases
  from the posting; tailor by order and a few words.
- Pages are unlisted and `noindex` (the template does this). End each page
  with "Not affiliated with or endorsed by <Company>."
- Don't use third-person pronouns for Allen in copy; write in first person
  or use his name.
- Never apply, sign in, submit a form, or email anyone. Never change
  Mastercard, Float or Blue J résumés (already submitted).
