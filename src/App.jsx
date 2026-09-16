import { useState, useEffect, useCallback } from "react";
import {
  Flame,
  BookOpen,
  MessageCircle,
  Volume2,
  ChevronRight,
  Sparkles,
  Coffee,
  Plane,
  Briefcase,
  Users,
  Settings as SettingsIcon,
  Wand2,
  Eye,
  EyeOff,
  TrendingUp,
  TrendingDown,
  Loader2,
  Home as HomeIcon,
} from "lucide-react";

/* ============================== DATA ============================== */

const VOCAB = [
  // Beginner
  { id: "v1", level: "beginner", en: "apple", he: "תפוח", ex: "I eat an apple every morning.", exHe: "אני אוכל תפוח כל בוקר." },
  { id: "v2", level: "beginner", en: "house", he: "בית", ex: "This is my house.", exHe: "זה הבית שלי." },
  { id: "v3", level: "beginner", en: "water", he: "מים", ex: "I drink water every day.", exHe: "אני שותה מים כל יום." },
  { id: "v4", level: "beginner", en: "friend", he: "חבר / חברה", ex: "She is my best friend.", exHe: "היא החברה הכי טובה שלי." },
  { id: "v5", level: "beginner", en: "happy", he: "שמח", ex: "I feel happy today.", exHe: "אני מרגיש שמח היום." },
  { id: "v6", level: "beginner", en: "book", he: "ספר", ex: "I am reading a good book.", exHe: "אני קורא ספר טוב." },
  { id: "v7", level: "beginner", en: "morning", he: "בוקר", ex: "Good morning, everyone.", exHe: "בוקר טוב לכולם." },
  { id: "v8", level: "beginner", en: "school", he: "בית ספר", ex: "I go to school by bus.", exHe: "אני נוסע לבית הספר באוטובוס." },
  { id: "v9", level: "beginner", en: "family", he: "משפחה", ex: "My family is very important to me.", exHe: "המשפחה שלי חשובה לי מאוד." },
  { id: "v10", level: "beginner", en: "to eat", he: "לאכול", ex: "We eat dinner at seven.", exHe: "אנחנו אוכלים ארוחת ערב בשבע." },
  // Intermediate
  { id: "v11", level: "intermediate", en: "achieve", he: "להשיג", ex: "She worked hard to achieve her goals.", exHe: "היא עבדה קשה כדי להשיג את המטרות שלה." },
  { id: "v12", level: "intermediate", en: "opportunity", he: "הזדמנות", ex: "This job is a great opportunity.", exHe: "העבודה הזאת היא הזדמנות מצוינת." },
  { id: "v13", level: "intermediate", en: "improve", he: "להשתפר", ex: "I want to improve my English.", exHe: "אני רוצה לשפר את האנגלית שלי." },
  { id: "v14", level: "intermediate", en: "decision", he: "החלטה", ex: "It was a difficult decision.", exHe: "זו הייתה החלטה קשה." },
  { id: "v15", level: "intermediate", en: "experience", he: "חוויה / ניסיון", ex: "That was an amazing experience.", exHe: "זו הייתה חוויה מדהימה." },
  { id: "v16", level: "intermediate", en: "responsible", he: "אחראי", ex: "He is responsible for the project.", exHe: "הוא אחראי על הפרויקט." },
  { id: "v17", level: "intermediate", en: "environment", he: "סביבה", ex: "We must protect the environment.", exHe: "עלינו להגן על הסביבה." },
  { id: "v18", level: "intermediate", en: "confident", he: "בטוח בעצמו", ex: "She feels confident before the exam.", exHe: "היא מרגישה בטוחה בעצמה לפני המבחן." },
  { id: "v19", level: "intermediate", en: "relationship", he: "מערכת יחסים", ex: "They have a strong relationship.", exHe: "יש להם מערכת יחסים חזקה." },
  { id: "v20", level: "intermediate", en: "imagine", he: "לדמיין", ex: "Can you imagine living there?", exHe: "אתה יכול לדמיין לגור שם?" },
  // Advanced
  { id: "v21", level: "advanced", en: "ambiguous", he: "דו-משמעי", ex: "The instructions were ambiguous.", exHe: "ההוראות היו דו-משמעיות." },
  { id: "v22", level: "advanced", en: "meticulous", he: "קפדני", ex: "He is meticulous about details.", exHe: "הוא קפדן לגבי פרטים." },
  { id: "v23", level: "advanced", en: "resilience", he: "חוסן", ex: "Her resilience helped her overcome challenges.", exHe: "החוסן שלה עזר לה להתגבר על אתגרים." },
  { id: "v24", level: "advanced", en: "inevitable", he: "בלתי נמנע", ex: "Change is inevitable.", exHe: "שינוי הוא בלתי נמנע." },
  { id: "v25", level: "advanced", en: "skeptical", he: "ספקן", ex: "I'm skeptical about that claim.", exHe: "אני ספקן לגבי הטענה הזו." },
  { id: "v26", level: "advanced", en: "profound", he: "עמוק / משמעותי", ex: "It had a profound effect on me.", exHe: "זה השפיע עליי בצורה עמוקה." },
  { id: "v27", level: "advanced", en: "versatile", he: "רב-תכליתי", ex: "She is a versatile actress.", exHe: "היא שחקנית רב-תכליתית." },
  { id: "v28", level: "advanced", en: "elaborate", he: "מפורט", ex: "He gave an elaborate explanation.", exHe: "הוא נתן הסבר מפורט." },
  { id: "v29", level: "advanced", en: "subtle", he: "עדין / דק", ex: "There was a subtle difference between them.", exHe: "היה הבדל עדין ביניהם." },
  { id: "v30", level: "advanced", en: "candid", he: "כן וגלוי לב", ex: "He gave a candid answer.", exHe: "הוא נתן תשובה כנה." },
];

