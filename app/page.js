"use client"
import Image from 'next/image'
import { useState , useRef , useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {

  const createFormInput = (placeholder, label) => {

    const formInputElement = (<div className='p-4 flex flex-col gap-2 bg-black rounded-lg'>
      <label>{label}</label>
      <input type='text' placeholder={placeholder} className='border border-neutral-600 bg-neutral-950 rounded-md text-black p-2'></input>
    </div>)
    
    return {id:uuidv4(),element:formInputElement}
  
  }
  
  const addFormInput = (idx) => {
    console.log("adding==",formElements)
    let element = createFormInput(`placeholder ${idx}`,`label ${idx}`)
    let newformElements = [...formElements]
    newformElements.splice(idx,0,element)
    setFormElements(newformElements)
  }

  const removeFormInput = (idx) =>{
    let newformElements = [...formElements]
    newformElements.splice(idx,1)
    setFormElements(newformElements)
  }

  const [formElements, setFormElements] = useState([createFormInput("Enter your name", "Name")])
  const [selectedElement,setSelectedELement] = useState(null)
  
  return (
    <main className="flex h-screen flex-col px-12 py-4 items-center gap-4">
      <AnimatePresence>
      {formElements.map((el,idx) => {

          let selected = el.id == selectedElement;
          
          return <motion.div 
          layout   
          initial={{
            scale: 0.8,
            y: 2,
          }}
          animate={{
            scale: 1,
            y:0
          }}
          exit={{
            scale: 0.8,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            ease: "backInOut",
             
          }}
                    key={el.id} 
                    onClick={( )=>{setSelectedELement(el.id);console.log(el.id)}} 
                    className={`relative border rounded-lg w-full max-w-[400px] ${selected ? 'border-blue-500':'border-neutral-800'}`}>
                    
                    {el.element}
                    
                    {selected && 
                    <div className='flex flex-col bg-neutral-950 absolute px-[4px] py-[4px] rounded-md gap-1 top-0 right-[-40px]'>
                      <button onClick={()=>{removeFormInput(idx);console.log("remfm")}} className='bg-neutral-800 px-2 rounded-md '>-</button>
                      <button onClick={()=>{addFormInput(idx + 1);console.log("addfm")}} className='bg-neutral-800 px-2 rounded-md'>+</button>
                    </div>}

                  </motion.div>
      })}
      </AnimatePresence>
    </main>
  )
}
