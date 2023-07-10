import React,{Component, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { getFun } from "../api/getFun";
import { postFun } from "../api/postFun";

export default function ModifyList(){
    const [listData, setListData]=useState({
        name: '',
        bgColor: '',
        icon: ''
    });
    async function getListData(){
        let res = await getFun("/list/getOne/" + localStorage.modifyListId)
        setListData(res.data.msg);
    }
    async function modify(params) {
        const formData = new FormData();
        formData.append('name', params.name);
        formData.append('bgColor', params.bgColor);
        if(document.getElementById('listIcon').files[0] !== undefined){
            formData.append('icon', document.getElementById('listIcon').files[0]);
        }
        else{
            formData.append('icon', "null");
        }
        await postFun("/list/modify/" + localStorage.modifyListId, formData).then(res => {
            window.history.back();
        });
    }
    useEffect(() => {
        getListData();
    },[])
        return (
            <form className = "createList">
                <h1 className = "createList-title">Modify List</h1>
                <div className = "createList-content">
                    <div className = "createList-content-item">
                        <span className = "createList-content-item-text">Name ：</span>
                        <input type = "text" className = "createList-content-item-input" id = "listName" value = {listData.name}
                            onChange = {(e) => {
                                setListData({
                                    listData : {
                                        ...listData,
                                        name : e.target.value,
                                    },
                                });
                            }}
                        />
                    </div>
                    <div className = "createList-content-item">
                        <span className = "createList-content-item-text">Color ：</span>
                        <input type = "color" className = "createList-content-item-input" id = "listColor" value = {listData.bgColor}
                        onChange = {(e) => {
                            setListData({
                                listData : {
                                    ...listData,
                                    bgColor : e.target.value,
                                },
                            });
                        }}
                        />
                    </div>
                    <div className = "createList-content-item">
                        <span className = "createList-content-item-text">image ：</span>
                        <input type = "file" className = "createList-content-item-input" id = "listIcon"/>
                    </div>
                    <div className = "createList-btn">
                        <Link to = {{pathname : "/"}} className = "createList-btn-create create-btn" onClick = {(e) => {
                            e.preventDefault();
                            modify({
                                name : document.getElementById("listName").value ?? "null",
                                bgColor : document.getElementById("listColor").value ?? "null",
                            })
                        }}>Modify</Link>
                        <Link to = {{pathname:"/"}} className = "createList-btn-back create-btn" onClick = {(e) => {
                            e.preventDefault();
                            window.history.back();
                        }}>back</Link>
                    </div>
                </div>
            </form>
        )
}