import React, {useEffect, useState} from "react";
import { getFun } from "../api/getFun";
import { postFun } from "../api/postFun";
import { Link } from "react-router-dom";
import "../css/style.css"


export default function CreateReminder (){
    const [list, setList] = useState([]);

    async function getListData() {
        let res = await getFun("/list/getAll")
        setList(res.data.msg);
    }
    useEffect(() => {
        getListData();
    }, [])
    async function create(params) {
        const formData = new FormData();
        formData.append('describe', params.describe);
        formData.append('date', params.date);
        formData.append('time', params.time);
        formData.append('list_id', params.listId);
        await postFun("/item/create", formData).then(res => {
            window.location.href = "/";
        })
    }
        const element = [];
        list.forEach((item, index) => {
            element.push(
                <option value = {item.id} key = {index}>{item.name}</option>
            )
        })
        return (
            <div>
                <form action = "" className = "create-reminder-form" onSubmit = {(e) => {
                    e.preventDefault();
                    create({
                        describe : document.getElementById("describe").value ?? "null",
                        date : document.getElementById("date").value ?? "null",
                        time : document.getElementById("time").value ?? "null",
                        listId : document.getElementById("list").value ?? "null",
                    })
                }}>
                    <h1>Create Reminder</h1>
                    <div className = "create-reminder-form-item">
                        <label htmlFor = "describe">Describe</label>
                        <input type = "text" id = "describe" placeholder = "Please enter the description"/>
                    </div>
                    <div className = "create-reminder-form-item">
                        <label htmlFor = "date">Date</label>
                        <input type = "date" id = "date"/>
                    </div>
                    <div className = "create-reminder-form-item">
                        <label htmlFor = "time">Time</label>
                        <input type = "time" id = "time"/>
                    </div>
                    <div className = "create-reminder-form-item">
                        <label htmlFor = "list">List</label>
                        <select name = "" id = "list">
                            {element}
                        </select>
                    </div>
                    <div className = "create-reminder-form-item-btn">
                        <button className = "create-reminder-form-btn" type = "submit">Create</button>
                        <Link to = {{pathname : "/"}} className = "create-reminder-form-btn" onClick = {(e) => {
                            e.preventDefault();
                            window.history.back();
                        }}>Back</Link>
                    </div>
                </form>
            </div>
        )   
}