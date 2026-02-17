const form = document.getElementById("passwordForm");
const passInput = document.getElementById("passwordInput");
const regexInput = document.getElementById("regexInput");
const regexDisplay = document.getElementById("regexDisplay");
const challengeCheck = document.getElementById("challengeCheck");
const difficultyRadios = document.querySelectorAll('input[name="difficulty"]');

let defaultRegexText = "^.{7}\\d$";
const regexFormatCheck = /^(\^.*\$)$/;

//Challenge
challengeCheck.addEventListener('change', () => {
  if (challengeCheck.checked) {
    difficultyRadios.forEach(r => r.disabled = false);
    difficultyRadios[0].checked = true;
    generatePassword(difficultyRadios[0].value);
  } else {
    passInput.value = '';
    difficultyRadios.forEach(r => {
      r.disabled = true;
      r.checked = false;
    });
  }
});

difficultyRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    if (challengeCheck.checked) {
      generatePassword(radio.value);
    }
  });
});

//For psw generation
const lettersLower = 'abcdefghijklmnopqrstuvwxyz';
const lettersUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const digits = '0123456789';
const specials = '!@#$%^&*()_+-={}[]|:;<>,.?/';
const unicodeAccents = 'áéíóöőúüű';
const whitespace = ' \t\n';

function randomChar(str) {
  return str[Math.floor(Math.random() * str.length)];
}

//Password generate
function generatePassword(level) {
  let pwd = '';
  switch(level) {
    case 'easy': 
      for(let i = 0; i < 6; i++) pwd += randomChar(lettersLower + lettersUpper + digits);
      break;
    case 'medium': 
      const charsMed = lettersLower + lettersUpper + digits + specials;
      const lenMed = 8 + Math.floor(Math.random()*3); // 8-10 karakter
      for(let i=0;i<lenMed;i++) pwd += randomChar(charsMed);
      break;
    case 'hard': 
      const charsHard = lettersLower + lettersUpper + digits + specials + unicodeAccents + whitespace;
      const lenHard = 10 + Math.floor(Math.random()*6); // 10-15 karakter
      for(let i=0;i<lenHard;i++) pwd += randomChar(charsHard);
      break;
  }
  passInput.value = pwd;
}

//Submit
form.addEventListener("submit", function(e) {
  e.preventDefault();

  let regexText = regexInput.value.trim();
  if (regexText === "") regexText = defaultRegexText;

  if (!regexFormatCheck.test(regexText)) {
    alert("A regex legyen teljesen beírva (^ ... $)!");
    return;
  }

  const password = passInput.value;

  try {
    const regexPattern = new RegExp(regexText);
    regexDisplay.textContent = "Aktuális regex: " + regexPattern;

    if (regexPattern.test(password)) {
      alert("Helyes! A jelszó beírható ezzel a mintával\n\nAktuális regex: " + regexPattern);
    } else {
      alert("Nem lesz jó. Ez a jelszó nem megfelelő a mintához.\n\nAktuális regex: " + regexPattern);
    }

    defaultRegexText = regexText;

  } catch (err) {
    alert("Ezt hogy sikerült? ⚰️\n\nTöltsd újra az oldalt.\n\n" + err.message);
  }
});

//Button inputs for typing
let activeInput = null;

  const inputs = document.querySelectorAll("#regexInput, #passwordInput");
  const buttons = document.querySelectorAll(".regex-buttons button");

  inputs.forEach(input => {
    input.addEventListener("focus", () => {
      activeInput = input;
    });
  });

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (!activeInput) return;

      const text = btn.dataset.insert;
      const start = activeInput.selectionStart;
      const end = activeInput.selectionEnd;
      const value = activeInput.value;

      activeInput.value =
        value.substring(0, start) +
        text +
        value.substring(end);

      const newPos = start + text.length;
      activeInput.setSelectionRange(newPos, newPos);
      activeInput.focus();
    });
  });

//Pickr
    const bgSwatch = document.getElementById('bgSwatch');
    const themeSwatch = document.getElementById('themeSwatch');

    bgSwatch.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim() || '#ffffff';
    themeSwatch.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--color-theme').trim() || '#4CAF50';

    const pickrBg = Pickr.create({
      el: '#bgSwatch',
      theme: 'classic',
      default: bgSwatch.style.backgroundColor,
      components: {
        preview: true,
        opacity: false,
        hue: true,
        interaction: { hex: true, input: true, save: true }
      }
    });

    pickrBg.on('save', (color) => {
      const hex = color.toHEXA().toString();
      document.documentElement.style.setProperty('--color-bg', hex);
      bgSwatch.style.backgroundColor = hex;
      pickrBg.hide();
    });

    const pickrTheme = Pickr.create({
      el: '#themeSwatch',
      theme: 'classic',
      default: themeSwatch.style.backgroundColor,
      components: {
        preview: true,
        opacity: false,
        hue: true,
        interaction: { hex: true, input: true, save: true }
      }
    });

    pickrTheme.on('save', (color) => {
      const hex = color.toHEXA().toString();
      document.documentElement.style.setProperty('--color-theme', hex);
      themeSwatch.style.backgroundColor = hex;
      pickrTheme.hide();
    });