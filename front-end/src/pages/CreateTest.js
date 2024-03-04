import React, {useState}from "react";
import { Outlet, Link } from "react-router-dom";

export default function CreateTest(){
  
        const [inputFields, setInputFields] = useState([{
        topicid:'',
        complexityid:'',
        numOfques:'',
        marks:'',
        duration:''
    } ]);


 
    const addInputField = ()=>{
        setInputFields([...inputFields, {
            topicid:'',
            complexityid:'',
            numOfques:'',
            marks:'',
            duration:''
        } ])
      
    }

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

    const removeInputFields = (index)=>{
        alert(index)
        const rows = [...inputFields];
        rows.splice(index, 1);
        setInputFields(rows);
   }
   const handleChange = (index, evnt)=>{
    
    const { name, value } = evnt.target;
    const list = [...inputFields];
    list[index][name] = value;
    setInputFields(list); 
 
}
console.log("all the form data is: ",inputFields)
    return(
    
        <div className="container">
            <div className="create-test">
        <span className="topic-title">Coding Challenges</span>
            <button className="add-btn"><Link to="/Addques">Create Test</Link></button>
        </div>
            <div className="row">
                <div className="col-sm-8">
                  {
                      inputFields.map((data, index)=>{
                          const {topicName, complexity,numOfques,marks,duration}= data;
                          return(
                            <div className="row my-3" key={index}>
                    <div className="col">
                    <div className="form-group">
                    {/* <input type="text" onChange={(evnt)=>handleChange(index, evnt)} value={fullName} name="topicName" className="form-control"  placeholder="Full Name" />
                     */}
                    <select className="fop" value={inputFields[index].topicid} name="topicid" id="topicid" onChange={(evnt)=>handleChange(index, evnt)} required>
                            <option value={""} className="tempOp">select topic</option>
                            {allTopics.map((item, index) => (
                                            //assigning every option with topic id
                                    <option value={item.id}>{item.name}</option>
                                    ))}
                    </select>
                    <select className="sop" value={inputFields[index].complexityid} name="complexityid" id="topicid" onChange={(evnt)=>handleChange(index, evnt)} required>
                            <option value={""} className="tempOp">select level</option>
                            <option class="op1"value={1}>Easy</option>
                            <option class="op2"value={2}>Medium</option>
                            <option class="op3"value={3}>Hard</option>
                    </select>
                    <input type="number" onChange={(evnt)=>handleChange(index, evnt)} value={inputFields[index].numOfques} name="numOfques" className="form-control top"  placeholder="Number of questions" />
                    <input type="number" onChange={(evnt)=>handleChange(index, evnt)} value={inputFields[index].marks} name="marks" className="form-control frop"  placeholder="Marks" />
                    <input type="number" onChange={(evnt)=>handleChange(index, evnt)} value={inputFields[index].duration} name="duration" className="form-control fiop"  placeholder="duration in Minutes" />
                    {(inputFields.length!==1)? <button className="btn btn-outline-danger btn-del" onClick={()=>removeInputFields(index)}><svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M5.68047 4.93363C5.99114 4.93363 6.24625 5.14057 6.27364 5.40465L6.27607 5.45182V8.74091C6.27607 9.02709 6.00941 9.25909 5.68047 9.25909C5.3698 9.25909 5.11469 9.05216 5.0873 8.78807L5.08487 8.74091V5.45182C5.08487 5.16563 5.35153 4.93363 5.68047 4.93363Z" fill="#F55533"/> <path d="M8.79395 5.40465C8.76657 5.14057 8.51145 4.93363 8.20078 4.93363C7.87184 4.93363 7.60518 5.16563 7.60518 5.45182V8.74091L7.60762 8.78807C7.635 9.05216 7.89012 9.25909 8.20078 9.25909C8.52973 9.25909 8.79639 9.02709 8.79639 8.74091V5.45182L8.79395 5.40465Z" fill="#F55533"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.20078 0C9.19872 0 10.0127 0.685314 10.0548 1.54451L10.0565 1.61455V2.19273H12.6113C12.9403 2.19273 13.2069 2.42473 13.2069 2.71091C13.2069 2.9812 12.9691 3.20315 12.6655 3.22698L12.6113 3.2291H11.9468V10.3855C11.9468 11.2537 11.1591 11.9618 10.1715 11.9985L10.091 12H3.79023C2.7923 12 1.97834 11.3147 1.93619 10.4555L1.93447 10.3855V3.2291H1.26992C0.940977 3.2291 0.674316 2.9971 0.674316 2.71091C0.674316 2.44062 0.912171 2.21867 1.21571 2.19484L1.26992 2.19273H3.82471V1.61455C3.82471 0.746324 4.61241 0.0381621 5.59997 0.00149169L5.68047 0H8.20078ZM3.12568 3.2291V10.3855C3.12568 10.6888 3.3942 10.9376 3.73573 10.9617L3.79023 10.9636H10.091C10.4397 10.9636 10.7256 10.73 10.7534 10.4329L10.7556 10.3855V3.2291H3.12568ZM8.86534 2.19273H5.01592V1.61455L5.01812 1.56713C5.04584 1.26999 5.3318 1.03637 5.68047 1.03637H8.20078L8.25529 1.03829C8.59682 1.06241 8.86534 1.3112 8.86534 1.61455V2.19273Z" fill="#F55533"/> </svg></button>:''}
                    </div>
                    </div>
                   
                    <div className="col">
                
                
                 {/* {(inputFields.length!==1)? <button className="btn btn-outline-danger" onClick={removeInputFields}>x</button>:''} */}
                  
                 
                    </div>
                  </div>
                          )
                      })
                  }
     
                <div className="row">
                    <div className="col-sm-12">
                    <button className="btn btn-outline-success " onClick={addInputField}>+Add Topic</button>
                    </div>
                </div>
                  </div>
                </div>
                <div className="col-sm-4">
                </div>
            </div>
        
    )
}