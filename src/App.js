import { useReducer } from "react";
import DigitButton from "./digitButton";
import "./styles.css"

export const ACTIONS = {
  ADD: 'add',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE: 'delete',
  EQUALS: 'equals'
}

function reducer(state,{type,payload}) {
  switch(type){
    case ACTIONS.ADD:
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }
    case ACTIONS.CHOOSE_OPERATION:
      return
    case ACTIONS.CLEAR:
      return
    case ACTIONS.DELETE:
      return
    case ACTIONS.EQUALS:
      return
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
        <button className="span-two">AC</button>
        <button>DEL</button>
        <button>÷</button>
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <button>*</button>
        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} /> 
        <button>+</button> 
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} /> 
        <button>-</button>
        <button>.</button>
        <button>0</button>  
        <button className="span-two">=</button>     
      </div>
  )
}

export default App;
