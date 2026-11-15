"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import type { EChartsCoreOption } from "echarts/core";

// Report charts for the Orchid library, built on Apache ECharts, the chart
// library the team used. Every chart takes its colours, type and lines from
// the chosen skin, so switching skin restyles them. ECharts loads only when
// a chart scrolls near the screen. Sample data, invented.

export type ChartSkin = { vars: Record<string, string>; palette: string[] };
export const ChartSkinContext = createContext<ChartSkin>({ vars: {}, palette: ["#111111", "#6B6B6B", "#A3A3A3", "#D4D4D4"] });

type Lib = typeof import("echarts/core");
let libPromise: Promise<Lib> | null = null;
const loadLib = () => (libPromise ??= (async () => {
  const [core, charts, comps, renderers] = await Promise.all([import("echarts/core"), import("echarts/charts"), import("echarts/components"), import("echarts/renderers")]);
  core.use([
    charts.LineChart, charts.BarChart, charts.PieChart, charts.GaugeChart, charts.FunnelChart, charts.SankeyChart, charts.TreemapChart, 
    comps.GridComponent, comps.TooltipComponent, comps.LegendComponent, comps.MarkLineComponent, comps.AriaComponent, comps.DatasetComponent,
    renderers.SVGRenderer,
  ]);
  return core;
})());

