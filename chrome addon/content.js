// content.js
function setInputValue(selector, value) {
  const input = document.querySelector(selector);
  if (input) {
    input.value = value;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    console.log(`Set ${selector} to ${value}`);
  } else {
    console.error(`Input not found: ${selector}`);
  }
}

function fillCalculator() {
  console.log('Attempting to fill calculator fields...');
  
  setInputValue('input[name="confirmedOrdersPerc"]', 80);
  setInputValue('input[name="expectedDeliveryPerc"]', 50);
  setInputValue('input[name="adSpendsPerOrder"]', 40);

  console.log('Finished attempting to fill fields.');
}

function observeCalculatorWindow() {
  const targetNode = document.body;
  const config = { childList: true, subtree: true };

  const callback = function(mutationsList, observer) {
    for(let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        const calculatorWindow = document.querySelector('div.sticky.top-0.z-\\[500\\].bg-white');
        if (calculatorWindow) {
          console.log('Calculator window detected');
          setTimeout(fillCalculator, 1000); // Wait a bit for inputs to be fully loaded
          observer.disconnect(); // Stop observing once we've found the calculator
          break;
        }
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
  console.log('Started observing for calculator window');
}

console.log('Dynamic Price Calculator Autofill extension loaded');
observeCalculatorWindow();