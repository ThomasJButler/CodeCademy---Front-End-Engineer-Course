// 🧬 P. aequor DNA Factory
// Core DNA manipulation and analysis logic for the mysterious organism, this was really fun to implement!

// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Factory function to create P. aequor specimens
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    
    // Mutates a random base in the DNA strand
    mutate() {
      const randIndex = Math.floor(Math.random() * this.dna.length);
      const currentBase = this.dna[randIndex];
      const possibleBases = ['A', 'T', 'C', 'G'].filter(base => base !== currentBase);
      this.dna[randIndex] = possibleBases[Math.floor(Math.random() * 3)];
      return this.dna;
    },

    // Compares DNA with another specimen
    compareDNA(otherOrganism) {
      let matches = 0;
      this.dna.forEach((base, index) => {
        if (base === otherOrganism.dna[index]) matches++;
      });
      const percentage = ((matches / this.dna.length) * 100).toFixed(1);
      return { matches, percentage };
    },

    // Checks if specimen has >60% C or G bases
    willLikelySurvive() {
      const cgCount = this.dna.filter(base => base === 'C' || base === 'G').length;
      const survivalChance = (cgCount / this.dna.length) * 100;
      return { 
        survives: survivalChance >= 60,
        cgCount,
        survivalChance
      };
    },

    // Returns complementary DNA strand (bonus feature)
    complementStrand() {
      const complementMap = { A: 'T', T: 'A', C: 'G', G: 'C' };
      return this.dna.map(base => complementMap[base]);
    },

    // Returns formatted DNA string for display
    toString() {
      return this.dna.join('-');
    }
  };
};

// Export the factory and helper functions
export { pAequorFactory, returnRandBase, mockUpStrand };
