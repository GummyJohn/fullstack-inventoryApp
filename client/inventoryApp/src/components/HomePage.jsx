import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Card from './Card';

const HomePage = ({inventory, setInventory}) => {
  const navigate = useNavigate();

  async function handleUpdate(){
    try{
      const response = await axios.put('http://localhost:4000/inventory')
      console.log(response.data)
    }catch(err){
      console.log('Error updating inventory', err.message)
    }
  }

  async function handleDelete(){
    try{
      const response = await axios.delete('http://localhost:4000/inventory')
      console.log(response.data)
    }catch(err){
      console.log('Error updating inventory', err.message)
    }
  }

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
  console.log(inventory)
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

        <button 
          onClick={handleUpdate}
          className='border border-black py-2 px-4 rounded-3xl mx-2 hover:bg-stone-600 hover:text-white'
        >
          Update
        </button>
    
      
        <button 
          onClick={handleDelete}
          className='border border-black py-2 px-4 rounded-3xl mx-2 hover:bg-red-600 hover:text-white'
        >
          Delete
        </button>
      </div>
      
      <div className='flex items-center justify-start w-full py-5 px-8'>
        {inventory.map((item) => {
          return (
            <Card
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