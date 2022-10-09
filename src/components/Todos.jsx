import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan, faCheck, faCancel } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";

function Todos() {
    const [todos, setTodos] = useState([]);
    const [todoText, setTodoText] = useState("");
    const [temp, setTemp] = useState("");
    const [todoModify, setTodoModify] = useState("");
    const [modify, setModify] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("todo") !== null) {
            setTodos(JSON.parse(localStorage.getItem("todo")));
            // console.log(todos);
        } else {
            setTodos([]);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("todo", JSON.stringify(todos));
    }, [todos]);

    const onChange = (e) => {
        const {
            target: { value },
        } = e;

        switch (e.target.name) {
            default:
                setTodoText(value);
                break;
            case "modify":
                setTodoModify(value);
                break;
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (todoText !== "") {
            let todoObj = {
                id: todos.length,
                text: todoText,
                done: false,
            };
            setTodos((todos) => [...todos, todoObj]);
            setTodoText("");
        } else {
            window.alert("해야 할 일을 적고 버튼을 눌러주세요!");
        }
    };
    // console.log(todos);

    const onModifySubmit = (e) => {
        e.preventDefault();
        const ok = window.confirm("수정하시겠습니까?");
        if (ok) {
            let tempArray = [...todos];
            tempArray[temp].text = todoModify;
            setTodos(tempArray);
            setModify(false);
            setTemp("");
        }
    };

    const modifyToDo = (index) => {
        setModify(true);
        setTemp(index);
        setTodoModify(todos[index].text);
    };

    const deleteToDo = (index) => {
        const ok = window.confirm("정말로 삭제하실건가요?");
        if (ok) {
            let num = 0;
            let tempArray = [...todos];
            let result = tempArray.filter((temp) => temp.id !== index);
            result.map((todo) => (todo.id = num++));
            // console.log(result);
            setTodos(result);
        }
    };

    const doneToDo = (index) => {
        let tempArray = [...todos];
        tempArray[index].done = !todos[index].done;
        setTodos(tempArray);
    };

    const showToDos = todos.map((todo) => (
        <div key={todo.id} className="todo">
            {todo.done ? (
                <>
                    <div className="done">{todo.text}</div>
                    <div className="button">
                        <button onClick={() => deleteToDo(todo.id)}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                        <button onClick={() => doneToDo(todo.id)} className="cancel">
                            <FontAwesomeIcon icon={faCancel} />
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div>{todo.text}</div>
                    <div className="button">
                        <button onClick={() => modifyToDo(todo.id)}>
                            <FontAwesomeIcon icon={faPencil} />
                        </button>
                        <button onClick={() => deleteToDo(todo.id)}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                        <button onClick={() => doneToDo(todo.id)}>
                            <FontAwesomeIcon icon={faCheck} />
                        </button>
                    </div>
                </>
            )}
        </div>
    ));

    const toDoDeleteAll = () => {
        const ok = window.confirm("정말 모든 할 일을 지우시겠습니까?");
        if (ok) {
            localStorage.removeItem("todo");
            setTodos([]);
            setModify(false);
        }
    };

    return (
        <div className="todo_container">
            {!modify ? (
                <form onSubmit={onSubmit} className="input">
                    <input type="text" name="text" onChange={onChange} value={todoText} placeholder="해야 할 일을 적어주세요" />
                    <input type="submit" value="추가하기" />
                </form>
            ) : (
                <form onSubmit={onModifySubmit} className="input">
                    <input type="text" name="modify" onChange={onChange} value={todoModify} placeholder="수정할 내용을 입력해 주세요"></input>
                    <input type="submit" value="수정하기" />
                    <button onClick={() => setModify(!modify)}>취소하기</button>
                </form>
            )}
            <button onClick={() => toDoDeleteAll()}>
                <span>모두 지우기</span>
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <div className="show_todos">{todos && showToDos}</div>
        </div>
    );
}

export default Todos;
