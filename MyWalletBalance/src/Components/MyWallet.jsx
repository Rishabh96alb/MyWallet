import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../MyContext'

const MyWallet = () => {

    const{incomeSources, setIncomeSources} = useContext(MyContext)
    const{expenses, setExpenses} = useContext(MyContext)
    const[totalIncome, settotalIncome] = useState(0)
    const[incomeInput, setIncomeInput] = useState('')
    const[amountInput, setAmountInput] = useState('')
    const[amountExpensesInput, setAmountExpensesInput] = useState('')
    const[expensesInput, setExpensesInput] = useState('')
    const{balance, setBalance} = useContext(MyContext)
    const[edit, setEdit] = useState(false)
    const[editIndex, setEditIndex] = useState(null)
    const[isEditExpense, setIsEditExpense] = useState(false);
    const[editExpenseIndex, setEditExpenseIndex] = useState(null);
    
    const[totalExpenses, settotalExpenses] = useState(0)

          // Add //
    const handleAddIncome = () => {
        if(incomeInput && amountInput) {
        const newIncome = {source : incomeInput, amount: Number(amountInput) }
        setIncomeSources(prevIncomeSources => [...prevIncomeSources, newIncome]) 
        settotalIncome(prevTotalIncome => prevTotalIncome + Number(amountInput))
        setIncomeInput('')
        setAmountInput('')
        }
        
    }
        
    const handleAddExpenses = () => {
        if(expensesInput && amountExpensesInput){
            const newExpenses = {sources : expensesInput, amount: Number(amountExpensesInput)}
            setExpenses(prevExpenses=>[...prevExpenses, newExpenses])
            settotalExpenses(prevTotalExpenses => prevTotalExpenses + Number(amountExpensesInput))
            setExpensesInput('')
            setAmountInput('')
        }
  
    }

          // Delete //
    const handleDeleteIncome = (index)=> {
        const newIncomeSources = [...incomeSources];
        const deletedIncome = newIncomeSources[index]
        settotalIncome(prevTotalIncome => prevTotalIncome - deletedIncome.amount)
        newIncomeSources.splice(index, 1)
        setIncomeSources(newIncomeSources)
        //console.log(amountInput);
        
    }

    const handleDeleteExpenses  = (index) => {
      const newExpenses  = [...expenses]
      const deletedExpenses = newExpenses[index]
      settotalExpenses(prevTotalExpenses=> prevTotalExpenses - deletedExpenses.amount)
      newExpenses.splice(index, 1)
      setExpenses(newExpenses)

    }

        // Update //
    const handleEditIncome = (index) => {
      
      const newIncomeSources = [...incomeSources]
      const oldIncome = newIncomeSources[index]
      //console.log(oldIncome);
      const newIncome = {source : incomeInput, amount: Number(amountInput)}
      //console.log(newIncome)
      const difference = Number(newIncome.amount) - oldIncome.amount
      newIncomeSources[index] = newIncome
      setIncomeSources(newIncomeSources)
      settotalIncome((prevTotalIncome) => prevTotalIncome + difference)
      setEdit(false)
      setEditIndex(null)
      
      
    }

    const startEditIncome = (index) => {
      setEdit(true);
      setEditIndex(index);
      setIncomeInput(incomeSources[index].source);
      setAmountInput(incomeSources[index].amount);
  }

  const handleEditExpenses = (index) =>{
      const newExpensesSources = [...expenses]
      const oldExpenses = newExpensesSources[index]
      const newExpenses = {sources : expensesInput, amount: Number(amountExpensesInput)}
      const difference = Number(newExpenses.amount) - oldExpenses.amount
      newExpensesSources[index] = newExpenses
      setExpenses(newExpensesSources)
      settotalExpenses((prevTotalExpenses)=> prevTotalExpenses + difference)
      setIsEditExpense(false)
      setEditExpenseIndex(null)
  }

  const startEditExpenses = (index) => {
    setIsEditExpense(true)
    setEditExpenseIndex(index)
    setExpensesInput(expenses[index].source)
    setAmountInput(expenses[index].amount)
  }
    
    const wallet = () => {
        setBalance(totalIncome-totalExpenses)
    }

    useEffect(() => {

        wallet()
    
    }, [totalIncome, totalExpenses])
  
  return (
    <div className='w-screen h-screen bg-black'>
        <h1 className='text-white text-4xl font-serif font-bold text-center pt-10 mb-6'>My Wallet Balance </h1>
        <div className='text-center text-white text-3xl font-bold'>₹{balance}</div>
       
        <div className='text-white text-xl font-sans w-1/2 ml-96 mt-10 text-center font-medium '>
        <div className=' bg-blue-500 mb-4 p-1 rounded-md flex justify-between text-black'>INCOME 
            
            <div >
            <input type="number" placeholder={`₹${totalIncome}`} className='placeholder-black items-center pl-20 rounded-md text-2xl'/>
            </div>
            
        </div>
        <div className=' bg-orange-500 p-1 rounded-md flex justify-between text-black'>EXPENSES
            <input type="number" placeholder={`₹${totalExpenses}`} className='placeholder-black items-center pl-20 rounded-md text-2xl &#8377'/>
        </div>
        </div>

              {/* INPUT FIELD */}

        <div className=' fixed inset-0 flex justify-center items-center mt-20 gap-32 '>
            <div className=' text-xl bg-blue-500 text-black p-2 rounded-md font-sans font-medium'>INCOME </div>
           
            <div>
            <input className='rounded-md p-2 mr-2' type="text" placeholder='Add income source' value={incomeInput} onChange={(e)=> setIncomeInput(e.target.value)} onKeyDown={(e)=> e.key === 'Enter' ? handleAddIncome(e.target.value) : null}/>
            <input className='rounded-md p-2' type="number" placeholder='Add amount' value={amountInput} onChange={(e)=> setAmountInput(e.target.value)} onKeyDown={(e)=> e.key === 'Enter' ? handleAddIncome(e.target.value) : null}/>
            
            <div className=' text-white fixed text-xl font-serif mt-8 '>
            
          <ul >
              {incomeSources.map((incomeObject, index) =>(
                    <li className='mb-3' key={index}>
                        {edit && index === editIndex ? (
              <div>
                <input
                  className='text-black'
                  type="text"
                  value={incomeInput}
                  onChange={(e) => setIncomeInput(e.target.value)}
                  
                />
                <input
                className='text-black'
                  type="number"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                />
                <button className='border-white border-2 p-1 rounded-md bg-blue-500 text-black' onClick={() => {handleEditIncome(index)}}>Save</button>
              </div>
            ) : (
              <p className='flex justify-between gap-8'>
                {incomeObject.source} : {incomeObject.amount}
                <button className=' border-1 rounded-md p-1 bg-blue-500 text-black' onClick={() => startEditIncome(index)}>Edit</button>
                <button className=' border-1 rounded-md p-1 bg-blue-500 text-black' onClick={()=> handleDeleteIncome(index)}>Delete</button>
              </p>
            )}
                        
          <div>
                
          </div>
          </li>
                    
      ))}    

            </ul>
            
            </div>
            </div>
              
              {/* VERTICAL LINE */}

            <div className='fixed top-1/2 h-1/2 border-r-2 border-white'></div>

                {/* EXPENSES FIELD */}

            <div className='text-xl bg-orange-500 text-black p-1 rounded-md font-sans font-medium'>EXPENSES</div>
            <div>
            <input className='rounded-md p-2 mr-2' type="text" placeholder='Add expenses source' value={expensesInput} onChange={(e)=> setExpensesInput(e.target.value)} onKeyDown={(e)=> e.key === 'Enter' ? handleAddExpenses(e.target.value) : null}/>
            <input className='rounded-md p-2' type="number" placeholder='Add amount' value={amountExpensesInput} onChange={(e)=> setAmountExpensesInput(e.target.value)} onKeyDown={(e)=> e.key === 'Enter' ? handleAddExpenses(e.target.value) : null}/>
            <div className='text-white fixed text-xl font-serif mt-8'>

                <ul>
                {expenses.map((expensesObject, index) =>(
                    <li className='mb-3' key={index}>
                        {isEditExpense && index === editExpenseIndex ? (
              <div>
                
                <input
                  className='text-black'
                  type="text"
                  value={expensesInput}
                  onChange={(e) => setExpensesInput(e.target.value)}
                />
                <input
                className='text-black'
                  type="number"
                  value={amountExpensesInput}
                  onChange={(e) => setAmountExpensesInput(e.target.value)}
                />
                <button className='border-white border-2 p-1 rounded-md bg-orange-500 text-black' onClick={() => {handleEditExpenses(index)}}>Save</button>
              </div>
            ) : (
              <p className='flex justify-between gap-8 '>
                {expensesObject.sources} : {expensesObject.amount}
                <button className=' border-1 p-1 rounded-md bg-orange-500 text-black' onClick={() => startEditExpenses(index)}>Edit</button>
                <button className=' border-1 rounded-md p-1 bg-orange-500 text-black' onClick={()=> handleDeleteExpenses(index)}>Delete</button>
              </p>
            )}
                        
          </li>
                    
                ))}     
            </ul>
 
            </div>
            </div>
            
        </div>
        
    </div>
  )
}

export default MyWallet