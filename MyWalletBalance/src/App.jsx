import { useState } from 'react'
import { MyContext } from './MyContext'
import MyWallet from './Components/MyWallet'

function App() {
  const [incomeSources, setIncomeSources] = useState([])
  const [expenses, setExpenses] = useState([])
  const[balance, setBalance] = useState(0)
  

  return (
    <>
    <div>
      <MyContext.Provider value={{incomeSources, setIncomeSources, expenses, setExpenses, balance, setBalance}}>
        <MyWallet/>
      </MyContext.Provider>

    </div>
    </>
  )
}

export default App
