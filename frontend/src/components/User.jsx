import React, { useState } from 'react'
function User({ index, user,handleEdit,handleDelete }) {
    const [name, setName] = useState(user.name);
    const [age, setAge] = useState(user.age);
    const [email, setEmail] = useState(user.email);
    const [mobile, setMobile] = useState(user.mobile);
    const [verified, setVerified] = useState(user.verified);
    const [editMode, setEditMode] = useState(false);

    const handleUpdate=()=>{
        if(!name||!age||!email||!mobile||!verified){
            alert("Fill All the feilds");
            return;
        }
        handleEdit(name,age,email,mobile,verified,user._id);
        setEditMode(false);
    }
    const Delete=()=>{
        handleDelete(user._id);
    }
    return (<ul key={index}>
        {editMode?
        (
            <>
            <ul>
            <li>{index + 1}</li>
            <li><input type='text'  value={name} onChange={(e)=>setName(e.target.value)}/></li>
            <li><input type='number' value={age}onChange={(e)=>setAge(e.target.value)}/></li>
            <li><input type='email' value={email}onChange={(e)=>setEmail(e.target.value)}/></li>
            <li><input type='number' value={mobile}onChange={(e)=>setMobile(e.target.value)}/></li>
            <li><input type='text' value={verified}onChange={(e)=>setVerified(e.target.value)}/></li>
            <li>
                <button style={{ marginRight: '8px' }} onClick={() => setEditMode(!editMode)}>Cancel</button>
                <button type='button' onClick={handleUpdate}>update</button>
            </li>
            </ul>
            </>
        )
          :(
            <>
            <li>{index + 1}</li>
            <li>{user.name}</li>
            <li>{user.age}</li>
            <li>{user.email}</li>
            <li>{user.mobile}</li>
            <li>{user.verified}</li>
            <li>
                <button style={{ marginRight: '8px' }} onClick={() => setEditMode(!editMode)}>Edit</button>
                <button onClick={Delete} >Delete</button>
            </li>
            </>
          )
         }
       
    </ul>
    )
}

export default User