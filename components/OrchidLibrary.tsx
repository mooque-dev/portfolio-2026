"use client";

import { useEffect, useRef, useState, type CSSProperties, type ComponentType } from "react";
import * as D from "./OrchidDemos";
import * as N from "./OrchidDomain";
import * as C from "./OrchidCharts";
import { Replaced } from "./OrchidBefore";
import "./orchid-library.css";

// A recreation of the Orchid library, in progress. One set of components,
// four skins: Keela, Raisely, Aplos, and a neutral white-label one. The
// component list is the full shadcn/ui set, so Allen can keep, cut or edit
// each one. Colours, corners and type for the three products are read from
// each company's public website, not from the products themselves.
// Laid out like a documentation site: a sidebar to search and jump, one
// column of components grouped by category, and the skin switcher pinned.
type Theme = { key: string; name: string; note: string; vars: Record<string, string>; palette: string[] };

const THEMES: Theme[] = [
  { key: "neutral", name: "White label", note: "No brand at all. The version that shows the system underneath.",
    vars: { "--o-primary": "#111111", "--o-on": "#ffffff", "--o-accent": "#111111", "--o-ink": "#111111", "--o-mut": "#666666", "--o-line": "#DDDDDD", "--o-soft": "#F5F5F5", "--o-bg": "#ffffff", "--o-r": "8px", "--o-rb": "8px", "--o-font": "inherit", "--o-pad": "10px 16px" }, palette: ["#111111", "#6B6B6B", "#A3A3A3", "#D4D4D4", "#404040"] },
  { key: "keela", name: "Keela", note: "Fundraising CRM. Purple, with a yellow accent and soft corners.",
    vars: { "--o-primary": "#7745D6", "--o-on": "#ffffff", "--o-accent": "#FFD13A", "--o-ink": "#211F54", "--o-mut": "#65688A", "--o-line": "#DDDEEA", "--o-soft": "#F8F8FC", "--o-bg": "#ffffff", "--o-r": "9px", "--o-rb": "9px", "--o-font": "Inter, system-ui, sans-serif", "--o-pad": "11px 16px" }, palette: ["#7745D6", "#FFD13A", "#211F54", "#B79CF0", "#65688A"] },
  { key: "raisely", name: "Raisely", note: "Fundraising pages. Violet on navy ink, fully rounded buttons.",
    vars: { "--o-primary": "#6138D8", "--o-on": "#ffffff", "--o-accent": "#262861", "--o-ink": "#262861", "--o-mut": "#62648F", "--o-line": "#DCDCF0", "--o-soft": "#F3F3FD", "--o-bg": "#FBFBFF", "--o-r": "12px", "--o-rb": "999px", "--o-font": "system-ui, sans-serif", "--o-pad": "12px 20px" }, palette: ["#6138D8", "#262861", "#A890F0", "#F0A93B", "#62648F"] },
  { key: "aplos", name: "Aplos", note: "Fund accounting. Navy and teal, an orange call to action, tighter spacing.",
    vars: { "--o-primary": "#16587D", "--o-on": "#ffffff", "--o-accent": "#CE5D01", "--o-ink": "#0B233B", "--o-mut": "#52647A", "--o-line": "#D5DCE3", "--o-soft": "#F2F5F8", "--o-bg": "#ffffff", "--o-r": "6px", "--o-rb": "6px", "--o-font": "'Open Sans', Inter, system-ui, sans-serif", "--o-pad": "8px 14px" }, palette: ["#16587D", "#CE5D01", "#0B233B", "#7FB3CF", "#F2A65A"] },
];

const CATS = ["CRM", "Dashboards and reports", "Charts", "Tables", "Accounting", "Actions", "Forms", "Feedback", "Overlays", "Navigation", "Data display", "Snowflakes we kept"] as const;
const SNOW = "Snowflakes we kept";
const NONPROFIT: readonly string[] = ["CRM", "Dashboards and reports", "Tables", "Accounting"];
const ECHARTS = "Charts";
type Cat = (typeof CATS)[number];
type Entry = { id: string; name: string; cat: Cat; use: string; Demo: ComponentType; wide?: boolean; start?: "keep"; replaced?: { count: number; what: string }; why?: string };

