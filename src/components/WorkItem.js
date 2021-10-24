import {useState} from "react"
import data from "../axios/data"
import {useDispatch} from "react-redux"
import { deleteWorkData,editWorkData } from "../redux/action/userAction"
import {ReactComponent as Close} from "../assets/icons/close.svg"
import {ReactComponent as Calendar} from "../assets/icons/calendar.svg"
import {ReactComponent as Edit} from "../assets/icons/edit.svg"
import {ReactComponent as Check} from "../assets/icons/check.svg"


const WorkItem = ({items,setListData,setModal}) => {

    const dispatch = useDispatch()
    const [currentStatus,setCurrentStatus] = useState(false)
    const handleDelete = (id) => {
        data.delete(`/works/${id}`)
        .then(res => res.data)
        .then(res => {
         
          if (res) {
            dispatch(deleteWorkData(items[0].id))
          }
        }).catch(err => console.log(err))
    }

    const handleStatus = (index) => { 
      data.put(`/works/${index.id}`, {...index, status:index.status = !index.status})
      .then(res => {
        
        dispatch(editWorkData(res.data))
        setCurrentStatus(res.data.status)
       
      })
    }

    const handleEdit = (index) => {
        setListData({
            id:index,
            type:"/works"
        })
        setModal(true)
    }
  
    return(
      <div>
        {
          items && items.map((index,key) => (
            <div key={key} className="item">
              <div className="item-header">
              {currentStatus ? <h4>Success: {index.header}</h4>: <h4>{index.header}</h4>}
                  <div className="action-btn-box">
                    <button className="edit-btn" onClick={() => handleEdit(index.id)}>
                      <Edit />
                    </button>
                    <button className="close-btn" onClick={() => handleDelete(index.id)}>
                      <Close />
                    </button>
                  </div>
              </div>
              <div className="item-body">
                  <p>
                    {index.about}
                  </p>
              </div>
              
              <div className="item-footer">
                <h5><Calendar /> : {index.date}</h5>
                {
                  !currentStatus ? <button onClick={() => handleStatus(index)} className="check-btn">
                  <Check />
                </button> : 
                <button style={{backgroundColor:"#dc3545"}} onClick={() => handleStatus(index)} className="check-btn">
                <Check />
              </button> 
                }
              </div>
              {
                currentStatus ? <div className="success-box">
                <Check />
              </div> : false
              }
            </div>
          ))
        }
      </div>
    )
  }

export default WorkItem