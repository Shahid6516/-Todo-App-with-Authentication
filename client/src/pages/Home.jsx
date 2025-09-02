import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingDescription, setEditingDescription] = useState("");

  // ✅ Fetch Todos (made reusable)
  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/todo", {
        withCredentials: true,
      });
      if (res.data.success) {
        setTodos(res.data.todos);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch todos ❌");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // ✅ Add Todo
  const addTodoHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/todo",
        { title, description },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setTodos([...todos, res.data.todo]);
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong ❌"
      );
    }
  };

  // ✅ Start Editing
  const startEdit = (id, currentTitle, currentDesc) => {
    setEditingId(id);
    setEditingTitle(currentTitle);
    setEditingDescription(currentDesc);
  };

  // ✅ Save Edit
  const saveEdit = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/todo/${id}`,
        { title: editingTitle, description: editingDescription },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success("Todo updated ✅");
        fetchTodos();
        setEditingId(null);
      }
    } catch (error) {
      toast.error("Update failed ❌");
    }
  };

  // ✅ Delete Todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/todo/${id}`, {
        withCredentials: true,
      });
      toast.success("Todo deleted 🗑");
      fetchTodos();
    } catch (error) {
      toast.error("Delete failed ❌");
    }
  };

  return (
    <div>
      <Navbar />

      {/* ✅ Add Todo */}
      <div className="w-full flex items-center flex-col gap-3 mt-3">
        <div className="flex flex-col w-[80%] md:w-1/3 gap-3 mt-3">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Add todo..."
            className="rounded"
          />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Type your text..."
            className="rounded"
          />
          <Button
            onClick={addTodoHandler}
            className="text-white !bg-[#3B82F6] !py-5"
          >
            Add todo +
          </Button>
        </div>
      </div>

      {/* ✅ Todo List */}
      <div className="w-full flex items-center justify-center px-3 py-6">
        <div className="md:w-[80%] flex items-center justify-center flex-wrap gap-2 rounded-2xl">
          {todos.map((todo) => (
            <Card
              key={todo._id}
              className="bg-white border border-gray-300 shadow-sm p-4 rounded-2xl md:h-1/2 md:w-1/4 text-center flex"
            >
              <CardContent className="w-full">
                {editingId === todo._id ? (
                  <>
                    <Input
                      className="mb-2"
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                    />
                    <Textarea
                      className="mb-2"
                      value={editingDescription}
                      onChange={(e) => setEditingDescription(e.target.value)}
                    />
                    <div className="flex justify-between">
                      <Button
                        onClick={() => saveEdit(todo._id)}
                        className="bg-green-500 text-white"
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-400 text-white"
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <h1 className="text-lg font-semibold">{todo.title}</h1>
                    <p className="text-md text-gray-900 mt-3">{todo.description}</p>
                    <div className="flex justify-between gap-2 mt-3">
                      <Button
                        onClick={() =>
                          startEdit(todo._id, todo.title, todo.description)
                        }
                        className="bg-amber-500 text-white"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => deleteTodo(todo._id)}
                        className="bg-red-500 text-white"
                      >
                        Delete
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
