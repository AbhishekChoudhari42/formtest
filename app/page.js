"use client"
import Image from 'next/image'
import { useState , useRef , useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { motion, AnimatePresence } from "framer-motion";
import {BsFillCaretDownFill,BsFillCaretUpFill} from 'react-icons/bs'
import {AiOutlinePlus,AiOutlineMinus} from 'react-icons/ai'
import {BiEditAlt} from 'react-icons/bi'
import {RxCross2} from 'react-icons/rx'

export default function Home() {

  const createFormInput = (placeholder, label) => {

    const formInputElement = (<div className='p-4 flex flex-col gap-2 bg-black rounded-lg'>
      <label>{label}</label>
      <input type='text' placeholder={placeholder + Math.round(Math.random()*1001)} className='border border-neutral-600 bg-neutral-950 rounded-md text-black p-2'></input>
    </div>)
    
    return {id:uuidv4(),element:formInputElement}
  
  }
  
  const editFormInput = (placeholder,label) => {
    let idx = selectedElement?.idx
    let newformElement = createFormInput(placeholder,label)
    let newformElements = [...formElements];
    newformElements[idx] = newformElement;
    setFormElements(newformElements)
  }

  const UP = "up" , DOWN = "down";

  const moveFormInput = (action,idx) =>{
    if(((idx == 0) && action == UP) || ((idx == formElements.length - 1) && action == DOWN)){
      alert(`element cannot be moved ${action}`)
      return
    }
    let newformElements,temp;
    switch(action){
      case "up":

        newformElements = [...formElements]
        temp = newformElements[idx]
        newformElements[idx] = newformElements[idx - 1]
        newformElements[idx - 1] = temp
        setFormElements(newformElements)

      break;
      
      case "down":
        newformElements = [...formElements]
        temp = newformElements[idx]
        newformElements[idx] = newformElements[idx + 1]
        newformElements[idx + 1] = temp
        setFormElements(newformElements)
      break;
    }
  }
  
  const addFormInput = (idx) => {

    console.log("adding==",formElements)
    let element = createFormInput("placeholder","label")
    let newformElements = [...formElements]
    newformElements.splice(idx,0,element)
    setFormElements(newformElements)
  }

  const removeFormInput = (idx) =>{

    if(formElements.length == 1){
      alert("form should contain atleast one element")
      return
    }

    let newformElements = [...formElements]
    newformElements.splice(idx,1)
    setFormElements(newformElements)
  
  }

  const [formElements, setFormElements] = useState([createFormInput("placeholder", "label")])
  const [selectedElement,setSelectedELement] = useState(null)
  const [modal,setModal] = useState(false)
  const [formMetadata,setFormMetadata] = useState({label:"",placeholder:""})
  
  const handleMetadataChange = (e) => {
    setFormMetadata((formMetadata)=>{return {...formMetadata,[e.target.name]:e.target.value}})
  }

  return (
    <main className="flex h-screen flex-col px-12 py-4 items-center gap-4">
    
      <AnimatePresence>
      {modal && 
    <motion.div 
    layout   
    initial={{
      opacity:0,
      scale: 0.8,
      y: 2,
    }}
    animate={{
      opacity:1,
      scale: 1,
      y:0
    }}
    exit={{
      opacity:0,
      scale: 0.8,
      y: 0,
    }}
    transition={{
      duration: 0.4,
      ease: "backInOut",
       
    }}
    className='fixed z-50 w-full h-screen bg-black/70 flex justify-center items-center'>

      <div className='relative p-4 flex flex-col gap-2 bg-black border border-neutral-500 rounded-lg w-full max-w-[400px] '>
          
          <RxCross2 onClick={()=>{setModal(false)}} className='absolute top-2 right-2' />
          <label>label</label>
          <input name="label" onChange={handleMetadataChange} type='text' className='border border-neutral-600 bg-neutral-950 rounded-md text-black p-2'></input>
          <label>placeholder</label>
          <input name="placeholder" onChange={handleMetadataChange} type='text' className='border border-neutral-600 bg-neutral-950 rounded-md text-black p-2'></input>
          <button onClick={()=>{editFormInput(formMetadata.placeholder,formMetadata.label) ; setModal(false)}} className='bg-neutral-800 px-2 py-2 mt-4 rounded-md w-full flex justify-center items-center gap-1'><BiEditAlt/> Edit </button>

        </div>
      </motion.div>}

      {formElements.map((el,idx) => {

          let selected = el.id == selectedElement?.id;
          
          return <motion.div 
          layout   
          initial={{
            opacity:0,
            scale: 0.8,
            y: 2,
          }}
          animate={{
            opacity:1,
            scale: 1,
            y:0
          }}
          exit={{
            opacity:0,
            scale: 0.8,
            y: 0,
          }}
          transition={{
            duration: 0.4,
            ease: "backInOut",
             
          }}
                    key={el.id} 
                    onClick={( )=>{setSelectedELement({id:el.id,idx:idx})}}                     
                    className={`relative border rounded-lg w-full max-w-[400px] ${selected ? 'border-blue-500':'border-neutral-800'}`}>
                    
                    {el.element}
                    
                    {selected && 
                    <div className='flex flex-col bg-neutral-950 absolute px-[4px] py-[4px] rounded-md gap-[6px] top-[-4px] right-[-45px]'>
                      <button onClick={()=>{setModal(true)}} className='bg-neutral-800 px-2 py-2 rounded-md '><BiEditAlt/></button>
                      <button onClick={()=>{moveFormInput("up",idx)}} className='bg-neutral-800 px-2 py-2 rounded-md '><BsFillCaretUpFill/></button>
                      <button onClick={()=>{removeFormInput(idx);console.log("remfm")}} className='bg-neutral-800 px-2 py-2 rounded-md '><AiOutlineMinus/></button>
                      <button onClick={()=>{addFormInput(idx + 1);console.log("addfm")}} className='bg-neutral-800 px-2 py-2 rounded-md'><AiOutlinePlus/></button>
                      <button onClick={()=>{moveFormInput("down",idx)}} className='bg-neutral-800 px-2 py-2 rounded-md '><BsFillCaretDownFill/></button>
                    </div>}

                  </motion.div>
      })}
      </AnimatePresence>
    </main>
  )
}
