
/* =========================================
   BMI CALCULATOR
   ========================================= */


const bmiForm = document.getElementById("bmiForm");

const bmiResult = document.getElementById("bmiResult");

const bmiNumber = document.getElementById("bmiNumber");

const bmiCategory = document.getElementById("bmiCategory");

const bmiMessage = document.getElementById("bmiMessage");

const bmiRecalculate =
    document.getElementById("bmiRecalculate");


/* CALCULATE BMI */

function calculateBMI() {


    const age =
        Number(document.getElementById("bmiAge").value);


    const height =
        Number(document.getElementById("bmiHeight").value);


    const weight =
        Number(document.getElementById("bmiWeight").value);


    if (!age || !height || !weight) {

        return;

    }


    /*
       BMI formula:

       BMI = weight / height²

       Height is converted from
       centimeters to meters.
    */


    const heightInMeters =
        height / 100;


    const bmi =
        weight /
        (heightInMeters * heightInMeters);


    let category;

    let message;


    if (bmi < 18.5) {

        category = "Underweight";

        message =
            "Your BMI is below the general adult reference range.";

    }

    else if (bmi < 25) {

        category = "Normal range";

        message =
            "Your BMI falls within the general adult reference range.";

    }

    else if (bmi < 30) {

        category = "Overweight";

        message =
            "Your BMI is above the general adult reference range.";

    }

    else {

        category = "Obesity range";

        message =
            "Your BMI is in the obesity range used for general adult screening.";

    }


    /* DISPLAY RESULT */

    bmiNumber.textContent =
        bmi.toFixed(1);


    bmiCategory.textContent =
        category;


    bmiMessage.textContent =
        message;


    bmiResult.classList.remove("hidden");


    /*
       Save result.

       This means if the user navigates away
       and comes back, the calculated result
       can still be displayed.
    */


    const resultData = {

        bmi: bmi.toFixed(1),

        category: category,

        message: message

    };


    sessionStorage.setItem(
        "bmiResult",
        JSON.stringify(resultData)
    );


    /* Scroll to result */

    bmiResult.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


/* FORM SUBMISSION */

if (bmiForm) {

    bmiForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            calculateBMI();

        }
    );

}


/* RECALCULATE */

if (bmiRecalculate) {

    bmiRecalculate.addEventListener(
        "click",
        function () {

            bmiResult.classList.add("hidden");

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* RESTORE PREVIOUS RESULT */

const savedBMI =
    sessionStorage.getItem("bmiResult");


if (savedBMI) {

    try {

        const data =
            JSON.parse(savedBMI);


        bmiNumber.textContent =
            data.bmi;


        bmiCategory.textContent =
            data.category;


        bmiMessage.textContent =
            data.message;


        bmiResult.classList.remove("hidden");

    }

    catch (error) {

        console.log(
            "Unable to restore BMI result."
        );

    }

}
