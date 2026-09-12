/* =====================================================
   INDIA LIVE CLOCK + FESTIVAL CALENDAR
   JAVASCRIPT ONLY

   Important:
   Indian time is always calculated using:

       Asia/Kolkata

   The user's computer timezone is NOT used for
   displaying the clock.
   ===================================================== */


/* =====================================================
   CONSTANTS
   ===================================================== */

const INDIA_TIME_ZONE = "Asia/Kolkata";


/* =====================================================
   MONTH AND DAY NAMES
   ===================================================== */

const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];


const WEEKDAY_NAMES = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];


/* =====================================================
   FESTIVAL DATA

   Structure:

   year
      month
         date
            festival objects

   Date format:
   YYYY-MM-DD

   Festival dates that move from year to year are
   stored separately for each year.

   Islamic dates are approximate because they can
   depend on lunar observation.
   ===================================================== */

const festivalData = {

    /* =================================================
       2025
       ================================================= */

    "2025-01-13": [
        {
            name: "Lohri",
            type: "Other",
            description:
                "A popular winter festival celebrated especially in Punjab and northern India."
        }
    ],

    "2025-01-14": [
        {
            name: "Makar Sankranti",
            type: "Hindu",
            description:
                "A major solar festival marking the Sun's transition into Makara."
        },
        {
            name: "Pongal",
            type: "Hindu",
            description:
                "A harvest festival celebrated mainly in Tamil Nadu."
        }
    ],

    "2025-01-26": [
        {
            name: "Republic Day",
            type: "National",
            description:
                "India celebrates the adoption of its Constitution on 26 January 1950."
        }
    ],

    "2025-02-26": [
        {
            name: "Maha Shivaratri",
            type: "Hindu",
            description:
                "A major Hindu festival dedicated to Lord Shiva."
        }
    ],

    "2025-03-14": [
        {
            name: "Holi",
            type: "Hindu",
            description:
                "The festival of colours, celebrating joy, spring and the triumph of good over evil."
        }
    ],

    "2025-03-31": [
        {
            name: "Eid al-Fitr",
            type: "Muslim",
            description:
                "Festival marking the end of Ramadan. The date can vary with lunar observation."
        }
    ],

    "2025-04-06": [
        {
            name: "Rama Navami",
            type: "Hindu",
            description:
                "Celebrates the birth of Lord Rama."
        }
    ],

    "2025-04-10": [
        {
            name: "Mahavir Jayanti",
            type: "Other",
            description:
                "Jain festival commemorating the birth of Lord Mahavira."
        }
    ],

    "2025-04-13": [
        {
            name: "Baisakhi",
            type: "Sikh",
            description:
                "Important Sikh and harvest festival, especially significant in Punjab."
        }
    ],

    "2025-05-12": [
        {
            name: "Buddha Purnima",
            type: "Other",
            description:
                "A Buddhist festival associated with the birth, enlightenment and passing of Gautama Buddha."
        }
    ],

    "2025-06-07": [
        {
            name: "Eid al-Adha / Bakrid",
            type: "Muslim",
            description:
                "An important Islamic festival commemorating the spirit of sacrifice."
        }
    ],

    "2025-07-06": [
        {
            name: "Muharram / Ashura",
            type: "Muslim",
            description:
                "An important day in the Islamic calendar. Observances vary among Muslim communities."
        }
    ],

    "2025-08-09": [
        {
            name: "Raksha Bandhan",
            type: "Hindu",
            description:
                "A festival celebrating the bond between brothers and sisters."
        }
    ],

    "2025-08-15": [
        {
            name: "Independence Day",
            type: "National",
            description:
                "India celebrates independence from British rule on 15 August 1947."
        }
    ],

    "2025-08-16": [
        {
            name: "Janmashtami",
            type: "Hindu",
            description:
                "Celebrates the birth of Lord Krishna."
        }
    ],

    "2025-08-27": [
        {
            name: "Ganesh Chaturthi",
            type: "Hindu",
            description:
                "Celebrates the birth of Lord Ganesha."
        }
    ],

    "2025-09-05": [
        {
            name: "Onam",
            type: "Other",
            description:
                "Major harvest festival of Kerala."
        },
        {
            name: "Milad un-Nabi",
            type: "Muslim",
            description:
                "Observance marking the birth of Prophet Muhammad. Date can vary with lunar observation."
        }
    ],

    "2025-09-22": [
        {
            name: "Sharad Navratri Begins",
            type: "Hindu",
            description:
                "Beginning of the nine-night Navratri festival dedicated to the worship of Goddess Durga."
        }
    ],

    "2025-10-02": [
        {
            name: "Gandhi Jayanti",
            type: "National",
            description:
                "Birth anniversary of Mahatma Gandhi."
        },
        {
            name: "Dussehra",
            type: "Hindu",
            description:
                "Festival symbolizing the victory of good over evil."
        }
    ],

    "2025-10-20": [
        {
            name: "Diwali",
            type: "Hindu",
            description:
                "The festival of lights, celebrated with lamps, prayers and family gatherings."
        }
    ],

    "2025-11-05": [
        {
            name: "Guru Nanak Jayanti",
            type: "Sikh",
            description:
                "Celebrates the birth anniversary of Guru Nanak Dev Ji, the first Sikh Guru."
        }
    ],

    "2025-12-25": [
        {
            name: "Christmas",
            type: "Christian",
            description:
                "Christian festival celebrating the birth of Jesus Christ."
        }
    ],


    /* =================================================
       2026
       ================================================= */

    "2026-01-01": [
        {
            name: "New Year's Day",
            type: "Other",
            description:
                "The first day of the Gregorian calendar year."
        }
    ],

    "2026-01-13": [
        {
            name: "Lohri",
            type: "Other",
            description:
                "A popular winter festival celebrated especially in Punjab and northern India."
        }
    ],

    "2026-01-14": [
        {
            name: "Makar Sankranti",
            type: "Hindu",
            description:
                "A major solar festival marking the Sun's transition into Makara."
        },
        {
            name: "Pongal",
            type: "Hindu",
            description:
                "A harvest festival celebrated mainly in Tamil Nadu."
        }
    ],

    "2026-01-26": [
        {
            name: "Republic Day",
            type: "National",
            description:
                "India celebrates the adoption of its Constitution on 26 January 1950."
        }
    ],

    "2026-02-15": [
        {
            name: "Maha Shivaratri",
            type: "Hindu",
            description:
                "A major Hindu festival dedicated to Lord Shiva."
        }
    ],

    "2026-03-04": [
        {
            name: "Holi",
            type: "Hindu",
            description:
                "The festival of colours, celebrating joy, spring and the triumph of good over evil."
        }
    ],

    "2026-03-21": [
        {
            name: "Eid al-Fitr",
            type: "Muslim",
            description:
                "Festival marking the end of Ramadan. The date can vary with lunar observation."
        }
    ],

    "2026-03-26": [
        {
            name: "Rama Navami",
            type: "Hindu",
            description:
                "Celebrates the birth of Lord Rama."
        }
    ],

    "2026-03-31": [
        {
            name: "Mahavir Jayanti",
            type: "Other",
            description:
                "Jain festival commemorating the birth of Lord Mahavira."
        }
    ],

    "2026-04-03": [
        {
            name: "Good Friday",
            type: "Christian",
            description:
                "Christian observance commemorating the crucifixion of Jesus Christ."
        }
    ],

    "2026-04-05": [
        {
            name: "Easter",
            type: "Christian",
            description:
                "Christian festival celebrating the resurrection of Jesus Christ."
        }
    ],

    "2026-04-14": [
        {
            name: "Baisakhi",
            type: "Sikh",
            description:
                "Important Sikh and harvest festival, especially significant in Punjab."
        },
        {
            name: "Ambedkar Jayanti",
            type: "National",
            description:
                "Birth anniversary of Dr. B. R. Ambedkar."
        }
    ],

    "2026-05-01": [
        {
            name: "Buddha Purnima",
            type: "Other",
            description:
                "A Buddhist festival associated with Gautama Buddha."
        }
    ],

    "2026-05-28": [
        {
            name: "Eid al-Adha / Bakrid",
            type: "Muslim",
            description:
                "An important Islamic festival commemorating the spirit of sacrifice."
        }
    ],

    "2026-06-26": [
        {
            name: "Muharram / Ashura",
            type: "Muslim",
            description:
                "An important day in the Islamic calendar. Observances vary among Muslim communities."
        }
    ],

    "2026-07-16": [
        {
            name: "Rath Yatra",
            type: "Hindu",
            description:
                "A major chariot festival associated especially with Lord Jagannath."
        }
    ],

    "2026-08-15": [
        {
            name: "Independence Day",
            type: "National",
            description:
                "India celebrates independence from British rule on 15 August 1947."
        }
    ],

    "2026-08-26": [
        {
            name: "Onam",
            type: "Other",
            description:
                "Major harvest festival of Kerala."
        },
        {
            name: "Milad un-Nabi",
            type: "Muslim",
            description:
                "Observance marking the birth of Prophet Muhammad. Date can vary with lunar observation."
        }
    ],

    "2026-08-28": [
        {
            name: "Raksha Bandhan",
            type: "Hindu",
            description:
                "A festival celebrating the bond between brothers and sisters."
        }
    ],

    "2026-09-04": [
        {
            name: "Janmashtami",
            type: "Hindu",
            description:
                "Celebrates the birth of Lord Krishna."
        }
    ],

    "2026-09-14": [
        {
            name: "Ganesh Chaturthi",
            type: "Hindu",
            description:
                "Celebrates the birth of Lord Ganesha."
        }
    ],

    "2026-10-02": [
        {
            name: "Gandhi Jayanti",
            type: "National",
            description:
                "Birth anniversary of Mahatma Gandhi."
        }
    ],

    "2026-10-11": [
        {
            name: "Sharad Navratri Begins",
            type: "Hindu",
            description:
                "Beginning of the nine-night Navratri festival."
        }
    ],

    "2026-10-20": [
        {
            name: "Dussehra",
            type: "Hindu",
            description:
                "Festival symbolizing the victory of good over evil."
        }
    ],

    "2026-11-08": [
        {
            name: "Diwali",
            type: "Hindu",
            description:
                "The festival of lights, celebrated with lamps, prayers and family gatherings."
        }
    ],

    "2026-11-24": [
        {
            name: "Guru Nanak Jayanti",
            type: "Sikh",
            description:
                "Celebrates the birth anniversary of Guru Nanak Dev Ji."
        }
    ],

    "2026-12-25": [
        {
            name: "Christmas",
            type: "Christian",
            description:
                "Christian festival celebrating the birth of Jesus Christ."
        }
    ],


    /* =================================================
       2027
       ================================================= */

    "2027-01-01": [
        {
            name: "New Year's Day",
            type: "Other",
            description:
                "The first day of the Gregorian calendar year."
        }
    ],

    "2027-01-14": [
        {
            name: "Lohri",
            type: "Other",
            description:
                "A popular winter festival celebrated especially in Punjab and northern India."
        }
    ],

    "2027-01-15": [
        {
            name: "Makar Sankranti",
            type: "Hindu",
            description:
                "A major solar festival marking the Sun's transition into Makara."
        },
        {
            name: "Pongal",
            type: "Hindu",
            description:
                "A harvest festival celebrated mainly in Tamil Nadu."
        }
    ],

    "2027-01-26": [
        {
            name: "Republic Day",
            type: "National",
            description:
                "India celebrates the adoption of its Constitution on 26 January 1950."
        }
    ],

    "2027-03-06": [
        {
            name: "Maha Shivaratri",
            type: "Hindu",
            description:
                "A major Hindu festival dedicated to Lord Shiva."
        }
    ],

    "2027-03-10": [
        {
            name: "Eid al-Fitr",
            type: "Muslim",
            description:
                "Festival marking the end of Ramadan. Islamic dates are subject to lunar observation."
        }
    ],

    "2027-03-22": [
        {
            name: "Holi",
            type: "Hindu",
            description:
                "The festival of colours, celebrating joy, spring and the triumph of good over evil."
        }
    ],

    "2027-04-14": [
        {
            name: "Baisakhi",
            type: "Sikh",
            description:
                "Important Sikh and harvest festival, especially significant in Punjab."
        },
        {
            name: "Ambedkar Jayanti",
            type: "National",
            description:
                "Birth anniversary of Dr. B. R. Ambedkar."
        }
    ],

    "2027-04-15": [
        {
            name: "Rama Navami",
            type: "Hindu",
            description:
                "Celebrates the birth of Lord Rama."
        }
    ],

    "2027-04-19": [
        {
            name: "Mahavir Jayanti",
            type: "Other",
            description:
                "Jain festival commemorating the birth of Lord Mahavira."
        }
    ],

    "2027-05-20": [
        {
            name: "Buddha Purnima",
            type: "Other",
            description:
                "A Buddhist festival associated with Gautama Buddha."
        }
    ],

    "2027-06-16": [
        {
            name: "Muharram / Ashura",
            type: "Muslim",
            description:
                "An important day in the Islamic calendar. Date may vary according to lunar observation."
        }
    ],

    "2027-06-18": [
        {
            name: "Raksha Bandhan",
            type: "Hindu",
            description:
                "A festival celebrating the bond between brothers and sisters."
        }
    ],

    "2027-06-26": [
        {
            name: "Janmashtami",
            type: "Hindu",
            description:
                "Celebrates the birth of Lord Krishna."
        }
    ],

    "2027-07-06": [
        {
            name: "Ganesh Chaturthi",
            type: "Hindu",
            description:
                "Celebrates the birth of Lord Ganesha."
        }
    ],

    "2027-08-06": [
        {
            name: "Eid al-Fitr",
            type: "Muslim",
            description:
                "Festival marking the end of Ramadan. Date is subject to lunar observation."
        }
    ],

    "2027-08-15": [
        {
            name: "Independence Day",
            type: "National",
            description:
                "India celebrates independence from British rule on 15 August 1947."
        },
        {
            name: "Milad un-Nabi",
            type: "Muslim",
            description:
                "Observance marking the birth of Prophet Muhammad."
        }
    ],

    "2027-09-12": [
        {
            name: "Onam",
            type: "Other",
            description:
                "Major harvest festival of Kerala."
        }
    ],

    "2027-10-02": [
        {
            name: "Gandhi Jayanti",
            type: "National",
            description:
                "Birth anniversary of Mahatma Gandhi."
        }
    ],

    "2027-10-09": [
        {
            name: "Dussehra",
            type: "Hindu",
            description:
                "Festival symbolizing the victory of good over evil."
        }
    ],

    "2027-10-29": [
        {
            name: "Diwali",
            type: "Hindu",
            description:
                "The festival of lights, celebrated with lamps, prayers and family gatherings."
        }
    ],

    "2027-11-14": [
        {
            name: "Guru Nanak Jayanti",
            type: "Sikh",
            description:
                "Celebrates the birth anniversary of Guru Nanak Dev Ji."
        }
    ],

    "2027-12-25": [
        {
            name: "Christmas",
            type: "Christian",
            description:
                "Christian festival celebrating the birth of Jesus Christ."
        }
    ]
};


