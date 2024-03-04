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
    
    console.log("the form data is: ",formData)

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

        fetch('http://localhost:8080/lms/admin/saq/add',{
            method:'POST',
            body:JSON.stringify(data),
            headers:{
                'Content-Type':'application/json'
            }
        })
    }



    React.useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        console.log('Text change!');
        console.log(quill.getText()); // Get text only
        setVal(quill.getText());
      });
    }
}, [quill]);

    console.log("quill value that u r typing is: ",val);


 


//UI -Part
    return (
<div class="body">


<div class="text2">Add Question</div><br/>
<table>
<tr>
<th>
    
<label for="topicid" class="lb1">Topic</label>
    <select  class="box1" value={formData.topicid} name="topicid" id="topicid" onChange={handleChange} required>
            <option value={1}>html tags</option>
            <option value={2}>Tables</option>
            <option value={3}>Canvas</option>
            <option value={4}>Css</option>
            <option value={5}>Html Forms</option>
            <option value={6}>Html Lists</option>
            <option value={7}>tempCss</option>
            <option value={8}>HTML images</option>
            <option value={9}>html effects</option>
            <option value={10}>HTML Entities</option>
            <option value={11}>HTML Entities</option>
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
<button type="button" class="save" onClick={handleSubmit} name="button"><div class="text3"><b>Save</b></div></button>


</div>



    )



}