// "start: keep" marks the ones already in the first draft of Orchid. The
// first four categories are nonprofit additions beyond shadcn, proposed for
// Allen to confirm or remove.
const ENTRIES: Entry[] = [
  { id: "donor-header", name: "Donor header", cat: "CRM", Demo: N.DonorHeaderDemo, wide: true, use: "The top of a donor's record: who they are, what they've given, and the two most common next actions." },
  { id: "timeline", name: "Activity timeline", cat: "CRM", Demo: N.TimelineDemo, use: "Everything that happened with a donor, newest first: gifts, emails, calls, notes." },
  { id: "household", name: "Household and relationships", cat: "CRM", Demo: N.HouseholdDemo, use: "People and funds that give together, with combined giving." },
  { id: "segment-builder", name: "Segment builder", cat: "CRM", Demo: N.SegmentBuilderDemo, use: "Building a list of donors from rules, with a live count of who matches." },
  { id: "pipeline", name: "Major gift pipeline", cat: "CRM", Demo: N.PipelineDemo, wide: true, use: "Prospects moving through stages, with the total ask in each." },
  { id: "comms-prefs", name: "Communication preferences", cat: "CRM", Demo: N.CommsPrefsDemo, use: "How a donor agreed to be contacted, and when and how that consent was given." },
  { id: "merge", name: "Duplicate merge", cat: "CRM", Demo: N.MergeDemo, use: "Combining two records for the same person, choosing which value wins for each field." },
  { id: "tasks", name: "Task list", cat: "CRM", Demo: N.TaskListDemo, use: "Follow-ups with due dates. Overdue ones stand out in words, not only colour." },

  { id: "kpi", name: "Stat with change", cat: "Dashboards and reports", Demo: N.KpiDemo, wide: true, use: "The few numbers a team checks every morning, each with how it changed and against what." },
  { id: "date-range", name: "Date range with presets", cat: "Dashboards and reports", Demo: N.DateRangeDemo, use: "Picking the period a report covers. Presets first, including the fiscal year." },
  { id: "filter-bar", name: "Active filters", cat: "Dashboards and reports", Demo: N.FilterBarDemo, use: "Showing which filters are on, each removable on its own." },
  { id: "export", name: "Export", cat: "Dashboards and reports", Demo: N.ExportDemo, use: "Getting a report out, with each format saying what it's for." },
  { id: "leaderboard", name: "Leaderboard", cat: "Dashboards and reports", Demo: N.LeaderboardDemo, use: "Ranking peer fundraisers or teams during a campaign." },
  { id: "retention", name: "Retention table", cat: "Dashboards and reports", Demo: N.RetentionDemo, use: "How many of each year's new donors kept giving." },

  { id: "c-line", name: "Line", cat: "Charts", Demo: C.LineChartDemo, use: "Change over time, usually this year against last. Two or three lines at most." },
  { id: "c-bar", name: "Bar", cat: "Charts", Demo: C.BarChartDemo, use: "Comparing amounts across periods or groups, with a reference line when it helps." },
  { id: "c-stacked-bar", name: "Stacked bar", cat: "Charts", Demo: C.StackedBarDemo, use: "Totals per period and what each is made of, like revenue by fund per quarter." },
  { id: "c-combo", name: "Bar and line", cat: "Charts", Demo: C.ComboDemo, use: "Two related measures with different units, like donors and average gift." },
  { id: "c-donut", name: "Donut", cat: "Charts", Demo: C.DonutChartDemo, use: "Parts of a whole, four or five at most. Otherwise use a bar." },
  { id: "c-gauge", name: "Gauge", cat: "Charts", Demo: C.GaugeDemo, use: "One number against a goal, like a campaign target." },
  { id: "c-funnel", name: "Funnel", cat: "Charts", Demo: C.FunnelDemo, use: "Where people drop off in a sequence of steps, like a giving page." },
  { id: "c-spark", name: "Sparkline", cat: "Charts", Demo: C.SparklineDemo, use: "A number and its recent shape, small enough to sit in a stat or a table row." },

  { id: "bulk-bar", name: "Bulk action bar", cat: "Tables", Demo: N.BulkBarDemo, use: "Appears when rows are selected, with what can be done to all of them at once." },
  { id: "inline-edit", name: "Inline edit", cat: "Tables", Demo: N.InlineEditDemo, use: "Fixing one value without opening the record." },
  { id: "grouped-rows", name: "Grouped rows with subtotals", cat: "Tables", Demo: N.GroupedRowsDemo, use: "Rows grouped by fund or campaign, each group with its own total." },
  { id: "totals-row", name: "Totals row", cat: "Tables", Demo: N.TotalsRowDemo, use: "The sum of each number column, pinned to the bottom." },
  { id: "expand-row", name: "Expandable row", cat: "Tables", Demo: N.ExpandRowDemo, use: "Details for one row without leaving the table." },
  { id: "saved-views", name: "Saved views", cat: "Tables", Demo: N.SavedViewsDemo, use: "Filters a team uses often, saved as tabs with their counts." },
  { id: "density", name: "Row density", cat: "Tables", Demo: N.DensityDemo, use: "Compact rows for people who scan a lot of numbers, comfortable for everyone else." },

  { id: "currency-input", name: "Currency input", cat: "Accounting", Demo: N.CurrencyInputDemo, use: "Entering money, with the currency always visible." },
  { id: "account-picker", name: "Account picker", cat: "Accounting", Demo: N.AccountPickerDemo, use: "Choosing from the chart of accounts, by code or name, with its grouping visible." },
  { id: "split", name: "Split transaction", cat: "Accounting", Demo: N.SplitDemo, use: "One payment that was several things, like a donation and a ticket. Shows what's left to allocate until it adds up." },
  { id: "journal", name: "Journal entry", cat: "Accounting", Demo: N.JournalDemo, use: "Debit and credit lines that must balance before saving." },
  { id: "reconcile", name: "Reconciliation match", cat: "Accounting", Demo: N.ReconcileDemo, wide: true, use: "Pairing a bank line with what's in the books." },
  { id: "periods", name: "Period status", cat: "Accounting", Demo: N.PeriodStatusDemo, use: "Which months are open, in review, or closed and locked." },
  { id: "budget", name: "Budget against actual", cat: "Accounting", Demo: N.BudgetDemo, use: "Spending against budget per line, with overspending said in words." },
  { id: "payment-method", name: "Payment method", cat: "Accounting", Demo: N.PaymentMethodDemo, use: "A saved card or account, with a warning before it expires." },
  { id: "recurring", name: "Recurring schedule", cat: "Accounting", Demo: N.RecurringDemo, use: "How often a gift repeats, and the next dates it will run." },
  { id: "pledge", name: "Pledge installments", cat: "Accounting", Demo: N.PledgeDemo, use: "A promised amount paid over time, with each installment's status." },

  { id: "button", name: "Button", cat: "Actions", start: "keep", Demo: D.ButtonDemo, use: "One primary action per view. Secondary for the alternative, quiet for everything else, danger only for destructive actions." },

  { id: "input", name: "Input", cat: "Forms", start: "keep", Demo: D.InputDemo, use: "A single line of text. The label always sits above, and help text sits below." },
  { id: "field", name: "Field", cat: "Forms", Demo: D.FieldDemo, use: "The wrapper for any control: label, the control, help text, and an error that replaces the help text." },
  { id: "textarea", name: "Textarea", cat: "Forms", Demo: D.TextareaDemo, use: "More than one line of text, like a note or a message." },
  { id: "checkbox", name: "Checkbox", cat: "Forms", start: "keep", Demo: D.CheckboxDemo, use: "Any number of choices, or a single yes or no that's saved with a form." },
  { id: "radio-group", name: "Radio group", cat: "Forms", start: "keep", Demo: D.RadioGroupDemo, use: "Exactly one choice from five or fewer, all visible at once." },
  { id: "switch", name: "Switch", cat: "Forms", start: "keep", Demo: D.SwitchDemo, use: "A setting that takes effect right away, with no save button." },
  { id: "select-single", name: "Select: single", cat: "Forms", start: "keep", replaced: { count: 9, what: "one-off dropdowns across the three products. Together with the other three variants and the date picker, this is all that's left of them." }, Demo: D.SelectSingle, use: "Choosing one from a list of more than five. For five or fewer, use radio buttons." },
  { id: "select-multiple", name: "Select: multiple", cat: "Forms", start: "keep", Demo: D.SelectMultiple, use: "Choosing any number from a list. Selected items show as chips in the field." },
  { id: "select-searchable", name: "Select: searchable", cat: "Forms", start: "keep", Demo: D.SelectSearch, use: "Long lists people know the answer to, like countries. Type to narrow. Address and country lookups use this one with a preset list." },
  { id: "select-icons", name: "Select: with icons", cat: "Forms", start: "keep", Demo: D.SelectIcons, use: "When a picture helps people tell the options apart faster than the words do." },
  { id: "date-picker", name: "Date picker", cat: "Forms", start: "keep", Demo: D.DatePickerDemo, use: "Picking a day. Its own component, not a select: the calendar is the point." },

  { id: "alert", name: "Alert", cat: "Feedback", start: "keep", Demo: D.AlertDemo, use: "Something to know before continuing. Info to inform, success to confirm, warning before a risk, danger when something failed or can't be undone." },
  { id: "toast", name: "Toast", cat: "Feedback", Demo: D.ToastDemo, use: "A brief confirmation after an action, with undo when it's possible. Never for errors that need fixing." },
  { id: "progress", name: "Progress", cat: "Feedback", Demo: D.ProgressDemo, use: "How far along something is, like a goal or an upload." },
  { id: "spinner", name: "Spinner", cat: "Feedback", Demo: D.SpinnerDemo, use: "Waiting with no known end. Say what's happening next to it." },
  { id: "empty", name: "Empty", cat: "Feedback", Demo: D.EmptyDemo, use: "When there's nothing to show yet: say why, and offer the next step." },
  { id: "badge", name: "Badge", cat: "Feedback", start: "keep", Demo: D.BadgeDemo, use: "A short status that needs no action. Never the only way to read a state." },

  { id: "dialog", name: "Dialog", cat: "Overlays", Demo: D.DialogDemo, use: "A short task that needs focus without leaving the page." },
  { id: "alert-dialog", name: "Alert dialog", cat: "Overlays", Demo: D.AlertDialogDemo, use: "Confirming something that can't be undone. Name the action on the button, not just OK." },
  { id: "sheet", name: "Sheet", cat: "Overlays", Demo: D.SheetDemo, use: "A side panel for filters or details while the page stays in view." },
  { id: "tooltip", name: "Tooltip", cat: "Overlays", Demo: D.TooltipDemo, use: "A short hint on hover or focus. Nothing essential, nothing clickable." },
  { id: "dropdown-menu", name: "Dropdown menu", cat: "Overlays", Demo: D.DropdownMenuDemo, use: "A list of actions behind one button. Destructive ones go last, set apart." },

  { id: "tabs", name: "Tabs", cat: "Navigation", start: "keep", Demo: D.TabsDemo, use: "Switching between views of the same thing. Not for steps in a flow." },
  { id: "breadcrumb", name: "Breadcrumb", cat: "Navigation", Demo: D.BreadcrumbDemo, use: "Where you are in a hierarchy, and a way back up." },
  { id: "pagination", name: "Pagination", cat: "Navigation", Demo: D.PaginationDemo, use: "Moving through long lists a page at a time." },
  { id: "sidebar", name: "Sidebar", cat: "Navigation", Demo: D.SidebarDemo, wide: true, use: "The app's main sections, always in view on desktop." },

  { id: "table", name: "Table", cat: "Data display", start: "keep", Demo: D.TableDemo, use: "Comparing many records by the same fields. Numbers align right." },
  { id: "data-table", name: "Data table", cat: "Data display", Demo: D.DataTableDemo, wide: true, use: "A table people work in: filter, sort, select rows, act on them." },
  { id: "card", name: "Card", cat: "Data display", start: "keep", Demo: D.CardDemo, use: "One object with a title, a few facts and at most one action." },
  { id: "avatar", name: "Avatar", cat: "Data display", Demo: D.AvatarDemo, use: "A person or organisation at a glance. Initials when there's no photo." },

  { id: "amount-picker", name: "Donation amount picker", cat: "Snowflakes we kept", Demo: N.AmountPickerDemo, use: "Preset amounts, a custom amount, and what each one pays for.", why: "No shared input pairs amounts with their impact, and donors choose in one tap instead of typing." },
  { id: "receipt", name: "Donation receipt", cat: "Snowflakes we kept", Demo: N.ReceiptDemo, use: "The receipt a donor gets, with the eligible amount when they received something back.", why: "Its layout follows tax rules a generic card can't know, and staff never check the wording by hand." },
  { id: "ledger", name: "Fund ledger", cat: "Snowflakes we kept", Demo: N.LedgerDemo, use: "Transactions in order with the balance after each one.", why: "Accountants read a running balance the way they read paper ledgers, so they reconcile without exporting to a spreadsheet." },
  { id: "thermometer", name: "Campaign thermometer", cat: "Snowflakes we kept", Demo: N.ThermometerDemo, use: "A campaign's progress toward its goal, the way donors expect to see it.", why: "Donors recognise it instantly, so the page says how close the goal is without a single word of explanation." },
];