/* =====================================================
   DOM ELEMENTS
   ===================================================== */

const digitalClock =
    document.getElementById("digitalClock");

const ampm =
    document.getElementById("ampm");

const currentDay =
    document.getElementById("currentDay");

const currentDate =
    document.getElementById("currentDate");

const currentMonth =
    document.getElementById("currentMonth");

const currentYear =
    document.getElementById("currentYear");

const fullIndianDate =
    document.getElementById("fullIndianDate");

const calendarGrid =
    document.getElementById("calendarGrid");

const calendarMonth =
    document.getElementById("calendarMonth");

const calendarYear =
    document.getElementById("calendarYear");

const selectedDateTitle =
    document.getElementById("selectedDateTitle");

const selectedDayNumber =
    document.getElementById("selectedDayNumber");

const selectedWeekday =
    document.getElementById("selectedWeekday");

const selectedFullDate =
    document.getElementById("selectedFullDate");

const festivalContent =
    document.getElementById("festivalContent");

const previousMonth =
    document.getElementById("previousMonth");

const nextMonth =
    document.getElementById("nextMonth");

const todayButton =
    document.getElementById("todayButton");


/* =====================================================
   INDIAN TIME FUNCTIONS
   ===================================================== */

/*
    This function gets the current date/time using
    Asia/Kolkata.

    Important:
    Date.now() represents the current instant.

    Intl.DateTimeFormat converts that instant into
    Indian calendar/time values.

    The user's computer timezone is NOT used.
*/

