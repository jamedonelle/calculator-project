import { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationsButton from "./OperationButton";
import "./styles.css"

export const ACTIONS = {
  // adds digits to output
  ADD: 'add',
  // this chooses the operations to be performed
  CHOOSE_OPERATION: 'choose-operation',
  // clears the output
  CLEAR: 'clear',
  // deletes a single digit
  DELETE: 'delete',
  // performs the operations needed and displays in output
  EQUALS: 'equals'
}

function evaluate({currentOperand,previousOperand,operation}){
  const prev = parseFloat(previousOperand)
  const curr = parseFloat(currentOperand)
  if(isNaN(prev || isNaN(curr))) return ""
  let computation = ""
  switch(operation){
    case "+":
      computation = (prev + curr).toFixed(10)
      break
    case "-": 
      computation = (prev - curr).toFixed(10)
      break
    case "*":
      computation = (prev * curr).toFixed(10)
      break
    case "÷":
      computation = (prev / curr).toFixed(10)
      break
    default:
      computation = "error"
  }

  return computation.toString()
}

function reducer(state,{type,payload}) {
  switch(type){
    case ACTIONS.ADD:
      if(state.overwrite){
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false
        }
      }

      if(payload.digit === "0" && state.currentOperand === "0"){
        return state
      }

      if(payload.digit === "." && state.currentOperand.includes(".")){
        return state
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }
    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand == null && state.previousOperand == null){
        return state
      }

      if(state.currentOperand == null){
        return {
          ...state,
          operation: payload.operation
        }
      }

      if(state.previousOperand == null){
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }
      
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }
    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.DELETE:
      if(state.overwrite || state.currentOperand == null){
        return state
      }

      if(state.currentOperand.length === 1){
        return { 
          ...state, 
          currentOperand: null
        }
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0,-1)
      }
    case ACTIONS.EQUALS:
      if(state.previousOperand == null || state.currentOperand == null || 
        state.operation == null){
        return state
      }
      return {
        ...state,
        previousOperand: null,
        overwrite: true,
        operation: null,
        currentOperand: evaluate(state)
      }
    default:
      return state
  }
}

function App() {
  const [{currentOperand,previousOperand,operation}, dispatch] = useReducer(reducer,{})

  return (
      <div className="grid">
        <div className="output">
          <div className="prev-operand">{previousOperand} {operation}</div>
          <div className="curr-operand">{currentOperand}</div>
        </div>
        <button className="span-two" onClick={() =>dispatch({type: ACTIONS.CLEAR})}>AC</button>
        <button onClick={() =>dispatch({type: ACTIONS.DELETE})}>DEL</button>
        <OperationsButton operation="÷" dispatch={dispatch} />
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationsButton operation="*" dispatch={dispatch} />
        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} /> 
        <OperationsButton operation="+" dispatch={dispatch} /> 
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} /> 
        <OperationsButton operation="-" dispatch={dispatch} />
        <DigitButton digit="." dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />  
        <button className="span-two" onClick={() =>dispatch({type: ACTIONS.EQUALS})}>=</button>     
      </div>
  )
}

export default App;
