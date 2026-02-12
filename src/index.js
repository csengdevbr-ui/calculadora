// Basic Calculator
// Supports addition, subtraction, multiplication, division

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

// Parse arguments
function parseArgs(argv) {
  const args = argv.slice(2);
  if (args.length === 0) {
    return null; // interactive mode
  }

  const operation = args[0];
  const a = parseFloat(args[1]);
  const b = parseFloat(args[2]);

  if (isNaN(a) || isNaN(b)) {
    throw new Error('Invalid numbers');
  }

  return { operation, a, b };
}

// Interactive mode
function interactive() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function prompt() {
    rl.question('Enter operation (add/subtract/multiply/divide) or "quit": ', (op) => {
      if (op === 'quit') {
        rl.close();
        return;
      }
      rl.question('Enter first number: ', (aStr) => {
        rl.question('Enter second number: ', (bStr) => {
          const a = parseFloat(aStr);
          const b = parseFloat(bStr);
          if (isNaN(a) || isNaN(b)) {
            console.log('Invalid numbers');
          } else {
            try {
              let result;
              switch (op) {
                case 'add':
                  result = add(a, b);
                  break;
                case 'subtract':
                  result = subtract(a, b);
                  break;
                case 'multiply':
                  result = multiply(a, b);
                  break;
                case 'divide':
                  result = divide(a, b);
                  break;
                default:
                  console.log('Unknown operation');
                  prompt();
                  return;
              }
              console.log(`Result: ${result}`);
            } catch (e) {
              console.log(`Error: ${e.message}`);
            }
          }
          prompt();
        });
      });
    });
  }

  console.log('Calculator Interactive Mode');
  prompt();
}

// Main
function main() {
  const input = parseArgs(process.argv);

  if (!input) {
    interactive();
    return;
  }

  const { operation, a, b } = input;
  try {
    let result;
    switch (operation) {
      case 'add':
        result = add(a, b);
        break;
      case 'subtract':
        result = subtract(a, b);
        break;
      case 'multiply':
        result = multiply(a, b);
        break;
      case 'divide':
        result = divide(a, b);
        break;
      default:
        console.error('Unknown operation. Use: add, subtract, multiply, divide');
        process.exit(1);
    }
    console.log(result);
  } catch (e) {
    console.error(`Error: ${e.message}`);
    process.exit(1);
  }
}

main();

// Export for testing
module.exports = { add, subtract, multiply, divide };
