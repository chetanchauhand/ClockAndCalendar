/* =====================================================
   India Time & Calendar

   Needs festival-data.js loaded first (offline fallback).

   APIs
   1) Time:     worldtimeapi.org      free, no key
   2) Holidays: calendarific.com      free key, 500 calls/month
   ===================================================== */

"use strict";

/* ---------- Settings ---------- */

const CONFIG = {
    TIME_ZONE: "Asia/Kolkata",

    // Paste your Calendarific key between the quotes.
    // Leave empty to use only the built-in festival list.
    // A key in browser code can be read by anyone who opens the page.
    // For a public site, call the API from your own server instead.
    CALENDARIFIC_API_KEY: "",

    TIME_API_URL: "https://worldtimeapi.org/api/timezone/Asia/Kolkata",
    HOLIDAY_API_URL: "https://calendarific.com/api/v2/holidays",

    TIME_RESYNC_MS: 10 * 60 * 1000,
    HOLIDAY_CACHE_MS: 7 * 24 * 60 * 60 * 1000,
    REQUEST_TIMEOUT_MS: 8000,
    UPCOMING_COUNT: 4
};

const MONTHS_EN = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

const MONTHS_HI = ["जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून",
    "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"];

const WEEKDAYS_EN = ["Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"];

const WEEKDAYS_HI = ["रविवार", "सोमवार", "मंगलवार", "बुधवार",
    "गुरुवार", "शुक्रवार", "शनिवार"];

const CATEGORY_COLORS = {
    hindu: "var(--c-hindu)",
    muslim: "var(--c-muslim)",
    sikh: "var(--c-sikh)",
    christian: "var(--c-christian)",
    national: "var(--c-national)",
    other: "var(--c-other)"
};


/* ---------- Page elements ---------- */

const $ = id => document.getElementById(id);

const el = {
    digits: $("digits"),
    meridiem: $("meridiem"),
    todayHindi: $("todayHindi"),
    todayEnglish: $("todayEnglish"),
    timeStatus: $("timeStatus"),
    holidayStatus: $("holidayStatus"),

    sheet: $("sheet"),
    sheetMonth: $("sheetMonth"),
    sheetYear: $("sheetYear"),
    sheetDay: $("sheetDay"),
    sheetWeekdayEn: $("sheetWeekdayEn"),
    sheetWeekdayHi: $("sheetWeekdayHi"),
    sheetRelative: $("sheetRelative"),
    festivalContent: $("festivalContent"),

    calendarMonth: $("calendarMonth"),
    calendarYear: $("calendarYear"),
    calendarMonthHi: $("calendarMonthHi"),
    grid: $("calendarGrid"),
    prev: $("previousMonth"),
    next: $("nextMonth"),
    todayButton: $("todayButton"),

    upcomingList: $("upcomingList")
};


/* =====================================================
   Network helper
   ===================================================== */

async function fetchJSON(url) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), CONFIG.REQUEST_TIMEOUT_MS);

    try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error("HTTP " + response.status);
        return await response.json();
    } finally {
        clearTimeout(timer);
    }
}

function setStatus(node, text, state) {
    node.textContent = text;
    node.dataset.state = state;
}


/* =====================================================
   Time API
   ===================================================== */

let clockOffsetMs = 0;   // real time minus device time

function nowIST() {
    return new Date(Date.now() + clockOffsetMs);
}

async function syncTime() {
    try {
        const sentAt = Date.now();
        const data = await fetchJSON(CONFIG.TIME_API_URL);
        const receivedAt = Date.now();

        if (typeof data.unixtime !== "number") throw new Error("Bad response");

        // The API reports whole seconds, so add half a second on average,
        // and assume the reply took half the round trip to reach us.
        const serverNow = data.unixtime * 1000 + 500;
        const deviceNow = (sentAt + receivedAt) / 2;
        clockOffsetMs = serverNow - deviceNow;

        const drift = Math.round(Math.abs(clockOffsetMs) / 1000);
        setStatus(
            el.timeStatus,
            drift > 2 ? `Time synced, your device was ${drift}s off` : "Time synced with server",
            "ok"
        );
    } catch (error) {
        clockOffsetMs = 0;
        setStatus(el.timeStatus, "Using device clock, time server unreachable", "warn");
    }
}


