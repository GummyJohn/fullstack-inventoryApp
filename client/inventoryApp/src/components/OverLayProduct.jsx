import { useState, useLayoutEffect} from 'react'
import axios from 'axios';

const OverLayProduct = ({id, setShowProduct}) => {
  const [product, setProduct] = useState({});


  useLayoutEffect(() => {
    async function getItemInfo(){
      try{
        const response = await axios.get(`http://localhost:4000/inventory/${id}`)
        
        setProduct(response.data)
      }catch(err){
        console.log(`Error : ${err.message}`)
      }
    }
    getItemInfo();
  }, [])

  return (
    <div className='absolute h-full w-full bg-black bg-opacity-80 z-50 top-0 flex justify-center items-center'>
      
      <div className='relative'>
        <div className='realtive border border-white w-[1000px] rounded-2xl bg-white flex items-center p-4'>
          
          <button 
            onClick={() => setShowProduct(false)}
            className='absolute top-5 right-5 z-50 border border-black rounded-full p-2 hover:bg-blue-500 hover:text-white'
          >
            X
          </button>

          <div className='w-[50%] rounded-2xl'>
            <img src={`../src/images/productImages/${product.image}`} alt="" 
              className='h-full w-full rounded-2xl p-2'
            />
          </div>
          <div className='w-[50%] text-center py-2 px-6'>
            <h1 className='text-3xl mb-5'>{product.title}</h1>
            <h2 className='text-2xl my-5'>$ {product.price}</h2>
            <h3 className='text-xl my-5'>
              Stock: <span className='text-blue-500'>{product.stock}</span>
            </h3>
            <p className='text-left'>
              <span className='font-bold text-xl'>Description : </span> 
              {product.description}
            </p>
          </div>
  
        </div>
      </div>
    </div>
  )
}

export default OverLayProduct