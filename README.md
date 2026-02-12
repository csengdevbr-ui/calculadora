# Calculadora Básica (Basic Calculator)

Uma calculadora de linha de comando simples e funcional, desenvolvida em Node.js, que suporta as quatro operações matemáticas básicas.

## Funcionalidades

- ✅ **Adição** (add)
- ✅ **Subtração** (subtract)
- ✅ **Multiplicação** (multiply)
- ✅ **Divisão** (divide)
- ✅ **Modo interativo** (REPL)
- ✅ **Executável Windows** (.exe) via `pkg`

## Uso

### Modo CLI (Linha de Comando)

```bash
# Sintaxe: calculator <operacao> <num1> <num2>
calculator add 10 5
calculator subtract 10 5
calculator multiply 10 5
calculator divide 10 5
```

Exemplo:
```bash
$ calculator add 2 3
5
```

### Modo Interativo (REPL)

Execute sem argumentos para entrar no modo interativo:

```bash
calculator
```

```
Calculator Interactive Mode
Enter operation (add/subtract/multiply/divide) or "quit": add
Enter first number: 10
Enter second number: 5
Result: 15
Enter operation (add/subtract/multiply/divide) or "quit": quit
```

## Instalação

```bash
npm install
```

## Execução

```bash
# Modo CLI
npm start -- add 10 5

# Modo interativo
npm start
```

## Testes

O projeto inclui 9 testes unitários cobrindo:

- Operações básicas
- Números negativos
- Divisão por zero (tratamento de erro)
- Resultados decimais

Execute os testes:

```bash
npm test
```

## Build (Executável Windows)

Gera o arquivo `.exe` em `dist/`:

```bash
npm run build
```

O executável será criado em:
```
dist/basic-calculator.exe
```

**Tamanho do executável:** ~37.6 MB

## Estrutura do Projeto

```
calculator/
├── src/
│   └── index.js        # Código fonte principal
├── tests/
│   └── calculator.test.js  # Testes unitários
├── package.json
├── .gitignore
└── dist/               # (gerado) Executável .exe
```

## Detalhes Técnicos

- **Linguagem:** JavaScript (Node.js)
- **Test Runner:** Node Test Runner (nativo)
- **Pkg Builder:** `pkg` para criar executável standalone
- **Target:** Node.js 18 (Windows x64)
- **Licença:** MIT

## Funções Exportadas (API)

```javascript
const calc = require('./src/index.js');

calc.add(a, b);        // Soma
calc.subtract(a, b);   // Subtração
calc.multiply(a, b);   // Multiplicação
calc.divide(a, b);     // Divisão (lança erro se b=0)
```

## Tratamento de Erros

- **Divisão por zero:** Lança exceção `Error('Division by zero')`
- **Números inválidos:** Detecta entradas não numéricas no modo CLI
- **Operação desconhecida:** Mensagem de erro e saída com código 1

## Autor

Desenvolvido por CS Engenharia via Antfarm Workflow System

---

**Status:** ✅ Completado e mergeado no repositório `csengdevbr-ui/calculadora`
