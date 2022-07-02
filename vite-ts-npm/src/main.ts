import "./style.css";

type Operator = '+'| '-'| '×'| '÷'| '=' ;

type ComputedValue = {
  [key in Exclude<Operator, '=' >]: (num1: number, num2: number) => number;
}
const VALID_NUMBER_OF_DIGITS = 3;
// const BASE_DIGIT = 10;
const INIT_VALUE = 0;
const OPERATORS = ['+', '-', '×', '÷'];

interface CalculatorInterface {
  tempValue: string | number;
  tempOperator?: Operator | string;
  render(inputValue: string | number): void;
  reset(): void;
  calculated(operator: Operator | string): void;
  initEvent(): void;
}

const validateNumberLength = (value: string | number) => {
  return String(value).length < VALID_NUMBER_OF_DIGITS;
};

const isZero = (value: string) => Number(value) === 0;



const getComputedValue: ComputedValue = {
  '+': (num1, num2) => num1 + num2,
  '-': (num1, num2) => num1 - num2,
  '×': (num1, num2) => num1 * num2,
  '÷': (num1, num2) => num1 / num2,
}

const Calculator: CalculatorInterface = {
  tempValue: INIT_VALUE,
  tempOperator: undefined,
  render(inputValue: string | number) {
    const resultEl = <HTMLDivElement>document.querySelector('#result');
    const prevValue = resultEl.innerText;

    if(!validateNumberLength(prevValue)){
      alert('3자리 이상의 숫자를 입력할 수 없습니다');
      return;
    }

    if(resultEl) {
      resultEl.innerText = isZero(prevValue) 
      ? String(inputValue) 
      : String(prevValue + inputValue);
    }
  },
  reset(){
    const resultEl = <HTMLDivElement>document.querySelector('#result');
    resultEl.innerText = String(INIT_VALUE);
    this.tempValue = 0;
    this.tempOperator = undefined;
  },

  calculated(operator: Operator | string) {
    const isTempCalculated = OPERATORS.includes(operator);
    const isReadyCalculated =
      operator === '=' &&
      this.tempOperator &&
      OPERATORS.includes(this.tempOperator)

    if(isTempCalculated){
      const resultEl = <HTMLDivElement>document.querySelector('#result');

      this.tempOperator = operator;
      this.tempValue = Number(resultEl.innerText);

      resultEl.innerText = String(INIT_VALUE);

      return;
    }

    if(isReadyCalculated){
      const resultEl = <HTMLDivElement>document.querySelector('#result');

      const resultValue = getComputedValue[
        this.tempOperator as Exclude<Operator, '=' >
      ](
        Number(this.tempValue),
        Number(resultEl.innerText),
      );
      
      resultEl.innerText = String(resultValue)
    }
    
  },

  initEvent(){
    const buttonContainerEl = document.querySelector('.contents')
    buttonContainerEl?.addEventListener('click',( {target} ) => {
    const buttonText = (target as HTMLButtonElement).innerText

    if (buttonText === 'AC'){
      this.reset()
    }
      
    if(OPERATORS.concat('=').includes(buttonText)){
      this.calculated(buttonText);

      return;
    }

    if(!Number.isNaN(buttonText)){
      this.render(Number(buttonText));
    }
  });
  }
};

Calculator.render(INIT_VALUE)
Calculator.initEvent()