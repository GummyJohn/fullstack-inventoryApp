import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Card from './Card';

const HomePage = ({handleUpdate}) => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    async function getInventory(){
      try{
        const response = await axios.get('http://localhost:4000/inventory');
        setInventory(response.data.data)
      }catch(err){
        console.log('Error fetching inventory:', err.message)
      }
    }

    getInventory()
  }, [])
  
  return (
    <div className='flex flex-col justify-center items-center mt-16'>
      <h1 className='text-3xl'>Inventory Management</h1>
      <div className='flex my-5'>
        <button 
          onClick={() => navigate('/add')}
          className='border border-black py-2 px-4 rounded-3xl mx-2 hover:bg-blue-600 hover:text-white'
        >
          Add
        </button>
      </div>
      
      <div className='flex items-center justify-start w-full py-5 px-8'>
        {inventory.map((item) => {
          return (
            <Card
              key={item.id}
              id={item.id}
              image={item.image}
              price={item.price}
              title={item.title}
            />
          ) 
        })}
      </div>
    </div>
  )
}

export default HomePage