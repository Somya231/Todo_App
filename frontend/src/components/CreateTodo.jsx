import { useState } from "react";

export function CreateTodo() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    return <div>
        <input style={{
            margin: 10,
            padding: 10,
        }} type="text" placeholder = "title" onChange={(e) => {
            const value = e.target.value;
            setTitle(e.target.value);
        }}/> <br />

        <input style={{
            margin: 10,
            padding: 10
        }} type="text" placeholder = "description" onChange={(e) => {
            const value = e.target.value;
            setDescription(e.target.value);
        }}/> <br />

        <button onClick={() => {
            fetch("http://localhost:3000/todo", {
                method: "POST",
                body: JSON.stringify({
                    title:title,
                    description: description
                }),
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then(async (res) => {
                const json = await res.json();
                alert("Todo created");
            })
        }}>Add a todo</button>
    </div>
}