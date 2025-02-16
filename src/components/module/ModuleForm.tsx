import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ModuleForm: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) fetchModule();
  }, [id]);

  const fetchModule = async () => {
    try {
      const response = await axios.get<{
        data: { name: string; description: string };
      }>(`http://localhost:8000/api/modules/${id}`);
      setName(response.data.data.name);
      setDescription(response.data.data.description);
    } catch (error) {
      console.error("Failed to fetch module:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:8000/api/modules/${id}`, {
          name,
          description,
        });
      } else {
        await axios.post("http://localhost:8000/api/modules", {
          name,
          description,
        });
      }
      navigate("/modules");
    } catch (error) {
      console.error("Failed to save module:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit" : "Create"} Module
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ModuleForm;
