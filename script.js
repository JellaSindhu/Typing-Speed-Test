let textInputEl = document.getElementById("textInput");
let speedTypingTestEl = document.getElementById("speedTypingTest");
let timerEl = document.getElementById("timer");
let quoteDisplayEl = document.getElementById("quoteDisplay");
let resultEl = document.getElementById("result");
let quoteInputEl = document.getElementById("quoteInput");
let submitBtn = document.getElementById("submitBtn");
let resetBtn = document.getElementById("resetBtn");
let spinnerEl = document.getElementById("spinner");
let timeInSeconds = 0;
let timerId = 0;

function getData() {
    spinnerEl.classList.add("d-none");
    resultEl.textContent = "";
    timeInSeconds = 0;
    let options = {
        method: "GET"
    };
    let url = "https://apis.ccbp.in/random-quote";
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            let {
                content
            } = jsonData;
            quoteDisplayEl.textContent = content;
        });
    timerId = setInterval(function() {
        timerEl.textContent = timeInSeconds + " seconds";
        timeInSeconds = timeInSeconds + 1;
    }, 1000);
}

function submittedInput(event) {
    let userTypedText = quoteInputEl.value;
    let randomText = quoteDisplayEl.textContent;
    resultEl.textContent = "";
    if (userTypedText === randomText) {
        clearInterval(timerId);
        resultEl.textContent = "You typed in " + timeInSeconds + " seconds";
    } else {
        resultEl.textContent = "You typed incorrect sentence";
    }
}

function resetPage() {
    spinnerEl.classList.remove("d-none");
    quoteInputEl.value = "";
    resultEl.textContent = "";
    clearInterval(timerId);
    setTimeout(function() {
        getData();
        submittedInput();
    }, 2000);
}

submitBtn.addEventListener("click", submittedInput);
resetBtn.addEventListener("click", resetPage);

getData();

function fun(event) {
    setTimeout(function() {
        console.log(event.key);
    }, 2000);
}
textInputEl.addEventListener("keydown", function(event) {
    console.log(event.key);
});