 export function Todos({todos}) {

    return <div>
    {todos.map((todo) => {
        return <div>
            <h2>{todo.title}</h2>
        <h4>{todo.description}</h4>

        <button onClick={() => {
            fetch("http://localhost:3000/completed", {
                method: "PUT",
                body: JSON.stringify({
                    id:id
                }),
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then(async (res) => {
                const json = await res.json();

            })
        }}>{todo.completed == true ? "Completed" : "Mark as Complete"}</button>
        </div>
    })}    
    </div>
 }