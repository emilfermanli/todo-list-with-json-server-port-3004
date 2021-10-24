import React,{useEffect,useState} from "react"
import { 
  getLastData,
  getLastWorkData,
  newData,
  newWorkData,
  editWorkData,
  editData
} from "./redux/action/userAction"
import {useDispatch,useSelector} from "react-redux"
import {ReactComponent as Plus} from "./assets/icons/plus.svg"
import { nanoid } from 'nanoid'
import axios from "axios"
import WorkItem from "./components/WorkItem"
import DailyItem from "./components/DailyItem"
import {ReactComponent as Close} from "./assets/icons/close.svg"
import ComingEvent from "./components/ComingEvent"
import { useForm } from "react-hook-form";


function App() {

  const dispatch = useDispatch()
  const todoData = useSelector(state => state.dailyReducer)
  const workList = useSelector(state => state.workReducer)
  // Modal status
  const [modal,setModal] = useState(false)
  // Modal status
  const [selectData,setSelectData] = useState(false)
  const [listData,setListData] = useState(null)
  const [user,setUsers] = useState({
    header:"",
    about:"",
    date:"",
    id:"",
    status:false
  })
  const { register, handleSubmit,reset,   formState: { errors } } = useForm({
    defaultValues: user
  });
 
  useEffect(() => {
    
    if (listData !== null) {
      axios.get(`http://localhost:3004${listData.type}/${listData.id}`).then((res) => {
      setUsers(res.data);
      reset(res.data);
    });
    }else {
      setUsers({
        header:"",
        about:"",
        date:"",
        id:"",
        status: false
      })
      setListData(null)
    }
  }, [reset,listData]);
  
  const handleShowModal = () => {
    setModal(!modal)
    if (modal === false) {
      reset(user)
      reset(listData)    
    }
  }

  useEffect(() => {
      dispatch(getLastData())
      dispatch(getLastWorkData())
  }, [dispatch])

  const onSubmit = (data) => { 
    
  if (user.id !== "") {
      axios.put(`http://localhost:3004${listData.type}/${listData.id}`,{
        id:listData.id,
        header: data.header, 
        about: data.about,
        date: data.date,
        status: listData.status
      })
      .then(res => res.data)
      .then(res => {
        if (listData.type === "/lists") {
          dispatch(editData(res))
        } else {
          dispatch(editWorkData(res))
        }
        setModal(false)
        setListData(null)
      })
      
    } else {
      let postUrl = selectData ? "/lists" : "/works"
      let userData = {
        ...data,
        status: false,
        id:nanoid()
      }
      axios.post(`http://localhost:3004${postUrl}`,{...userData})
      .then(res => res.data)
      .then(res => {
        console.log(postUrl)
        console.log(res)
        if (postUrl === "/lists") {
          dispatch(newData(res))
        } else {
          dispatch(newWorkData(res))
        }
        setModal(false)
        setListData(null)
      })
    }

    
    reset()
    
    console.log(listData)
    console.log(user)
  }

  const handleCloseModal = () => {
    setModal(false)  
    if(modal === false){
      setUsers({
        header:"",
        about:"",
        date:"",
        id:"",
      })
      setListData(null)
    }
  }



  return (
    <div className="App">
      <div id="todo-wrapper">
        <div className="box">
          <div className="header">
            <h4>Work</h4>
          </div>
          <div className="work-body">
            <WorkItem 
            setListData={setListData} 
            items={workList} 
            setModal={setModal}
            />
          </div>
        </div>
        <div className="box middle-box">
          <div className="header">
          Daily
          </div>
          <div className="daily-body">
            <DailyItem 
             setListData={setListData} 
             items={todoData} 
             setModal={setModal}
             />
          </div>
        </div>
        <div className="box">
          <div className="header">
            Coming event
          </div>
          <div className="event-body">
            <ComingEvent />
          </div>
        </div>
      </div>
      <div onClick={() => handleShowModal()} className="add-button">
        <Plus />
      </div>
      <div style={modal ? {opacity: "1",zIndex:"99"} : {opacity: "0",zIndex:"-2"}} id="modal">
          <div className="modal-box">
            <div className="modal-header">
              <h4>{user.header ? "Edit Task" : "Add Task"}</h4>
              <button className="close-btn"  onClick={() => handleCloseModal()}>
                <Close  />
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input name="header" type="text"  {...register("header",{required: true})}  src="text" placeholder="Header" />
                <span className="err-message">{errors.header && <span>Boş saxlanıla bilməz</span>}</span>
                <textarea {...register("about",{required: true})}  placeholder="About" name="about">

                </textarea>
                <span className="err-message">{errors.about && <span>Boş saxlanıla bilməz</span>}</span>
                <input  {...register("date",{required: true})} type="date" name="date" />
                <span className="err-message">{errors.date && <span>Boş saxlanıla bilməz</span>}</span>
                  <div id="list-select">
                  <label>
                    Daily
                    <input type="radio" onChange={() => setSelectData(true)} checked={selectData ? true : false} name="daily" />
                  </label>
                  <label>
                    Work
                     <input type="radio" onChange={() => setSelectData(false)} checked={!selectData ? true : false} name="daily" />
                  </label>
                  </div>
                <button>
                  Submit
                </button>
              </form>
            </div>
          </div>
      </div>
    </div>
  );
}





export default App;
