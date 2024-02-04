import images from "../../Tools/ThemeConsts/images";




const restaurantData = [
    // {
    //   id: 1,
    //   name: "בוקר זוגי",
    //   categories: [1],
    //   price: 142,
    //   photo: images.boker_zugi2,
    //   duration: "30 - 45 min",
    //   description: "ביצים/אומלט לבחירה, ציזיקי יווני, קוביית בולגרית ושמן בזיליקום, קרם פרש ופסטו פיסטוק, גבינת שמנת, אבוקדו , סלט טונה, משוויה , סקורדליה ושקדים, סלסת עגבניות ובלסמי, קונפיטורה, מסקרפונה וקרמבל אגוז לוז, לחם הבית וסלט לבחירה. מוגש עם קפה קטן ושתייה קרה קטנה: תפוזים/גזר/אשכוליות/לימונדה *שינוי או הגדלת שתייה בתוספת תשלום * ניתן לקבל גרסה טבעונית של המנה ",
    //   dishCustomizes: [
    //     {
    //         customizeName: "בחרו ביצים",
    //         customizeOptions: ["ביצים חצי נאות - מומלץ!", "ביצים קשות"],
    //         isMandatory: 1,
    //         limitOfChoose: 2
    //     },
    //     {
    //         customizeName: "בחרו סלט",
    //         customizeOptions: ["סלט ירוק", "סלט קצוץ"],
    //         isMandatory: 1,
    //         limitOfChoose: 2
    //     },
    //     {
    //         customizeName: "בחרו שתייה קרה",
    //         customizeOptions: ["תפוזים סחוט טרי במקום", "לימונדה", "לימונענע", "מיץ גזר"],
    //         isMandatory: 1,
    //         limitOfChoose: 2
    //     },
    //     {
    //         customizeName: "בחרו שתייה חמה",
    //         customizeOptions: ["אספרסו", "אספרסו כפול", "תה"],
    //         isMandatory: 1,
    //         limitOfChoose: 2
    //     }
    // ],

    // },
    {
        id: 1,
        name: "boker zugi",
        categories: [1],
        price: 142,
        photo: images.boker_zugi2,
        duration: "30 - 45 min",
        description: "Eggs/omelet of your choice, tzisiki yoni, Bulgarian cube and basil oil, crème fraîche and pistachio pesto, cream cheese, avocado, tuna salad, mashvia, scordalia and almonds, grape and balsamic salsa, confitura, mascarpone and house moltos nut crumble, bread. Small coffee and cold drink Small: oranges/carrots/grapefruits/lemonade * Change or increase in drink for an additional fee * You can get a vegan version of the dish ",
        dishCustomizes: [
            {
                customizeName: "choose eggs",
                customizeOptions: ["semi-motile eggs", "hard boiled eggs"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "choose a salad",
                customizeOptions: ["green salad", "chopped salad"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "choose your beverage",
                customizeOptions: ["orange juice", "lemonade", "mint lemonade", "carrot juice"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "anything warm to drink?",
                customizeOptions: ["espresso", "double espresso", "tea"],
                isMandatory: 1,
                limitOfChoose: 2
            }
        ],

    },
    {
        id: 2,
        name: "בוקר יחיד",
        categories: [1],
        price: 79,
        photo: images.boker_yachid1,
        duration: "30 - 45 min",
        description: "ביצים/אומלט לבחירה, ציזיקי יווני, קוביית בולגרית ושמן בזיליקום, קרם פרש ופסטו פיסטוק, גבינת שמנת, אבוקדו , סלט טונה, משוויה , סקורדליה ושקדים, סלסת עגבניות ובלסמי, קונפיטורה, מסקרפונה וקרמבל אגוז לוז, לחם הבית וסלט לבחירה. מוגש עם קפה קטן ושתייה קרה קטנה: תפוזים/גזר/אשכוליות/לימונדה *שינוי או הגדלת שתייה בתוספת תשלום * ניתן לקבל גרסה טבעונית של המנה ",
        dishCustomizes: [
            {
                customizeName: "בחרו ביצים",
                customizeOptions: ["ביצים חצי נאות - מומלץ!", "ביצים קשות"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו סלט",
                customizeOptions: ["סלט ירוק", "סלט קצוץ"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה קרה",
                customizeOptions: ["תפוזים סחוט טרי במקום", "לימונדה", "לימונענע", "מיץ גזר"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה חמה",
                customizeOptions: ["אספרסו", "אספרסו כפול", "תה"],
                isMandatory: 1,
                limitOfChoose: 2
            }
        ],

    },

    {
        id: 3,
        name: "בורקס טורקי",
        categories: [1],
        price: 54,
        photo: images.burekas_turki,
        duration: "30 - 45 min",
        description: " בורקס במילוי גבינות, מוגש עם קרם פרש, משוויה, ביצה קשה, סלסת פלפלים, עגבניות מרוסקות ושמן זית, מלפפון חמוץ וירקות טריים ",
        dishCustomizes: [
            {
                customizeName: "בחרו ביצים",
                customizeOptions: ["ביצים חצי נאות - מומלץ!", "ביצים קשות"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו סלט",
                customizeOptions: ["סלט ירוק", "סלט קצוץ"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה קרה",
                customizeOptions: ["תפוזים סחוט טרי במקום", "לימונדה", "לימונענע", "מיץ גזר"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה חמה",
                customizeOptions: ["אספרסו", "אספרסו כפול", "תה"],
                isMandatory: 1,
                limitOfChoose: 2
            }
        ],

    },
    {
        id: 4,
        name: "בריוש צרפתי",
        categories: [1],
        price: 62,
        photo: images.tsarfati_patuach,
        duration: "30 - 45 min",
        description: "בריוש, חמאת כמהין, רוטב אלפרדו פטריות, גבינת מוצרלה, שתי ביצי עין ובצל ירוק. מוגש עם סלט אישי ",
        dishCustomizes: [
            {
                customizeName: "בחרו ביצים",
                customizeOptions: ["ביצים חצי נאות - מומלץ!", "ביצים קשות"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו סלט",
                customizeOptions: ["סלט ירוק", "סלט קצוץ"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה קרה",
                customizeOptions: ["תפוזים סחוט טרי במקום", "לימונדה", "לימונענע", "מיץ גזר"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה חמה",
                customizeOptions: ["אספרסו", "אספרסו כפול", "תה"],
                isMandatory: 1,
                limitOfChoose: 2
            }
        ],

    },
    {
        id: 5,
        name: "  בנדיקט Eggs",
        categories: [1],
        price: 62,
        photo: images.eggs_benedict_2,
        duration: "30 - 45 min",
        description: " בריוש, תרד, הולנדייז, ביצים עלומות, ריבת בצל, בצל ירוק ופלפל שחור. מוגש עם סלט לבחירה *תוספת אבוקדו - 7₪ *תוספת פטריות ובצל - 10₪ *תוספת סלמון מעושן - 15₪ ",
        dishCustomizes: [
            {
                customizeName: "בחרו ביצים",
                customizeOptions: ["ביצים חצי נאות - מומלץ!", "ביצים קשות"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו סלט",
                customizeOptions: ["סלט ירוק", "סלט קצוץ"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה קרה",
                customizeOptions: ["תפוזים סחוט טרי במקום", "לימונדה", "לימונענע", "מיץ גזר"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה חמה",
                customizeOptions: ["אספרסו", "אספרסו כפול", "תה"],
                isMandatory: 1,
                limitOfChoose: 2
            }
        ],

    },
    {
        id: 6,
        name: "שקשוקה של בית",
        categories: [1],
        price: 61,
        photo: images.shakshuka_habait,
        duration: "30 - 45 min",
        description: " תבשיל מסורתי, במחבת לוהטת עם שתי ביצים, לחם הבית וסלט אישי ",
        dishCustomizes: [
            {
                customizeName: "בחרו ביצים",
                customizeOptions: ["ביצים חצי נאות - מומלץ!", "ביצים קשות"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו סלט",
                customizeOptions: ["סלט ירוק", "סלט קצוץ"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה קרה",
                customizeOptions: ["תפוזים סחוט טרי במקום", "לימונדה", "לימונענע", "מיץ גזר"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה חמה",
                customizeOptions: ["אספרסו", "אספרסו כפול", "תה"],
                isMandatory: 1,
                limitOfChoose: 2
            }
        ],

    },
    {
        id: 7,
        name: "שקשוקה בלקנית",
        categories: [1],
        price: 65,
        photo: images.shakshuka_balkanit,
        duration: "30 - 45 min",
        description: " תבשיל מסורתי, מוגש במחבת לוהטת עם שתי ביצים, חציל קלוי, פסטו וגבינה בולגרית מגורדת, לחם הבית וסלט אישי *ניתן לקבל גרסה טבעונית של המנה  ",
        dishCustomizes: [
            {
                customizeName: "בחרו ביצים",
                customizeOptions: ["ביצים חצי נאות - מומלץ!", "ביצים קשות"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו סלט",
                customizeOptions: ["סלט ירוק", "סלט קצוץ"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה קרה",
                customizeOptions: ["תפוזים סחוט טרי במקום", "לימונדה", "לימונענע", "מיץ גזר"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה חמה",
                customizeOptions: ["אספרסו", "אספרסו כפול", "תה"],
                isMandatory: 1,
                limitOfChoose: 2
            }
        ],

    },
    {
        id: 8,
        name: "שקשוקה פלאפל",
        categories: [1],
        price: 65,
        photo: images.shakshuka_falafel1,
        duration: "30 - 45 min",
        description: " תבשיל מסורתי, מוגש במחבת לוהטת עם שתי ביצים, כדורי פלאפל, טחינה גולמית ופטרוזיליה, לחם הבית וסלט אישי *ניתן לקבל גרסה טבעונית של המנה ",
        dishCustomizes: [
            {
                customizeName: "בחרו ביצים",
                customizeOptions: ["ביצים חצי נאות - מומלץ!", "ביצים קשות"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו סלט",
                customizeOptions: ["סלט ירוק", "סלט קצוץ"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה קרה",
                customizeOptions: ["תפוזים סחוט טרי במקום", "לימונדה", "לימונענע", "מיץ גזר"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה חמה",
                customizeOptions: ["אספרסו", "אספרסו כפול", "תה"],
                isMandatory: 1,
                limitOfChoose: 2
            }
        ],

    },
    {
        id: 9,
        name: "שקשוקה מוצרלה",
        categories: [1],
        price: 65,
        photo: images.shakshuka_muzzarella,
        duration: "30 - 45 min",
        description: " תבשיל מסורתי, מוגש במחבת לוהטת עם שתי ביצים, פסטו, מוצרלה טרייה, לחם הבית וסלט אישי ",
        dishCustomizes: [
            {
                customizeName: "בחרו ביצים",
                customizeOptions: ["ביצים חצי נאות - מומלץ!", "ביצים קשות"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו סלט",
                customizeOptions: ["סלט ירוק", "סלט קצוץ"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה קרה",
                customizeOptions: ["תפוזים סחוט טרי במקום", "לימונדה", "לימונענע", "מיץ גזר"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה חמה",
                customizeOptions: ["אספרסו", "אספרסו כפול", "תה"],
                isMandatory: 1,
                limitOfChoose: 2
            }
        ],

    },
    {
        id: 10,
        name: "מעדן מוזלי",
        categories: [1],
        price: 36,
        photo: images.muzli1,
        duration: "30 - 45 min",
        description: "  פירות העונה, יוגורט וגרנולה, לצד טחינה גולמית וסילאן ",
        dishCustomizes: [
            {
                customizeName: "בחרו ביצים",
                customizeOptions: ["ביצים חצי נאות - מומלץ!", "ביצים קשות"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו סלט",
                customizeOptions: ["סלט ירוק", "סלט קצוץ"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה קרה",
                customizeOptions: ["תפוזים סחוט טרי במקום", "לימונדה", "לימונענע", "מיץ גזר"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה חמה",
                customizeOptions: ["אספרסו", "אספרסו כפול", "תה"],
                isMandatory: 1,
                limitOfChoose: 2
            }
        ],

    },
    {
        id: 11,
        name: " כריכון וקפה ",
        categories: [1],
        price: 36,
        photo: images.krichon_cafe,
        duration: "30 - 45 min",
        description: " כריכון מחמצת, חסה, עגבנייה, גבינה צהובה, גבינה בולגרית, קרם פרש , גבינת שמנת, משוויה, סלט טונה, אבוקדו. *תוספת סלמון מעושן 15₪ *מוגש עד השעה 12:00 בלבד ",
        dishCustomizes: [
            {
                customizeName: "בחרו ביצים",
                customizeOptions: ["ביצים חצי נאות - מומלץ!", "ביצים קשות"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו סלט",
                customizeOptions: ["סלט ירוק", "סלט קצוץ"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה קרה",
                customizeOptions: ["תפוזים סחוט טרי במקום", "לימונדה", "לימונענע", "מיץ גזר"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה חמה",
                customizeOptions: ["אספרסו", "אספרסו כפול", "תה"],
                isMandatory: 1,
                limitOfChoose: 2
            }
        ],

    },
    {
        id: 12,
        name: "קפה ומאפה",
        categories: [1],
        price: 28,
        photo: images.cafe_maafe_3,
        duration: "30 - 45 min",
        description: " קפה ומאפה מתוך המבחר ",
        dishCustomizes: [
            {
                customizeName: "בחרו ביצים",
                customizeOptions: ["ביצים חצי נאות - מומלץ!", "ביצים קשות"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו סלט",
                customizeOptions: ["סלט ירוק", "סלט קצוץ"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה קרה",
                customizeOptions: ["תפוזים סחוט טרי במקום", "לימונדה", "לימונענע", "מיץ גזר"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה חמה",
                customizeOptions: ["אספרסו", "אספרסו כפול", "תה"],
                isMandatory: 1,
                limitOfChoose: 2
            }
        ],

    },
    {
        id: 13,
        name: "מבחר מאפים",
        categories: [1],
        price: 18,
        photo: images.korason_shkedim,
        duration: "30 - 45 min",
        description: " מבחר משתנה של מאפים",
        dishCustomizes: [
            {
                customizeName: "בחרו ביצים",
                customizeOptions: ["ביצים חצי נאות - מומלץ!", "ביצים קשות"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו סלט",
                customizeOptions: ["סלט ירוק", "סלט קצוץ"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה קרה",
                customizeOptions: ["תפוזים סחוט טרי במקום", "לימונדה", "לימונענע", "מיץ גזר"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה חמה",
                customizeOptions: ["אספרסו", "אספרסו כפול", "תה"],
                isMandatory: 1,
                limitOfChoose: 2
            }
        ],

    },
    // Harohat Yeladim
    {
        id: 14,
        name: "מנת תינוקות",
        categories: [2],
        price: 10,
        photo: images.manat_tinokot1,
        duration: "30 - 45 min",
        description: " 3 רכיבים לבחירה: אורז לבן, אבוקדו, מחית בטטה, עגבניה קצוצה, מלפפון קצוץ ",
        dishCustomizes: [
            {
                customizeName: "בחרו ביצים",
                customizeOptions: ["ביצים חצי נאות - מומלץ!", "ביצים קשות"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו סלט",
                customizeOptions: ["סלט ירוק", "סלט קצוץ"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה קרה",
                customizeOptions: ["תפוזים סחוט טרי במקום", "לימונדה", "לימונענע", "מיץ גזר"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה חמה",
                customizeOptions: ["אספרסו", "אספרסו כפול", "תה"],
                isMandatory: 1,
                limitOfChoose: 2
            }
        ],

    },
    {
        id: 15,
        name: " מנות של גיבורים- פסטה ",
        categories: [2],
        price: 34,
        photo: images.pasta_yeladim,
        duration: "30 - 45 min",
        description: "  פסטה, רוטב לבחירה, ירקות חתוכים, מיץ וקינוח ",
        dishCustomizes: [
            {
                customizeName: "בחרו ביצים",
                customizeOptions: ["ביצים חצי נאות - מומלץ!", "ביצים קשות"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו סלט",
                customizeOptions: ["סלט ירוק", "סלט קצוץ"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה קרה",
                customizeOptions: ["תפוזים סחוט טרי במקום", "לימונדה", "לימונענע", "מיץ גזר"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה חמה",
                customizeOptions: ["אספרסו", "אספרסו כפול", "תה"],
                isMandatory: 1,
                limitOfChoose: 2
            }
        ],

    },
    {
        id: 16,
        name: " מנות של גיבורים- טוסט ",
        categories: [2],
        price: 34,
        photo: images.toast_yeladim,
        duration: "30 - 45 min",
        description: " טוסט בייגל, ירקות חתוכים, מיץ וקינוח ",
        dishCustomizes: [
            {
                customizeName: "בחרו ביצים",
                customizeOptions: ["ביצים חצי נאות - מומלץ!", "ביצים קשות"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו סלט",
                customizeOptions: ["סלט ירוק", "סלט קצוץ"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה קרה",
                customizeOptions: ["תפוזים סחוט טרי במקום", "לימונדה", "לימונענע", "מיץ גזר"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה חמה",
                customizeOptions: ["אספרסו", "אספרסו כפול", "תה"],
                isMandatory: 1,
                limitOfChoose: 2
            }
        ],

    },

    {
        id: 17,
        name: "  מנות של גיבורים- בייגל פיצה ",
        categories: [2],
        price: 34,
        photo: images.begal_pizza,
        duration: "30 - 45 min",
        description: "  פיצה בייגל, ירקות חתוכים, מיץ וקינוח ",
        dishCustomizes: [
            {
                customizeName: "בחרו ביצים",
                customizeOptions: ["ביצים חצי נאות - מומלץ!", "ביצים קשות"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו סלט",
                customizeOptions: ["סלט ירוק", "סלט קצוץ"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה קרה",
                customizeOptions: ["תפוזים סחוט טרי במקום", "לימונדה", "לימונענע", "מיץ גזר"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה חמה",
                customizeOptions: ["אספרסו", "אספרסו כפול", "תה"],
                isMandatory: 1,
                limitOfChoose: 2
            }
        ],

    },

    {
        id: 18,
        name: "  פתיתים קטנים לילדים גדולים- אצבעות מוצרלה ופתיתים ",
        categories: [2],
        price: 44,
        photo: images.etzbaot_motzarela_vptitim,
        duration: "30 - 45 min",
        description: "  פיצה בייגל, ירקות חתוכים, מיץ וקינוח ",
        dishCustomizes: [
            {
                customizeName: "בחרו ביצים",
                customizeOptions: ["ביצים חצי נאות - מומלץ!", "ביצים קשות"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו סלט",
                customizeOptions: ["סלט ירוק", "סלט קצוץ"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה קרה",
                customizeOptions: ["תפוזים סחוט טרי במקום", "לימונדה", "לימונענע", "מיץ גזר"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה חמה",
                customizeOptions: ["אספרסו", "אספרסו כפול", "תה"],
                isMandatory: 1,
                limitOfChoose: 2
            }
        ],

    },

    {
        id: 19,
        name: " בוקר שילדים אוהבים- מקסיקני ",
        categories: [2],
        price: 44,
        photo: images.boker_mexicani,
        duration: "30 - 45 min",
        description: " טוסט טורטייה במילוי גבינות ורסק עגבניות, ירקות חתוכים, ביצה קשה, שמנת, טונה, מיץ ושוקו ",
        dishCustomizes: [
            {
                customizeName: "בחרו ביצים",
                customizeOptions: ["ביצים חצי נאות - מומלץ!", "ביצים קשות"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו סלט",
                customizeOptions: ["סלט ירוק", "סלט קצוץ"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה קרה",
                customizeOptions: ["תפוזים סחוט טרי במקום", "לימונדה", "לימונענע", "מיץ גזר"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה חמה",
                customizeOptions: ["אספרסו", "אספרסו כפול", "תה"],
                isMandatory: 1,
                limitOfChoose: 2
            }
        ],

    },
    {
        id: 20,
        name: "  פתיתים קטנים לילדים גדולים- שניצל דג ופתיתים ",
        categories: [2],
        price: 44,
        photo: images.shnitzel_dag_vptititm,
        duration: "30 - 45 min",
        description: " שניצל דג, פתיתים, ירקות חתוכים, מיץ וקינוח ",
        dishCustomizes: [
            {
                customizeName: "בחרו ביצים",
                customizeOptions: ["ביצים חצי נאות - מומלץ!", "ביצים קשות"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו סלט",
                customizeOptions: ["סלט ירוק", "סלט קצוץ"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה קרה",
                customizeOptions: ["תפוזים סחוט טרי במקום", "לימונדה", "לימונענע", "מיץ גזר"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה חמה",
                customizeOptions: ["אספרסו", "אספרסו כפול", "תה"],
                isMandatory: 1,
                limitOfChoose: 2
            }
        ],

    },
    {
        id: 21,
        name: "   בוקר שילדים אוהבים- ישראלי ",
        categories: [2],
        price: 44,
        photo: images.boker_yeladim,
        duration: "30 - 45 min",
        description: "  ביצה לבחירה, צהובה, שמנת, ירקות חתוכים, חצי בייגל, סלט טונה, מיץ ושוקו עם קצפת, קינוח ",
        dishCustomizes: [
            {
                customizeName: "בחרו ביצים",
                customizeOptions: ["ביצים חצי נאות - מומלץ!", "ביצים קשות"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו סלט",
                customizeOptions: ["סלט ירוק", "סלט קצוץ"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה קרה",
                customizeOptions: ["תפוזים סחוט טרי במקום", "לימונדה", "לימונענע", "מיץ גזר"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה חמה",
                customizeOptions: ["אספרסו", "אספרסו כפול", "תה"],
                isMandatory: 1,
                limitOfChoose: 2
            }
        ],

    },
    {
        id: 22,
        name: " בוקר שילדים אוהבים- אמריקאי ",
        categories: [2],
        price: 44,
        photo: images.boker_amricai,
        duration: "30 - 45 min",
        description: "   פנקייק, מייפל, פירות, סירופ שוקולד, קצפת וסוכריות צבעוניות, מיץ ושוקו ",
        dishCustomizes: [
            {
                customizeName: "בחרו ביצים",
                customizeOptions: ["ביצים חצי נאות - מומלץ!", "ביצים קשות"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו סלט",
                customizeOptions: ["סלט ירוק", "סלט קצוץ"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה קרה",
                customizeOptions: ["תפוזים סחוט טרי במקום", "לימונדה", "לימונענע", "מיץ גזר"],
                isMandatory: 1,
                limitOfChoose: 2
            },
            {
                customizeName: "בחרו שתייה חמה",
                customizeOptions: ["אספרסו", "אספרסו כפול", "תה"],
                isMandatory: 1,
                limitOfChoose: 2
            }
        ],

    },
];

export default restaurantData;