function getIndianDateParts() {

    const formatter =
        new Intl.DateTimeFormat(
            "en-IN",
            {
                timeZone: INDIA_TIME_ZONE,

                year: "numeric",
                month: "2-digit",
                day: "2-digit",

                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",

                hourCycle: "h23"
            }
        );


    const parts =
        formatter.formatToParts(new Date());


    const result = {};


    parts.forEach(part => {

        if (part.type !== "literal") {

            result[part.type] =
                Number(part.value);
        }

    });


    return result;
}


/*
    Get Indian date string:

    Example:

    2026-09-14
*/

function getIndianDateKey() {

    const parts =
        getIndianDateParts();


    return (
        parts.year +
        "-" +
        String(parts.month).padStart(2, "0") +
        "-" +
        String(parts.day).padStart(2, "0")
    );
}


/* =====================================================
   LIVE CLOCK
   ===================================================== */

function updateIndianClock() {

    /*
        First get the current instant.
        Then format it specifically for India.
    */

    const now = new Date();


    const timeFormatter =
        new Intl.DateTimeFormat(
            "en-IN",
            {
                timeZone: INDIA_TIME_ZONE,

                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",

                hour12: true
            }
        );


    const timeParts =
        timeFormatter.formatToParts(now);


    let hour = "";
    let minute = "";
    let second = "";
    let dayPeriod = "";


    timeParts.forEach(part => {

        if (part.type === "hour") {
            hour = part.value;
        }

        if (part.type === "minute") {
            minute = part.value;
        }

        if (part.type === "second") {
            second = part.value;
        }

        if (part.type === "dayPeriod") {
            dayPeriod = part.value.toUpperCase();
        }

    });


    digitalClock.textContent =
        `${hour}:${minute}:${second}`;


    ampm.textContent =
        dayPeriod;


    /*
        Get Indian date parts.
    */

    const indianParts =
        getIndianDateParts();


    currentDate.textContent =
        String(indianParts.day).padStart(2, "0");


    currentYear.textContent =
        indianParts.year;


    /*
        Get Indian weekday and month names.
    */

    const dateFormatter =
        new Intl.DateTimeFormat(
            "en-IN",
            {
                timeZone: INDIA_TIME_ZONE,

                weekday: "long",
                month: "long"
            }
        );


    const dateParts =
        dateFormatter.formatToParts(now);


    let weekday = "";
    let month = "";


    dateParts.forEach(part => {

        if (part.type === "weekday") {
            weekday = part.value;
        }

        if (part.type === "month") {
            month = part.value;
        }

    });


    currentDay.textContent =
        weekday;

    currentMonth.textContent =
        month;


    /*
        Complete Indian date.
    */

    const fullDateFormatter =
        new Intl.DateTimeFormat(
            "en-IN",
            {
                timeZone: INDIA_TIME_ZONE,

                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );


    fullIndianDate.textContent =
        fullDateFormatter.format(now) +
        " • IST";
}


/* =====================================================
   CALENDAR STATE
   ===================================================== */

let indianNow =
    getIndianDateParts();


/*
    The calendar initially opens on the current
    Indian month/year.
*/

let calendarDisplayDate =
    new Date(
        indianNow.year,
        indianNow.month - 1,
        1
    );


/*
    The selected date initially becomes today's
    Indian date.
*/

let selectedDateKey =
    getIndianDateKey();


/* =====================================================
   DATE HELPERS
   ===================================================== */


/*
    Returns:

    YYYY-MM-DD
*/

function makeDateKey(year, month, day) {

    return (
        year +
        "-" +
        String(month).padStart(2, "0") +
        "-" +
        String(day).padStart(2, "0")
    );
}


/*
    Get festival list for a date.
*/

function getFestivals(dateKey) {

    return festivalData[dateKey] || [];
}


/*
    Get number of days in a month.

    JavaScript correctly handles leap years here.

    Example:

    February 2028 -> 29
    February 2027 -> 28
*/

function getDaysInMonth(year, month) {

    return new Date(
        year,
        month + 1,
        0
    ).getDate();
}


/*
    Get weekday.

    0 = Sunday
    1 = Monday
    ...
    6 = Saturday
*/

function getFirstWeekday(year, month) {

    return new Date(
        year,
        month,
        1
    ).getDay();
}


/* =====================================================
   RENDER CALENDAR
   ===================================================== */

function renderCalendar() {

    const year =
        calendarDisplayDate.getFullYear();

    const month =
        calendarDisplayDate.getMonth();


    /*
        Update month/year heading.
    */

    calendarMonth.textContent =
        MONTH_NAMES[month];

    calendarYear.textContent =
        year;


    /*
        Clear old calendar.
    */

    calendarGrid.innerHTML = "";


    /*
        First weekday of month.
    */

    const firstDay =
        getFirstWeekday(year, month);


    /*
        Total days.
    */

    const daysInMonth =
        getDaysInMonth(year, month);


    /*
        Add empty boxes before day 1.
    */

    for (
        let i = 0;
        i < firstDay;
        i++
    ) {

        const emptyDay =
            document.createElement("div");

        emptyDay.className =
            "calendar-day empty";

        calendarGrid.appendChild(
            emptyDay
        );
    }


    /*
        Create actual dates.
    */

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const dateKey =
            makeDateKey(
                year,
                month + 1,
                day
            );


        const dayElement =
            document.createElement("div");


        dayElement.className =
            "calendar-day";


        /*
            Today's Indian date.
        */

        if (
            dateKey ===
            getIndianDateKey()
        ) {

            dayElement.classList.add(
                "today"
            );
        }


        /*
            Currently selected date.
        */

        if (
            dateKey ===
            selectedDateKey
        ) {

            dayElement.classList.add(
                "selected-date"
            );
        }


        /*
            Date number.
        */

        const numberElement =
            document.createElement("span");


        numberElement.className =
            "day-number";


        numberElement.textContent =
            day;


        dayElement.appendChild(
            numberElement
        );


        /*
            Festivals on this date.
        */

        const festivals =
            getFestivals(dateKey);


        if (festivals.length > 0) {

            const dot =
                document.createElement("div");


            dot.className =
                "calendar-festival-dot";


            dayElement.appendChild(dot);


            /*
                Show first festival name
                on larger screens.
            */

            const festivalName =
                document.createElement("span");


            festivalName.className =
                "festival-name-small";


            festivalName.textContent =
                festivals[0].name;


            dayElement.appendChild(
                festivalName
            );
        }


        /*
            Click date.
        */

        dayElement.addEventListener(
            "click",
            function () {

                selectedDateKey =
                    dateKey;

                renderCalendar();

                showSelectedDate(
                    dateKey
                );
            }
        );


        calendarGrid.appendChild(
            dayElement
        );
    }


    /*
        Fill remaining cells so the last row
        keeps a clean 7-column structure.
    */

    const totalCells =
        firstDay + daysInMonth;

    const remaining =
        (7 - (totalCells % 7)) % 7;


    for (
        let i = 0;
        i < remaining;
        i++
    ) {

        const emptyDay =
            document.createElement("div");

        emptyDay.className =
            "calendar-day empty";

        calendarGrid.appendChild(
            emptyDay
        );
    }
}


