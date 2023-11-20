import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";

//Confetti 
import Confetti from 'react-confetti'

//https://reactplay.io/plays/abhipatel10/tenzies-game

function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameFinish, setGameFinish] = useState("Roll the dice until all the dice are the same");
  const [array, setArray] = useState([])

  const random = () => {
    return Math.floor(Math.random() * 9) + 1
  }

  const newArrays = () => {
    let newArray = []
    for (let index = 0; index < 10; index++) {
      newArray.push({
        number: random(),
        isActive: false,
      })
    }
    setArray(newArray)
  }

  useEffect(() => {
    newArrays()
    console.log(array);
  }, []);

  const handleClickCard = (index) => {
    const updateCards = [...array]
    updateCards[index].isActive = !updateCards[index].isActive
    setArray(updateCards)
    gameEnd()
  }

  const handleClickRandom = () => {
    const updateCards = array.map(item => {
      if (!item.isActive) {
        return {
          ...item,
          number: random()
        }
      }
      return item
    })
    setArray(updateCards)

  }

  const gameEnd = () => {
    const allSame = array.every((item, index, arrays) => {
      return item.number == arrays[0].number;
    })
    const allActive = array.every(item => {
      return item.isActive
    })
    if (allSame && allActive) {
      setGameFinish("Congratulations...:)")
      setShowConfetti(true)
    }
  }

  const handleClickRest = () => {
    setGameFinish("Roll the dice until all the dice are the same")
    newArrays()
    setShowConfetti(false)
  }



  return (
    <div className=" h-screen flex justify-center items-center flex-col">
      <div className="w-[600px]">
      <h1 className="text-center text-zinc-500 text-4xl font-semibold my-4 uppercase">If you are lucky</h1>
      {showConfetti && <Confetti/>}
      <h1 className="text-lg text-center font-semibold">{gameFinish}</h1>
      <div className="flex flex-wrap">
        {
          array.map((item, index) => {
            return (
              <Card onClick={() => handleClickCard(index)} number={item.number} isActive={item.isActive} />
            )
          })
        }
      </div>
      <div className="text-center ">
        <button onClick={() => handleClickRandom()} className="px-4 py-2 border rounded text-white text-lg mt-2 bg-[#5035ff] shadow-xl">Random</button>
        <button onClick={() => handleClickRest()} className="px-4 py-2 border rounded text-white text-lg mt-2 bg-gray-400 shadow-xl">Restart</button>
      </div>
    </div>
    
    <h1 className="text-center text-zinc-300 text-3xl font-semibold mt-20">@recepkececi</h1>
    </div>
    
  );
}

export default App;
