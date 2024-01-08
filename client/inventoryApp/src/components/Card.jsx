import { useState } from 'react'
import { CiPen } from "react-icons/ci";
import { RiSubtractFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Card = ({id, title, image, price,onClick}) => {
  const navigate = useNavigate();
  const [showUpdate, setShowUpdate] = useState(false)
  const [showRemove, setShowRemove] = useState(false)

  return (
    <div 
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
      className='w-[250px] h-[300px] border border-black rounded-2xl hover:shadow-xl m-3 relative'
    >
 
      <button 
        onClick={() => navigate(`/update/${id}`) }
        onMouseEnter={() => setShowUpdate(true)}
        onMouseLeave={() => setShowUpdate(false)}
        className='absolute border border-black bottom-2 right-2 p-1 rounded-full cursor-pointer hover:bg-blue-600 hover:text-white'
      >
        {showUpdate && (
            <div className="absolute border border-black w-[150px] left-[-112px] top-8 bg-blue-600 text-white rounded-2xl">
              <div className="absolute w-3 h-3 border-black right-4 top-[-6.5px] rotate-45 bg-blue-600 border-t border-l "></div>
              Update this item
            </div>
          )                
        }
        <CiPen className="text-xl"/>
      </button>     
      
      <button 
        onClick={onClick}
        onMouseEnter={() => setShowRemove(true)}
        onMouseLeave={() => setShowRemove(false)}
        className='absolute border border-black bottom-2 left-2 p-1 rounded-full cursor-pointer hover:bg-red-600 hover:text-white'
      >
        {showRemove && (
            <div className="absolute border border-black w-[150px] top-8 bg-red-600 text-white rounded-2xl left-[-9px]">
              <div className="absolute w-3 h-3 border-black left-4 top-[-6.5px] rotate-45 bg-red-600 border-t border-l "></div>
              Remove this item
            </div>
          )                
        }
        <RiSubtractFill className="text-xl"/>
      </button>

      <div className='h-[70%] p-1'>
        <img src={`../src/images/productImages/${image}`} alt="" 
          className='w-full h-full rounded-tl-2xl rounded-tr-2xl'
        />
      </div>
      <div className='text-center rounded-bl-2xl rounded-br-2xl bg-stone-100 h-[30%] pt-3'>
        <h1 className=''>{title}</h1>
        <h2>$ {price}</h2>
      </div>
    </div>
  )
}

export default Card