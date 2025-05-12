/**
 * Validates a credit card number using the Luhn algorithm
 * @param {string} cardNumber - The credit card number to validate
 * @returns {boolean} - True if valid, false if invalid
 */
function validateLuhn(cardNumber) {
  const digits = cardNumber.split('').reverse().map(Number);
  let sum = 0;
  
  for (let i = 0; i < digits.length; i++) {
    let val = digits[i];
    if (i % 2 !== 0) {
      val *= 2;
      if (val > 9) val -= 9;
    }
    sum += val;
  }

  return sum % 10 === 0;
}

/**
 * Determines the brand of a credit card based on its first digits
 * @param {string} cardNumber - The credit card number to check
 * @returns {string} - The brand name (VISA, Mastercard, or Unsupported)
 */
function getCardBrand(cardNumber) {
  if (/^4/.test(cardNumber)) return 'VISA';
  if (/^5[1-5]/.test(cardNumber)) return 'Mastercard';
  return 'Unsupported';
}

module.exports = { validateLuhn, getCardBrand };
