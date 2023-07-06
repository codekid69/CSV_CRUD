import React, { useState } from "react";
import "./home.css"
import Loader from "../components/Loader";
import User from '../components/User'
const Home = () => {
    const [file, setFile] = useState('');
    const [userdata, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [age, setAge] = useState();
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState();
    const [verified, setVerified] = useState('');
    const [add, setAdd] = useState(false);
    //Function for handling input file
    const handleFile = (file) => {
        setFile(file);
    }

    const fetchData = async () => {
        let data = await fetch(`http://127.0.0.1:5000/data`, {
            method: 'GET',
        })
        data = await data.json(data);
        setData(data.data);
    }

    // Uploading and getting data APi
    const handleUpload = async (e) => {
        setLoading(true);
        if(!file){
            alert("Please Select a CSV file");
            setLoading(false);
            return
        }
        let filedata = file;
        let formdata = new FormData();
        formdata.append('file', filedata);
        let data = await fetch(`http://127.0.0.1:5000/upload`, {
            method: 'POST',
            body: formdata
        })
        data = await data.json();
        setData(data.data);
        setLoading(false);
    }

    //Adding the New entry
    const handleEntery=async(e)=>{
        e.preventDefault();
        if(!name||!age||!email||!mobile||!verified){
            alert("Please fill all the feilds");
            return;
        }
        let response=await fetch(`http://127.0.0.1:5000/data`,{
            method:'POST',
            body:JSON.stringify({name,age,email,mobile,verified}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        response=await response.json();
        console.log(response);
        setAdd(!add);
        fetchData();
    }

    // Api Editng the Data
    const handleEdit = async (name, age, email, mobile, verified, id) => {
        let response = await fetch(`http://127.0.0.1:5000/data/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ name, age, email, mobile, verified }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response) {
            alert("SOme Error occured");
            return;
        }
        fetchData();
    }
    // Delete the data 
    const handleDelete = async (id) => {
        let response = await fetch(`http://127.0.0.1:5000/data/${id}`, {
            method: 'DELETE',
        })
        if (response) {
            alert("Entry Deleted SucessFully")
        }
        fetchData();
    }

    if (loading) {
        return <Loader />
    }
    
    if (userdata.length > 0) {
        return (
            <>
                <h1>CSV EDITOR</h1>
                <div className="userList">
                    <ul>
                        <li>S.no</li>
                        <li>Name</li>
                        <li>Age</li>
                        <li>Email</li>
                        <li>Mobile</li>
                        <li>Verified</li>
                        <li>Actions</li>
                    </ul>
                    {
                        userdata.map((user, index) => {
                            return <User user={user} index={index} handleEdit={handleEdit} handleDelete={handleDelete} />
                        })
                    }
                </div>
                {add?
                    <form action="post">
                    <input type='text' placeholder="Enter the name" onChange={(e) => setName(e.target.value)} />
                    <input type='number' placeholder="Enter the age" onChange={(e) => setAge(e.target.value)} />
                    <input type='email' placeholder="Enter the email" onChange={(e) => setEmail(e.target.value)} />
                    <input type='number' placeholder="Enter the Mobile" onChange={(e) => setMobile(e.target.value)} />
                    <input type='text' placeholder="Verified" onChange={(e) => setVerified(e.target.value)} />
                    <div className="btns">
                    <button onClick={()=>setAdd(!add)} >Cancel</button>
                    <button onClick={(e)=>handleEntery(e)}>Add Entry</button>
                    </div>
                    </form>
                    :""
                }
               <a href="http://127.0.0.1:5000/export"> <button style={{ marginRight: "18px" }}>Export Csv</button></a>
                <button onClick={()=>setAdd(!add)}>Add</button>
            </>
        )
    }
    return (
        <>
            <h1>CSV EDITOR</h1>
            <form>
                <label>Upload Your Csv</label>
                <input type="file" name="file" onChange={(e) => handleFile(e.target.files[0])} /><br /><br />
                <button type="button" onClick={(e) => handleUpload(e)}>Upload</button>
            </form>
        </>
    )
}
export default Home