/* =====================================================
   SELECTED DATE INFORMATION
   ===================================================== */

function showSelectedDate(dateKey) {

    const parts =
        dateKey.split("-");


    const year =
        Number(parts[0]);

    const month =
        Number(parts[1]);

    const day =
        Number(parts[2]);


    /*
        JavaScript Date is used here only for calculating
        the weekday of the selected calendar date.

        It is NOT used for displaying current Indian time.
    */

    const date =
        new Date(
            year,
            month - 1,
            day
        );


    const weekday =
        WEEKDAY_NAMES[
            date.getDay()
        ];


    const monthName =
        MONTH_NAMES[
            month - 1
        ];


    /*
        Update selected date panel.
    */

    selectedDateTitle.textContent =
        `${monthName} ${year}`;


    selectedDayNumber.textContent =
        day;


    selectedWeekday.textContent =
        weekday;


    selectedFullDate.textContent =
        `${day} ${monthName} ${year}`;


    /*
        Get festivals.
    */

    const festivals =
        getFestivals(dateKey);


    /*
        No festival.
    */

    if (festivals.length === 0) {

        festivalContent.innerHTML = `

            <div class="empty-state">

                <span>🌿</span>

                <p>
                    No major festival/occasion
                    listed for this date.
                </p>

            </div>

        `;

        return;
    }


    /*
        Create festival cards.
    */

    festivalContent.innerHTML =
        "";


    festivals.forEach(
        festival => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "festival-item";


            item.innerHTML = `

                <h4>
                    ${festival.name}
                </h4>

                <div class="festival-meta">

                    <span class="festival-tag">
                        ${festival.type}
                    </span>

                    <span class="festival-date">
                        ${day} ${monthName} ${year}
                    </span>

                </div>

                <p>
                    ${festival.description}
                </p>

            `;


            festivalContent.appendChild(
                item
            );
        }
    );
}


