import { api } from "../utils/api";
import { Todo } from "./Todo";

// Define the Todos component
export function Todos() {
    // Use the useQuery hook to fetch all todos
    const { data: todos, isLoading, isError } = api.todo.all.useQuery();

    // Display a loading message while the todos are being fetched
    if (isLoading) return <div>Loading todos 🔄</div>
    // Display an error message if there was an error fetching the todos
    if (isError) return <div>Error fetching todos ❌</div>

    // Render the list of todos or a message if there are no todos
    return (
        <>
            {todos.length ?
                // Map over the todos and render a Todo component for each one
                todos.map((todo) => {
                    return <Todo key={todo.id} todo={todo} />
                })
                // Display a message if there are no todos
                : "Create your first todo..."}
        </>
    )
}