// White or ink, whichever reads on a given fill.
const onFill = (hex: string, ink: string) => {
  const n = parseInt(hex.replace("#", "").slice(0, 6), 16);
  const lin = (c: number) => { const v = c / 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  const L = 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
  return L > 0.33 ? ink : "#ffffff";
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const k = (v: number) => `$${v}k`;

// Shared look: skin type, ink, muted labels, hairline grid, no chart junk.
function base(s: ChartSkin): EChartsCoreOption {
  const v = s.vars;
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return {
    color: s.palette,
    animation: !reduce,
    aria: { enabled: true },
    textStyle: { fontFamily: v["--o-font"] === "inherit" ? "system-ui, sans-serif" : v["--o-font"], color: v["--o-ink"] },
    tooltip: { trigger: "axis", backgroundColor: "#fff", borderColor: v["--o-line"], textStyle: { color: v["--o-ink"], fontSize: 13 } },
    legend: { top: 0, left: 0, icon: "roundRect", itemWidth: 10, itemHeight: 10, textStyle: { color: v["--o-mut"], fontSize: 12 } },
    grid: { top: 36, left: 8, right: 12, bottom: 4, containLabel: true },
  };
}
const axes = (s: ChartSkin, cats: string[], fmt?: (v: number) => string) => ({
  xAxis: { type: "category", data: cats, axisLine: { lineStyle: { color: s.vars["--o-line"] } }, axisTick: { show: false }, axisLabel: { color: s.vars["--o-mut"] } },
  yAxis: { type: "value", splitLine: { lineStyle: { color: s.vars["--o-line"] } }, axisLabel: { color: s.vars["--o-mut"], formatter: fmt } },
});

function Chart({ label, height = 260, build }: { label: string; height?: number; build: (s: ChartSkin) => EChartsCoreOption }) {
  const skin = useContext(ChartSkinContext);
  const el = useRef<HTMLDivElement>(null);
  const inst = useRef<{ setOption: (o: EChartsCoreOption, notMerge?: boolean) => void; resize: () => void; dispose: () => void } | null>(null);
  // Keep the latest builder and skin for the loader; restyle only when the skin changes.
  const latest = useRef({ build, skin });
  useEffect(() => { latest.current = { build, skin }; });

  useEffect(() => {
    const node = el.current!;
    let ro: ResizeObserver | undefined;
    let dead = false;
    const io = new IntersectionObserver(async ([e]) => {
      if (!e.isIntersecting || inst.current) return;
      io.disconnect();
      const lib = await loadLib();
      if (dead) return;
      inst.current = lib.init(node, null, { renderer: "svg" });
      inst.current.setOption(latest.current.build(latest.current.skin), true);
      ro = new ResizeObserver(() => inst.current?.resize());
      ro.observe(node);
    }, { rootMargin: "300px" });
    io.observe(node);
    return () => { dead = true; io.disconnect(); ro?.disconnect(); inst.current?.dispose(); inst.current = null; };
  }, []);

  useEffect(() => { inst.current?.setOption(latest.current.build(latest.current.skin), true); }, [skin]);

  return <div ref={el} className="c-chart" role="img" aria-label={label} style={{ height }} />;
}

/* ---------- Line family ---------- */
export const LineChartDemo = () => (
  <Chart label="Line chart: cumulative giving this year reaches $64k by December, ahead of last year's $45k" build={(s) => ({
    ...base(s), ...axes(s, MONTHS, k),
    legend: { ...(base(s).legend as object), data: ["This year", "Last year"] },
    series: [
      { name: "This year", type: "line", smooth: true, symbol: "none", lineStyle: { width: 2.5 }, data: [22, 26, 24, 31, 35, 33, 41, 46, 44, 52, 58, 64] },
      { name: "Last year", type: "line", smooth: true, symbol: "none", lineStyle: { width: 1.5, type: "dashed" }, data: [20, 21, 25, 24, 27, 29, 30, 33, 35, 36, 40, 45] },
    ],
  })} />
);
export const BarChartDemo = () => (
  <Chart label="Bar chart of gifts per month, with the monthly average of $16.5k marked" build={(s) => {
    const d = [12, 14, 11, 17, 26, 15, 13, 12, 16, 19, 28, 35];
    return { ...base(s), ...axes(s, MONTHS, k), series: [{ name: "Gifts", type: "bar", barWidth: "55%", itemStyle: { borderRadius: [4, 4, 0, 0] }, data: d, markLine: { symbol: "none", label: { formatter: "Average", color: s.vars["--o-mut"] }, lineStyle: { color: s.vars["--o-mut"], type: "dashed" }, data: [{ type: "average" }] } }] };
  }} />
);
export const StackedBarDemo = () => (
  <Chart label="Stacked bar chart of revenue by fund for each quarter" build={(s) => ({
    ...base(s), ...axes(s, ["Q1", "Q2", "Q3", "Q4"], k),
    series: [["General", [38, 42, 35, 61]], ["Building", [12, 18, 9, 24]], ["Youth", [8, 9, 11, 14]], ["Relief", [3, 2, 14, 6]]].map(([n, d], i, all) => ({ name: n, type: "bar", stack: "all", barWidth: "45%", itemStyle: { borderRadius: i === all.length - 1 ? [4, 4, 0, 0] : 0 }, data: d })),
  })} />
);
export const HorizontalBarDemo = () => (
  <Chart label="Horizontal bar chart of the top five campaigns by amount raised, led by Year-end at $61k" height={240} build={(s) => {
    const c = base(s);
    return { ...c, tooltip: { ...(c.tooltip as object), trigger: "item" }, grid: { ...(c.grid as object), top: 4 },
      xAxis: { type: "value", splitLine: { lineStyle: { color: s.vars["--o-line"] } }, axisLabel: { color: s.vars["--o-mut"], formatter: k } },
      yAxis: { type: "category", inverse: true, data: ["Year-end", "Gala 2026", "Spring appeal", "Giving Tuesday", "Capital campaign"], axisTick: { show: false }, axisLine: { show: false }, axisLabel: { color: s.vars["--o-ink"] } },
      series: [{ type: "bar", barWidth: 16, itemStyle: { borderRadius: [0, 4, 4, 0] }, label: { show: true, position: "right", formatter: (p: { value: number }) => k(p.value), color: s.vars["--o-ink"] }, data: [61, 48, 12.5, 9.8, 7.2] }] };
  }} />
);
export const ComboDemo = () => (
  <Chart label="Combined chart: donors per month as bars, average gift as a line on a second axis" build={(s) => {
    const a = axes(s, MONTHS);
    return { ...base(s), xAxis: a.xAxis,
      yAxis: [{ ...a.yAxis, name: "Donors", nameTextStyle: { color: s.vars["--o-mut"] } }, { type: "value", name: "Avg gift", nameTextStyle: { color: s.vars["--o-mut"] }, splitLine: { show: false }, axisLabel: { color: s.vars["--o-mut"], formatter: "${value}" } }],
      series: [
        { name: "Donors", type: "bar", barWidth: "50%", itemStyle: { borderRadius: [4, 4, 0, 0] }, data: [180, 190, 175, 210, 320, 200, 185, 170, 215, 240, 360, 420] },
        { name: "Average gift", type: "line", yAxisIndex: 1, smooth: true, symbolSize: 6, data: [66, 72, 63, 80, 82, 75, 70, 71, 74, 79, 78, 83] },
      ] };
  }} />
);

/* ---------- Parts of a whole ---------- */
export const DonutChartDemo = () => (
  <Chart label="Donut chart of giving by fund: General 52 percent, Building 23, Youth 15, Relief 10" build={(s) => ({
    ...base(s), tooltip: { trigger: "item", formatter: "{b}: {d}%" }, legend: { ...(base(s).legend as object), top: "middle", left: "62%", orient: "vertical" },
    series: [{ type: "pie", radius: ["48%", "72%"], center: ["32%", "55%"], avoidLabelOverlap: true, padAngle: 2, itemStyle: { borderRadius: 4 }, label: { show: false },
      data: [{ name: "General", value: 52 }, { name: "Building", value: 23 }, { name: "Youth", value: 15 }, { name: "Relief", value: 10 }] }],
  })} />
);
export const TreemapDemo = () => (
  <Chart label="Treemap of expenses: programs are the largest block, then staff, fundraising, admin and facilities" build={(s) => ({
    ...base(s), tooltip: { trigger: "item", formatter: (p: { name: string; value: number }) => `${p.name}: $${p.value}k` },
    series: [{ type: "treemap", roam: false, nodeClick: false, breadcrumb: { show: false }, width: "100%", height: "100%", top: 0, left: 0,
      itemStyle: { borderColor: "#fff", borderWidth: 2, gapWidth: 2 }, label: { formatter: "{b}\n${c}k", color: "#fff", fontSize: 12 },
      data: [{ name: "Programs", value: 420, children: [{ name: "Youth", value: 180 }, { name: "Food bank", value: 150 }, { name: "Shelter", value: 90 }] }, { name: "Staff", value: 210 }, { name: "Fundraising", value: 95 }, { name: "Admin", value: 60 }, { name: "Facilities", value: 45 }].map((d, i) => { const col = s.palette[i % s.palette.length]; return { ...d, itemStyle: { color: col }, label: { color: onFill(col, s.vars["--o-ink"]) } }; }) }],
  })} />
);
export const SankeyDemo = () => (
  <Chart label="Sankey diagram: individuals, grants and events flow into the general and restricted funds, then into programs, staff and fundraising" height={300} build={(s) => ({
    ...base(s), tooltip: { trigger: "item" },
    series: [{ type: "sankey", left: 4, right: 80, top: 8, bottom: 8, nodeWidth: 12, nodeGap: 12, emphasis: { focus: "adjacency" }, label: { color: s.vars["--o-ink"], fontSize: 12 },
      lineStyle: { color: "gradient", opacity: 0.35, curveness: 0.5 },
      data: ["Individuals", "Grants", "Events", "General fund", "Restricted funds", "Programs", "Staff", "Fundraising"].map((n, i) => ({ name: n, itemStyle: { color: s.palette[i % s.palette.length] } })),
      links: [["Individuals", "General fund", 300], ["Individuals", "Restricted funds", 80], ["Grants", "Restricted funds", 250], ["Events", "General fund", 120], ["General fund", "Programs", 220], ["General fund", "Staff", 130], ["General fund", "Fundraising", 70], ["Restricted funds", "Programs", 330]].map(([a, b, v]) => ({ source: a, target: b, value: v })) }],
  })} />
);

/* ---------- Progress and conversion ---------- */
export const GaugeDemo = () => (
  <Chart label="Gauge: the spring appeal is at 62 percent of its $20,000 goal" height={220} build={(s) => ({
    ...base(s), tooltip: { show: false },
    series: [{ type: "gauge", startAngle: 200, endAngle: -20, min: 0, max: 100, radius: "100%", center: ["50%", "62%"], progress: { show: true, width: 14, roundCap: true, itemStyle: { color: s.palette[0] } },
      axisLine: { lineStyle: { width: 14, color: [[1, s.vars["--o-soft"]]] }, roundCap: true }, pointer: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { show: false },
      title: { offsetCenter: [0, "32%"], color: s.vars["--o-mut"], fontSize: 13 }, detail: { offsetCenter: [0, "-4%"], formatter: "{value}%", color: s.vars["--o-ink"], fontSize: 28, fontWeight: 700 },
      data: [{ value: 62, name: "$12,480 of $20,000" }] }],
  })} />
);
export const FunnelDemo = () => (
  <Chart label="Funnel of the online giving page: 8,400 visits, 2,100 started the form, 1,260 reached payment, 980 gave" height={240} build={(s) => ({
    ...base(s), tooltip: { trigger: "item", formatter: "{b}: {c}" }, legend: { show: false },
    series: [{ type: "funnel", left: "10%", width: "80%", top: 4, bottom: 4, minSize: "22%", gap: 3, sort: "descending", label: { position: "inside", formatter: "{b}  {c}", color: "#fff", fontSize: 12 }, itemStyle: { borderWidth: 0 },
      data: [{ name: "Visited", value: 8400 }, { name: "Started form", value: 2100 }, { name: "Reached payment", value: 1260 }, { name: "Gave", value: 980 }].map((d, i) => ({ ...d, itemStyle: { color: s.palette[0], opacity: 1 - i * 0.18 }, label: { color: i >= 2 ? s.vars["--o-ink"] : "#fff" } })) }],
  })} />
);

/* ---------- Patterns ---------- */
export const SparklineDemo = () => (
  <div className="c-spark">
    <div><p className="o-small">Online gifts per day</p><p className="n-kpi-v">24</p></div>
    <Chart label="Sparkline of online gifts per day over two weeks, rising" height={48} build={(s) => ({
      color: s.palette, animation: false, grid: { top: 4, left: 2, right: 2, bottom: 4 }, xAxis: { type: "category", show: false, boundaryGap: false }, yAxis: { type: "value", show: false, min: "dataMin" },
      series: [{ type: "line", smooth: true, symbol: "none", lineStyle: { width: 2 }, areaStyle: { opacity: 0.12 }, data: [12, 14, 11, 17, 16, 21, 19, 18, 22, 20, 23, 21, 25, 24] }],
    })} />
  </div>
);
