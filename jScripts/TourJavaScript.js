/*תמונות מתחלפות*/
document.addEventListener("DOMContentLoaded", function () {
    var currentImageIndex = 0;
    var images = document.querySelectorAll('.slider-image'); /*בחירת כל התמונות*/

    function showNextImage() {
        if (images[currentImageIndex]) {
            images[currentImageIndex].classList.remove('active');  /*הסרת המחלקה מהתמונה הנוכחית*/
        }

        /*עדכון האינדקס של התמונה הבאה*/
        currentImageIndex = (currentImageIndex + 1) % images.length;

        if (images[currentImageIndex]) {
            images[currentImageIndex].classList.add('active');  /*הוספת המחלקה לתמונה הבאה*/
        }
    }

     /*להציג את התמונה הראשונה מיד*/
    if (images[currentImageIndex]) {
        images[currentImageIndex].classList.add('active');
    }

    /* להחליף תמונה כל 10 שניות*/
    setInterval(showNextImage, 10000);
});


/*-------------------------------------------טופס הזמנה-----------------------------------------*/

/*פונקציה של בחירת המטבע */

function CurrencyIcon() {
    var selectedCurrency = document.querySelector('input[name="currency"]:checked');
    if (selectedCurrency) {
        /* הצגה של אייקון שנבחר*/
        var iconId = 'icon-' + selectedCurrency.value;
        var selectedIcon = document.getElementById(iconId);
        if (selectedIcon) {
            document.querySelectorAll('.currency-icon').forEach(icon => {
                icon.style.display = 'none';
            });
            selectedIcon.style.display = 'inline-block';
            return true; /*החזרת ערך לפונקצייתץ בדיקה*/
        }
    }
    return false; /*החזרת ערך לפונקצייתץ בדיקה*/
}


/*פונקציה של בחירת סוג המנה */
function MealPreferences() {
    var lunchCheckbox = document.getElementById('lunch');
    var mealPreferencesSection = document.getElementById('meal-preferences');

    if (lunchCheckbox.checked) {
        /* הצגה של אפשרות לבחירת מנה*/
        mealPreferencesSection.style.display = 'block';
    } else {
        /* הסתרה של אפשרות לבחירת מנה*/
        mealPreferencesSection.style.display = 'none';

    }
}

/*פונקציה של שירותים נוספים */
function ServiceIcon() {
    var serviceIds = ["lunch", "healthInsurance", "SpecialRequest"];
    var anyServiceChecked = false;

    for (var i = 0; i < serviceIds.length; i++) {
        var checkbox = document.getElementById(serviceIds[i]);
        var icon = document.getElementById('icon-' + serviceIds[i]);

        if (checkbox && checkbox.checked) {
            icon.style.opacity = '1'; // הצגת האייקון במלואו אם נבחר שירות
            anyServiceChecked = true; // ציון שנבחר לפחות שירות אחד
        }

        if (icon && (!checkbox || !checkbox.checked)) {
            icon.style.opacity = '0.25'; // הצגת אייקון בשקיפות חלקית אם לא נבחר שירות
        }
    }
    return anyServiceChecked; // Return true if any service checkbox is checked
}


/*פונקציה של כמות המשתתפים*/
function changeParticipants(amount) {
    var participantsInput = document.getElementById('participants');
    var currentValue = parseInt(participantsInput.value);

    if (!isNaN(currentValue)) {
        var newValue = currentValue + amount;

      /*  הגבלה של כמות משתתפים - מינימום ומקסימום*/
        if (newValue >= participantsInput.min && newValue <= participantsInput.max) {
            participantsInput.value = newValue;
        }
    }
}

/*פונקציה של תיבה לבקשות מיוחדות*/
function SpecialRequestTextbox() {
    var specialRequestCheckbox = document.getElementById("SpecialRequest");
    var specialRequestTextbox = document.getElementById("specialRequestTextbox");

    
    if (specialRequestCheckbox.checked) {
       /* הצג את תיבת הטקסט אם אפשרות מסומנת*/
        specialRequestTextbox.style.display = "block";
    } else {
        /* הסתר את תיבת הטקסט אם אפשרות מסומנת*/
        specialRequestTextbox.style.display = "none";
    }
}

