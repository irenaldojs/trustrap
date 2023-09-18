import { Widget } from "./core/core";
import { InitialCall, useState } from "./core/stateApp";
import { Button, H1, H3, H6, } from "./core/widgets";
import "bootstrap/dist/css/bootstrap.css"


const root = document.getElementById('app')

export function Render() {
  const [count, setCount] = useState("123", 0)
  const [count2, setCount2] = useState("456", 0)


  const App = () => new Widget({
    classCSS: "d-flex flex-column gap-1 justify-content-center align-items-center vh-100 text-center border border-dark",
    children: [
    new H1({text: "Hello"}),
    new H3({text: "Teste da Framework"}),
    new Button({
      children: ["Click aqui "+count],
      onClick: ()=> {
        setCount(count +1)
        Render()
      }
    }),
    new Button({
      children: ["Click aqui "+count2],
      onClick: ()=> {
        setCount2(count2 + 1)
        Render()
      }
    }),
  ]}).render()

  if(root){
    root.innerHTML = ""
    root.appendChild(App())
  }
}

Render()