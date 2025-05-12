// 🧬 P. aequor DNA Simulation
// Terminal-based genetic research tool for studying mysterious deep-sea organisms

import { pAequorFactory, mockUpStrand } from './src/pAequorFactory.js';

// Console styling configuration
const styles = {
  title: 'color: #66fcf1; font-size: 14px; font-weight: bold;',
  specimen: 'color: #45a29e;',
  dna: 'color: #c5c6c7;',
  success: 'color: #66fcf1;',
  warning: 'color: #fc6666;',
  divider: '—'.repeat(50)
};

// Collection of British-flavoured scientific comments
const scientificComments = [
  "Brilliant specimen! The slime is strong with this one.",
  "Absolutely stunning DNA configuration. Simply gorgeous!",
  "This one's got proper survival instincts, mate.",
  "A rather splendid example of genetic fortitude.",
  "Quite the resilient little blob we've got here."
];

// Generate viable specimens and log their analysis
const generateViableSpecimens = (count) => {
  const specimens = [];
  let specimenNum = 1;

  console.log('%c🧬 Initiating P. aequor DNA Simulation...', styles.title);
  console.log('%c  Generating viable specimens...', styles.specimen);

  while (specimens.length < count) {
    const specimen = pAequorFactory(specimenNum, mockUpStrand());
    const survivalData = specimen.willLikelySurvive();
    
    if (survivalData.survives) {
      specimens.push(specimen);
      
      console.log(`%c${styles.divider}`, styles.dna);
      console.log(`%c📋 Specimen #${specimenNum} Analysis:`, styles.title);
      console.log(`%c  DNA: ${specimen.toString()}`, styles.dna);
      console.log(`%c  Complementary: ${specimen.complementStrand().join('-')}`, styles.dna);
      console.log(
        `%c  C/G Count: ${survivalData.cgCount}/${specimen.dna.length} (${survivalData.survivalChance.toFixed(1)}%)`,
        styles.specimen
      );
      console.log(`%c  Status: ✅ SURVIVAL LIKELY`, styles.success);
      console.log(
        `%c  🧪 "${scientificComments[Math.floor(Math.random() * scientificComments.length)]}"`,
        styles.specimen
      );
    }
    specimenNum++;
  }

  return specimens;
};

// Compare two specimens and log their similarity
const compareSpecimens = (specimen1, specimen2) => {
  const comparison = specimen1.compareDNA(specimen2);
  console.log(`%c${styles.divider}`, styles.dna);
  console.log(
    `%c🧬 Comparing specimen #${specimen1.specimenNum} with specimen #${specimen2.specimenNum}...`,
    styles.title
  );
  console.log(
    `%c  DNA match: ${comparison.matches}/${specimen1.dna.length} bases (${comparison.percentage}%)`,
    styles.specimen
  );
};

// Run the simulation
const runSimulation = async () => {
  const specimens = generateViableSpecimens(30);

  // Compare a random pair of specimens
  const specimen1 = specimens[Math.floor(Math.random() * specimens.length)];
  const specimen2 = specimens[Math.floor(Math.random() * specimens.length)];
  if (specimen1.specimenNum !== specimen2.specimenNum) {
    compareSpecimens(specimen1, specimen2);
  }

  console.log(`%c${styles.divider}`, styles.dna);
  console.log('%c✨ Simulation complete! All specimens catalogued.', styles.title);
};

// Start the simulation when the page loads
window.addEventListener('load', runSimulation);
