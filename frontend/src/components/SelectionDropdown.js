import React from "react";
import { Dropdown } from "semantic-ui-react";

const SelectionDropdown = ({users,setUsers, allUsers}) => {
    const addUsers = (input) => {
        if(input === ""){
            return;
        }
        if(users.includes(input)){
            return;
        }
        const new_list = [...users];
        new_list.push(input)
        setUsers(new_list);
    };
    if(allUsers.length === 0){
        return <div className="ui loader"></div>
    }
    return (
        <Dropdown
            placeholder='Add members'
            fluid
            search
            selection
            multiple
            options={allUsers}
            onChange={(e) => addUsers(e.target.textContent)}
        />
    );
};

export default SelectionDropdown;
