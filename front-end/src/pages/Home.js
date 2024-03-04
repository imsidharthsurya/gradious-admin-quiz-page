import React from "react";
import { Outlet, Link } from "react-router-dom";
//here we are showing list of all the questions

export default function Home(){

    const [allqn,setAllQn]=React.useState([]);
    const [searchTerm,setSearchTerm]=React.useState("")     //will store search term value
    const [sortVal,setSortVal]=React.useState("")
    function handleSort(event){
        setSortVal(event.target.value)
        const sorted=[...allqn].sort((a,b)=>{
           return a[event.target.value].toLowerCase()>b[event.target.value].toLowerCase()?1:-1;
            }
        )
        setAllQn(sorted)
    }
    console.log("sort value is: ",sortVal)

    function handleChange(event){
        setSearchTerm(event.target.value)
    }

        console.log("the search term value is: ",searchTerm)
    React.useEffect(()=>{

            async function fetchData(){
                const dt=await fetch("http://localhost:8080/lms/admin/saq/get")
                const finalData=await dt.json();
                setAllQn(finalData)
                
                console.log("inside async the final data is ",finalData)
                console.log("inside async the question is ",allqn)
            }
            fetchData();

    },[])
    
    console.log("outside async")
    console.log("all qun outside is ",allqn)

    function handleClick(event){
        console.log(event.target.id)
        if(event.target.id[0]=='e'){
            var editId=parseInt(event.target.id.substr(3));
            alert("edit button with id: "+editId)
            window.location.href='/Addques?id='+editId;
        }
        else{
            var delId=parseInt(event.target.id.substr(3));
            alert("delete button with id: "+delId)
            var data={
                del:true
            }
            fetch(`http://localhost:8080/lms/admin/saq/update/${delId}`,{
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then((response)=>{
                return response.json();
            }).then((data)=>{
                console.log(data)
                alert("Question Deleted Successfully")
                window.location.reload();
            })
        }
    }
    
    


    //UI part

    if(allqn.length===0) return(<h2>Loading...</h2>)


    return (
        
        
        <div className="question-list">
            <span className="topic-title">Coding Challenges</span>
            <input type="text" name="search" class="icon" value={searchTerm} onChange={handleChange} placeholder="Search"></input>
            <select className="sorting" value={sortVal} name="sort" onChange={handleSort}>
                <option value={""}>Select Filter</option>
                <option value={"title"}>Sort by title</option>
                <option value={"topicName"}>Sort by topic</option>
                <option value={"complexity"}>Sort by complexity</option>
            </select>
            <button className="add-btn"><Link to="/Addques">Add Question</Link></button>
            <div className="qn-list">
                    <table className="qn-table">
                        <tr>
                            <th className="q-col">QUESTION NAME</th>
                            <th className="q-col">TOPIC</th>
                            <th className="q-col">LEVEL</th>
                            <th className="q-col">Edit</th>
                        </tr>
                        {allqn.filter((qn)=>{
                            return qn.title.toLowerCase().includes(searchTerm.toLowerCase());
                        }).map((item, index) => (
                            //assigning every row with question id
                        <tr key={item.id}>          

                            <td>
                            <span className="qnn">{item.title}</span>
                            </td>
                            <td>
                            <span className="qnn">{item.topicName}</span>
                            </td>
                            <td>
                            <span className="qnn">{item.complexity}</span>
                            </td>
                            <td>
                                <button className="edi-btn change-btn" id={"edi"+item.id} onClick={handleClick}>Edit</button>
                                <button className="del-btn change-btn" id={"del"+item.id} onClick={handleClick}>Delete</button>
                            </td>

                        </tr>))}

                    </table>
            </div>
        </div>
    )
}