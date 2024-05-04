
import { useEffect, useState } from 'react';
import account from '../config/config';
import { useNavigate } from 'react-router-dom';
import { database } from '../config/config';
import { Query } from 'appwrite';
import { data } from 'autoprefixer';


const Dashboard = () => {


    const nevigate = useNavigate()
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [todo, setTodo] = useState("")
    const [allTodo, setAllTodo] = useState([])

    useEffect(() => {
        isLogin();
    }, [])

    useEffect(()=>{
        showTodo();
    },[email])


    const isLogin = async () => {
        try {
            const data = await account.get("current");
            setEmail(data.email)
            // console.log(email);
            setName(data.name)
        } catch (error) {
            console.log("isLogin error -> ", error);
        }

    }

    const onLogout = async () => {
        try {
            const data = await account.deleteSession("current")
            // console.log(data);
            nevigate('/Login')
        } catch (error) {
            console.log(error);
        }
    }



    const handleSubmit = async () => {

        try {
            const data = await database.createDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID, import.meta.env.VITE_APPWRITE_COLLENCTION_ID, 'unique()', {
                email: email,
                todo: todo,
            })

        } catch (error) {
            console.log("handleSubmit error of Dashboard ", error);
        }

        showTodo();
    }

    const showTodo = async () => {
        console.log(email);
        try {
            const data = await database.listDocuments(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLENCTION_ID,
                [
                    Query.equal("email", email)
                ]
            )

            if (data.documents.length === 0) {
                console.log("No documents found.")
            }
            setAllTodo(data.documents);
            console.log(allTodo);

        } catch (error) {
            console.log("showData error -> ", error);
        }
    }

    const deleteDocument = async(dataId)=>{
        try {
           await database.deleteDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID, import.meta.env.VITE_APPWRITE_COLLENCTION_ID, dataId)


        } catch (error) {
            console.log("deleteDocument error -> ", error);
        }
        
        console.log("1", allTodo);
        showTodo()
    }

    return (
        <>
            <div className=' w-full flex justify-center items-center flex-col gap-3'>
                <h1>Welcome : {name}</h1>
                <h1> This Is Your Email : {email}</h1>
                <button onClick={onLogout} className=' bg-slate-900 text-white text-xl font-medium rounded px-2 py-2 '>Logout</button>
                <div className=' flex w-full justify-center items-center gap-3'>
                    <input type="text"
                        className=' w-72 h-6  border-black border-2 rounded-lg px-1 py-1'
                        value={todo}
                        placeholder='Enter Todo'
                        onChange={(e) => setTodo(e.target.value)}
                    />
                    <button className=' h-fit bg-teal-600 rounded-lg text-lg px-2 font-normal text-white' onClick={handleSubmit}> Submit </button>
                </div>
                <div className=' w-full flex justify-center items-center mt-10 gap-3  flex-col '>

                    {
                        allTodo.length != 0 ? allTodo.map((todoData, index) => {
                            return (
                                <>
                                    <div key={index} className=' flex justify-between items-center border-2 border-black px-3 py-4 gap-3 w-2/4'>
                                        <div className="text"> {todoData.todo} </div>
                                        <div className=' flex gap-3'>
                                            <div className="update border-black border-2 font-bold cursor-pointer px-2 py-2 hover:bg-red-300"> update </div>
                                            <div onClick={()=>deleteDocument(todoData["$id"])} className="update border-black border-2 font-bold cursor-pointer px-2 py-2 hover:bg-red-300"> delete </div>
                                        </div>

                                    </div>
                                </>
                            )
                        }) : <>  </>
                    }


                </div>
            </div>
        </>
    )
}

export default Dashboard;