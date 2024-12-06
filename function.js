gamePlus = 1;
localStorage.setItem("gamePlus", gamePlus)

//Homepage
function start(){
	window.location.href = "character.html";
}

//Character
function picture() {
	let gender = document.getElementById("gender");
	let pf = document.getElementById("profile")

	// 根据选项设置图片路径
	if (gender.value === "female") {
	pf.src = "female.png"; // 替换为实际图片路径
	} 
	else {
	pf.src = "male.png"; // 替换为实际图片路径
	}
}

function generate() {
	const attributes = [
	"physique", "constitution", "appearance", "charm", "sanity", 
	"intelligence", "strength", "mana", "morality", "reputation", 
	"authority", "wealth"
	];

	for(let attr of attributes){
		let value = Math.floor(Math.random() * 11) * 10; // 始终生成新值
		if (value == 0){
			value += 10
		}
		if (attr === "wealth"){
			value *= 10
		}
		localStorage.setItem(attr, JSON.stringify(value));
		document.getElementById(attr).innerText = value;
	}

	document.getElementById("next").disabled = true;

}

function single(attr) {
	let value = Math.floor(Math.random() * 11) * 10; // 始终生成新值
	if (value == 0){
  		value += 10
  	}
  	if (attr === "wealth"){
  		value *= 10
  	}
  	localStorage.setItem(attr, JSON.stringify(value));
  	document.getElementById(attr).innerText = value;
  	document.getElementById("next").disabled = true;

}

function confirmAttr(){
	let n;
	let fn = document.getElementById("fn").value
	let ln = document.getElementById("ln").value
	localStorage.setItem("First Name", fn);
  	localStorage.setItem("Family Name", ln);

	if (fn == "" || ln == "") {
		alert("Fill in your NAME")
	}
	if (gamePlus == 1) {
		if (ln == "Serenade" || ln == "Solemanis" || ln == "Adalric") {
			alert("Invalid Name")
		}
	}

	let age = document.getElementById("age").value
	localStorage.setItem("Age", age);

	let race = document.getElementById("race")
	localStorage.setItem("race", race);
	if (race.value === "pureBlood") {
		p = parseInt(localStorage.getItem("authority"))
		p += 20
		if (p > 100) {
			p = 100
		}
		document.getElementById("authority").innerText = p;
		localStorage.setItem("authority", p);
		
		n = parseInt(localStorage.getItem("constitution"))
		n -= 20
		if (n < 10) {
			n = 10
		}
		document.getElementById("constitution").innerText = n;
		localStorage.setItem("constitution", n);
	}

	else if (race.value === "human") {
		p = parseInt(localStorage.getItem("strength"))
		p += 20
		if (p > 100) {
			p = 100
		}
		document.getElementById("strength").innerText = p;
		localStorage.setItem("strength", p);

		n = localStorage.getItem("authority")
		n -= 20
		if (n < 10) {
			n = 10
		}
		document.getElementById("authority").innerText = n;
		localStorage.setItem("authority", n);
	}

	else if (race.value === "chimera") {
		p = parseInt(localStorage.getItem("sanity"))
		p += 20
		if (p > 100) {
			p = 100
		}
		document.getElementById("sanity").innerText = p;
		localStorage.setItem("sanity", p);

		n = localStorage.getItem("reputation")
		n -= 20
		if (n < 10) {
			n = 10
		}
		document.getElementById("reputation").innerText = n;
		localStorage.setItem("reputation", n);
	}

	else if (race.value === "MordriaPB") {
		p = parseInt(localStorage.getItem("mana"))
		p += 30
		if (p > 100) {
			p = 100
		}
		document.getElementById("mana").innerText = p;
		localStorage.setItem("mana", p);

		n = localStorage.getItem("constitution")
		n -= 30
		if (n < 10) {
			n = 10
		}
		document.getElementById("constitution").innerText = n;
		localStorage.setItem("constitution", n);
	}

	else if (race.value === "MordriaH") {
		p = parseInt(localStorage.getItem("strength"))
		p += 30
		if (p > 100) {
			p = 100
		}
		document.getElementById("strength").innerText = p;
		localStorage.setItem("strength", p);

		n = localStorage.getItem("intelligence")
		n -= 30
		if (n < 10) {
			n = 10
		}
		document.getElementById("intelligence").innerText = n;
		localStorage.setItem("intelligence", n);
	}

	else if (race.value === "MordriaC") {
		p = parseInt(localStorage.getItem("mana"))
		p += 30
		if (p > 100) {
			p = 100
		}
		document.getElementById("mana").innerText = p;
		localStorage.setItem("mana", p);

		n = localStorage.getItem("sanity")
		n -= 30
		if (n < 10) {
			n = 10
		}
		document.getElementById("sanity").innerText = n;
		localStorage.setItem("sanity", n);

	}

	document.getElementById("next").disabled = false;
}

