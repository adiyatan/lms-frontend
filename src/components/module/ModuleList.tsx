import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Module {
  id: number;
  name: string;
  description: string;
  materials: {
    id: number;
    title: string;
    schedule: string;
    speaker: string;
  }[];
}

interface ApiResponse {
  data: {
    data: Module[];
    current_page: number;
    last_page: number;
  };
}

const ModuleList: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchModules(currentPage);
  }, [currentPage]);

  const fetchModules = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get<ApiResponse>(
        `http://localhost:8000/api/modules?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response.data;
      setModules(data.data);
      setCurrentPage(data.current_page);
      setTotalPages(data.last_page);
    } catch (error) {
      console.error("Failed to fetch modules:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this module?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/modules/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchModules(currentPage);
    } catch (error) {
      console.error("Failed to delete module:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Modules</h1>
      <button
        onClick={() => navigate("/modules/create")}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Module
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Materials</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((module) => (
                <tr key={module.id}>
                  <td className="border px-4 py-2">{module.id}</td>
                  <td className="border px-4 py-2">{module.name}</td>
                  <td className="border px-4 py-2">{module.description}</td>
                  <td className="border px-4 py-2">
                    {module.materials.length > 0 ? (
                      <ul className="list-disc ml-6">
                        {module.materials.map((material) => (
                          <li key={material.id}>
                            <span className="font-medium">
                              {material.title}
                            </span>{" "}
                            - {material.schedule} ({material.speaker})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>No materials</span>
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => navigate(`/modules/${module.id}/edit`)}
                      className="text-blue-500 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(module.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
              }`}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300"
                  : "bg-blue-500 text-white"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ModuleList;
