var SiteData = (function () {
  'use strict';

  var STORAGE_KEY = 'shimshon_data';

  var defaultProject = {
    id: 0, tag: '', title: '', client: '', service: '', year: '',
    category: 'branding', description: '', image: '',
    challenge: '', solution: '', result: '',
    challengeHeading: '', solutionHeading: '', resultHeading: '',
    results: [{ number: '', label: '' }]
  };

  var defaults = {
    site: {
      name: 'שמשון',
      tagline: 'סטודיו לעיצוב גרפי',
      description: 'אנחנו יוצרים עיצובים שמספרים סיפור, בונים מותגים ומשאירים רושם. כל פרויקט הוא הזדמנות ליצור משהו יוצא דופן.'
    },
    hero: {
      title: 'עיצוב שיוצר<br>חיבור אמיתי',
      subtitle: 'אנחנו יוצרים עיצובים שמספרים סיפור, בונים מותגים ומשאירים רושם. כל פרויקט הוא הזדמנות ליצור משהו יוצא דופן.',
      cta1: 'לתיק העבודות',
      cta2: 'בואו נדבר',
      cta1Link: 'works.html',
      cta2Link: 'contact.html'
    },
    about: {
      title: 'סטודיו לעיצוב<br>עם משמעות',
      paragraphs: [
        'בסטודיו שמשון אנחנו מאמינים שעיצוב טוב הוא לא רק אסתטיקה - הוא כלי תקשורת. כל קו, צבע ופונט נושאים משמעות, ואנחנו כאן כדי לתרגם את החזון שלכם לשפה ויזואלית ברורה ומדויקת.',
        'אנחנו עובדים עם מותגים קטנים וגדולים, סטארטאפים וחברות מבוססות, ותמיד מחפשים את הדרך היצירתית והייחודית להציג את הסיפור שלכם לעולם.',
        'הגישה שלנו מבוססת על שיתוף פעולה, הקשבה עמוקה והבנה של הקהל שלכם. אנחנו לא סתם מעצבים - אנחנו שותפים לדרך.'
      ],
      tools: [
        { icon: 'Ai', name: 'Illustrator' },
        { icon: 'Ps', name: 'Photoshop' },
        { icon: 'Id', name: 'InDesign' },
        { icon: 'Fg', name: 'Figma' },
        { icon: 'Ae', name: 'After Effects' },
        { icon: 'Pr', name: 'Premiere Pro' },
        { icon: 'Lr', name: 'Lightroom' },
        { icon: 'Bl', name: 'Blender' }
      ],
      bio: 'סטודיו שמשון נוסד מתוך אהבה לעיצוב ותשוקה ליצירה. אנחנו צוות קטן אבל נמרץ, של מעצבים גרפיים, מאיירים ומפתחי חזון, שמאמינים בכוחו של עיצוב טוב לשנות תפיסות וליצור חיבור רגשי עם קהל. אנחנו מתמחים ביצירת זהויות מותג שלמות, החל מלוגו ועד חומרי שיווק, עיצוב אתרים, גרפיקה להדפסה ואיור דיגיטלי. כל פרויקט מקבל את מלוא תשומת הלב, המחשבה והיצירתיות שלנו - כי בשבילנו, ההצלחה שלכם היא ההצלחה שלנו.'
    },
    services: {
      intro: 'תהליך עבודה מובנה שמוביל לתוצאות מדויקות. כל שלב מתוכנן בקפידה כדי להבטיח עיצוב שעונה על המטרות שלכם.',
      process: [
        { number: 1, title: 'הכרות', description: 'פגישת היכרות והבנת הצרכים, המטרות והחזון שלכם' },
        { number: 2, title: 'מחקר', description: 'ניתוח שוק, קהל יעד ומתחרים לבניית אסטרטגיה' },
        { number: 3, title: 'עיצוב', description: 'סקיצות ראשוניות, עידון ופיתוח הקונספט הנבחר' },
        { number: 4, title: 'פיתוח', description: 'הכנת קבצים סופיים, התאמה לפלטפורמות שונות' },
        { number: 5, title: 'השקה', description: 'ליווי בהשקה, משוב והתאמות אחרונות' }
      ],
      targetTitle: 'למי זה מיועד',
      targetDescription: 'עסקים קטנים ובינוניים, סטארטאפים, מותגים מבוססים וארגונים שצריכים שדרוג ויזואלי - כולם מוזמנים. אנחנו מתמחים בעבודה עם לקוחות שמחפשים עיצוב אישי, מקצועי ומדויק.'
    },
    contact: {
      heading: 'בואו נדבר',
      description: 'רוצים לשמוע עוד? יש שאלה? או סתם רוצים להגיד שלום? מלאו את הטופס ואחזור אליכם בהקדם.',
      email: 'hello@shimshon.co.il',
      phone: '050-000-0000',
      location: 'תל אביב, ישראל',
      social: [
        { label: 'Li', url: '#', name: 'LinkedIn' },
        { label: 'Be', url: '#', name: 'Behance' },
        { label: 'Ig', url: '#', name: 'Instagram' },
        { label: 'Dr', url: '#', name: 'Dribbble' }
      ],
      formLabels: {
        name: 'שם מלא',
        email: 'אימייל',
        message: 'הודעה',
        submit: 'שליחה'
      }
    },
    projects: [
      { id: 1, tag: 'מיתוג', title: 'מותג טבעוני', client: 'מותג טבעוני', service: 'עיצוב זהות מותג', year: '2025', category: 'branding', description: 'עיצוב זהות מותג מלאה', image: '', challenge: 'מותג המזון הטבעוני ביקש לבסס זהות מותג שתבדל אותו בשוק תחרותי. האתגר היה ליצור עיצוב שמעביר ערכים של טבע, בריאות וחדשנות בלי להפוך לקלישאה.', solution: 'פיתחנו שפה ויזואלית המשלבת טיפוגרפיה נקייה, פלטת צבעים טבעית ואיורים מינימליסטיים. לוגו מבוסס גופן עם טאץ ייחודי, אריזות דיגיטליות ופיזיות, וחומרי שיווק מגובשים.', result: 'המותג הושק בהצלחה וזכה לתגובות מצוינות. תוך חודש נרשמה עליה של 40% במעורבות ברשתות החברתיות וזיהוי מותג גבוה משמעותית בסקרי שוק.', results: [{ number: '40%', label: 'עליה במעורבות' }, { number: '3x', label: 'חשיפה אורגנית' }, { number: '95%', label: 'המלצות חיוביות' }] },
      { id: 2, tag: 'עיצוב אתרים', title: 'פלטפורמת למידה', client: 'סטארטאפ חינוך', service: 'עיצוב ממשק משתמש', year: '2025', category: 'web', description: 'ממשק משתמש וחווית משתמש', image: '', challenge: 'פלטפורמת למידה דיגיטלית היתה צריכה עיצוב מחדש שישפר את חווית המשתמש ויגדיל את שיעורי ההשלמה של הקורסים.', solution: 'עיצוב רספונסיבי עם ניווט אינטואיטיבי, מערכת צבעים מרגיעה, וקומפוננטות נגישות. התמקדנו בהפחתת חיכוך ובהפיכת הלמידה לחוויה מהנה.', result: 'שיעורי השלמת הקורסים עלו ב-60%, זמן השהייה באתר הוכפל, ומשוב המשתמשים היה חיובי ביותר.', results: [{ number: '60%', label: 'עליה בהשלמת קורסים' }, { number: '2x', label: 'זמן שהייה באתר' }, { number: '4.8', label: 'דירוג משתמשים' }] },
      { id: 3, tag: 'גרפיקה להדפסה', title: 'קמפיין עונתי', client: 'מותג אופנה', service: 'עיצוב חומרי פרסום', year: '2024', category: 'print', description: 'חומרי פרסום ודפוס', image: '', challenge: 'מותג אופנה ביקש קמפיין עונתי בולט שימשוך תשומת לב במרחב הפיזי והדיגיטלי, תוך שמירה על שפה עיצובית עקבית.', solution: 'פיתחנו קונספט ויזואלי נועז עם צבעים עשירים, טיפוגרפיה דרמטית וקומפוזיציות בלתי שגרתיות. הקמפיין כלל פוסטרים, שלטי חוצות, באנרים דיגיטליים וחוברת הדפסה.', result: 'הקמפיין זכה לחשיפה רחבה, הגדיל את תנועת הלקוחות לחנויות ב-30%, וזכה לאזכורים במספר בלוגי עיצוב.', results: [{ number: '30%', label: 'עליה בתנועה לחנויות' }, { number: '12', label: 'אזכורים בבלוגים' }, { number: '1M', label: 'חשיפות דיגיטליות' }] },
      { id: 4, tag: 'איור', title: 'סדרת איורים', client: 'הוצאת ספרים', service: 'איורים דיגיטליים', year: '2025', category: 'illustration', description: 'איורים דיגיטליים לספר', image: '', challenge: 'הוצאת ספרים ביקשה סדרת איורים מקורית לספר ילדים חדש, שתתאים גם להדפסה וגם למהדורה דיגיטלית.', solution: 'ציור בסגנון ייחודי המשלב איור דיגיטלי עם נגיעות צבע עדינות. כל איור מספר חלק מהסיפור תוך השארת מקום לדמיון.', result: 'הספר זכה לביקורות מצוינות, הפך לרב-מכר תוך חודש, וזכה לפרס עיצוב בקטגורית איור דיגיטלי.', results: [{ number: '1st', label: 'מקום ראשון בתחרות' }, { number: '3x', label: 'יעד מכירות חודשי' }, { number: '4.9', label: 'דירוג קוראים' }] },
      { id: 5, tag: 'מיתוג', title: 'חנות אופנה', client: 'רשת אופנה עצמאית', service: 'מיתוג מלא', year: '2024', category: 'branding', description: 'מיתוג מלא לרשת אופנה', image: '', challenge: 'רשת אופנה עצמאית רצתה לשדרג את תדמית המותג שלה תוך שמירה על הקהל הקיים ומשיכת קהל צעיר יותר.', solution: 'עיצוב זהות מותג מחודשת - לוגו מודרני, גופן ייחודי, אריזות מעוצבות ועיצוב חלל החנויות.', result: 'המותג הצעיר את תדמיתו, משך קהל יעד חדש והגדיל את המכירות ב-25% ברבעון הראשון.', results: [{ number: '25%', label: 'גידול במכירות' }, { number: '40%', label: 'לקוחות חדשים' }, { number: '3', label: 'סניפים חדשים' }] },
      { id: 6, tag: 'עיצוב אתרים', title: 'אתר מסחר', client: 'חנות וירטואלית', service: 'עיצוב אתר מסחר', year: '2025', category: 'web', description: 'עיצוב אתר מסחר אלקטרוני', image: '', challenge: 'חנות וירטואלית בקנה מידה גדול היתה זקוקה לעיצוב מחדש שישפר את חווית הקנייה ויפחית את שיעור הנטישה בעגלה.', solution: 'עיצוב ממוקד משתמש עם תהליך רכישה חלק, סימון מוצרים אינטואיטיבי, ותצוגת מוצרים ברזולוציה גבוהה.', result: 'שיעור הנטישה ירד ב-35%, זמן הגלישה עלה ב-50%, וההכנסות החודשיות גדלו ב-45%.', results: [{ number: '-35%', label: 'ירידה בנטישה' }, { number: '+50%', label: 'זמן גלישה' }, { number: '+45%', label: 'הכנסות חודשיות' }] },
      { id: 7, tag: 'גרפיקה להדפסה', title: 'השקת מוצר', client: 'חברת טכנולוגיה', service: 'עיצוב חומרי השקה', year: '2024', category: 'print', description: 'עיצוב חומרי השקה למוצר חדש', image: '', challenge: 'חברת טכנולוגיה השיקה מוצר חדש והיתה זקוקה לחומרי הדפסה מרשימים לאירוע ההשקה, כולל חוברת מוצר, פוסטרים ומצגת.', solution: 'עיצוב נקי וטכנולוגי המשקף את חדשנות המוצר, עם דגש על טיפוגרפיה ברורה ואינפוגרפיקה שממחישה את היתרונות.', result: 'אירוע ההשקה זכה להצלחה, המוצר קיבל סיקור תקשורתי נרחב, והחברה דיווחה על עסקאות משמעותיות שנרקמו באירוע.', results: [{ number: '50+', label: 'כתבות בתקשורת' }, { number: '200+', label: 'לידים חמים' }, { number: '4.8', label: 'דירוג משתתפים' }] },
      { id: 8, tag: 'איור', title: 'איור קונספט', client: 'חברת משחקים', service: 'איור קונספט', year: '2025', category: 'illustration', description: 'איורי קונספט למשחק', image: '', challenge: 'חברת משחקים היתה צריכה סדרת איורי קונספט לדמויות ולעולם חדש למשחק הרפתקאות.', solution: 'יצירת עולם ויזואלי עשיר עם דמויות ייחודיות ונופים דמיוניים, תוך שמירה על קוהרנטיות סגנונית ועומק סיפורי.', result: 'המשחק זכה להצלחה עם למעלה ממיליון הורדות בחודש הראשון, והאיורים קיבלו שבחים רבים בקהילת המפתחים.', results: [{ number: '1M+', label: 'הורדות בחודש ראשון' }, { number: '4.7', label: 'דירוג בחנות' }, { number: '#1', label: 'מקום בקטגוריה' }] },
      { id: 9, tag: 'מיתוג', title: 'רשת בתי קפה', client: 'רשת בתי קפה', service: 'מיתוג ואריזה', year: '2024', category: 'branding', description: 'מיתוג מלא לרשת בתי קפה', image: '', challenge: 'רשת בתי קפה מקומית ביקשה לעצב מחדש את כל חווית המותג - מסמל ועד אריזות ומערכי שילוט בסניפים.', solution: 'עיצוב חמים ואותנטי בהשראת תרבות הקפה הים-תיכונית. לוגו מאוייר, פלטת צבעים טבעית, אריזות ידידותיות לסביבה.', result: 'הרשת התרחבה מ-3 ל-7 סניפים תוך שנה, זיהוי המותג עלה משמעותית, והחנויות החדשות נפתחו עם זיהוי מיידי.', results: [{ number: '7', label: 'סניפים פעילים' }, { number: '4', label: 'סניפים חדשים' }, { number: '90%', label: 'זיהוי מותג' }] }
    ],
    caseStudy: {
      challengeHeading: 'האתגר',
      solutionHeading: 'הפתרון',
      resultHeading: 'התוצאה'
    },
    categories: [
      { key: 'branding', label: 'מיתוג' },
      { key: 'web', label: 'עיצוב אתרים' },
      { key: 'print', label: 'גרפיקה להדפסה' },
      { key: 'illustration', label: 'איור' }
    ],
    footer: {
      copyright: 'שמשון - סטודיו לעיצוב גרפי'
    }
  };

  function load() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        var parsed = JSON.parse(stored);
        return mergeDeep(deepClone(defaults), parsed);
      }
    } catch (e) {
      console.warn('Failed to load site data from localStorage:', e);
    }
    return deepClone(defaults);
  }

  function save(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Failed to save site data:', e);
      return false;
    }
  }

  function reset() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (e) {
      return false;
    }
  }

  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function mergeDeep(target, source) {
    if (typeof target !== 'object' || target === null) return source;
    if (typeof source !== 'object' || source === null) return target;

    var result = deepClone(target);
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        if (Array.isArray(source[key]) || typeof source[key] !== 'object' || source[key] === null) {
          result[key] = deepClone(source[key]);
        } else {
          result[key] = mergeDeep(result[key] || {}, source[key]);
        }
      }
    }
    return result;
  }

  function getDefault(key) {
    if (key) {
      var parts = key.split('.');
      var val = defaults;
      for (var i = 0; i < parts.length; i++) {
        if (val && val[parts[i]] !== undefined) {
          val = val[parts[i]];
        } else {
          return undefined;
        }
      }
      return deepClone(val);
    }
    return deepClone(defaults);
  }

  return {
    load: load,
    save: save,
    reset: reset,
    getDefault: getDefault,
    deepClone: deepClone
  };
})();
