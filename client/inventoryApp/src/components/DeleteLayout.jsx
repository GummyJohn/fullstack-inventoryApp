import {useLayoutEffect, useState} from 'react'
import axios from 'axios'

const DeleteLayout = ({id, setShowErrorOverlay, handleDelete}) => {
  const [deleteProduct, setDeleteProduct] = useState({})

  useLayoutEffect(() => {
    async function getItemInfo(){
      try{
        const response = await axios.get(`http://localhost:4000/inventory/${id}`)
        
        setDeleteProduct(response.data)
      }catch(err){
        console.log(`Error : ${err.message}`)
      }
    }
    getItemInfo();
  }, [])

  return (
    <div className='absolute h-full w-full bg-black bg-opacity-80 z-50 top-0 flex justify-center items-center'>
      
      <div className='relative'>
        <div className='realtive border border-white rounded-2xl bg-white flex flex-col items-center p-4 w-[600px]'>
          
          <button 
            onClick={() => setShowErrorOverlay(false)}
            className='absolute top-5 right-5 z-50 border border-black rounded-full p-2 hover:bg-blue-500 hover:text-white'
          >
            X
          </button>

          <div className='text-2xl text-center'>
            <h1>Are you sure you want to delete:</h1>
            <h1>{deleteProduct.title}</h1>
          </div>
          
          <div className='w-[50%] rounded-2xl'>
            <img src={`../src/images/productImages/${deleteProduct.image}`} alt="" 
              className='h-full w-full rounded-2xl p-2'
            />
          </div>
          <div className='text-center py-2 px-6'>
            <h1 className='text-3xl mb-5 '>{deleteProduct.title}</h1>
            <button 
              onClick={() => handleDelete(id)}
              className='py-2 px-4 bg-red-500 rounded-2xl hover:bg-red:200 hover:text-white'
            >
              Delete
            </button>
          </div>
        </div>
      </div>
  </div>
  )
}

export default DeleteLayout