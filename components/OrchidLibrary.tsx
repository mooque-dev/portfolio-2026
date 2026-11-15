"use client";

import { useEffect, useState, type CSSProperties, type ComponentType, type ReactNode } from "react";
import * as D from "./OrchidDemos";
import "./orchid-library.css";

// A recreation of the Orchid library, in progress. One set of components,
// four skins: Keela, Raisely, Aplos, and a neutral white-label one. The
// component list is the full shadcn/ui set, so Allen can keep, cut or edit
// each one. Colours, corners and type for the three products are read from
// each company's public website, not from the products themselves.
// Keep/cut choices and notes save in the viewer's browser only; "Copy my
// picks" turns them into a list to send back so they become permanent here.
type Theme = { key: string; name: string; note: string; vars: Record<string, string> };

const THEMES: Theme[] = [
  { key: "keela", name: "Keela", note: "Fundraising CRM. Purple, with a yellow accent and soft corners.",
    vars: { "--o-primary": "#7745D6", "--o-on": "#ffffff", "--o-accent": "#FFD13A", "--o-ink": "#211F54", "--o-mut": "#65688A", "--o-line": "#DDDEEA", "--o-soft": "#F8F8FC", "--o-bg": "#ffffff", "--o-r": "9px", "--o-rb": "9px", "--o-font": "Inter, system-ui, sans-serif", "--o-pad": "11px 16px" } },
  { key: "raisely", name: "Raisely", note: "Fundraising pages. Violet on navy ink, fully rounded buttons.",
    vars: { "--o-primary": "#6138D8", "--o-on": "#ffffff", "--o-accent": "#262861", "--o-ink": "#262861", "--o-mut": "#62648F", "--o-line": "#DCDCF0", "--o-soft": "#F3F3FD", "--o-bg": "#FBFBFF", "--o-r": "12px", "--o-rb": "999px", "--o-font": "system-ui, sans-serif", "--o-pad": "12px 20px" } },
  { key: "aplos", name: "Aplos", note: "Fund accounting. Navy and teal, an orange call to action, tighter spacing.",
    vars: { "--o-primary": "#16587D", "--o-on": "#ffffff", "--o-accent": "#CE5D01", "--o-ink": "#0B233B", "--o-mut": "#52647A", "--o-line": "#D5DCE3", "--o-soft": "#F2F5F8", "--o-bg": "#ffffff", "--o-r": "6px", "--o-rb": "6px", "--o-font": "'Open Sans', Inter, system-ui, sans-serif", "--o-pad": "8px 14px" } },
  { key: "neutral", name: "White label", note: "No brand at all. The version that shows the system underneath.",
    vars: { "--o-primary": "#111111", "--o-on": "#ffffff", "--o-accent": "#111111", "--o-ink": "#111111", "--o-mut": "#666666", "--o-line": "#DDDDDD", "--o-soft": "#F5F5F5", "--o-bg": "#ffffff", "--o-r": "8px", "--o-rb": "8px", "--o-font": "inherit", "--o-pad": "10px 16px" } },
];

const CATS = ["Actions", "Forms", "Feedback", "Overlays", "Navigation", "Data display", "Chat and AI"] as const;
type Cat = (typeof CATS)[number];
type Status = "keep" | "undecided" | "cut";
type Entry = { id: string; name: string; cat: Cat; use: string; Demo: ComponentType; wide?: boolean; start?: Status };

