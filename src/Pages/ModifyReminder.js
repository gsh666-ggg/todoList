import React , {useEffect, useState} from "react";
import { getFun } from "../api/getFun";
import { postFun } from "../api/postFun";
import "../css/style.css";

export default function ModifyReminder(){
    const [reminderData,setReminderData] = useState({reminderData: {
        describe: '',
        date: '',
        time: ''
      }})
    
    async function getReminderData(){
        let res = await getFun("/item/getOne/" + localStorage.modifyId)
        setReminderData(res.data.msg);
    }
    async function modify(params) {
        const formData = new FormData();
        formData.append('describe', params.describe);
        formData.append('date', params.date);
        const timeValue = params.time.split(':').slice(0, 2).join(':');
        formData.append('time', timeValue);
        await postFun("/item/modify/" + localStorage.modifyId, formData).then(res=>{
            window.history.back();
        });
    }
    useEffect(() => {
        getReminderData();
    },[])
        return (
            <div>
                <form action = "" className = "create-reminder-form" onSubmit = {(e) => {
                    e.preventDefault();
                    modify({
                        describe : document.getElementById("describe").value ?? "null",
                        date : document.getElementById("date").value ?? "null",
                        time : document.getElementById("time").value ?? "null",
                    })
                }}>
                    <h1>Modify Reminder</h1>
                    <div className = "create-reminder-form-item">
                        <label htmlFor = "describe">Describe</label>
                        <input type = "text" id="describe" placeholder = "Please enter the description" value = {reminderData.describe}
                        onChange = {(e) => {
                            setReminderData({
                                reminderData : {
                                    ...reminderData,
                                    describe : e.target.value,
                                },
                            })
                        }}
                        />
                    </div>
                    <div className = "create-reminder-form-item">
                        <label htmlFor = "date">Date</label>
                        <input type = "date" id = "date" value = {reminderData.date} 
                        onChange = {(e) => {
                            setReminderData({
                                reminderData : {
                                    ...reminderData,
                                    date : e.target.value,
                                },
                            });
                        }}/>
                    </div>
                    <div className = "create-reminder-form-item">
                        <label htmlFor = "time">Time</label>
                        <input type = "time" id = "time" value = {reminderData.time} 
                        onChange = {(e) => {
                            setReminderData({
                                reminderData : {
                                    ...reminderData,
                                    time : e.target.value,
                                },
                            });
                        }}
                        pattern = "^(?:[01]\d|2[0-3]):(?:[0-5]\d)$"/>
                    </div>
                    <div className = "create-reminder-form-item-btn">
                        <button className = "create-reminder-form-btn" type = "submit">Modify</button>
                        <button className = "create-reminder-form-btn" onClick = {(e) => {
                            e.preventDefault();
                            window.history.back();
                        }}>Back</button>
                    </div>
                </form>
            </div>
        )
}