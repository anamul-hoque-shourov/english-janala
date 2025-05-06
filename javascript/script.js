// Show loader
function showLoader() {
    document.getElementById("loader-div").classList.remove("hidden");
    document.getElementById("vocab-div").classList.add("hidden");
}

// Hide loader
function hideLoader() {
    document.getElementById("loader-div").classList.add("hidden");
    document.getElementById("vocab-div").classList.remove("hidden");
}

// Load lesson buttons
function loadLessonButtons() {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((response) => response.json())
        .then((receivedData) => displayLessonButtons(receivedData.data));
}
loadLessonButtons();

// Display lesson buttons
function displayLessonButtons(lessonTitles) {
    const buttonDiv = document.getElementById("button-div");

    buttonDiv.classList.add(
        "flex",
        "justify-center",
        "items-center",
        "mb-10",
        "mx-auto",
        "w-11/12",
        "flex-wrap",
        "gap-3"
    );

    for (const lessonTitle of lessonTitles) {
        const lessonButtons = document.createElement("div");

        lessonButtons.innerHTML = `
        	<button id="btn-${lessonTitle.level_no}" onclick="loadVocabularies(${lessonTitle.level_no}); disableInitialDisplay();" class="btn bg-white hover:bg-[#422AD5] text-[#422AD5] hover:text-white w-[150px]">
			<img src="./assets/fa-book-open.png" alt="" class="mix-blend-multiply">Lesson-${lessonTitle.level_no}
			</button>
        `;

        buttonDiv.appendChild(lessonButtons);
    }
}

// Load Vocabularies
function loadVocabularies(level) {
    showLoader();

    fetch(`https://openapi.programming-hero.com/api/level/${level}`)
        .then((response) => response.json())
        .then((receivedData) => {
            displayVocabularies(receivedData.data);
            removeActiveClass();
            const clickedButton = document.getElementById(`btn-${level}`);
            clickedButton.classList.add("active-button");
        })
        .catch(() => {})
        .finally(() => {
            hideLoader();
        });
}
loadVocabularies();

// Display Vocabularies
function displayVocabularies(vocabs) {
    const vocabDiv = document.getElementById("vocab-div");

    vocabDiv.innerHTML = "";

    if (
        vocabs.length === 0 &&
        document.getElementById("initial-display").style.display === "none"
    ) {
        vocabDiv.innerHTML = `
			<div class="bg-[#F8F8F8] py-20 rounded-3xl flex flex-col col-span-full items-center">
        	<img class="w-[120px]" src="./assets/alert-error.png" alt="">
        	<p class="hind-siliguri-font text-[#79716B] text-lg mb-4">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        	<p class="hind-siliguri-font text-4xl font-semibold">নেক্সট Lesson এ যান</p>
        	</div>
		`;
        return;
    }

    for (const vocab of vocabs) {
        vocabDiv.classList.add(
            "bg-[#F8F8F8]",
            "p-5",
            "rounded-2xl",
            "text-center",
            "grid",
            "grid-cols-1",
            "md:grid-cols-2",
            "lg:grid-cols-3",
            "gap-5"
        );

        const vocabCard = document.createElement("div");

        vocabCard.classList.add(
            "bg-white",
            "py-5",
            "px-3",
            "rounded-2xl",
            "flex",
            "flex-col",
            "justify-center",
            "gap-5",
            "hover:bg-[#00BCFF10]"
        );

        vocabCard.innerHTML = `
            <p class="text-2xl font-bold">${vocab.word}</p>
            <p class="text-sm font-semibold">Meaning / Pronunciation</p>
            <p class="text-[#00000080] text-xl font-semibold">"${
                vocab.meaning && vocab.meaning !== ""
                    ? vocab.meaning
                    : "অর্থ পাওয়া যায়নি"
            } / ${vocab.pronunciation}"</p>
            <div class="flex justify-between items-center px-5">
                <button onclick="loadVocabDetails(${
                    vocab.id
                })" class="bg-[#1A91FF20] p-2 rounded-md hover:bg-[#00BCFF60]"><img class="w-4 h-4 opacity-50"
                        src="./assets/information-button.png" alt=""></button>
                <button class="bg-[#1A91FF20] p-2 rounded-md hover:bg-[#00BCFF60]"><img class="w-4 h-4 opacity-50"
                        src="./assets/volume-up.png" alt=""></button>
            </div>
		`;

        vocabDiv.appendChild(vocabCard);
    }
}

