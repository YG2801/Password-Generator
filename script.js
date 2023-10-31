import characters from "./data.js";

const generateBtn = document.getElementById("generate-btn");
const resetBtn = document.getElementById("Reset-btn");
const lengthSlider = document.querySelector("input[type=range]");
const upperCheck = document.getElementById("uppercase-chk");
const lowerCheck = document.getElementById("lowercase-chk");
const numberCheck = document.getElementById("number-chk");
const symbolCheck = document.getElementById("symbol-chk");
const checks = [upperCheck, lowerCheck, numberCheck, symbolCheck];

const copyPassword1 = document.getElementById("copy-icon-1");
const copyPassword2 = document.getElementById("copy-icon-2");

const defaultLengthValue = lengthSlider.value;
const lengthLbl = document.getElementById("slider-lbl");
lengthLbl.textContent = lengthSlider.value;

const space1 = document.getElementById("empty-space-1");
const space2 = document.getElementById("empty-space-2");

function generatePassword(length) {
    let password = "";
    let allowedSets = [];
    for (let i = 0; i < checks.length; i++) {
        if (checks[i].checked) allowedSets.push(i);
    }

    if (allowedSets.length === 0) return password;
    for (let i = 0; i < length; i++) {
        let randomSet = Math.floor(Math.random() * allowedSets.length);
        let randomIndex = Math.floor(
            Math.random() * characters[allowedSets[randomSet]].length
        );
        password += characters[allowedSets[randomSet]][randomIndex];
    }
    return password;
}

generateBtn.addEventListener("click", () => {
    const length = lengthSlider.value;
    space1.textContent = generatePassword(length);
    space2.textContent = generatePassword(length);
    if (space1.textContent) {
        generateBtn.classList.add("disable");
        generateBtn.disabled = true;
    }
});

resetBtn.addEventListener("click", () => {
    lengthSlider.value = defaultLengthValue;
    lengthLbl.textContent = defaultLengthValue;
    upperCheck.checked = true;
    lowerCheck.checked = false;
    numberCheck.checked = false;
    symbolCheck.checked = false;
    space1.textContent = "";
    space2.textContent = "";
    generateBtn.classList.remove("disable");
    generateBtn.disabled = false;
});

lengthSlider.addEventListener("input", () => {
    lengthLbl.textContent = lengthSlider.value;
});

const copyPrompt = document.getElementById("copy-prompt");

copyPassword1.addEventListener("click", () => {
    if (space1.textContent) {
        navigator.clipboard.writeText(space1.textContent);
        copyPrompt.classList.add("show-copy-prompt");
        setTimeout(() => {
            copyPrompt.classList.remove("show-copy-prompt");
        }, 1000);
    }
});

copyPassword2.addEventListener("click", () => {
    if (space2.textContent) {
        navigator.clipboard.writeText(space2.textContent);
        copyPrompt.classList.toggle("show-copy-prompt");
        setTimeout(() => {
            copyPrompt.classList.remove("show-copy-prompt");
        }, 1000);
    }
});