// "start: keep" marks the ones already in the first draft of Orchid.
const ENTRIES: Entry[] = [
  { id: "button", name: "Button", cat: "Actions", start: "keep", Demo: D.ButtonDemo, use: "One primary action per view. Secondary for the alternative, quiet for everything else, danger only for destructive actions." },
  { id: "button-group", name: "Button group", cat: "Actions", Demo: D.ButtonGroupDemo, use: "A few related buttons that work as a set, like a date range." },
  { id: "toggle", name: "Toggle", cat: "Actions", Demo: D.ToggleDemo, use: "A button that stays on or off, like bold in a text editor." },
  { id: "toggle-group", name: "Toggle group", cat: "Actions", Demo: D.ToggleGroupDemo, use: "A set of toggles where one or several can be on, like text alignment." },
  { id: "kbd", name: "Kbd", cat: "Actions", Demo: D.KbdDemo, use: "Showing a keyboard shortcut in text or a menu." },

  { id: "input", name: "Input", cat: "Forms", start: "keep", Demo: D.InputDemo, use: "A single line of text. The label always sits above, and help text sits below." },
  { id: "label", name: "Label", cat: "Forms", Demo: D.LabelDemo, use: "Naming a control so clicking the words selects it. Every control gets one." },
  { id: "field", name: "Field", cat: "Forms", Demo: D.FieldDemo, use: "The wrapper for any control: label, the control, help text, and an error that replaces the help text." },
  { id: "input-group", name: "Input group", cat: "Forms", Demo: D.InputGroupDemo, use: "An input with something attached, like a currency sign or a unit." },
  { id: "input-otp", name: "Input OTP", cat: "Forms", Demo: D.InputOTPDemo, use: "One-time codes sent by text or email." },
  { id: "textarea", name: "Textarea", cat: "Forms", Demo: D.TextareaDemo, use: "More than one line of text, like a note or a message." },
  { id: "checkbox", name: "Checkbox", cat: "Forms", start: "keep", Demo: D.CheckboxDemo, use: "Any number of choices, or a single yes or no that's saved with a form." },
  { id: "radio-group", name: "Radio group", cat: "Forms", start: "keep", Demo: D.RadioGroupDemo, use: "Exactly one choice from five or fewer, all visible at once." },
  { id: "switch", name: "Switch", cat: "Forms", start: "keep", Demo: D.SwitchDemo, use: "A setting that takes effect right away, with no save button." },
  { id: "slider", name: "Slider", cat: "Forms", Demo: D.SliderDemo, use: "Picking a value in a range where the rough amount matters more than the exact one." },
  { id: "select-single", name: "Select: single", cat: "Forms", start: "keep", Demo: D.SelectSingle, use: "Choosing one from a list of more than five. For five or fewer, use radio buttons." },
  { id: "select-multiple", name: "Select: multiple", cat: "Forms", start: "keep", Demo: D.SelectMultiple, use: "Choosing any number from a list. Selected items show as chips in the field." },
  { id: "select-searchable", name: "Select: searchable", cat: "Forms", start: "keep", Demo: D.SelectSearch, use: "Long lists people know the answer to, like countries. Type to narrow. Address and country lookups use this one with a preset list." },
  { id: "select-icons", name: "Select: with icons", cat: "Forms", start: "keep", Demo: D.SelectIcons, use: "When a picture helps people tell the options apart faster than the words do." },
  { id: "native-select", name: "Native select", cat: "Forms", Demo: D.NativeSelectDemo, use: "The browser's own dropdown, styled. Best on phones and for very simple lists." },
  { id: "combobox", name: "Combobox", cat: "Forms", Demo: D.ComboboxDemo, use: "Type to search a list, then pick. In Orchid this is the searchable select." },
  { id: "date-picker", name: "Date picker", cat: "Forms", start: "keep", Demo: D.DatePickerDemo, use: "Picking a day. Its own component, not a select: the calendar is the point." },
  { id: "calendar", name: "Calendar", cat: "Forms", Demo: D.CalendarDemo, use: "A month always on screen, for scheduling and seeing what falls when." },
  { id: "form", name: "Form", cat: "Forms", Demo: D.FormDemo, use: "Fields, validation and a submit button working together. Errors appear next to the field, in words." },

  { id: "alert", name: "Alert", cat: "Feedback", start: "keep", Demo: D.AlertDemo, use: "Something to know before continuing. Info to inform, success to confirm, warning before a risk, danger when something failed or can't be undone." },
  { id: "toast", name: "Toast", cat: "Feedback", Demo: D.ToastDemo, use: "A brief confirmation after an action, with undo when it's possible. Never for errors that need fixing." },
  { id: "progress", name: "Progress", cat: "Feedback", Demo: D.ProgressDemo, use: "How far along something is, like a goal or an upload." },
  { id: "spinner", name: "Spinner", cat: "Feedback", Demo: D.SpinnerDemo, use: "Waiting with no known end. Say what's happening next to it." },
  { id: "skeleton", name: "Skeleton", cat: "Feedback", Demo: D.SkeletonDemo, use: "The shape of content while it loads, so the page doesn't jump." },
  { id: "empty", name: "Empty", cat: "Feedback", Demo: D.EmptyDemo, use: "When there's nothing to show yet: say why, and offer the next step." },
  { id: "badge", name: "Badge", cat: "Feedback", start: "keep", Demo: D.BadgeDemo, use: "A short status that needs no action. Never the only way to read a state." },

  { id: "dialog", name: "Dialog", cat: "Overlays", Demo: D.DialogDemo, use: "A short task that needs focus without leaving the page." },
  { id: "alert-dialog", name: "Alert dialog", cat: "Overlays", Demo: D.AlertDialogDemo, use: "Confirming something that can't be undone. Name the action on the button, not just OK." },
  { id: "sheet", name: "Sheet", cat: "Overlays", Demo: D.SheetDemo, use: "A side panel for filters or details while the page stays in view." },
  { id: "drawer", name: "Drawer", cat: "Overlays", Demo: D.DrawerDemo, use: "A panel from the bottom, mostly on phones." },
  { id: "popover", name: "Popover", cat: "Overlays", Demo: D.PopoverDemo, use: "A small panel tied to a button, for a quick edit or extra options." },
  { id: "tooltip", name: "Tooltip", cat: "Overlays", Demo: D.TooltipDemo, use: "A short hint on hover or focus. Nothing essential, nothing clickable." },
  { id: "hover-card", name: "Hover card", cat: "Overlays", Demo: D.HoverCardDemo, use: "A preview of a person or record when pointing at its name." },
  { id: "dropdown-menu", name: "Dropdown menu", cat: "Overlays", Demo: D.DropdownMenuDemo, use: "A list of actions behind one button. Destructive ones go last, set apart." },
  { id: "context-menu", name: "Context menu", cat: "Overlays", Demo: D.ContextMenuDemo, use: "Right-click actions. Always also reachable another way." },
  { id: "command", name: "Command", cat: "Overlays", Demo: D.CommandDemo, use: "A search-everything box for people who prefer the keyboard." },

  { id: "tabs", name: "Tabs", cat: "Navigation", start: "keep", Demo: D.TabsDemo, use: "Switching between views of the same thing. Not for steps in a flow." },
  { id: "breadcrumb", name: "Breadcrumb", cat: "Navigation", Demo: D.BreadcrumbDemo, use: "Where you are in a hierarchy, and a way back up." },
  { id: "pagination", name: "Pagination", cat: "Navigation", Demo: D.PaginationDemo, use: "Moving through long lists a page at a time." },
  { id: "navigation-menu", name: "Navigation menu", cat: "Navigation", Demo: D.NavigationMenuDemo, use: "Top-level site navigation with grouped links under each item." },
  { id: "menubar", name: "Menubar", cat: "Navigation", Demo: D.MenubarDemo, use: "Desktop-style File, Edit, View menus for tool-like screens." },
  { id: "sidebar", name: "Sidebar", cat: "Navigation", Demo: D.SidebarDemo, wide: true, use: "The app's main sections, always in view on desktop." },
  { id: "direction", name: "Direction", cat: "Navigation", Demo: D.DirectionDemo, use: "Sets left-to-right or right-to-left for the whole app, for languages like Arabic." },

  { id: "table", name: "Table", cat: "Data display", start: "keep", Demo: D.TableDemo, use: "Comparing many records by the same fields. Numbers align right." },
  { id: "data-table", name: "Data table", cat: "Data display", Demo: D.DataTableDemo, wide: true, use: "A table people work in: filter, sort, select rows, act on them." },
  { id: "card", name: "Card", cat: "Data display", start: "keep", Demo: D.CardDemo, use: "One object with a title, a few facts and at most one action." },
  { id: "avatar", name: "Avatar", cat: "Data display", Demo: D.AvatarDemo, use: "A person or organisation at a glance. Initials when there's no photo." },
  { id: "accordion", name: "Accordion", cat: "Data display", Demo: D.AccordionDemo, use: "Questions and answers, or sections most people skip." },
  { id: "collapsible", name: "Collapsible", cat: "Data display", Demo: D.CollapsibleDemo, use: "Hiding one block of detail behind a single link." },
  { id: "carousel", name: "Carousel", cat: "Data display", Demo: D.CarouselDemo, use: "A few items of equal weight, one at a time. Rarely the right choice." },
  { id: "chart", name: "Chart", cat: "Data display", Demo: D.ChartDemo, use: "Showing change or comparison. Label the axis and the unit." },
  { id: "item", name: "Item", cat: "Data display", Demo: D.ItemDemo, use: "One row in a list: picture, title, detail, action." },
  { id: "typography", name: "Typography", cat: "Data display", Demo: D.TypographyDemo, use: "The type scale: headings, body and small text." },
  { id: "separator", name: "Separator", cat: "Data display", Demo: D.SeparatorDemo, use: "A thin line between groups, when spacing alone isn't enough." },
  { id: "aspect-ratio", name: "Aspect ratio", cat: "Data display", Demo: D.AspectRatioDemo, use: "Keeping images and video the same shape at every size." },
  { id: "scroll-area", name: "Scroll area", cat: "Data display", Demo: D.ScrollAreaDemo, use: "A box that scrolls on its own, like an activity feed." },
  { id: "resizable", name: "Resizable", cat: "Data display", Demo: D.ResizableDemo, use: "Panels people can drag wider or narrower, like a list beside its detail." },

  { id: "message", name: "Message", cat: "Chat and AI", Demo: D.MessageDemo, use: "One turn in a conversation, with who said it." },
  { id: "bubble", name: "Bubble", cat: "Chat and AI", Demo: D.BubbleDemo, use: "Chat-style messages, mine on one side and theirs on the other." },
  { id: "message-scroller", name: "Message scroller", cat: "Chat and AI", Demo: D.MessageScrollerDemo, use: "The scrolling conversation itself, which follows new replies." },
  { id: "attachment", name: "Attachment", cat: "Chat and AI", Demo: D.AttachmentDemo, use: "A file added to a message or form, with its upload state." },
  { id: "code-block", name: "Code block", cat: "Chat and AI", Demo: D.CodeBlockDemo, use: "Code or terminal output, with a copy button." },
  { id: "marker", name: "Marker", cat: "Chat and AI", Demo: D.MarkerDemo, use: "A quiet note in a conversation, like what the assistant just did." },
  { id: "questionnaire", name: "Questionnaire", cat: "Chat and AI", Demo: D.QuestionnaireDemo, use: "A few questions one at a time, each skippable." },
  { id: "trace", name: "Trace", cat: "Chat and AI", Demo: D.TraceDemo, use: "Showing the steps an assistant took, folded away by default." },
];

