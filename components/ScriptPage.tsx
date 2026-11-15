"use client";

import { useState } from "react";
import Link from "next/link";

// The Premise page's opening object: one page of a script. Each scene is a
// piece of my work, my line in it reads in English or Korean (the musical
// rehearsed in both), and the pencil note in the margin is the proof, with
// the case behind it. Every scene and both languages sit in one grid cell,
// so switching never moves the layout. Sized in container units.
type Scene = { tab: string; slug: string; heading: string; action: string; en: string; ko: string; note: string; href: string };

const SCENES: Scene[] = [
  {
    tab: "Musical",
    slug: "1",
    heading: "INT. REHEARSAL ROOM, TORONTO, NIGHT",
    action: "Forty people, two languages, one group chat nobody can search.",
    en: "Half the room reads Korean, half reads English. So both scripts live in one place.",
    ko: "반은 한국어로, 반은 영어로 대본을 읽어요. 그래서 두 대본을 한곳에 모았어요.",
    note: "Used daily by a forty-person company for ten months",
    href: "/work/torontoyuwol",
  },
  {
    tab: "Automation",
    slug: "2",
    heading: "INT. NONPROFIT OFFICE, DAY",
    action: "A product area that doesn't exist yet.",
    en: "Fifteen interviews and three rounds of testing, before anything shipped.",
    ko: "출시 전에 인터뷰 열다섯 번, 테스트 세 번을 거쳤어요.",
    note: "+13% ARR, with 30% of 355 organizations using it",
    href: "/work/automation-nonprofits",
  },
  {
    tab: "ARND",
    slug: "3",
    heading: "EXT. A SMALL VENUE, TORONTO, TONIGHT",
    action: "A show worth walking to, and no easy way to find it.",
    en: "I took a map of small shows from first sketch to an app on iOS, Android and the web.",
    ko: "작은 공연 지도를 첫 스케치부터 iOS, 안드로이드, 웹 앱까지 만들었어요.",
    note: "160+ pull requests, built with AI coding tools",
    href: "/work/arnd",
  },
  {
    tab: "Forkestrate",
    slug: "4",
    heading: "INT. A FRIEND'S KITCHEN, EVENING",
    action: "A cooking video, scrubbed back ten seconds again.",
    en: "A PM, two engineers and me. Zero to a working MVP in under three months.",
    ko: "PM 한 명, 엔지니어 두 명, 그리고 저. 석 달이 안 돼 MVP를 만들었어요.",
    note: "Founding designer on an AI recipe app",
    href: "/work/forkestrate",
  },
];

export default function ScriptPage() {
  const [i, setI] = useState(0);
  const [lang, setLang] = useState<"en" | "ko">("en");

  return (
    <div className="sp-wrap">
      <div className="sp-bar">
        <div className="sp-tabs" role="group" aria-label="Scenes">
          {SCENES.map((s, k) => (
            <button key={s.tab} type="button" aria-pressed={k === i} onClick={() => setI(k)}>
              {s.tab}
            </button>
          ))}
        </div>
        <div className="sp-lang" role="group" aria-label="Language">
          <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>
            EN
          </button>
          <button type="button" aria-pressed={lang === "ko"} onClick={() => setLang("ko")} lang="ko">
            한국어
          </button>
        </div>
      </div>

      <div className="sp-page">
        <div className="sp-stack" aria-live="polite">
          {SCENES.map((s, k) => (
            <div key={s.tab} className="sp-scene" aria-hidden={k !== i} data-on={k === i}>
              <p className="sp-num" aria-hidden>
                {s.slug}.
              </p>
              <p className="sp-head">
                <span>{s.slug}</span>
                {s.heading}
              </p>
              <p className="sp-action">{s.action}</p>
              <p className="sp-cue">ALLEN</p>
              <div className="sp-lines">
                <p className="sp-line" data-on={lang === "en"} aria-hidden={lang !== "en"}>
                  {s.en}
                </p>
                <p className="sp-line" lang="ko" data-on={lang === "ko"} aria-hidden={lang !== "ko"}>
                  {s.ko}
                </p>
              </div>
              <div className="sp-note">
                <span className="sp-mark" aria-hidden>
                  *
                </span>
                <span>{s.note}</span>
                <Link href={s.href} tabIndex={k === i ? 0 : -1}>
                  Read the case
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="sp-demo">
        <a href="https://torontoyuwol-brown.vercel.app/demo.html" target="_blank" rel="noopener noreferrer">
          Try the musical&rsquo;s real script reader
          <span className="sr-only"> (opens in new tab)</span>
        </a>
      </p>
    </div>
  );
}