/* =====================================================
   MONTH NAVIGATION
   ===================================================== */

previousMonth.addEventListener(
    "click",
    function () {

        calendarDisplayDate.setMonth(
            calendarDisplayDate.getMonth() - 1
        );

        renderCalendar();

        /*
            Select first day of displayed month
            after navigation.
        */

        const year =
            calendarDisplayDate.getFullYear();

        const month =
            calendarDisplayDate.getMonth() + 1;


        const firstDate =
            makeDateKey(
                year,
                month,
                1
            );


        selectedDateKey =
            firstDate;

        showSelectedDate(
            firstDate
        );
    }
);


nextMonth.addEventListener(
    "click",
    function () {

        calendarDisplayDate.setMonth(
            calendarDisplayDate.getMonth() + 1
        );

        renderCalendar();


        const year =
            calendarDisplayDate.getFullYear();

        const month =
            calendarDisplayDate.getMonth() + 1;


        const firstDate =
            makeDateKey(
                year,
                month,
                1
            );


        selectedDateKey =
            firstDate;

        showSelectedDate(
            firstDate
        );
    }
);


/* =====================================================
   TODAY BUTTON
   ===================================================== */

todayButton.addEventListener(
    "click",
    function () {

        /*
            Get TODAY again using Indian timezone.
        */

        const indianParts =
            getIndianDateParts();


        calendarDisplayDate =
            new Date(
                indianParts.year,
                indianParts.month - 1,
                1
            );


        selectedDateKey =
            makeDateKey(
                indianParts.year,
                indianParts.month,
                indianParts.day
            );


        renderCalendar();

        showSelectedDate(
            selectedDateKey
        );
    }
);


/* =====================================================
   INITIALIZE
   ===================================================== */

function initializeWebsite() {

    /*
        Start clock immediately.
    */

    updateIndianClock();


    /*
        Update clock every second.
    */

    setInterval(
        updateIndianClock,
        1000
    );


    /*
        Draw calendar.
    */

    renderCalendar();


    /*
        Show today's information.
    */

    showSelectedDate(
        selectedDateKey
    );
}


/*
    Start the website.
*/

initializeWebsite();