import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ()=>{

    const navigate = useNavigate();

    const handleSubmit = ()=>{
        navigate('/Dashboard')
    } 

    return (
        <>
            <div className=''>I am the Home</div>
            <button onClick={ handleSubmit } className=' border-2 border-black px-3 py-3 text-center'> click to dashboard </button>
        </>
        
    )
}

export default Home;