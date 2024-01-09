import axios from 'axios'
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';

const AddFrom = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');

  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  function filereader(e){
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file))
    setImageFile(file)
  }
  
  async function handleAdd(e){
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title)
    formData.append('price', price)
    formData.append('description', description)
    formData.append('file', imageFile)
    
    try{
      const response = await axios.post('http://localhost:4000/inventory',formData )
  
      if(response.status === 200){
        navigate('/')
      }
    }catch(err){
      console.log('Error updating inventory', err.message)
    }
  }
  
  return (
    <div className='flex flex-col justify-center items-center mt-16 m-2'>
      <div className='my-5 '>
        <h1 className='text-3xl'>Add to the Inventory</h1>
        <h2
          onClick={() => navigate('/')}
          className='text-center mt-10 cursor-pointer hover:text-blue-600 hover:underline text-xl'
        > 
          Back to Home
        </h2>
      </div>

      <form onSubmit={handleAdd}
        encType= 'multipart/form-data'
        className='flex flex-col border border-black p-2 px-4 rounded-2xl w-full h-full md:flex-row md:max-w-[1000px] md:h-[500px]'
      >
        <div className='md:w-[50%] p-2 px-4'>
          <div className='border border-black h-[90%] rounded-2xl my-2'>
            <img 
              src={image ? image : '../src/images/questionmark.png'} 
              alt="image" 
              className='rounded-2xl h-full w-full'
            />
          </div>

          <div className='text-center '>
            <label htmlFor="picture"
              className='py-2 px-4 bg-blue-600 text-white rounded-2xl cursor-pointer hover:bg-black'
            >
              Add Image
            </label>
          </div>
          
          <input type="file" id="picture"
            className='hidden'
            onChange={filereader}
          />
        </div>

        <div className=' p-2 md:w-[50%]'>

          <div className='flex flex-col mb-2'>
            <label htmlFor="title"
              className='text-2xl'
            >
              Title:
            </label>
            <input type="text" id="title" 
              className='p-1 px-2 border border-black rounded-xl'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className='flex flex-col mb-2'>
            <label htmlFor="price"
              className='text-2xl'
            >
              Price:
            </label>
            <input type="number" id="price" min="0"
              className='p-1 px-2 border border-black rounded-xl'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          
          <div className='flex flex-col mb-2'>
            <label htmlFor="description"
              className='text-2xl'
            >
              Description:
            </label>
            <textarea 
              name="dexcription" id="description" 
              cols="50" rows="10"
              className='p-1 px-2 border border-black rounded-xl'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className='text-center'>
            <button
              className={
                (!title || !price || !description|| !image ) ? 'hidden' :
                'border border-white py-1 px-4 rounded-2xl bg-blue-600 text-white hover:bg-stone-500'
              }
            >
              ADD
            </button>
          </div>

        </div>

      </form>

    </div>
  )
}

export default AddFrom
