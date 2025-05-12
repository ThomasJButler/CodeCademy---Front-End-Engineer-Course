// Handle form submission
async function validateCard(event) {
  event.preventDefault();
  
  const input = document.getElementById('cardInput');
  const display = document.getElementById('result');
  
  // Basic validation
  if (input.value.length !== 16) {
    display.className = 'result';
    setTimeout(() => {
      display.textContent = 'Please enter a 16-digit card number';
      display.classList.add('show', 'invalid');
    }, 10);
    return;
  }
  
  try {
    const response = await fetch(`/validate?card=${input.value}`);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const result = await response.json();
    display.className = 'result';
    
    setTimeout(() => {
      if (result.brand === 'Unsupported') {
        display.textContent = 'Only VISA or Mastercard supported';
        display.classList.add('show', 'invalid');
      } else {
        display.textContent = `${result.brand}: ${result.valid ? 'Valid' : 'Invalid'} Card`;
        display.classList.add('show', result.valid ? 'valid' : 'invalid');
      }
    }, 10);
  } catch (error) {
    display.className = 'result';
    setTimeout(() => {
      display.textContent = 'An error occurred. Please try again.';
      display.classList.add('show', 'invalid');
    }, 10);
  }
}

// Toggle password visibility
function toggleNumberVisibility() {
  const input = document.getElementById('cardInput');
  const button = document.querySelector('.toggle-visibility .show-text');
  
  if (input.type === 'password') {
    input.type = 'text';
    button.textContent = 'Hide';
  } else {
    input.type = 'password';
    button.textContent = 'Show';
  }
}

// Format card number as user types
document.getElementById('cardInput').addEventListener('input', function(e) {
  // Remove any non-digit characters
  let value = this.value.replace(/\D/g, '');
  this.value = value;
  
  // Update validity state for accessibility
  this.setAttribute('aria-invalid', value.length !== 16 ? 'true' : 'false');
});

// Handle keyboard accessibility for the show/hide button
document.querySelector('.toggle-visibility').addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    this.click();
  }
});