const DIALOGUES = [
  {
    id: "d1",
    title: "בבית קפה",
    level: "beginner",
    Icon: Coffee,
    lines: [
      { s: "A", en: "Hi! Welcome. What can I get you?", he: "היי! ברוכים הבאים. מה אפשר להביא לך?" },
      { s: "B", en: "Hi, I'd like a large coffee, please.", he: "היי, אני רוצה קפה גדול בבקשה." },
      { s: "A", en: "Sure. Anything else?", he: "בטח. עוד משהו?" },
      { s: "B", en: "Yes, a chocolate croissant too.", he: "כן, גם קרואסון שוקולד." },
      { s: "A", en: "Great choice. For here or to go?", he: "בחירה מעולה. לשבת כאן או לקחת?" },
      { s: "B", en: "To go, please.", he: "לקחת, בבקשה." },
      { s: "A", en: "That'll be six dollars.", he: "זה יהיה שש דולר." },
      { s: "B", en: "Here you go. Thank you!", he: "הנה. תודה!" },
    ],
  },
  {
    id: "d2",
    title: "בשדה התעופה",
    level: "beginner",
    Icon: Plane,
    lines: [
      { s: "A", en: "Good morning. Can I see your passport and ticket?", he: "בוקר טוב. אפשר לראות דרכון וכרטיס?" },
      { s: "B", en: "Sure, here they are.", he: "בטח, הנה." },
      { s: "A", en: "Do you have any luggage to check in?", he: "יש לך מזוודות להטבעה?" },
      { s: "B", en: "Yes, just one bag.", he: "כן, רק תיק אחד." },
      { s: "A", en: "Okay, please put it on the scale.", he: "בסדר, שים אותו על המשקל בבקשה." },
      { s: "B", en: "Is my flight on time?", he: "הטיסה שלי בזמן?" },
      { s: "A", en: "Yes, it's boarding at gate twelve.", he: "כן, עולים למטוס בשער שתים עשרה." },
      { s: "B", en: "Perfect, thank you for your help.", he: "מושלם, תודה על העזרה." },
    ],
  },
  {
    id: "d3",
    title: "ראיון עבודה",
    level: "intermediate",
    Icon: Briefcase,
    lines: [
      { s: "A", en: "Thanks for coming in today. Tell me about yourself.", he: "תודה שבאת היום. ספר לי על עצמך." },
      { s: "B", en: "Sure. I have three years of experience in marketing.", he: "בטח. יש לי שלוש שנות ניסיון בשיווק." },
      { s: "A", en: "What made you apply for this position?", he: "מה גרם לך להגיש מועמדות לתפקיד הזה?" },
      { s: "B", en: "I'm looking for a new challenge and a chance to grow.", he: "אני מחפש אתגר חדש והזדמנות להתפתח." },
      { s: "A", en: "What's your biggest strength?", he: "מה החוזק הכי גדול שלך?" },
      { s: "B", en: "I'm very organized and I work well under pressure.", he: "אני מאוד מאורגן ועובד טוב תחת לחץ." },
      { s: "A", en: "Great. Do you have any questions for us?", he: "מעולה. יש לך שאלות אלינו?" },
      { s: "B", en: "Yes, what does a typical day look like here?", he: "כן, איך נראה יום עבודה טיפוסי כאן?" },
    ],
  },
  {
    id: "d4",
    title: "פגישת עבודה",
    level: "advanced",
    Icon: Users,
    lines: [
      { s: "A", en: "Let's get started. Can everyone see the presentation?", he: "בואו נתחיל. כולם רואים את המצגת?" },
      { s: "B", en: "Yes, it's clear. Please go ahead.", he: "כן, ברור. בבקשה תמשיך." },
      { s: "A", en: "Our revenue increased by fifteen percent this quarter.", he: "ההכנסות שלנו גדלו בחמישה עשר אחוז ברבעון הזה." },
      { s: "B", en: "That's impressive. What drove the growth?", he: "מרשים. מה הניע את הצמיחה?" },
      { s: "A", en: "Mainly our new product line and expanded marketing.", he: "בעיקר קו המוצרים החדש והשיווק המורחב." },
      { s: "B", en: "Do we have projections for next quarter?", he: "יש לנו תחזיות לרבעון הבא?" },
      { s: "A", en: "Yes, we expect similar growth if trends continue.", he: "כן, אנחנו מצפים לצמיחה דומה אם המגמות יימשכו." },
      { s: "B", en: "Sounds promising. Let's discuss the budget next.", he: "נשמע מבטיח. בואו נדבר על התקציב." },
    ],
  },
];

const LEVELS = [
  { id: "beginner", label: "מתחילים" },
  { id: "intermediate", label: "בינוני" },
  { id: "advanced", label: "מתקדם" },
];
const LEVEL_ORDER = ["beginner", "intermediate", "advanced"];

const TOPICS = [
  "מסעדה", "קניות בחנות בגדים", "בבנק", "אצל הרופא", "תחבורה ציבורית",
  "בבית מלון", "תחביבים", "מזג אוויר", "טכנולוגיה", "תכנון חופשה",
];

const BOX_INTERVALS = [0, 1, 3, 7, 14, 30]; // days, index = box
const GEMINI_MODEL = "gemini-flash-lite-latest";

/* ============================== HELPERS ============================== */

const todayStr = () => new Date().toISOString().slice(0, 10);
const addDays = (dateStr, days) => {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};
const isDue = (dueStr) => dueStr <= todayStr();

