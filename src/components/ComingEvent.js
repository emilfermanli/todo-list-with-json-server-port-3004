import React,{useRef} from 'react'
import {useSelector} from "react-redux"
import {ReactComponent as Check} from "../assets/icons/check.svg"


function ComingEvent() {
    const clockRef = useRef()
    const dateRef = useRef()
    const daily = useSelector(state => state.dailyReducer)
    const work = useSelector(state => state.workReducer)

    let allData = [...daily,...work]

    const handleClock = () => {
        
        setInterval(() => {
            let time = new Date()
            
            let hour = time.getHours()
            let minute = time.getMinutes()
            let second = time.getSeconds()
            
            dateRef.current.innerText = time.getFullYear() + "-" + (time.getDate() < 10 ? "0" + time.getDate() : time.getDate()) + "-" + (time.getDay() < 10 || time.getDay() === 0  ? "0" + 7 : time.getDay())
            return  clockRef.current.innerText = hour + ":" + (minute < 10 ? "0" + minute : minute)  + ":" + (second < 10 ? "0" + second : second)
                
        }, 1000);
        
    }
    handleClock()

    let sortData = allData.sort((a,b ) => new Date(b.date) - new Date(a.date))

    return (
        <div>
            <div  className="clock">
                <h2 ref={dateRef} id="date">0000-00-00</h2>
                <h2 ref={clockRef} id="time">00:00:00</h2>
            </div>
            <div className="coming-item-box">
            {
                sortData && sortData.map((index,key) => (
                    <div className="coming-item" key={key}>
                        <h1 title={index.header}>
                            {index.header.length > 10 ? index.header.slice(0,10) + "..." : index.header}
                            {index.status ? <button style={{borderRadius: "100%"}}  className="check-btn">
                            <Check />
                            </button> : false}
                        </h1>
                        <h1>{index.date}</h1>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default ComingEvent
