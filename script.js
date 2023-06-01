const characters = [["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?",
    "/"]];

const generateBtn = document.getElementById("generate-btn")
const resetBtn = document.getElementById("Reset-btn")
const lengthSlider = document.querySelector("input[type=range]")
const upperCheck = document.getElementById("uppercase-chk");
const lowerCheck = document.getElementById("lowercase-chk");
const numberCheck = document.getElementById("number-chk");
const symbolCheck = document.getElementById("symbol-chk");
const checks = [upperCheck, lowerCheck, numberCheck, symbolCheck];

const copyPassword1 = document.getElementById("copy-icon-1");
const copyPassword2 = document.getElementById("copy-icon-2");

const defaultLengthValue = lengthSlider.value;
const lengthLbl = document.getElementById("slider-lbl")
lengthLbl.textContent = lengthSlider.value;

const space1 = document.getElementById("empty-space-1");
const space2 = document.getElementById("empty-space-2");


function generatePassword(length) {
    let password = ""
    let allowedSets = [];
    for (let i = 0; i < checks.length; i++) {
        if (checks[i].checked) allowedSets.push(i);
    }

    if (allowedSets.length === 0) return password;
    for (let i = 0; i < length; i++) {
        let randomSet = Math.floor(Math.random() * allowedSets.length);
        let randomIndex = Math.floor(Math.random() * characters[allowedSets[randomSet]].length);
        password += characters[allowedSets[randomSet]][randomIndex];
    }
    return password;
}

generateBtn.addEventListener("click", () => {
    const length = lengthSlider.value;
    space1.textContent = generatePassword(length);
    space2.textContent = generatePassword(length);
    if(space1.textContent)
    {
        generateBtn.classList.add("disable");
        generateBtn.disabled = true;
    }
})

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
})

lengthSlider.addEventListener("input", () => {
    lengthLbl.textContent = lengthSlider.value;
})

copyPassword1.addEventListener("click", () => {
    if(space1.textContent)
    {
        navigator.clipboard.writeText(space1.textContent);
        alert("Password copied to ClipBoard");
    }
})

copyPassword2.addEventListener("click", () => {
    if(space2.textContent)
    {
        navigator.clipboard.writeText(space2.textContent);
        alert("Password copied to ClipBoard");
    }
})
