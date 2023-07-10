import Index from "../Pages/index";
import CreateList from "../Pages/CreateList";
import CreateReminder from "../Pages/CreateReminder";
import ModifyReminder from "../Pages/ModifyReminder";
import ModifyList from "../Pages/ModifyList"
const routers = [
    {
        path : '/',
        name : "Index",
        components : Index
    },
    {
        path : '/CreateList',
        name : "CreateList",
        components : CreateList
    },
    {
        path : '/CreateReminder',
        name : "CreateReminder",
        components : CreateReminder
    },
    {
        path : '/ModifyReminder',
        name : "ModifyReminder",
        components : ModifyReminder
    },
    {
        path : '/ModifyList',
        name : "ModifyList",
        components : ModifyList
    }
];
export default routers;