function greeting() {
  const h = new Date().getHours();
  if (h < 5) return "לילה טוב";
  if (h < 12) return "בוקר טוב";
  if (h < 18) return "צהריים טובים";
  return "ערב טוב";
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function speak(text) {
  try {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.92;
    window.speechSynthesis.speak(u);
  } catch (e) {
    /* speech synthesis unavailable */
  }
}

function levelLabel(id) {
  return LEVELS.find((l) => l.id === id)?.label || "כל הרמות";
}

function defaultState() {
  return {
    onboarded: false,
    settings: { level: "all", apiKey: "" },
    stats: {
      streak: 0,
      lastActiveDate: null,
      xp: 0,
      sessionsCompleted: 0,
      levelStats: { beginner: { good: 0, bad: 0 }, intermediate: { good: 0, bad: 0 }, advanced: { good: 0, bad: 0 } },
    },
    words: {}, // id -> { box, due }
    convosDone: {}, // id -> true
    aiSeenWords: [], // english words already generated by AI, to avoid repeats
  };
}

function touchStreak(stats) {
  const today = todayStr();
  if (stats.lastActiveDate === today) return stats;
  const yesterday = addDays(today, -1);
  const streak = stats.lastActiveDate === yesterday ? stats.streak + 1 : 1;
  return { ...stats, streak, lastActiveDate: today };
}

function updateLevelStats(stats, level, accuracy) {
  if (!LEVEL_ORDER.includes(level)) return { stats, suggestion: null };
  const levelStats = { ...stats.levelStats };
  const cur = { ...(levelStats[level] || { good: 0, bad: 0 }) };
  if (accuracy >= 0.8) {
    cur.good += 1;
    cur.bad = 0;
  } else if (accuracy <= 0.4) {
    cur.bad += 1;
    cur.good = 0;
  } else {
    cur.good = 0;
    cur.bad = 0;
  }
  let suggestion = null;
  const idx = LEVEL_ORDER.indexOf(level);
  if (cur.good >= 3 && idx < LEVEL_ORDER.length - 1) {
    suggestion = { type: "up", from: level, to: LEVEL_ORDER[idx + 1] };
    cur.good = 0;
  } else if (cur.bad >= 3 && idx > 0) {
    suggestion = { type: "down", from: level, to: LEVEL_ORDER[idx - 1] };
    cur.bad = 0;
  }
  levelStats[level] = cur;
  return { stats: { ...stats, levelStats }, suggestion };
}

/* ============================== STORAGE ============================== */

async function loadState() {
  try {
    const raw = localStorage.getItem("app-state");
    if (raw) return { ...defaultState(), ...JSON.parse(raw) };
  } catch (e) {
    /* no saved state yet */
  }
  return null;
}

async function saveState(state) {
  try {
    localStorage.setItem("app-state", JSON.stringify(state));
  } catch (e) {
    console.error("Could not save progress", e);
  }
}

/* ============================== GEMINI AI ============================== */

async function callGemini(apiKey, prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json", temperature: 0.9 },
    }),
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`שגיאת שרת (${res.status}): ${errText.slice(0, 200)}`);
  }
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || "";
  if (!text) throw new Error("לא התקבלה תשובה מהמודל.");
  return JSON.parse(text);
}

async function generateAIWords(apiKey, level, excludeWords) {
  const prompt = `אתה עוזר ליצירת תוכן לימודי לאפליקציית לימוד אנגלית לדוברי עברית.
צור מערך JSON של בדיוק 8 מילים או ביטויים באנגלית ברמת קושי "${levelLabel(level)}", מתאימים ללומד ישראלי מבוגר.
אל תשתמש במילים הבאות (כבר נלמדו): ${excludeWords.length ? excludeWords.join(", ") : "אין"}.
כל איבר במערך חייב להיות אובייקט עם השדות בדיוק האלה: "en" (המילה או הביטוי באנגלית), "he" (תרגום מדויק לעברית), "ex" (משפט דוגמה קצר וטבעי באנגלית המשתמש במילה), "exHe" (תרגום טבעי של המשפט לעברית).
החזר אך ורק JSON תקין - מערך של 8 אובייקטים - בלי שום טקסט נוסף, בלי הסברים.`;
  const arr = await callGemini(apiKey, prompt);
  if (!Array.isArray(arr) || arr.length === 0) throw new Error("פורמט תשובה לא תקין");
  return arr
    .filter((w) => w && w.en && w.he)
    .slice(0, 8)
    .map((w, i) => ({
      id: `ai-${Date.now()}-${i}`,
      level,
      en: String(w.en),
      he: String(w.he),
      ex: String(w.ex || ""),
      exHe: String(w.exHe || ""),
    }));
}

async function generateAIDialogue(apiKey, level, topic) {
  const prompt = `אתה עוזר ליצירת תוכן לימודי לאפליקציית לימוד אנגלית לדוברי עברית.
צור דיאלוג קצר באנגלית ללימוד שפה, ברמת קושי "${levelLabel(level)}", בנושא "${topic}", בין שני דוברים A ו-B.
החזר אובייקט JSON בפורמט הבא בדיוק: {"title": "כותרת קצרה בעברית לתרגיל", "lines": [{"s":"A","en":"...","he":"..."}, {"s":"B","en":"...","he":"..."}]}.
כלול 6 עד 8 שורות דיאלוג טבעי, קולח ורלוונטי לנושא. תרגם כל שורה לעברית בצורה מדויקת וטבעית.
החזר אך ורק JSON תקין, בלי שום טקסט נוסף.`;
  const obj = await callGemini(apiKey, prompt);
  if (!obj || !Array.isArray(obj.lines) || obj.lines.length === 0) throw new Error("פורמט תשובה לא תקין");
  return {
    id: `ai-${Date.now()}`,
    title: String(obj.title || topic),
    level,
    isAI: true,
    Icon: Wand2,
    lines: obj.lines.map((l) => ({ s: l.s === "B" ? "B" : "A", en: String(l.en || ""), he: String(l.he || "") })),
  };
}

/* ============================== STYLES ============================== */