// Load vocabulary details
function loadVocabDetails(id) {
    fetch(`https://openapi.programming-hero.com/api/word/${id}`)
        .then((response) => response.json())
        .then((receivedData) => displayVocabDetails(receivedData.data));
}

// Display vocabulary details
function displayVocabDetails(detail) {
    document.getElementById("vocab_details").showModal();
    const detailsDiv = document.getElementById("details-div");

    detailsDiv.innerHTML = `
        <p class="pb-5 text-3xl font-semibold">${
            detail.word
        } <img class="inline-block w-8 text-center" src="./assets/mic.png" alt="">: ${
        detail.pronunciation
    }</p>
        <p class="pb-1 text-xl font-semibold">Meaning</p>
        <p class="pb-5 text-lg font-medium">${
            detail.meaning && detail.meaning !== ""
                ? detail.meaning
                : "অর্থ পাওয়া যায়নি"
        }</p>
        <p class="pb-1 text-xl font-semibold">Example</p>
        <p class="pb-5">${detail.sentence}</p>
        <p class="pb-1 font-semibold">সমার্থক শব্দ গুলো</p>
	`;

    const synonymDiv = document.createElement("div");
    synonymDiv.classList.add(
        "flex",
        "flex-wrap",
        "justify-start",
        "items-center",
        "gap-3"
    );
    let synonyms = "";
    for (let i = 0; i < detail.synonyms.length; i++) {
        synonyms += `
            <p class="bg-[#1A91FF20] px-3 py-2 rounded-md">${detail.synonyms[i]}</p>
		`;
    }
    synonymDiv.innerHTML = synonyms;
    detailsDiv.appendChild(synonymDiv);
}

// FAQ button functionality
function faqSectionCall() {
    document
        .getElementById("faq-section")
        .scrollIntoView({ behavior: "smooth" });
}

// Vocab button functionality
function vocabSectionCall() {
    document
        .getElementById("vocab-section")
        .scrollIntoView({ behavior: "smooth" });
}

// Disable initial display
function disableInitialDisplay() {
    document.getElementById("initial-display").style.display = "none";
}

// Remove active buttons
function removeActiveClass() {
    const activeButtons = document.getElementsByClassName("active-button");

    for (const button of activeButtons) {
        button.classList.remove("active-button");
    }
}

// Storing login data on page load
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("isLoggedIn") === "true") {
        displaySections();
    }
});

// Login functionality
function loginFunctionality() {
    const nameField = document.getElementById("name-field").value;
    const passwordField = document.getElementById("password-field").value;

    if (nameField && passwordField) {
        localStorage.setItem("isLoggedIn", "true");

        alert("Successfully logging in!");
        displaySections();
    } else if (!nameField) {
        alert("Please type your Name");
    } else if (!passwordField) {
        alert("Please type your Password");
    } else {
        alert("Wrong password! Contact admin to get your Login Code");
    }
}

function displaySections() {
    document.getElementById("navbar-section").classList.remove("hidden");
    document.getElementById("vocab-section").classList.remove("hidden");
    document.getElementById("faq-section").classList.remove("hidden");
    document.getElementById("faq-section").classList.add("flex", "flex-col");
    document.getElementById("banner-section").classList.add("hidden");
    document.getElementById("logout-navbar").classList.add("hidden");
}

// Logout functionality
function logoutFunctionality() {
    localStorage.removeItem("isLoggedIn");

    alert("Please Confirm Logging Out");
    hideSections();
}

function hideSections() {
    document.getElementById("navbar-section").classList.add("hidden");
    document.getElementById("vocab-section").classList.add("hidden");
    document.getElementById("faq-section").classList.add("hidden");
    document.getElementById("banner-section").classList.remove("hidden");
}