function nextStep(){
	window.location.href = "prologue.html"
}

// Prologue
// Text array for dialogue
// Text array for dialogue
const dialogueTexts = [
	"As fate had intended, you received an enrollment ring from Arcanuscalae.",
	"Also arriving was a Student Handbook.",
	"Student Handbook",
	"Introduction to the Academy",
	"Welcome to the Arcanuscalae Academy for wizards from all over the world! Whether you come from a rich magical family or are a commoner from the main world, as long as you have the talent to manipulate magic, you are welcome at Akanas Kare.",
	"Our school has a long history, founded and established by Llywelyn, a famous archmage in the wizarding world, with a glorious history of 290 years. The academy is dedicated to exploring and mastering the mysteries of magic in order to ward off possible future disasters.",
	"Academic Program",
	"Arcanuscalae Academy operates on a seven-year academic system, with the 160 days of each academic year divided into four semesters of 40 days each. Each semester, students may choose up to three general education or major courses, plus two electives.",
	"The first two years of the freshman year are devoted to general education courses, which provide a solid foundation for the major courses in their respective colleges. The next five years focus on the major courses, which include a large practical component in addition to more in-depth theoretical knowledge.",
	"Students' classroom performance and regular grades will be recorded, and every two semesters a major examination will be held, the results of which will be used to assess the student's overall performance. At the end of each academic year, students will receive a grade for a fully completed course.",
	"Your course attendance and grade point average will be recorded, so please organize your time wisely.",
	"Now, get ready for your first day at Arcanuscalae."
];

let dialogueIndex = 0; // Track which dialogue to show
let charIndex = 0; // Track character being displayed
let interval; // Store interval ID for typing effect
let pause = false;

function displayText(text, elementId, callback) {
  const element = document.getElementById(elementId);
  element.textContent = ""; // Clear any previous text
  charIndex = 0;

  // Start typing one character at a time
  typingInterval = setInterval(() => {
    if (charIndex < text.length) {
      element.textContent += text[charIndex];
      charIndex++;
    } 
    else {
      clearInterval(typingInterval); // Stop typing
      document.getElementById("next-indicator").style.display = "inline"; // Show '→'
      if (callback) callback();
    }
  }, 20); // Typing speed (in ms)
}

// Function to handle next dialogue
function nextDialogue() {
	// If text is still being typed, finish typing instantly
	if (charIndex < dialogueTexts[dialogueIndex].length) {
	clearInterval(typingInterval);
	document.getElementById("text").textContent = dialogueTexts[dialogueIndex];
	charIndex = dialogueTexts[dialogueIndex].length; // Mark as completed
	document.getElementById("next-indicator").style.display = "inline";
	return;
	}

	// Hide '→' and move to next dialogue or loop
	document.getElementById("next-indicator").style.display = "none";

	// Move to the next dialogue or loop back to the first one
	dialogueIndex++;
	if (dialogueIndex == 2) {
		pause = true;
		document.getElementById("choice1").style.display = "block";
		document.getElementById("choice2").style.display = "block";
	}
	if (dialogueIndex == 11) {
		pause = true;
		document.getElementById("choice1").innerText = "Read Again";
		document.getElementById("choice1").style.display = "block";
		document.getElementById("choice2").innerText = "Got It";
		document.getElementById("choice2").style.display = "block";
	}

	if (dialogueIndex == 12) {
		pause = true;
		document.getElementById("choice3").style.display = "block";
	}

	// Display next dialogue
	
	if(pause != true){
		displayText(dialogueTexts[dialogueIndex], "text");
	}
}

function read(){
	document.getElementById("choice1").style.display = "none";
	document.getElementById("choice2").style.display = "none";

	pause = false;

	dialogueIndex = 2;

	displayText(dialogueTexts[2], "text");
}

function prologueEnd(){
	document.getElementById("choice1").style.display = "none";
	document.getElementById("choice2").style.display = "none";
	document.getElementById("ring").style.display = "none";
	document.getElementById("gate").style.display = "block";
	pause = false;

	dialogueIndex = 11;

	displayText(dialogueTexts[11], "text");
}
