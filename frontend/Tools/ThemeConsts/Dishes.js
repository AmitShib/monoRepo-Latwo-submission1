const Dishes = [

    {
        dishName: "ארוחת בוקר גרג",
        dishImg: "",
        dishPrice: 80,
        dishDescription: "ביצים לבחירה (אומלט מוגש על עלה סיגר), ממרח עגבניות מיובשות ופסטו, קוביות פטה וזעתר, אבוקדו עם לימון כבוש, סלט טונה, גבינת שמנת, זיתים מתובלים, סלט אישי, לחם הבית, קונפיטורה, עוגייה ביתית, שתיה חמה ושתיה קרה לבחירה",

        dishCustomizes: [
            {
                customizeName: "בחרו ביצים",
                customizeOptions: ["ביצים חצי נאות - מומלץ!", "ביצים קשות"],
                isMandatory: 1,
                limitOfChoose: 4
            },
            {
                customizeName: "בחרו סלט",
                customizeOptions: ["סלט ירוק", "סלט קצוץ"],
                isMandatory: 1,
                limitOfChoose: 4
            },
            {
                customizeName: "בחרו שתייה קרה",
                customizeOptions: ["תפוזים סחוט טרי במקום", "לימונדה", "לימונענע", "מיץ גזר"],
                isMandatory: 1,
                limitOfChoose: 4
            },
            {
                customizeName: "בחרו שתייה חמה",
                customizeOptions: ["אספרסו", "אספרסו כפול", "תה"],
                isMandatory: 1,
                limitOfChoose: 4
            }
        ]
    }

];

export default Dishes;