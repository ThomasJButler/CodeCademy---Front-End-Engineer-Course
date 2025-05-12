
🧠 THE DEEPCODE PROJECT PLAN

P. Aequor Terminal DNA Simulator
💻 Built with: Vanilla JS, HTML, CSS
🎯 Output: Styled browser console only
🇬🇧 UK English throughout
📚 Learning-focused comments & structure

⸻

📂 PROJECT STRUCTURE

deepcode-terminal/
├── index.html
├── style.css
├── script.js               # Entry point - triggers auto-run
├── src/
│   └── pAequorFactory.js   # All DNA logic & organism methods
├── README.md               # Dev guide
├── USER_GUIDE.md           # Non-technical lab-style walkthrough
└── notes.txt               # (Optional) Dev notes, ideas, experiments


⸻

🗂️ FILE BREAKDOWN

index.html

Minimal shell to trigger simulation and cue user to open console.

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Deepcode Console</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <main>
    <h1>🧬 Deepcode: Terminal Interface</h1>
    <p>Open your browser console to observe P. aequor simulations.</p>
  </main>
  <script src="script.js" type="module"></script>
</body>
</html>


⸻

style.css

Clean, sci-fi terminal aesthetics.

body {
  background-color: #0b0c10;
  color: #66fcf1;
  font-family: 'Courier New', Courier, monospace;
  text-align: center;
  padding: 2rem;
}

h1 {
  color: #c5c6c7;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

p {
  color: #45a29e;
  font-style: italic;
}


⸻

script.js
	•	Imports pAequorFactory.js
	•	Auto-runs a simulation on page load
	•	Logs to console with stylised formatting
	•	Exposes functions globally for manual testing

⸻

src/pAequorFactory.js

The logic core.

// Exports factory function and helper methods:
// - returnRandBase()
// - mockUpStrand()
// - pAequorFactory(specimenNum, dna)
// Object methods: .mutate(), .compareDNA(), .willLikelySurvive()
// Bonus: .complementStrand() (optional)

Every function will be:
	•	Purely written
	•	Clearly named
	•	Commented in UK English with “what this does” + “why it’s here”

⸻

README.md (Technical Dev Doc)

Includes:
	•	What the project is
	•	How it works (code-wise)
	•	How to run it
	•	Function reference
	•	Future ideas (stretch goals you might want later)

⸻

USER_GUIDE.md (Non-technical Lab Sheet)

Written as if you’re briefing new researchers.
Includes:
	•	What P. aequor is
	•	What this tool simulates
	•	How to observe outputs
	•	What the logs mean
	•	Lab instructions in layman’s terms

⸻

notes.txt (Optional)

Space for:
	•	Questions you had
	•	Things you want to improve
	•	Things you learned
	•	Commands to try manually like:

generateSpecimen(21)
mutateSpecimen(21)
compareTwo(21, 7)



⸻

🎯 UX GOALS
	•	Console-first: no DOM interaction, just a styled dev console.
	•	Immersive tone: logs feel like you’re inside a lab system
	•	Visually clear: use console.log() spacing, dividers, emojis, etc.
	•	Learning-based code: everything commented, nothing rushed
	•	Self-contained: all in-browser, no server or build tools needed

⸻

🔁 Core Simulation Flow (Auto-run)
	1.	Boot simulation
	2.	Generate 30 viable specimens
	3.	Log each to console:
	•	ID
	•	DNA string
	•	Survival odds
	•	Comment
	4.	Optionally:
	•	Compare two specimens
	•	Mutate one
	•	View complementary strand

⸻

🧬 Example Console Output (Mock)

🧬 Initiating P. aequor DNA Simulation...

> Generating viable specimen #7...

  DNA:  C-G-G-T-C-C-A-C-G-T-G-C-T-A-C
  Comp: G-C-C-A-G-G-T-G-C-A-C-G-A-T-G
  C/G Count: 11 / 15 (73.3%)
  Status: ✅ SURVIVAL LIKELY
  🧪 "Specimen #7 is a real tank — solid slime DNA."

--------------------------------------------------

> Comparing specimen #7 with #12...
  DNA match: 9 / 15 bases (60%)
  🧪 "Moderate similarity — could share a clonal ancestor."


⸻

✅ Project Objectives Recap
	•	✔️ Build in pure vanilla JS
	•	✔️ Learn by doing, with zero shortcuts
	•	✔️ UK English comments and logs
	•	✔️ Immersive, clean experience
	•	✔️ Feels like your own system

⸻

