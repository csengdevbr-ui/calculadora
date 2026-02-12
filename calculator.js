// Calculator State
const state = {
  current: '0',
  previous: null,
  operation: null,
  waitingForNewOperand: false,
  error: null
};

// DOM Elements
const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');

// Helper Functions
function formatNumber(numStr) {
  if (numStr === '' || numStr === '-') return numStr;
  const num = parseFloat(numStr);
  if (isNaN(num)) return numStr;

  // Handle large numbers or decimals
  if (Math.abs(num) >= 1e15 || (Math.abs(num) < 1e-10 && num !== 0)) {
    return num.toExponential(6);
  }

  // Format with commas for thousands (optional, keeping simple)
  // Return as is, maintaining decimal precision
  return num.toString();
}

function updateDisplay() {
  if (state.error) {
    display.textContent = state.error;
    display.style.color = '#ff3300';
  } else {
    display.textContent = formatNumber(state.current);
    display.style.color = '#00ff00';
  }

  if (state.previous !== null && state.operation) {
    const prevFormatted = formatNumber(state.previous);
    const opSymbol = getOperatorSymbol(state.operation);
    historyDisplay.textContent = `${prevFormatted} ${opSymbol}`;
  } else if (state.error) {
    historyDisplay.textContent = '';
  } else {
    historyDisplay.textContent = '';
  }
}

function getOperatorSymbol(op) {
  const symbols = {
    'add': '+',
    'subtract': '−',
    'multiply': '×',
    'divide': '÷'
  };
  return symbols[op] || op;
}

function inputDigit(digit) {
  if (state.waitingForNewOperand) {
    state.current = digit;
    state.waitingForNewOperand = false;
  } else {
    if (state.current === '0' && digit !== '0') {
      state.current = digit;
    } else if (state.current !== '0') {
      // Prevent overflow - max 16 digits
      if (state.current.replace(/[^0-9]/g, '').length < 16) {
        state.current += digit;
      }
    }
  }
  state.error = null;
}

function inputDecimal() {
  if (state.waitingForNewOperand) {
    state.current = '0.';
    state.waitingForNewOperand = false;
    state.error = null;
    return;
  }
  if (!state.current.includes('.')) {
    state.current += '.';
  }
}

function clearAll() {
  state.current = '0';
  state.previous = null;
  state.operation = null;
  state.waitingForNewOperand = false;
  state.error = null;
}

function clearEntry() {
  state.current = '0';
  state.error = null;
}

function backspace() {
  if (state.waitingForNewOperand) return;
  if (state.current.length === 1 || state.current === '0') {
    state.current = '0';
  } else {
    state.current = state.current.slice(0, -1);
  }
}

function toggleSign() {
  if (state.current === '0' || state.current === '') return;
  if (state.current.startsWith('-')) {
    state.current = state.current.substring(1);
  } else {
    state.current = '-' + state.current;
  }
}

function inputPercent() {
  const value = parseFloat(state.current);
  if (isNaN(value)) return;
  state.current = (value / 100).toString();
}

function inputReciprocal() {
  const value = parseFloat(state.current);
  if (isNaN(value)) return;
  if (value === 0) {
    state.error = 'Cannot divide by zero';
    return;
  }
  state.current = (1 / value).toString();
}

function inputSquare() {
  const value = parseFloat(state.current);
  if (isNaN(value)) return;
  const result = value * value;
  if (Math.abs(result) > 1e15) {
    state.error = 'Overflow';
    return;
  }
  state.current = result.toString();
}

function inputSqrt() {
  const value = parseFloat(state.current);
  if (isNaN(value)) return;
  if (value < 0) {
    state.error = 'Invalid input';
    return;
  }
  state.current = Math.sqrt(value).toString();
}

function performOperation(nextOperation) {
  const inputValue = parseFloat(state.current);

  if (state.operation && state.waitingForNewOperand) {
    state.operation = nextOperation;
    return;
  }

  if (state.previous !== null && state.operation && !state.waitingForNewOperand) {
    const result = calculate(state.previous, inputValue, state.operation);
    if (result === null) {
      // Division by zero handled in calculate
      state.current = state.previous;
      state.waitingForNewOperand = true;
      return;
    }
    state.current = result.toString();
    state.previous = result;
  } else {
    state.previous = inputValue;
  }

  state.waitingForNewOperand = true;
  state.operation = nextOperation;
}

function calculate(prev, current, op) {
  switch (op) {
    case 'add':
      return prev + current;
    case 'subtract':
      return prev - current;
    case 'multiply':
      return prev * current;
    case 'divide':
      if (current === 0) {
        state.error = 'Cannot divide by zero';
        return null;
      }
      return prev / current;
    default:
      return current;
  }
}

function performEquals() {
  if (!state.operation || state.previous === null) return;

  const inputValue = parseFloat(state.current);
  const result = calculate(state.previous, inputValue, state.operation);

  if (result === null) {
    state.current = state.previous.toString();
  } else {
    state.current = result.toString();
  }

  state.previous = null;
  state.operation = null;
  state.waitingForNewOperand = true;
}

// Event Delegation
document.querySelector('.buttons').addEventListener('click', (e) => {
  if (!e.target.classList.contains('btn')) return;

  const btn = e.target;
  const action = btn.dataset.action;
  const value = btn.dataset.value;

  if (value !== undefined) {
    inputDigit(value);
    updateDisplay();
    return;
  }

  switch (action) {
    case 'add':
    case 'subtract':
    case 'multiply':
    case 'divide':
      performOperation(action);
      break;
    case 'equals':
      performEquals();
      break;
    case 'clear':
      clearAll();
      break;
    case 'clearEntry':
      clearEntry();
      break;
    case 'backspace':
      backspace();
      break;
    case 'decimal':
      inputDecimal();
      break;
    case 'percent':
      inputPercent();
      break;
    case 'reciprocal':
      inputReciprocal();
      break;
    case 'square':
      inputSquare();
      break;
    case 'sqrt':
      inputSqrt();
      break;
    case 'toggleSign':
      toggleSign();
      break;
  }

  updateDisplay();
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  const key = e.key;
  if (/[0-9]/.test(key)) {
    inputDigit(key);
  } else if (key === '.') {
    inputDecimal();
  } else if (key === '+') {
    performOperation('add');
  } else if (key === '-') {
    performOperation('subtract');
  } else if (key === '*' || key === 'x' || key === 'X') {
    performOperation('multiply');
  } else if (key === '/') {
    e.preventDefault();
    performOperation('divide');
  } else if (key === 'Enter' || key === '=') {
    performEquals();
  } else if (key === '%') {
    inputPercent();
  } else if (key === 'Escape') {
    clearAll();
  } else if (key === 'Backspace') {
    backspace();
  }
  updateDisplay();
});

// Initialize
updateDisplay();