/* =====================================================
   IST formatting
   ===================================================== */

const clockFormat = new Intl.DateTimeFormat("en-IN", {
    timeZone: CONFIG.TIME_ZONE,
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true
});

const dateFormat = new Intl.DateTimeFormat("en-IN", {
    timeZone: CONFIG.TIME_ZONE,
    year: "numeric", month: "2-digit", day: "2-digit"
});

function part(parts, type) {
    const found = parts.find(p => p.type === type);
    return found ? found.value : "";
}

function makeKey(year, month, day) {
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function parseKey(key) {
    const [year, month, day] = key.split("-").map(Number);
    return { year, month, day };
}

function todayParts() {
    const p = dateFormat.formatToParts(nowIST());
    return {
        year: Number(part(p, "year")),
        month: Number(part(p, "month")),
        day: Number(part(p, "day"))
    };
}

function todayKey() {
    const t = todayParts();
    return makeKey(t.year, t.month, t.day);
}

function weekdayOf(key) {
    const { year, month, day } = parseKey(key);
    return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
}

function daysFromToday(key) {
    const a = parseKey(todayKey());
    const b = parseKey(key);
    return Math.round(
        (Date.UTC(b.year, b.month - 1, b.day) - Date.UTC(a.year, a.month - 1, a.day)) / 86400000
    );
}

function addDays(key, n) {
    const { year, month, day } = parseKey(key);
    const d = new Date(Date.UTC(year, month - 1, day + n));
    return makeKey(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
}

function relativeText(key) {
    const n = daysFromToday(key);
    if (n === 0) return "Today";
    if (n === 1) return "Tomorrow";
    if (n === -1) return "Yesterday";
    return n > 0 ? `In ${n} days` : `${-n} days ago`;
}


/* =====================================================
   Live clock
   ===================================================== */

// Build the digit boxes once, then only change their text.
const digitNodes = [];

(function buildDigits() {
    el.digits.textContent = "";
    "00:00:00".split("").forEach(ch => {
        const span = document.createElement("span");
        span.textContent = ch;
        if (ch === ":") span.className = "colon";
        el.digits.appendChild(span);
        digitNodes.push(span);
    });
})();

let lastDayKey = "";

function tick() {
    const now = nowIST();
    const p = clockFormat.formatToParts(now);

    const text = `${part(p, "hour")}:${part(p, "minute")}:${part(p, "second")}`;
    text.split("").forEach((ch, i) => {
        if (digitNodes[i] && digitNodes[i].textContent !== ch) {
            digitNodes[i].textContent = ch;
        }
    });

    el.meridiem.textContent = part(p, "dayPeriod").toUpperCase();

    const key = todayKey();
    if (key !== lastDayKey) {
        lastDayKey = key;
        paintClockDate(key);
        renderMonth();          // moves the "today" marker at midnight
        renderUpcoming();
    }
}

function paintClockDate(key) {
    const { year, month, day } = parseKey(key);
    const wd = weekdayOf(key);

    el.todayHindi.textContent = `${WEEKDAYS_HI[wd]}, ${day} ${MONTHS_HI[month - 1]} ${year}`;
    el.todayEnglish.textContent = `${WEEKDAYS_EN[wd]}, ${day} ${MONTHS_EN[month - 1]} ${year}`;
}


/* =====================================================
   Holiday data: API, cache, fallback
   ===================================================== */

const apiFestivals = {};            // date -> [festival]
const loadedYears = new Set();
const pendingYears = new Map();

const fallbackFestivals = {};       // date -> [festival]
FALLBACK_FESTIVALS.forEach(([date, name, type, description]) => {
    (fallbackFestivals[date] = fallbackFestivals[date] || []).push({ name, type, description });
});

function categorize(name, apiTypes) {
    const n = name.toLowerCase();
    const t = (apiTypes || []).join(" ").toLowerCase();

    if (/eid|ramzan|ramadan|muharram|ashura|milad|bakrid|shab-e/.test(n)) return "Muslim";
    if (/christmas|easter|good friday|palm sunday|ash wednesday/.test(n)) return "Christian";
    if (/guru|gurpurab|baisakhi|vaisakhi|nanak|gobind|sikh/.test(n)) return "Sikh";
    if (/republic day|independence day|gandhi|ambedkar|unity day/.test(n) || t.includes("national")) return "National";
    if (/diwali|deepavali|holi|dussehra|navratri|durga|ganesh|janmashtami|krishna|rama|shivaratri|raksha|sankranti|pongal|dhanteras|bhai dooj|karva|chhath|ugadi|gudi|rath yatra|hanuman|vasant|maha/.test(n)) return "Hindu";
    return "Other";
}

function readCache(year) {
    try {
        const raw = localStorage.getItem("india_holidays_" + year);
        if (!raw) return null;
        const saved = JSON.parse(raw);
        return Date.now() - saved.savedAt < CONFIG.HOLIDAY_CACHE_MS ? saved.data : null;
    } catch (e) {
        return null;
    }
}

function writeCache(year, data) {
    try {
        localStorage.setItem("india_holidays_" + year, JSON.stringify({ savedAt: Date.now(), data }));
    } catch (e) { /* storage blocked or full: fine */ }
}

function keepYear(year, byDate) {
    Object.assign(apiFestivals, byDate);
    loadedYears.add(year);
}

function loadYear(year) {
    if (loadedYears.has(year)) return Promise.resolve();
    if (pendingYears.has(year)) return pendingYears.get(year);

    const job = (async () => {
        const cached = readCache(year);
        if (cached) {
            keepYear(year, cached);
            setStatus(el.holidayStatus, "Festivals loaded from saved copy", "ok");
            return;
        }

        if (!CONFIG.CALENDARIFIC_API_KEY) {
            setStatus(el.holidayStatus, "Built-in festival list, no API key set", "off");
            return;
        }

        try {
            setStatus(el.holidayStatus, "Loading festivals", "warn");

            const url = `${CONFIG.HOLIDAY_API_URL}?api_key=${encodeURIComponent(CONFIG.CALENDARIFIC_API_KEY)}&country=IN&year=${year}`;
            const json = await fetchJSON(url);
            const list = json && json.response && json.response.holidays;
            if (!Array.isArray(list)) throw new Error("Bad response");

            const byDate = {};
            list.forEach(h => {
                const date = String(h.date && h.date.iso).slice(0, 10);
                if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return;

                const bucket = (byDate[date] = byDate[date] || []);
                if (bucket.some(x => x.name === h.name)) return;

                bucket.push({
                    name: h.name,
                    type: categorize(h.name, h.type),
                    description: h.description || "Holiday or observance in India."
                });
            });

            writeCache(year, byDate);
            keepYear(year, byDate);
            setStatus(el.holidayStatus, "Festivals loaded from API", "ok");
        } catch (error) {
            setStatus(el.holidayStatus, "Holiday API failed, showing built-in list", "warn");
        }
    })().finally(() => pendingYears.delete(year));

    pendingYears.set(year, job);
    return job;
}

function getFestivals(key) {
    const year = Number(key.slice(0, 4));
    if (loadedYears.has(year)) return apiFestivals[key] || [];
    return fallbackFestivals[key] || [];
}

function isRedDay(key) {
    return weekdayOf(key) === 0 || getFestivals(key).some(f => f.type === "National");
}


/* =====================================================
   State
   ===================================================== */

const startParts = todayParts();

let viewYear = startParts.year;
let viewMonth = startParts.month - 1;      // 0 to 11
let selectedKey = makeKey(startParts.year, startParts.month, startParts.day);


/* =====================================================
   Month grid
   ===================================================== */

function renderMonth() {
    el.calendarMonth.textContent = MONTHS_EN[viewMonth];
    el.calendarYear.textContent = viewYear;
    el.calendarMonthHi.textContent = MONTHS_HI[viewMonth];

    el.grid.textContent = "";

    const firstWeekday = new Date(Date.UTC(viewYear, viewMonth, 1)).getUTCDay();
    const daysInMonth = new Date(Date.UTC(viewYear, viewMonth + 1, 0)).getUTCDate();
    const today = todayKey();

    for (let i = 0; i < firstWeekday; i++) {
        const blank = document.createElement("div");
        blank.className = "day blank";
        blank.setAttribute("aria-hidden", "true");
        el.grid.appendChild(blank);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const key = makeKey(viewYear, viewMonth + 1, day);
        const festivals = getFestivals(key);

        const cell = document.createElement("button");
        cell.type = "button";
        cell.className = "day";
        if (key === today) cell.classList.add("today");
        if (key === selectedKey) cell.classList.add("selected");
        if (isRedDay(key)) cell.classList.add("red");

        const num = document.createElement("span");
        num.className = "num";
        num.textContent = day;
        cell.appendChild(num);

        let label = `${day} ${MONTHS_EN[viewMonth]} ${viewYear}`;

        if (festivals.length) {
            const dots = document.createElement("div");
            dots.className = "dots";

            [...new Set(festivals.map(f => f.type.toLowerCase()))].slice(0, 3).forEach(type => {
                const dot = document.createElement("i");
                dot.className = "c-" + type;
                dots.appendChild(dot);
            });
            cell.appendChild(dots);

            const name = document.createElement("span");
            name.className = "name";
            name.textContent = festivals[0].name;
            cell.appendChild(name);

            label += ": " + festivals.map(f => f.name).join(", ");
        }

        cell.setAttribute("aria-label", label);
        cell.addEventListener("click", () => selectDate(key));
        el.grid.appendChild(cell);
    }
}


/* =====================================================
   Tear-off sheet
   ===================================================== */

function renderSheet(animate) {
    const { year, month, day } = parseKey(selectedKey);
    const wd = weekdayOf(selectedKey);

    el.sheetMonth.textContent = MONTHS_EN[month - 1];
    el.sheetYear.textContent = year;
    el.sheetDay.textContent = day;
    el.sheetDay.classList.toggle("is-red", isRedDay(selectedKey));
    el.sheetWeekdayEn.textContent = WEEKDAYS_EN[wd];
    el.sheetWeekdayHi.textContent = WEEKDAYS_HI[wd];
    el.sheetRelative.textContent = relativeText(selectedKey);

    el.festivalContent.textContent = "";
    const festivals = getFestivals(selectedKey);

    if (!festivals.length) {
        const none = document.createElement("p");
        none.className = "no-festival";
        none.textContent = "No festival or public holiday on this date.";
        el.festivalContent.appendChild(none);
    } else {
        festivals.forEach(f => {
            const box = document.createElement("div");
            box.className = "festival";
            box.style.setProperty("--cat", CATEGORY_COLORS[f.type.toLowerCase()] || CATEGORY_COLORS.other);

            const title = document.createElement("h3");
            title.textContent = f.name;

            const tag = document.createElement("span");
            tag.className = "tag";
            tag.textContent = f.type;

            const text = document.createElement("p");
            text.textContent = f.description;

            box.append(title, tag, text);
            el.festivalContent.appendChild(box);
        });
    }

    if (animate) {
        el.sheet.classList.remove("turn");
        void el.sheet.offsetWidth;          // restart the animation
        el.sheet.classList.add("turn");
    }
}


/* =====================================================
   Upcoming festivals
   ===================================================== */

function renderUpcoming() {
    el.upcomingList.textContent = "";

    const start = todayKey();
    let shown = 0;

    for (let i = 0; i < 300 && shown < CONFIG.UPCOMING_COUNT; i++) {
        const key = addDays(start, i);

        for (const f of getFestivals(key)) {
            if (shown >= CONFIG.UPCOMING_COUNT) break;

            const { year, month, day } = parseKey(key);

            const item = document.createElement("li");
            const button = document.createElement("button");
            button.type = "button";
            button.className = "upcoming-item";
            button.style.setProperty("--cat", CATEGORY_COLORS[f.type.toLowerCase()] || CATEGORY_COLORS.other);

            const name = document.createElement("strong");
            name.textContent = f.name;

            const date = document.createElement("span");
            date.textContent = `${WEEKDAYS_EN[weekdayOf(key)]}, ${day} ${MONTHS_EN[month - 1]} ${year}`;

            const when = document.createElement("span");
            when.className = "when";
            when.textContent = relativeText(key);

            button.append(name, date, when);
            button.addEventListener("click", () => {
                selectDate(key);
                el.sheet.scrollIntoView({ behavior: "smooth", block: "nearest" });
            });

            item.appendChild(button);
            el.upcomingList.appendChild(item);
            shown++;
        }
    }

    if (!shown) {
        const none = document.createElement("li");
        none.textContent = "No upcoming festivals found.";
        el.upcomingList.appendChild(none);
    }
}


/* =====================================================
   Actions
   ===================================================== */

async function showMonth(year, month) {
    viewYear = year;
    viewMonth = month;
    renderMonth();

    // If that year's API data was not loaded yet, load it and redraw.
    if (!loadedYears.has(year)) {
        await loadYear(year);
        if (viewYear === year) {
            renderMonth();
            renderSheet(false);
            renderUpcoming();
        }
    }
}

function selectDate(key) {
    selectedKey = key;
    const { year, month } = parseKey(key);

    if (year !== viewYear || month - 1 !== viewMonth) {
        showMonth(year, month - 1);
    } else {
        renderMonth();
    }
    renderSheet(true);
}

function shiftMonth(delta) {
    const d = new Date(Date.UTC(viewYear, viewMonth + delta, 1));
    const year = d.getUTCFullYear();
    const month = d.getUTCMonth();

    selectedKey = makeKey(year, month + 1, 1);
    showMonth(year, month);
    renderSheet(true);
}

el.prev.addEventListener("click", () => shiftMonth(-1));
el.next.addEventListener("click", () => shiftMonth(1));

el.todayButton.addEventListener("click", () => selectDate(todayKey()));


/* =====================================================
   Start
   ===================================================== */

async function start() {
    // Show the page immediately with the built-in data.
    tick();
    setInterval(tick, 1000);
    renderMonth();
    renderSheet(false);
    renderUpcoming();

    // Then improve it as the APIs answer. Next year is loaded too,
    // so "Coming up" works across New Year.
    const t = todayParts();
    await Promise.all([syncTime(), loadYear(t.year), loadYear(t.year + 1)]);

    tick();
    renderMonth();
    renderSheet(false);
    renderUpcoming();

    setInterval(syncTime, CONFIG.TIME_RESYNC_MS);
}

/* Scroll karne par clock chhota ho jaye */
const clockBand = document.querySelector(".clockband");

window.addEventListener("scroll", () => {
    // do alag limit rakhi hain taaki upar-neeche hone par jhatka na aaye
    if (window.scrollY > 160) {
        clockBand.classList.add("compact");
    } else if (window.scrollY < 60) {
        clockBand.classList.remove("compact");
    }
}, { passive: true });

start();