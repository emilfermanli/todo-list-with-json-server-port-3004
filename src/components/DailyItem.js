import React,{useEffect,useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import data from "../axios/data"
import {deleteData,editData} from "../redux/action/userAction"
import {ReactComponent as Close} from "../assets/icons/close.svg"
import {ReactComponent as Edit} from "../assets/icons/edit.svg"
import {ReactComponent as Calendar} from "../assets/icons/calendar.svg"
import {ReactComponent as Check} from "../assets/icons/check.svg"

const DailyItem = ({items,setModal,setListData}) => {

    const dispatch = useDispatch()
    const [currentStatus,setCurrentStatus] = useState(false)

    
  
    const handleDelete = (id) => {
        data.delete(`/lists/${id}`)
        .then(res => res.data)
        .then(res => {
          if (res) {
            dispatch(deleteData(items[0].id))
          }
        }).catch(err => console.log(err))
    }

    const handleEdit = (index) => {
      setListData({
          id:index,
          type:"/lists"
      })
      setModal(true)
  }

  const handleStatus = (index) => { 
    data.put(`/lists/${index.id}`, {...index, status:index.status = !index.status})
    .then(res => {
      
      dispatch(editData(res.data))
      setCurrentStatus(res.data.status)
      console.log(res.data)
    })
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
                  !currentStatus ?  <button onClick={() => handleStatus(index)} className="check-btn">
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
export  default DailyItem  