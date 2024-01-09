import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoIosAdd } from "react-icons/io";
import axios from 'axios'
import Card from './Card';

const HomePage = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);

  async function handleDelete(id){
    try{
      const response = await axios.delete(`http://localhost:4000/inventory/delete/${id}`);

      if(response.status === 200){
        const filteredInventory = inventory.filter((item) => item.id !== id)
        setInventory(filteredInventory);
      }else{
        console.log('Status was not 200')
      }
    }catch(err){
      console.log('Error deleting inventory', err.message)
    }
  }

  useEffect(() => {
    async function getInventory(){
      try{
        const response = await axios.get('http://localhost:4000/inventory');
        setInventory(['+', ...response.data.data])
      }catch(err){
        console.log('Error fetching inventory:', err.message)
      }
    }

    getInventory()
  }, [])
  
  return (
    <div className='flex flex-col justify-center items-center mt-16'>
      <h1 className='text-3xl'>Inventory Management</h1>

      <div className='flex items-center justify-center flex-wrap w-full py-5 px-8 mt-20 w-[90%]'>
        {inventory.map((item) => {
          if(item === '+'){
            return (
              <div
                key={0}
                onClick={() => navigate('/add')}
                className='w-[250px] h-[300px] border border-black rounded-2xl hover:shadow-xl hover:bg-stone-100 mx-3 flex flex-col justify-center items-center cursor-pointer'
              >
                <IoIosAdd className='text-6xl'/>
                <h1 className='text-3xl'>Add Item</h1>
              </div>
            )
          }else{
            return (
              <Card
                key={item.id}
                id={item.id}
                image={item.image}
                price={item.price}
                title={item.title}
                stock={item.stock}
                handleDelete={handleDelete}
              />  
            )
          }
        })}
      </div>
    </div>
  )
}

export default HomePage