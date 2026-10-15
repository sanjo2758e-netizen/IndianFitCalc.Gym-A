
/* =========================================
   MAINTENANCE CALORIE CALCULATOR
   ========================================= */


const calorieForm =
    document.getElementById("calorieForm");


const calorieResult =
    document.getElementById("calorieResult");


const tdeeNumber =
    document.getElementById("tdeeNumber");


const bmrNumber =
    document.getElementById("bmrNumber");


const lossNumber =
    document.getElementById("lossNumber");


const gainNumber =
    document.getElementById("gainNumber");


const calorieRecalculate =
    document.getElementById("calorieRecalculate");


/* =========================================
   CALCULATE
   ========================================= */


function calculateCalories() {


    const age =
        Number(
            document.getElementById("calorieAge").value
        );


    const height =
        Number(
            document.getElementById("calorieHeight").value
        );


    const weight =
        Number(
            document.getElementById("calorieWeight").value
        );


    const sex =
        document.getElementById("calorieSex").value;


    const activity =
        Number(
            document.getElementById("activity").value
        );


    if (
        !age ||
        !height ||
        !weight ||
        !sex ||
        !activity
    ) {

        return;

    }


    /*
    =========================================
    MIFFLIN-ST JEOR EQUATION
    =========================================

    Male:

    BMR =
    10 × weight
    + 6.25 × height
    - 5 × age
    + 5


    Female:

    BMR =
    10 × weight
    + 6.25 × height
    - 5 × age
    - 161
    */


    let bmr;


    if (sex === "male") {

        bmr =
            (10 * weight)
            +
            (6.25 * height)
            -
            (5 * age)
            +
            5;

    }

    else {

        bmr =
            (10 * weight)
            +
            (6.25 * height)
            -
            (5 * age)
            -
            161;

    }


    /*
    =========================================
    TDEE
    =========================================

    TDEE = BMR × Activity Factor
    */


    const tdee =
        Math.round(bmr * activity);


    /*
    Simple guide values.

    These are only estimates.
    */


    const weightLoss =
        Math.max(
            1200,
            tdee - 500
        );


    const weightGain =
        tdee + 300;


    /* DISPLAY */

    tdeeNumber.textContent =
        tdee.toLocaleString("en-IN");


    bmrNumber.textContent =
        Math.round(bmr)
            .toLocaleString("en-IN")
        + " kcal";


    lossNumber.textContent =
        weightLoss
            .toLocaleString("en-IN")
        + " kcal";


    gainNumber.textContent =
        weightGain
            .toLocaleString("en-IN")
        + " kcal";


    calorieResult.classList.remove("hidden");


    /*
    =========================================
    SAVE RESULT
    =========================================
    */


    const resultData = {

        tdee: tdee,

        bmr: Math.round(bmr),

        loss: weightLoss,

        gain: weightGain

    };


    sessionStorage.setItem(

        "calorieResult",

        JSON.stringify(resultData)

    );


    /* Scroll to result */

    calorieResult.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


/* FORM */

if (calorieForm) {

    calorieForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            calculateCalories();

        }
    );

}


/* RECALCULATE */

if (calorieRecalculate) {

    calorieRecalculate.addEventListener(
        "click",
        function () {

            calorieResult.classList.add("hidden");

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* RESTORE RESULT */

const savedCalories =
    sessionStorage.getItem(
        "calorieResult"
    );


if (savedCalories) {

    try {

        const data =
            JSON.parse(savedCalories);


        tdeeNumber.textContent =
            data.tdee.toLocaleString("en-IN");


        bmrNumber.textContent =
            data.bmr.toLocaleString("en-IN")
            + " kcal";


        lossNumber.textContent =
            data.loss.toLocaleString("en-IN")
            + " kcal";


        gainNumber.textContent =
            data.gain.toLocaleString("en-IN")
            + " kcal";


        calorieResult.classList.remove(
            "hidden"
        );

    }

    catch (error) {

        console.log(
            "Unable to restore calorie result."
        );

    }

}
