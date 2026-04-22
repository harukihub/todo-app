import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  //const API_BASE = "http://127.0.0.1:8080/api/todos";
  const API_BASE = "/api/todos";

  const fetchTodos = () => {
    axios
      .get(API_BASE)
      .then((res) => setTodos(res.data))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const addOrUpdateTodo = () => {
    if (!title.trim()) {
      alert("やることを入力してください");
      return;
    }
    if (editingId) {
      // 更新
      axios
        .put(`${API_BASE}/${editingId}`, { title })
        .then(() => {
          setTitle("");
          setEditingId(null);
          fetchTodos();
        })
        .catch((err) => console.error(err));
    } else {
      // 追加
      axios
        .post(API_BASE, { title })
        .then(() => {
          setTitle("");
          fetchTodos();
        })
        .catch((err) => console.error(err));
    }
  };

  // 削除
  const deleteTodo = (id) => {
    axios
      .delete(`${API_BASE}/${id}`)
      .then(() => fetchTodos())
      .catch((err) => console.error(err));
  };

  // 編集ボタン押下処理
  const startEdit = (todo) => {
    setTitle(todo.title);
    setEditingId(todo.id);
  };

  return (
    <div className="app">
      <div className="todo-card">
        <h1 className="title">TODO一覧</h1>

        <div className="input-area">
          <input
            className="todo-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="やること入力"
          />
          <button className="add-button" onClick={addOrUpdateTodo}>
            {editingId ? "更新" : "追加"}
          </button>
        </div>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li className="todo-item" key={todo.id}>
              <span className="todo-text">{todo.title}</span>
              <div className="button-group">
                <button className="edit-button" onClick={() => startEdit(todo)}>
                  編集
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteTodo(todo.id)}
                >
                  削除
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