const STATUS_LABEL: Record<Status, string> = { keep: "Keep", undecided: "Not decided", cut: "Cut" };
const SORTS = { cat: "By category", az: "A to Z", keep: "Keep first" } as const;
type SortKey = keyof typeof SORTS;
const KEY = "orchid-library-picks-v1";

type Picks = Record<string, { s?: Status; note?: string }>;
const load = (): Picks => { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; } };
const save = (p: Picks) => { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* storage off: picks last for this visit */ } };

export default function OrchidLibrary() {
  const [t, setT] = useState(0);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Cat | "All">("All");
  const [status, setStatus] = useState<Status | "all">("all");
  const [sort, setSort] = useState<SortKey>("cat");
  const [picks, setPicks] = useState<Picks>({});
  const [copied, setCopied] = useState<"" | "ok" | "fail">("");
  // Picks live in this browser; read them after the first render so the
  // server and the browser start from the same markup.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setPicks(load()); }, []);

  const theme = THEMES[t];
  const statusOf = (e: Entry): Status => picks[e.id]?.s ?? e.start ?? "undecided";
  const setPick = (id: string, patch: { s?: Status; note?: string }) => setPicks((p) => { const n = { ...p, [id]: { ...p[id], ...patch } }; save(n); return n; });

  const matches = (e: Entry) => {
    const s = q.trim().toLowerCase();
    return !s || e.name.toLowerCase().includes(s) || e.use.toLowerCase().includes(s) || e.cat.toLowerCase().includes(s) || (picks[e.id]?.note ?? "").toLowerCase().includes(s);
  };
  const base = ENTRIES.filter(matches).filter((e) => status === "all" || statusOf(e) === status);
  const shown = base.filter((e) => cat === "All" || e.cat === cat);
  const order: Record<Status, number> = { keep: 0, undecided: 1, cut: 2 };
  const sorted = [...shown].sort((a, b) =>
    sort === "az" ? a.name.localeCompare(b.name)
    : sort === "keep" ? order[statusOf(a)] - order[statusOf(b)] || a.name.localeCompare(b.name)
    : CATS.indexOf(a.cat) - CATS.indexOf(b.cat));
  const counts = base.reduce((c, e) => { c[e.cat] = (c[e.cat] ?? 0) + 1; return c; }, {} as Record<string, number>);
  const tally = ENTRIES.reduce((a, e) => { a[statusOf(e)]++; return a; }, { keep: 0, undecided: 0, cut: 0 } as Record<Status, number>);

  const copy = () => {
    const line = (s: Status) => ENTRIES.filter((e) => statusOf(e) === s).map((e) => `- ${e.name}${picks[e.id]?.note ? `: ${picks[e.id]!.note}` : ""}`).join("\n") || "- none";
    const text = `Orchid library picks\n\nKeep\n${line("keep")}\n\nCut\n${line("cut")}\n\nNot decided\n${line("undecided")}`;
    navigator.clipboard.writeText(text).then(() => setCopied("ok"), () => setCopied("fail"));
    setTimeout(() => setCopied(""), 2500);
  };

  return (
    <div className="ol">
      <div className="ol-tools">
        <div className="ol-search">
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden><circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          <input type="search" aria-label="Search components" placeholder={`Search ${ENTRIES.length} components, their notes and when to use them`} value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="ol-tool-row">
          <div className="ol-seg" role="radiogroup" aria-label="Status">
            {(["all", "keep", "undecided", "cut"] as const).map((s) => (
              <button key={s} type="button" role="radio" aria-checked={status === s} className={status === s ? "on" : ""} onClick={() => setStatus(s)}>
                {s === "all" ? "All" : STATUS_LABEL[s]} <span>{s === "all" ? ENTRIES.length : tally[s]}</span>
              </button>
            ))}
          </div>
          <label className="ol-sort"><span className="sr-only">Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>{(Object.keys(SORTS) as SortKey[]).map((k) => <option key={k} value={k}>{SORTS[k]}</option>)}</select>
          </label>
          <button type="button" className="ol-copy" onClick={copy}>{copied === "ok" ? "Copied" : copied === "fail" ? "Copy didn't work" : "Copy my picks"}</button>
        </div>
        <div className="ol-cats" role="radiogroup" aria-label="Category">
          {(["All", ...CATS] as const).map((c) => (
            <button key={c} type="button" role="radio" aria-checked={cat === c} className={cat === c ? "on" : ""} onClick={() => setCat(c)}>
              {c} <span>{c === "All" ? base.length : counts[c] ?? 0}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="ol-bar">
        <div className="ol-themes" role="radiogroup" aria-label="Product skin">
          {THEMES.map((th, i) => <button key={th.key} type="button" role="radio" aria-checked={i === t} className={i === t ? "on" : ""} onClick={() => setT(i)}>{th.name}</button>)}
        </div>
        <p className="ol-note" aria-live="polite">{theme.note}</p>
      </div>

      <p className="ol-count" aria-live="polite">Showing {sorted.length} of {ENTRIES.length}</p>

      <div className="ol-skin" style={theme.vars as CSSProperties}>
        <div className="ol-tokens">
          {["--o-primary", "--o-accent", "--o-ink", "--o-mut", "--o-line", "--o-soft"].map((v) => <span key={v}><i style={{ background: `var(${v})` }} />{theme.vars[v]}</span>)}
          <span><i className="ol-corner" />corner {theme.vars["--o-r"]}</span>
        </div>
        {sorted.length === 0 && (
          <div className="ol-none"><p>Nothing matches.</p><button type="button" className="ol-copy" onClick={() => { setQ(""); setCat("All"); setStatus("all"); }}>Clear filters</button></div>
        )}
        <div className="ol-grid">
          {sorted.map((e, i) => {
            const s = statusOf(e);
            const head = sort === "cat" && (i === 0 || sorted[i - 1].cat !== e.cat) ? e.cat : null;
            return (
              <WithHead key={e.id} head={head}>
                <section className={`ol-card${e.wide ? " wide" : ""}${s === "cut" ? " is-cut" : ""}`} aria-labelledby={`h-${e.id}`}>
                  <div className="ol-demo"><e.Demo /></div>
                  <div className="ol-meta">
                    <div className="ol-meta-h">
                      <h3 id={`h-${e.id}`}>{e.name}</h3>
                      <span className="ol-cat">{e.cat}</span>
                    </div>
                    <p className="ol-use">{e.use}</p>
                    <label className="ol-where"><span>Where it&rsquo;s used</span>
                      <textarea rows={1} placeholder="To fill in" value={picks[e.id]?.note ?? ""} onChange={(ev) => setPick(e.id, { note: ev.target.value })} />
                    </label>
                    <div className="ol-pick" role="radiogroup" aria-label={`${e.name}: keep or cut`}>
                      {(["keep", "undecided", "cut"] as Status[]).map((k) => (
                        <button key={k} type="button" role="radio" aria-checked={s === k} className={`${s === k ? "on" : ""} pk-${k}`} onClick={() => setPick(e.id, { s: k })}>{STATUS_LABEL[k]}</button>
                      ))}
                    </div>
                  </div>
                </section>
              </WithHead>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function WithHead({ head, children }: { head: string | null; children: ReactNode }) {
  return <>{head && <h2 className="ol-group">{head}</h2>}{children}</>;
}
