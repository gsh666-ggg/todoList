import React, {useEffect, useState} from "react";
import { getFun } from "../api/getFun";
import { postFun } from "../api/postFun";
import { Link } from "react-router-dom";
import { delFun } from "../api/delFun";
import "../css/style.css"

function Index() {
    const [allList, setAllList] = useState([]);
    const [todayList, setTodayList] = useState([]);
    const [completeList, setCompleteList] = useState([]);
    const [listData, setListData] = useState([]);
    const [useListData,setUseListData] = useState([]);
    const [useId,setUseId] = useState(1);
    let userAdd = false;

    async function getAllList() {
        const res = await getFun("/item/getAll");
        setAllList(res.data.msg);
    }
    async function getTodayList() {
        const res = await getFun("/item/getToday");
        setTodayList(res.data.msg);
    }
    async function getCompleteList() {
        const res = await getFun("/item/getComplete");
        setCompleteList(res.data.msg);
    }
    async function getListData(){
        const res = await getFun("/list/getAll");
        setListData(res.data.msg);
    }
    async function getUseListData(){
        const res = await getFun("/list/getOneList/" + useId);
        setUseListData(res.data.msg);
    }
    async function completeListData(id = null){
        const res = await postFun("/item/complete/" + id)
        getAllList();
        getTodayList();
        getCompleteList();
        getListData();
        if(useId > 0){
            getUseListData();
        } 
    }
    async function deleteListData(id = null){
        let res = await delFun("/item/delete/" + id)
        getAllList();
        getTodayList();
        getCompleteList();
        getListData();
        if(useId > 0){
            getUseListData();
        }
    }
    useEffect(() => {
        getAllList();
        getTodayList();
        getCompleteList();
        getListData();
        getUseListData();
    }, []);
    useEffect(() => {
        if(useId > 0){
            getUseListData();
        }
    }, [useId]);
    useEffect(() => {
        if(useId == 0){
            setUseListData(todayList);
        }
        else if(useId==-1){
            setUseListData(allList);
        }
        else{
            setUseListData(completeList)
        }
    }, [allList, todayList, completeList]);

    const element = [];
    listData.forEach((item, index) => {
        const backgroundColor = {backgroundColor : item.bgColor};
        element.push(
            <div className = "left-item" key = { index } style = {backgroundColor}>
                <input type = "radio" className = "item-radio" name = "itemRadio" checked = {useId === item.id} onChange = {() => {setUseId(item.id)}}/>
                <img src = { item.icon } alt = "" className = "item-img"/>
                <p className = "item-p">{ item.name }</p>
                <button className = "item-btn-mod" onClick={()=>{
                    localStorage.modifyListId = item.id;
                    window.location.href = "/ModifyList"
                }}>修改</button>
            </div>
        )
    })

    const element2 = [];
    if(!userAdd){
        useListData.forEach((item, index) => {
            element2.push(
                <div className = "right-item" key = {index}>
                    <div className = "right-item-top right-item-item">
                        <span className = "right-span">描述：{item.describe}</span> 
                        <button className = "right-item-top-button right-btn" disabled = {useId == -2 ? true : false} onClick = {() => {
                            localStorage.modifyId = item.id;
                            window.location.href = "/ModifyReminder"
                        }}>修改</button>
                    </div>
                    <div className = "right-item-middle right-item-item">
                        <button className = "right-item-middle-button right-btn" disabled = {useId == -2 ? true : false} onClick = {() => {
                            completeListData(item.id);
                        }}>完成</button>
                    </div>
                    <div className="right-item-bottom right-item-item">
                        <span  className="right-span">时间：{item.date} {item.time.split(":").slice(0,2).join(":")}</span>
                        <button className="right-item-bottom-button right-btn" onClick={()=>{
                            deleteListData(item.id);
                        }}>删除</button>
                    </div>
                </div>
            )
        });
    }
    else{
        <form className = "createList">
                <h1 className = "createList-title">Create List</h1>
                <div className = "createList-content">
                    <div className="createList-content-item">
                        <span className = "createList-content-item-text">Name ：</span>
                        <input type = "text" className = "createList-content-item-input" id = "listName"/>
                    </div>
                    <div className = "createList-content-item">
                        <span className = "createList-content-item-text">Color ：</span>
                        <input type = "color" className = "createList-content-item-input" id = "listColor"/>
                    </div>
                    <div className = "createList-content-item">
                        <span className = "createList-content-item-text">image ：</span>
                        <input type = "file" className = "createList-content-item-input" id = "listIcon"/>
                    </div>
                </div>
            </form>
    }
    return (
        <div className = "content">
            <div className = "content-top">
                <div className = "top-item top-today" onClick = {() => {   
                    setUseId(0);
                    setUseListData(todayList);
                }}>
                    <p>今日</p>
                    <p>{todayList.length}</p>
                </div>
                <div className = "top-item top-all" onClick = {() => {   
                    setUseId(-1);
                    setUseListData(allList);
                }}>
                    <p>全部</p>
                    <p>{allList.length}</p>
                </div>
                <div className = "top-item top-complete" onClick = {() => {   
                    setUseId(-2);
                    setUseListData(completeList);
                }}>
                    <p>已完成</p>
                    <p>{completeList.length}</p>
                </div>
            </div>
            <div className = "content-bottom">
                <div className = "content-bottom-left">
                    <div className = "left-item">
                        <Link to = {{
                            pathname : "/CreateList"
                        }}  className = "content-bottom-button" onClick = {() => {
                            
                        }}>添加列表</Link>
                        <Link to = {{
                            pathname : "/CreateReminder"
                        }} className = "content-bottom-button">添加事项</Link>
                    </div>
                    {element}
                </div>
                <div className = "content-bottom-right">
                    {element2}
                </div>
            </div>
        </div>
    );
}
export default Index;