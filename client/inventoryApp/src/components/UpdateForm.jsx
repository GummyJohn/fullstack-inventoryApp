import  { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const UpdateForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [updateInfo, setUpdateInfo] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
  });

  function changeValue(e){
    setUpdateInfo(perv => ({...perv, [e.target.name]: e.target.value }))
  }

  async function handleUpdate(e){
    e.preventDefault();

    try{
      const response = await axios.put(`http://localhost:4000/inventory/${id}`, updateInfo)
      if(response.status === 200){
        navigate('/')
      }
    }catch(err){
      console.log('Error updating inventory', err.message)
    }
  }

  useEffect(() => {
    async function getItemInfo(){
      try{
        const response = await axios.get(`http://localhost:4000/inventory/${id}`)
        
        setUpdateInfo({
          title: response.data?.title,
          price: response.data?.price,
          description: response.data?.description,
          image: response.data?.image,
        })
      }catch(err){
        console.log('Error getting info', err.message)
      }
    }
    getItemInfo();
  }, [])

  return (
    <div className='flex flex-col justify-center items-center mt-16'>
      <div>
        <h1 className='my-5 text-3xl text-center'>Update {updateInfo.title}</h1>
        <h2
          onClick={() => navigate('/')}
          className='text-center mt-10 cursor-pointer hover:text-blue-600 hover:underline text-xl'
        > 
          Back to Home
        </h2>
      </div>

      <form onSubmit={handleUpdate}
        className='md:flex border border-black p-2 px-4 rounded-2xl md:w-[1000px] md:h-[500px] mt-10 w-full h-full'
      >
        <div className='md:w-[50%] p-2 px-4'>
          <div className='border border-black h-[90%] rounded-2xl my-2'>
            <img 
              src={`../src/images/productImages/${updateInfo.image}`} 
              alt="image" 
              name="image"
              className='rounded-2xl h-full w-full'
            />
          </div>
        </div>

        <div className=' p-2 md:w-[50%]'>

          <div className='flex flex-col mb-2'>
            <label htmlFor="title"
              className='text-2xl'
            >
              Title:
            </label>
            <input type="text" id="title" name="title"
              className='p-1 px-2 border border-black rounded-xl'
              value={updateInfo.title}
              onChange={changeValue}
            />
          </div>
          
          <div className='flex flex-col mb-2'>
            <label htmlFor="price"
              className='text-2xl'
            >
              Price:
            </label>
            <input type="number" id="price" min="0" name="price"
              className='p-1 px-2 border border-black rounded-xl'
              value={updateInfo.price}
              onChange={changeValue}
            />
          </div>
          
          <div className='flex flex-col mb-2'>
            <label htmlFor="description"
              className='text-2xl'
            >
              Description:
            </label>
            <textarea 
              name="description" id="description" 
              cols="50" rows="10"
              className='p-1 px-2 border border-black rounded-xl'
              value={updateInfo.description}
              onChange={changeValue}
            ></textarea>
          </div>

          <div className='text-center'>
            <button
              className='border border-white py-1 px-4 rounded-2xl bg-blue-600 text-white hover:bg-stone-500 '
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UpdateForm
