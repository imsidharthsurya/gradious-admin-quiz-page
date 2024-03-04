import React from "react";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

export default function Form() {

    

    
    const modules = {
        toolbar: [
        ['bold', 'italic', 'underline','list'],
        [{ list: 'ordered'}, { list: 'bullet' }]
        ],
    };

    const { quill, quillRef } = useQuill({modules});
    const [val,setVal]=React.useState();        //this state is storing quill value
    const [formData,setFormData]=React.useState({   //this will store rest of the form value
        topicid:1,
        complexityid:1,
        active:true,
        title:"",

    })
    
    //to get list of all the topics
    const [allTopics,setAllTopics]=React.useState([]);

    React.useEffect(()=>{

            async function fetchData(){
                const dt=await fetch("http://localhost:8080/lms/topics")
                const finalData=await dt.json();
                setAllTopics(finalData)
                console.log("all the topics are ",finalData)
                
            }
            fetchData();

    },[])


    // console.log("the form data is: ",formData)

    //check whether update question or add question
    const urlParams = new URLSearchParams(window.location.search);
    
    //only run in case of update question
    React.useEffect(()=>{
            if(urlParams.get("id"))
            {
                alert("coming from update")
                fetch(`http://localhost:8080/lms/admin/saq/get/${urlParams.get("id")}`).then((response)=>{
                    return response.json()
                }).then((data)=>{
                    setFormData({   //this will store rest of the form value
                        topicid:data[0].topicid,
                        complexityid:data[0].complexityid,
                        active:data[0].active,
                        title:data[0].title
                    })

                    setVal(data[0].description);        //description value
                    alert("above setting desc dataaa")   
                    quill.clipboard.dangerouslyPasteHTML(data[0].description);
                    alert("after setting the data")
                })
            }
    },[quill])





    function handleChange(event){
        setFormData(prevFormData=>{
            return {
                ...prevFormData,
                [event.target.name]:event.target.value
            }
        })
    }


    function handleSubmit(){
        console.log(formData)
        console.log(val)
        const data={            //data to push to the database
            title: formData.title,
            description: val,
            topicid: formData.topicid,
            complexityid: formData.complexityid,
            active: formData.active,
        }

        if(urlParams.get("id")){
            
            fetch(`http://localhost:8080/lms/admin/saq/update/${urlParams.get("id")}`,{
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then((response)=>{
                return response.json()
            }).then((data)=>{
                    //this will disable the old question now add the new question same as add question
                    alert("old question disabled")
                    alert("Question Updated")
            })



        }else{
                fetch('http://localhost:8080/lms/admin/saq/add',{
                    method:'POST',
                    body:JSON.stringify(data),
                    headers:{
                        'Content-Type':'application/json'
                    }
                }).then((response)=>{
                    return response.json();
                }).then((data)=>{
                    alert("Question got added successfully")
                })
        }
        
        window.location.href='/'
    }



    React.useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        console.log('Text change!');
        console.log(quill.getText()); // Get text only
        console.log(quillRef.current.firstChild.innerHTML)
        setVal(quillRef.current.firstChild.innerHTML);
      });
    }
}, [quill]);

    console.log("quill value that u r typing is: ",val);


 


//UI -Part

if(allTopics.length===0){
    return (<h2>Loading Page...</h2>)
}
    return (
<div class="body">


<div class="text2">Add Question</div><br/>
<table>
<tr>
<th>
    
<label for="topicid" class="lb1">Topic</label>
    <select  class="box1" value={formData.topicid} name="topicid" id="topicid" onChange={handleChange} required>

            {allTopics.map((item, index) => (
                            //assigning every option with topic id
                    <option value={item.id}>{item.name}</option>
                    ))}
    </select>
</th>

<th>
<label for="complexityid" class="lb2">Level</label>
<select  class="box2" value={formData.complexityid} name="complexityid" id="complexityid" onChange={handleChange} required>
        <option value={1}>Easy</option>
        <option value={2}>Medium</option>
        <option value={3}>Hard</option>
        </select>
</th>
</tr>
</table>

<table>
<tr>
<th>
    <div className="tempStatus">
<label for="active" class="lb1">Status</label>
<select  class="box1" value={formData.active} name="active" id="active" onChange={handleChange} required>
        <option value={true}>Published</option>
<option value={false}>Un-published</option>
        </select>
    </div>
</th>

</tr>
</table>

<div className="gap">
    <label for="title"><b>Question Title</b></label><br/>
    <input type="text" name="title" id="title" className="title" value={formData.title} onChange={handleChange}/>
    
</div>

<div className="gap">
    <label for="description"><b>Description</b></label>
    <div class="desc1">
    <div ref={quillRef} name="description"/>
    </div>
</div>


{/* <label for="myfile" class="lb4"><b>Attachment</b></label><br/>
<input type="file" class="box4" id="myfile" name="myfile"/> */}
<div className="gap-attach">
<label for="myfile" ><b>Attachment</b></label><br/>
<input type="file" id="myfile" name="myfile" className="fileSubmit"/>
</div>
<button type="button" class="save" onClick={handleSubmit} name="button"><div class="text3"><b>{urlParams.get("id")?"Update":"Save"}</b></div></button>


</div>



    )



}