function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&display=swap');

      :root {
        --ink: #1C2541;
        --paper: #FAF6EF;
        --card: #FFFFFF;
        --sage: #4F7965;
        --sage-light: #E1EAE4;
        --gold: #D9A441;
        --gold-light: #F6E7C8;
        --rose: #C1554A;
        --rose-light: #F5DEDB;
        --mist: #E4DCC8;
        --muted: #7B7566;
      }

      .ela-root {
        direction: rtl;
        font-family: 'Heebo', sans-serif;
        background: var(--paper);
        color: var(--ink);
        min-height: 100%;
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .ela-root * { box-sizing: border-box; }
      .ela-en {
        direction: ltr;
        font-family: 'Fraunces', serif;
        unicode-bidi: isolate;
      }
      .ela-shell {
        display: flex;
        flex: 1;
        max-width: 920px;
        width: 100%;
        margin: 0 auto;
      }
      .ela-nav-desktop { display: none; }
      .ela-main {
        flex: 1;
        padding: 20px 18px 90px 18px;
        min-width: 0;
      }
      @media (min-width: 760px) {
        .ela-nav-desktop {
          display: flex;
          flex-direction: column;
          width: 220px;
          padding: 28px 16px;
          gap: 6px;
          border-left: 1px solid var(--mist);
        }
        .ela-main { padding: 32px 36px 40px 36px; }
        .ela-nav-mobile { display: none !important; }
      }
      .ela-navbtn {
        display: flex; align-items: center; gap: 10px;
        padding: 11px 14px; border-radius: 10px;
        font-size: 15px; font-weight: 500; color: var(--muted);
        cursor: pointer; border: none; background: transparent;
        text-align: right; font-family: 'Heebo', sans-serif;
      }
      .ela-navbtn.active { background: var(--sage-light); color: var(--sage); font-weight: 700; }
      .ela-navbtn:hover:not(.active) { background: #F0ECE1; }

      .ela-nav-mobile {
        position: fixed; bottom: 0; left: 0; right: 0;
        display: flex; background: var(--card); border-top: 1px solid var(--mist);
        padding: 6px 10px calc(6px + env(safe-area-inset-bottom, 0px)) 10px;
        z-index: 20; max-width: 920px; margin: 0 auto;
      }
      .ela-nav-mobile button {
        flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px;
        padding: 6px 0; border: none; background: none; color: var(--muted);
        font-family: 'Heebo', sans-serif; font-size: 11.5px; font-weight: 500; cursor: pointer;
      }
      .ela-nav-mobile button.active { color: var(--sage); font-weight: 700; }

      .ela-h1 { font-family: 'Fraunces', serif; font-size: 30px; font-weight: 500; margin: 0 0 4px 0; letter-spacing: -0.3px; }
      .ela-sub { color: var(--muted); font-size: 15px; margin: 0 0 22px 0; }

      .ela-streak {
        display: inline-flex; align-items: center; gap: 6px;
        background: var(--gold-light); color: #8A6412;
        padding: 6px 12px; border-radius: 999px; font-weight: 700; font-size: 14px;
      }
      .ela-aibadge {
        display: inline-flex; align-items: center; gap: 5px;
        background: var(--sage-light); color: var(--sage);
        padding: 5px 11px; border-radius: 999px; font-weight: 700; font-size: 12.5px;
        margin-inline-start: 8px;
      }

      .ela-cardrow { display: grid; grid-template-columns: 1fr; gap: 14px; margin-top: 18px; }
      @media (min-width: 560px) { .ela-cardrow { grid-template-columns: 1fr 1fr; } }

      .ela-bigcard {
        background: var(--card); border-radius: 18px; padding: 22px;
        border: 1px solid var(--mist); cursor: pointer;
        transition: transform 0.15s ease, box-shadow 0.15s ease; text-align: right;
      }
      .ela-bigcard:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(28,37,65,0.08); }
      .ela-bigcard .icon-wrap {
        width: 46px; height: 46px; border-radius: 12px;
        display: flex; align-items: center; justify-content: center; margin-bottom: 14px;
      }
      .ela-bigcard h3 { font-size: 18px; margin: 0 0 6px 0; font-weight: 700; }
      .ela-bigcard p { font-size: 13.5px; color: var(--muted); margin: 0; line-height: 1.5; }

      .ela-chip {
        display: inline-flex; padding: 7px 14px; border-radius: 999px;
        font-size: 13.5px; font-weight: 600; border: 1px solid var(--mist);
        background: var(--card); color: var(--muted); cursor: pointer;
      }
      .ela-chip.active { background: var(--ink); color: var(--paper); border-color: var(--ink); }
      .ela-chiprow { display: flex; gap: 8px; flex-wrap: wrap; margin: 14px 0 6px 0; }

      .ela-flashcard {
        background: var(--card); border: 1px solid var(--mist); border-radius: 22px;
        padding: 40px 24px; text-align: center; cursor: pointer; min-height: 220px;
        display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;
      }
      .ela-flashcard .word { font-family: 'Fraunces', serif; font-size: 40px; direction: ltr; }
      .ela-flashcard .hint { color: var(--muted); font-size: 13px; margin-top: 6px; }
      .ela-flashcard .translation { font-size: 22px; font-weight: 700; color: var(--sage); }
      .ela-flashcard .example { direction: ltr; color: var(--muted); font-size: 15px; margin-top: 4px; max-width: 340px; }
      .ela-flashcard .exampleHe { color: var(--muted); font-size: 13.5px; margin-top: 2px; }

      .ela-optbtn {
        width: 100%; text-align: right; padding: 15px 16px; border-radius: 13px;
        border: 1.5px solid var(--mist); background: var(--card);
        font-family: 'Heebo', sans-serif; font-size: 16px; font-weight: 600; color: var(--ink);
        cursor: pointer; margin-bottom: 10px; display: block;
      }
      .ela-optbtn.correct { border-color: var(--sage); background: var(--sage-light); color: var(--sage); }
      .ela-optbtn.wrong { border-color: var(--rose); background: var(--rose-light); color: var(--rose); }
      .ela-optbtn:disabled { cursor: default; }

      .ela-progressbar { width: 100%; height: 6px; background: var(--mist); border-radius: 999px; overflow: hidden; margin-bottom: 20px; }
      .ela-progressbar > div { height: 100%; background: var(--sage); border-radius: 999px; transition: width 0.25s ease; }

      .ela-iconbtn {
        display: inline-flex; align-items: center; justify-content: center;
        width: 38px; height: 38px; border-radius: 999px;
        background: var(--sage-light); color: var(--sage); border: none; cursor: pointer; flex-shrink: 0;
      }
      .ela-iconbtn:hover { background: var(--sage); color: white; }

      .ela-bubble {
        background: var(--card); border: 1px solid var(--mist); border-radius: 16px;
        padding: 14px 16px; margin-bottom: 12px; display: flex; gap: 12px; align-items: flex-start;
      }
      .ela-bubble.speakerB { background: var(--sage-light); border-color: transparent; }
      .ela-bubble .txt { flex: 1; min-width: 0; }
      .ela-bubble .en { font-family: 'Fraunces', serif; font-size: 17px; direction: ltr; text-align: left; }
      .ela-bubble .he { color: var(--muted); font-size: 13.5px; margin-top: 4px; }
      .ela-tag { display: inline-block; font-size: 11px; font-weight: 700; color: var(--muted); background: var(--mist); border-radius: 6px; padding: 2px 7px; margin-bottom: 2px; }

      .ela-btn {
        display: inline-flex; align-items: center; gap: 8px;
        background: var(--ink); color: var(--paper); padding: 13px 22px; border-radius: 12px; border: none;
        font-family: 'Heebo', sans-serif; font-weight: 700; font-size: 15px; cursor: pointer;
      }
      .ela-btn:hover { opacity: 0.9; }
      .ela-btn:disabled { opacity: 0.5; cursor: default; }
      .ela-btn.secondary { background: var(--card); color: var(--ink); border: 1.5px solid var(--mist); }

      .ela-backrow { display: flex; align-items: center; gap: 8px; margin-bottom: 18px; cursor: pointer; color: var(--muted); font-weight: 600; font-size: 14px; }

      .ela-scenecard {
        display: flex; align-items: center; gap: 14px;
        background: var(--card); border: 1px solid var(--mist); border-radius: 16px;
        padding: 16px; margin-bottom: 12px; cursor: pointer;
      }
      .ela-scenecard:hover { border-color: var(--sage); }
      .ela-scenecard .icon-wrap { width: 44px; height: 44px; border-radius: 12px; background: var(--gold-light); color: #8A6412; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      .ela-scenecard h4 { margin: 0 0 3px 0; font-size: 15.5px; }
      .ela-scenecard .done { color: var(--sage); font-size: 12px; font-weight: 700; }

      .ela-summary { text-align: center; padding: 30px 10px; }
      .ela-summary .num { font-family: 'Fraunces', serif; font-size: 54px; }

      .ela-banner {
        background: var(--gold-light); border: 1px solid var(--gold);
        border-radius: 16px; padding: 18px; margin: 18px 0; text-align: center;
      }
      .ela-banner p { margin: 0 0 12px 0; font-weight: 600; color: #6B4A0C; }
      .ela-bannerbtns { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }

      .ela-field {
        width: 100%; padding: 13px 14px; border-radius: 12px; border: 1.5px solid var(--mist);
        font-family: 'Heebo', sans-serif; font-size: 15px; background: var(--card); color: var(--ink);
      }
      .ela-fieldrow { display: flex; gap: 8px; align-items: center; }
      .ela-loadingbox { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 60px 10px; color: var(--muted); }
      .ela-spin { animation: ela-spin 1s linear infinite; }
      @keyframes ela-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .ela-errbox { background: var(--rose-light); color: var(--rose); border-radius: 12px; padding: 12px 14px; font-size: 13.5px; margin-bottom: 14px; }
      .ela-note { color: var(--muted); font-size: 13px; margin-top: 8px; line-height: 1.6; }
    `}</style>
  );
}

/* ============================== HOME VIEW ============================== */

function Home({ state, setLevel, dueCount, newCount, onGo }) {
  const doneToday = state.stats.lastActiveDate === todayStr();
  const aiOn = !!state.settings.apiKey;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 className="ela-h1">{greeting()}</h1>
          <p className="ela-sub">{doneToday ? "כבר תרגלת היום, כל הכבוד!" : "מוכנים לתרגול של היום?"}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="ela-streak"><Flame size={16} />{state.stats.streak}</div>
          {aiOn && <div className="ela-aibadge"><Sparkles size={13} />AI פעיל</div>}
        </div>
      </div>

      <div className="ela-chiprow">
        {[{ id: "all", label: "כל הרמות" }, ...LEVELS].map((lv) => (
          <button key={lv.id} className={"ela-chip" + (state.settings.level === lv.id ? " active" : "")} onClick={() => setLevel(lv.id)}>
            {lv.label}
          </button>
        ))}
      </div>

      <div className="ela-cardrow">
        <div className="ela-bigcard" onClick={() => onGo("vocab")}>
          <div className="icon-wrap" style={{ background: "var(--sage-light)", color: "var(--sage)" }}><BookOpen size={22} /></div>
          <h3>אוצר מילים</h3>
          <p>
            {aiOn
              ? "8 מילים חדשות שנוצרות במיוחד בשבילך בכל תרגול"
              : dueCount > 0
              ? `${dueCount} מילים ממתינות לחזרה`
              : newCount > 0
              ? `${Math.min(8, newCount)} מילים חדשות מוכנות ללמידה`
              : "סיימת את כל המילים הזמינות ברמה הזו"}
          </p>
        </div>
        <div className="ela-bigcard" onClick={() => onGo("convo")}>
          <div className="icon-wrap" style={{ background: "var(--gold-light)", color: "#8A6412" }}><MessageCircle size={22} /></div>
          <h3>שיחה</h3>
          <p>{aiOn ? "דיאלוגים קבועים, ואפשרות ליצור שיחה חדשה עם AI לפי נושא" : "תרגלו דיאלוגים אמיתיים עם הגייה מוקראת, לפי מצבים יומיומיים."}</p>
        </div>
      </div>

      <div style={{ marginTop: 26, display: "flex", gap: 20, color: "var(--muted)", fontSize: 13.5 }}>
        <span><b style={{ color: "var(--ink)" }}>{state.stats.sessionsCompleted}</b> תרגולים הושלמו</span>
        <span><b style={{ color: "var(--ink)" }}>{state.stats.xp}</b> נק' ניסיון</span>
      </div>
    </div>
  );
}

/* ============================== LEVEL SUGGESTION BANNER ============================== */

function LevelBanner({ suggestion, onAccept, onDismiss }) {
  if (!suggestion) return null;
  const up = suggestion.type === "up";
  return (
    <div className="ela-banner">
      <p>
        {up ? <TrendingUp size={16} style={{ verticalAlign: "middle" }} /> : <TrendingDown size={16} style={{ verticalAlign: "middle" }} />}{" "}
        {up
          ? `ביצועים מצוינים ברמת ${levelLabel(suggestion.from)}! רוצה לעבור לרמת ${levelLabel(suggestion.to)}?`
          : `נראה שרמת ${levelLabel(suggestion.from)} מאתגרת כרגע. לרדת לרמת ${levelLabel(suggestion.to)} ולהתחזק?`}
      </p>
      <div className="ela-bannerbtns">
        <button className="ela-btn" onClick={onAccept}>{up ? `כן, עברו לרמת ${levelLabel(suggestion.to)}` : `כן, ירדו לרמת ${levelLabel(suggestion.to)}`}</button>
        <button className="ela-btn secondary" onClick={onDismiss}>השאירו אותי ברמה הנוכחית</button>
      </div>
    </div>
  );
}

/* ============================== VOCAB VIEW ============================== */

function buildSession(state, levelFilter) {
  const pool = VOCAB.filter((w) => levelFilter === "all" || w.level === levelFilter);
  const due = pool.filter((w) => state.words[w.id] && isDue(state.words[w.id].due));
  const fresh = pool.filter((w) => !state.words[w.id]);
  const picked = [...shuffle(due), ...shuffle(fresh)].slice(0, 8);
  if (picked.length === 0) {
    return shuffle(pool.filter((w) => state.words[w.id])).slice(0, 8);
  }
  return picked;
}

function makeOptions(word, pool) {
  const candidates = pool.filter((w) => w.id !== word.id);
  const distractors = shuffle(candidates).slice(0, 3);
  return shuffle([word, ...distractors]);
}

function VocabSession({ state, apiKey, onFinish, onBack }) {
  const levelFilter = state.settings.level;
  const useAI = !!apiKey;
  const [words, setWords] = useState(() => (useAI ? [] : buildSession(state, levelFilter)));
  const [loading, setLoading] = useState(useAI);
  const [error, setError] = useState(null);
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState("flip");
  const [flipped, setFlipped] = useState(false);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!useAI) return;
    let cancelled = false;
    (async () => {
      try {
        const effectiveLevel = levelFilter === "all" ? shuffle(LEVEL_ORDER)[0] : levelFilter;
        const generated = await generateAIWords(apiKey, effectiveLevel, state.aiSeenWords.slice(-40));
        if (!cancelled) setWords(generated);
      } catch (e) {
        if (!cancelled) setError(e.message || "שגיאה ביצירת התרגול");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (words[0]) setOptions(makeOptions(words[0], useAI ? words : VOCAB.filter((w) => levelFilter === "all" || w.level === words[0].level)));
  }, [words]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <div>
        <BackRow onBack={onBack} />
        <div className="ela-loadingbox">
          <Loader2 size={30} className="ela-spin" />
          <p>ה-AI יוצר לך תרגול חדש...</p>
        </div>
      </div>
    );
  }

  if (error || words.length === 0) {
    const fallback = buildSession(state, levelFilter);
    return (
      <div>
        <BackRow onBack={onBack} />
        {error && <div className="ela-errbox">{error} — נטען תרגול מהמאגר המקומי במקום.</div>}
        {fallback.length > 0 ? (
          <VocabSession state={state} apiKey={null} onFinish={onFinish} onBack={onBack} />
        ) : (
          <div className="ela-summary">
            <p>אין עדיין מילים זמינות לתרגול ברמה זו.</p>
            <button className="ela-btn" onClick={onBack}>חזרה</button>
          </div>
        )}
      </div>
    );
  }

  const word = words[idx];
  const pool = useAI ? words : VOCAB.filter((w) => levelFilter === "all" || w.level === word.level);

  function toQuiz() {
    setOptions(makeOptions(word, pool));
    setSelected(null);
    setPhase("quiz");
  }

  function choose(opt) {
    if (selected) return;
    setSelected(opt.id);
    const correct = opt.id === word.id;
    const nextResults = [...results, { id: word.id, en: word.en, correct }];
    setResults(nextResults);
    setTimeout(() => {
      if (idx + 1 < words.length) {
        setIdx(idx + 1);
        setFlipped(false);
        setPhase("flip");
      } else {
        onFinish(nextResults, useAI);
      }
    }, 850);
  }

  return (
    <div>
      <BackRow onBack={onBack} label="עצירת תרגול" />
      <div className="ela-progressbar"><div style={{ width: `${(idx / words.length) * 100}%` }} /></div>

      {phase === "flip" && (
        <div className="ela-flashcard" onClick={() => setFlipped((f) => !f)}>
          {!flipped ? (
            <>
              <div className="ela-en word">{word.en}</div>
              <div className="hint">הקישו כדי לראות את התרגום</div>
            </>
          ) : (
            <>
              <div className="translation">{word.he}</div>
              {word.ex && <div className="ela-en example">{word.ex}</div>}
              {word.exHe && <div className="exampleHe">{word.exHe}</div>}
            </>
          )}
        </div>
      )}

      {phase === "flip" && (
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 18 }}>
          <button className="ela-iconbtn" onClick={(e) => { e.stopPropagation(); speak(word.en); }} aria-label="השמעת הגייה"><Volume2 size={18} /></button>
          <button className="ela-btn" onClick={toQuiz}>המשך לתרגיל</button>
        </div>
      )}

      {phase === "quiz" && (
        <div>
          <p className="ela-sub" style={{ marginBottom: 14 }}>
            מה התרגום של <span className="ela-en" style={{ fontWeight: 700, color: "var(--ink)" }}>{word.en}</span>?
          </p>
          {options.map((opt) => {
            let cls = "ela-optbtn";
            if (selected) {
              if (opt.id === word.id) cls += " correct";
              else if (opt.id === selected) cls += " wrong";
            }
            return (
              <button key={opt.id} className={cls} disabled={!!selected} onClick={() => choose(opt)}>{opt.he}</button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function BackRow({ onBack, label = "חזרה" }) {
  return (
    <div className="ela-backrow" onClick={onBack}>
      <ChevronRight size={16} />
      {label}
    </div>
  );
}

function VocabSummary({ results, suggestion, onAcceptLevel, onDismissLevel, onDone }) {
  const correct = results.filter((r) => r.correct).length;
  return (
    <div className="ela-summary">
      <Sparkles size={30} color="var(--gold)" />
      <div className="num">{correct}/{results.length}</div>
      <p className="ela-sub">תשובות נכונות בתרגול הזה</p>
      <LevelBanner suggestion={suggestion} onAccept={onAcceptLevel} onDismiss={onDismissLevel} />
      <button className="ela-btn" onClick={onDone}>סיום</button>
    </div>
  );
}

/* ============================== CONVERSATION VIEW ============================== */

function ConvoList({ state, onOpen, onOpenAI, onBack }) {
  const aiOn = !!state.settings.apiKey;
  const [pickingTopic, setPickingTopic] = useState(false);

  return (
    <div>
      <h1 className="ela-h1">שיחה</h1>
      <p className="ela-sub">בחרו מצב לתרגול, או צרו שיחה חדשה עם AI. הקישו על כל שורה כדי לשמוע הגייה.</p>

      {aiOn && (
        <div style={{ marginBottom: 18 }}>
          {!pickingTopic ? (
            <button className="ela-btn" onClick={() => setPickingTopic(true)}><Wand2 size={16} />צרו שיחה חדשה עם AI</button>
          ) : (
            <div>
              <p className="ela-sub" style={{ marginBottom: 10 }}>באיזה נושא?</p>
              <div className="ela-chiprow">
                <button className="ela-chip" onClick={() => onOpenAI(shuffle(TOPICS)[0])}>הפתיעו אותי</button>
                {TOPICS.map((t) => (
                  <button key={t} className="ela-chip" onClick={() => onOpenAI(t)}>{t}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {DIALOGUES.map((d) => (
        <div className="ela-scenecard" key={d.id} onClick={() => onOpen(d)}>
          <div className="icon-wrap"><d.Icon size={20} /></div>
          <div style={{ flex: 1 }}>
            <h4>{d.title}</h4>
            <span style={{ color: "var(--muted)", fontSize: 12.5 }}>{levelLabel(d.level)}</span>
          </div>
          {state.convosDone[d.id] && <span className="done">הושלם ✓</span>}
        </div>
      ))}
    </div>
  );
}

function ConvoPlayer({ dialogue, onBack, onComplete, done }) {
  const [shown, setShown] = useState(1);
  const allShown = shown >= dialogue.lines.length;

  return (
    <div>
      <BackRow onBack={onBack} />
      <h1 className="ela-h1">{dialogue.title}</h1>
      <p className="ela-sub">הקישו על כפתור ההשמעה כדי לשמוע כל משפט, ונסו לחזור עליו בקול.</p>

      {dialogue.lines.slice(0, shown).map((line, i) => (
        <div className={"ela-bubble" + (line.s === "B" ? " speakerB" : "")} key={i}>
          <button className="ela-iconbtn" onClick={() => speak(line.en)} aria-label="השמעה"><Volume2 size={16} /></button>
          <div className="txt">
            <span className="ela-tag">{line.s === "A" ? "דובר א" : "דובר ב"}</span>
            <div className="ela-en en">{line.en}</div>
            <div className="he">{line.he}</div>
          </div>
        </div>
      ))}

      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        {!allShown ? (
          <button className="ela-btn secondary" onClick={() => setShown((s) => s + 1)}>השורה הבאה</button>
        ) : (
          <button className="ela-btn" onClick={onComplete}>{done ? "לסיים שוב" : "סיימתי לתרגל"}</button>
        )}
      </div>
    </div>
  );
}

/* ============================== SETTINGS VIEW ============================== */

function Settings({ state, onSave }) {
  const [value, setValue] = useState(state.settings.apiKey || "");
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState(null); // { ok: bool, msg }
  const [checking, setChecking] = useState(false);

  async function testKey(key) {
    setChecking(true);
    setStatus(null);
    try {
      await callGemini(key, 'החזר אך ורק את המחרוזת הבאה כטקסט JSON: {"ok": true}');
      setStatus({ ok: true, msg: "המפתח תקין! ה-AI מוכן לפעולה." });
    } catch (e) {
      setStatus({ ok: false, msg: "לא הצלחנו להתחבר עם המפתח הזה: " + (e.message || "") });
    } finally {
      setChecking(false);
    }
  }

  return (
    <div>
      <h1 className="ela-h1">הגדרות</h1>
      <p className="ela-sub">חברו מפתח Gemini API כדי לאפשר יצירת מילים ושיחות חדשות באמצעות AI.</p>

      <div className="ela-fieldrow">
        <input
          className="ela-field"
          type={show ? "text" : "password"}
          placeholder="הדביקו כאן את מפתח ה-API"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          dir="ltr"
        />
        <button className="ela-iconbtn" onClick={() => setShow((s) => !s)} aria-label="הצג/הסתר">
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
        <button className="ela-btn" disabled={!value.trim()} onClick={() => onSave(value.trim())}>שמירת מפתח</button>
        <button className="ela-btn secondary" disabled={!value.trim() || checking} onClick={() => testKey(value.trim())}>
          {checking ? "בודק..." : "בדיקת חיבור"}
        </button>
        {state.settings.apiKey && (
          <button className="ela-btn secondary" onClick={() => { setValue(""); onSave(""); }}>הסרת מפתח</button>
        )}
      </div>

      {status && <div className={status.ok ? "ela-note" : "ela-errbox"} style={{ marginTop: 14 }}>{status.msg}</div>}

      <p className="ela-note">
        המפתח נשמר רק בדפדפן הזה (localStorage) ונשלח ישירות מהדפדפן ל-Google לצורך יצירת התרגילים — הוא לא עובר דרך שום שרת אחר.
        אפשר ליצור מפתח בחינם באתר Google AI Studio.
      </p>
    </div>
  );
}

/* ============================== ONBOARDING ============================== */

function Onboarding({ onFinish }) {
  return (
    <div style={{ padding: "40px 6px", textAlign: "center" }}>
      <Sparkles size={30} color="var(--gold)" />
      <h1 className="ela-h1" style={{ marginTop: 14 }}>ברוכים הבאים ללמידת אנגלית</h1>
      <p className="ela-sub">תרגול קצר ויומיומי של מילים ושיחות — עובד גם בנייד וגם במחשב.</p>
      <p className="ela-sub" style={{ marginTop: -10 }}>באיזו רמה תרצו להתחיל?</p>
      <div className="ela-chiprow" style={{ justifyContent: "center" }}>
        {[{ id: "all", label: "לא בטוח, התחילו מהכל" }, ...LEVELS].map((lv) => (
          <button key={lv.id} className="ela-chip" onClick={() => onFinish(lv.id)}>{lv.label}</button>
        ))}
      </div>
    </div>
  );
}

/* ============================== APP ============================== */

export default function App() {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("home");
  const [convoOpen, setConvoOpen] = useState(null);
  const [convoLoading, setConvoLoading] = useState(false);
  const [convoError, setConvoError] = useState(null);
  const [vocabPhase, setVocabPhase] = useState("session");
  const [lastResults, setLastResults] = useState([]);
  const [levelSuggestion, setLevelSuggestion] = useState(null);

  useEffect(() => {
    (async () => {
      const loaded = await loadState();
      setState(loaded || defaultState());
      setLoading(false);
    })();
  }, []);

  const persist = useCallback((next) => {
    setState(next);
    saveState(next);
  }, []);

  if (loading || !state) {
    return (
      <div className="ela-root">
        <GlobalStyle />
        <div style={{ padding: 40, textAlign: "center", color: "var(--muted)" }}>טוען...</div>
      </div>
    );
  }

  if (!state.onboarded) {
    return (
      <div className="ela-root">
        <GlobalStyle />
        <Onboarding onFinish={(level) => persist({ ...state, onboarded: true, settings: { ...state.settings, level } })} />
      </div>
    );
  }

  const levelFilter = state.settings.level;
  const pool = VOCAB.filter((w) => levelFilter === "all" || w.level === levelFilter);
  const dueCount = pool.filter((w) => state.words[w.id] && isDue(state.words[w.id].due)).length;
  const newCount = pool.filter((w) => !state.words[w.id]).length;

  function setLevel(level) {
    persist({ ...state, settings: { ...state.settings, level } });
  }

  function saveApiKey(key) {
    persist({ ...state, settings: { ...state.settings, apiKey: key } });
  }

  function finishVocabSession(results, wasAI) {
    let words = { ...state.words };
    let aiSeenWords = state.aiSeenWords;
    if (wasAI) {
      const newEnglish = results.map((r) => r.en).filter(Boolean);
      aiSeenWords = [...aiSeenWords, ...newEnglish].slice(-60);
    } else {
      results.forEach(({ id, correct }) => {
        const prev = words[id] || { box: 0, due: todayStr() };
        const box = correct ? Math.min(prev.box + 1, BOX_INTERVALS.length - 1) : 1;
        words[id] = { box, due: addDays(todayStr(), correct ? BOX_INTERVALS[box] : 0) };
      });
    }
    const correctCount = results.filter((r) => r.correct).length;
    const accuracy = results.length ? correctCount / results.length : 0;
    let stats = touchStreak({
      ...state.stats,
      xp: state.stats.xp + correctCount * 10,
      sessionsCompleted: state.stats.sessionsCompleted + 1,
    });
    const { stats: newStats, suggestion } = updateLevelStats(stats, levelFilter, accuracy);
    stats = newStats;
    persist({ ...state, words, aiSeenWords, stats });
    setLastResults(results);
    setLevelSuggestion(suggestion);
    setVocabPhase("summary");
  }

  function acceptLevelSuggestion() {
    if (levelSuggestion) setLevel(levelSuggestion.to);
    setLevelSuggestion(null);
  }

  function completeConvo(id, persistDone = true) {
    const convosDone = persistDone ? { ...state.convosDone, [id]: true } : state.convosDone;
    const stats = touchStreak({ ...state.stats, xp: state.stats.xp + 15, sessionsCompleted: state.stats.sessionsCompleted + 1 });
    persist({ ...state, convosDone, stats });
  }

  async function openAIConvo(topic) {
    setConvoError(null);
    setConvoLoading(true);
    try {
      const effectiveLevel = levelFilter === "all" ? "intermediate" : levelFilter;
      const dlg = await generateAIDialogue(state.settings.apiKey, effectiveLevel, topic);
      setConvoOpen(dlg);
    } catch (e) {
      setConvoError(e.message || "שגיאה ביצירת השיחה");
    } finally {
      setConvoLoading(false);
    }
  }

  function goTab(next) {
    setTab(next);
    setVocabPhase("session");
    setConvoOpen(null);
    setConvoError(null);
    setLevelSuggestion(null);
  }

  const navItems = [
    { id: "home", label: "בית", Icon: HomeIcon },
    { id: "vocab", label: "מילים", Icon: BookOpen },
    { id: "convo", label: "שיחה", Icon: MessageCircle },
    { id: "settings", label: "הגדרות", Icon: SettingsIcon },
  ];

  return (
    <div className="ela-root">
      <GlobalStyle />
      <div className="ela-shell">
        <nav className="ela-nav-desktop">
          <div style={{ fontFamily: "Fraunces, serif", fontSize: 20, padding: "4px 12px 18px 12px" }}>
            Learn<span style={{ color: "var(--sage)" }}>English</span>
          </div>
          {navItems.map(({ id, label, Icon }) => (
            <button key={id} className={"ela-navbtn" + (tab === id ? " active" : "")} onClick={() => goTab(id)}>
              <Icon size={18} />{label}
            </button>
          ))}
        </nav>

        <main className="ela-main">
          {tab === "home" && <Home state={state} setLevel={setLevel} dueCount={dueCount} newCount={newCount} onGo={goTab} />}

          {tab === "vocab" && vocabPhase === "session" && (
            <VocabSession
              key={levelFilter + dueCount + state.settings.apiKey}
              state={state}
              apiKey={state.settings.apiKey || null}
              onFinish={finishVocabSession}
              onBack={() => goTab("home")}
            />
          )}
          {tab === "vocab" && vocabPhase === "summary" && (
            <VocabSummary
              results={lastResults}
              suggestion={levelSuggestion}
              onAcceptLevel={acceptLevelSuggestion}
              onDismissLevel={() => setLevelSuggestion(null)}
              onDone={() => goTab("home")}
            />
          )}

          {tab === "convo" && !convoOpen && !convoLoading && (
            <ConvoList state={state} onOpen={setConvoOpen} onOpenAI={openAIConvo} onBack={() => goTab("home")} />
          )}
          {tab === "convo" && convoLoading && (
            <div>
              <BackRow onBack={() => goTab("home")} />
              <div className="ela-loadingbox"><Loader2 size={30} className="ela-spin" /><p>ה-AI כותב שיחה חדשה...</p></div>
            </div>
          )}
          {tab === "convo" && convoError && !convoLoading && (
            <div>
              <BackRow onBack={() => setConvoError(null)} />
              <div className="ela-errbox">{convoError}</div>
            </div>
          )}
          {tab === "convo" && convoOpen && (
            <ConvoPlayer
              dialogue={convoOpen}
              done={!!state.convosDone[convoOpen.id]}
              onBack={() => setConvoOpen(null)}
              onComplete={() => {
                completeConvo(convoOpen.id, !convoOpen.isAI);
                setConvoOpen(null);
              }}
            />
          )}

          {tab === "settings" && <Settings state={state} onSave={saveApiKey} />}
        </main>
      </div>

      <div className="ela-nav-mobile">
        {navItems.map(({ id, label, Icon }) => (
          <button key={id} className={tab === id ? "active" : ""} onClick={() => goTab(id)}>
            <Icon size={20} />{label}
          </button>
        ))}
      </div>
    </div>
  );
}