const CAT_NOTE: Record<Cat, string> = {
  CRM: "Donors, households and the work of keeping in touch.",
  "Dashboards and reports": "Numbers a team checks, and the controls for shaping a report.",
  Charts: "Report charts on Apache ECharts, the library the team used, styled by the skin.",
  Tables: "What a table needs once people work in it all day.",
  Accounting: "Money in, money allocated, and the books staying balanced.",
  Actions: "Buttons and the things that behave like them.",
  Forms: "Every way to enter or choose a value.",
  Feedback: "Telling people what happened, or what's happening.",
  Overlays: "Layers that open on top of the page.",
  Navigation: "Moving between places and pages.",
  "Data display": "Showing records, numbers and content.",
  "Snowflakes we kept": "One-offs that passed both questions: does it give users something the shared version can't, and does it save them time. Not counted in the 70.",
};
const SHARED = ENTRIES.filter((e) => e.cat !== SNOW).length;
const slug = (c: string) => `cat-${c.toLowerCase().replace(/[^a-z]+/g, "-")}`;

export default function OrchidLibrary() {
  const [t, setT] = useState(0);
  const [q, setQ] = useState("");
  const [active, setActive] = useState<string>("");
  const main = useRef<HTMLDivElement>(null);
  const theme = THEMES[t];

  const s = q.trim().toLowerCase();
  const shown = ENTRIES.filter((e) => !s || e.name.toLowerCase().includes(s) || e.use.toLowerCase().includes(s) || e.cat.toLowerCase().includes(s));
  const groups = CATS.map((c) => [c, shown.filter((e) => e.cat === c)] as const).filter(([, list]) => list.length);

  // Highlight the component nearest the top of the screen in the sidebar.
  useEffect(() => {
    const els = main.current?.querySelectorAll<HTMLElement>("[data-entry]");
    if (!els?.length) return;
    const io = new IntersectionObserver((items) => {
      const hit = items.filter((i) => i.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (hit) setActive((hit.target as HTMLElement).dataset.entry!);
    }, { rootMargin: "-140px 0px -60% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [q]);

  return (
    <div className="ol">
      <aside className="ol-side" aria-label="Components">
        <div className="ol-search">
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden><circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          <input type="search" aria-label="Search components" placeholder={`Search ${ENTRIES.length} components`} value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <p className="ol-count" aria-live="polite">{s ? `${shown.length} match${shown.length === 1 ? "" : "es"}` : `${SHARED} shared components, plus ${ENTRIES.length - SHARED} kept snowflakes`}</p>
        <nav className="ol-nav">
          {groups.map(([c, list]) => (
            <div key={c} className="ol-nav-g">
              <a href={`#${slug(c)}`} className="ol-nav-c">{c} <span>{list.length}</span></a>
              <ul>{list.map((e) => <li key={e.id}><a href={`#c-${e.id}`} aria-current={active === e.id ? "location" : undefined}>{e.name}</a></li>)}</ul>
            </div>
          ))}
        </nav>
        <div className="ol-jump">
          {groups.map(([c, list]) => <a key={c} href={`#${slug(c)}`}>{c} <span>{list.length}</span></a>)}
        </div>
      </aside>

      <div className="ol-main" ref={main}>
        <div className="ol-skinbar">
          <div className="ol-themes" role="radiogroup" aria-label="Product skin">
            {THEMES.map((th, i) => <button key={th.key} type="button" role="radio" aria-checked={i === t} className={i === t ? "on" : ""} onClick={() => setT(i)}>{th.name}</button>)}
          </div>
          <div className="ol-swatches" aria-hidden>
            {["--o-primary", "--o-accent", "--o-ink", "--o-line"].map((v) => <i key={v} style={{ background: theme.vars[v] }} />)}
          </div>
          <p className="ol-note" aria-live="polite">{theme.note}</p>
        </div>

        {groups.length === 0 && (
          <div className="ol-none"><p>No component matches &ldquo;{q}&rdquo;.</p><button type="button" className="ol-clear" onClick={() => setQ("")}>Clear search</button></div>
        )}

        <C.ChartSkinContext.Provider value={{ vars: theme.vars, palette: theme.palette }}>
        <div className="ol-skin" style={theme.vars as CSSProperties}>
            {!s && (
            <section className="ol-summary" aria-labelledby="ol-sum-h">
              <div className="ol-sum-text">
                <h2 id="ol-sum-h">From 340+ to {SHARED}</h2>
                <p>Three merged products had more than 340 one-off components between them. The audit folded them into {SHARED} shared ones, each with a rule for when to use it. A few one-offs earned their place and stayed; they&rsquo;re at the end.</p>
                <ul className="ol-sum-groups">{CATS.filter((c) => c !== SNOW).map((c) => <li key={c}><a href={`#${slug(c)}`}>{c}</a> <span>{ENTRIES.filter((e) => e.cat === c).length}</span></li>)}</ul>
              </div>
              <div className="ol-sum-chart"><C.SummaryChart /></div>
            </section>
          )}

        {groups.map(([c, list]) => (
            <section key={c} id={slug(c)} className="ol-sec" aria-labelledby={`${slug(c)}-h`}>
              <header className="ol-sec-h">
                <h2 id={`${slug(c)}-h`}>{c}</h2>
                <p>{CAT_NOTE[c]} {c === ECHARTS || c === SNOW ? "" : NONPROFIT.includes(c) ? "Proposed nonprofit additions." : "From the shadcn set."}</p>
              </header>
              <div className="ol-list">
                {list.map((e) => (
                  <article key={e.id} id={`c-${e.id}`} data-entry={e.id} className={`ol-item${e.wide ? " wide" : ""}`} aria-labelledby={`h-${e.id}`}>
                    <div className="ol-item-h">
                      <h3 id={`h-${e.id}`}>{e.name}</h3>
                      {e.start === "keep" && <span className="ol-tag">In the first draft</span>}
                    </div>
                    <p className="ol-use">{e.use}</p>
                    {e.why && <p className="ol-why"><b>Why it stayed.</b> {e.why}</p>}
                    <div className="ol-demo"><e.Demo /></div>
                    {e.replaced && <Replaced count={e.replaced.count} what={e.replaced.what} />}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
        </C.ChartSkinContext.Provider>
      </div>
    </div>
  );
}