/*פונקציית סיכום הזמנה*/
function Summarize()
{
    var totalCost = 150;
    /*קבלת ערכים הנדרשים בטופס*/
    var departureCity = document.getElementById('departure').value; /* עיר יציאה*/
    var tourDate = document.getElementById('tour-date').value; /* תאריך הטיול*/
    var fullName = document.getElementById('full-name').value; /* שם מלא*/
    var email = document.getElementById('email').value; /* כתובת מייל*/
    var participants = parseInt(document.getElementById('participants').value); /* מספר המשתתפים*/

    /*  בחירת מטבע*/
    var currencies = ["dollar", "shekel", "euro"];
    var currencyConversionRates = [3.5, 1, 4]

    var selectedCurrency = null;

    /*בדיקה האם נבחר*/
    for (var i = 0; i < currencies.length; i++) {
        var currency = currencies[i];
        var currencyRadioButton = document.querySelector(`input[name="currency"][value="${currency}"]`);

        if (currencyRadioButton && currencyRadioButton.checked) {
            selectedCurrency = currency;
            break; /*עצירה של בדיקה לאחר בחירת אפשרות*/
        }
    }

    /*המרה של סכום למטבעות זרים*/
    if (selectedCurrency && (selectedCurrency === "dollar" || selectedCurrency === "euro")) {
        var currencyIndex = currencies.indexOf(selectedCurrency); // Get the index of the selected currency
        if (currencyIndex !== -1) {
            totalCost /= currencyConversionRates[currencyIndex]; // Convert using the corresponding conversion rate
        }
    }
    /*עיגול תוצאה*/
    totalCost = Math.round(totalCost * 100) / 100;

    var mealPreference = "No meal preference selected";
    var lunchCheckbox = document.getElementById("lunch");

   /* בדיקה האם ארוחה מסומנת*/
    if (lunchCheckbox && lunchCheckbox.checked) {
        totalCost *= 2; /*תוספת עלות עבור ארוחה*/

        /* אפשרויות שונות לסוג ההמנה*/
        var mealOptions = ["vegetarian", "vegan", "kosher"];
        var selectedMeal = null;

       /* לולאה לבדיקת בחירה של סוג המנה*/
        for (var i = 0; i < mealOptions.length; i++) {
            var mealOption = document.querySelector(`input[name="meal-preference"][value="${mealOptions[i]}"]`);

           /* בדיקה האם מנה מסומנת*/
            if (mealOption && mealOption.checked) {
                selectedMeal = mealOption;
                break; /*עצירה של בדיקה לאחר בחירת אפשרות*/
            }
        }

        /*קליטה של סוג המנה או הזנה של ערך ברירת מחדל*/
        mealPreference = selectedMeal ? selectedMeal.nextElementSibling.textContent : "No meal preference selected";
    }

     /*בדיקת ביטוח בריאות*/
    var healthInsuranceCheckbox = document.getElementById("healthInsurance");
    var hasHealthInsurance = "No";

    /*בדיקת האם אפשרות סומנה*/
    if (healthInsuranceCheckbox.checked) {
        hasHealthInsurance = "Yes";
        totalCost *= 4;
    }

    /*תיבה של בקשות מיוחדות*/
    var specialRequestInput = document.getElementById("specialRequestInput").value;
    /*אם תיבה ריקה קלוט ערך ברירת מחדל*/
    if (specialRequestInput == "") {
        specialRequest = "No special requests specified";
    }
        /*אם תיבה עם תוכן קלוט את התוכן*/
    else {
        specialRequest = specialRequestInput;
    }

    var output = "Order Summary:<br />";

     /*יצירת הסיכום להצגה*/
    output += "Departure City: " + departureCity + "<br />" +
        "Tour Date: " + tourDate + "<br />" +
        "Full Name: " + fullName + "<br />" +
        "Email: " + email + "<br />" +
        "Number of Participants: " + participants + "<br />" +
        "Meal Preference: " + mealPreference + "<br />" +
        "Health Insurance: " + hasHealthInsurance + "<br />" +
        "Special Request: " + specialRequest + "<br />" +
        "Total Amount to be Paid: " + totalCost * participants + " " + currency;

     /*הצגת הסיכום באיזור המיועד*/
    document.getElementById("orderSummary").innerHTML = output;
}

function checkFormCompletion()
{
    var currencySelected = CurrencyIcon(); // Check if currency is selected
    console.log("Currency selected:", currencySelected);

    var serviceSelected = ServiceIcon(); // Check if any service is selected
    console.log("Service selected:", serviceSelected);

    var departureCity = document.getElementById('departure').value; // Departure City
    var tourDate = document.getElementById('tour-date').value; // Tour Date
    var fullName = document.getElementById('full-name').value; // Full Name
    var email = document.getElementById('email').value; // Email
    var submitButton = document.querySelector('.booking-form button[type="button"]');

    // Check if currency and service are selected, and required fields are filled
    if (currencySelected && serviceSelected && departureCity !== "" && tourDate !== "" && fullName !== "" && email !== "") {
        submitButton.disabled = false; // Enable the button
        submitButton.style.opacity = '1';
    } else {
        submitButton.disabled = true; // Disable the button
        submitButton.style.opacity = '0.5';
    }
}

