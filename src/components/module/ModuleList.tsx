import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

interface Module {
  id: number;
  name: string;
  description: string;
  speaker: {
    id: number;
    name: string;
    bio: string;
    contact: string;
  } | null;
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
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage, setPerPage] = useState(5);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchModules(currentPage, searchTerm, perPage);
  }, [currentPage, searchTerm, perPage]);

  const fetchModules = async (page: number, search = "", perPage = 5) => {
    setLoading(true);
    try {
      const response = await axios.get<ApiResponse>(
        `http://localhost:8000/api/modules?page=${page}&search=${search}&per_page=${perPage}`,
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
      fetchModules(currentPage, searchTerm, perPage);
    } catch (error) {
      console.error("Failed to delete module:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Modules</h1>

      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/modules/create")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Module
        </button>

        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search modules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <select
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={15}>15 per page</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 border-b text-gray-600 font-semibold">
                    ID
                  </th>
                  <th className="px-6 py-3 border-b text-gray-600 font-semibold">
                    Name
                  </th>
                  <th className="px-6 py-3 border-b text-gray-600 font-semibold">
                    Description
                  </th>
                  <th className="px-6 py-3 border-b text-gray-600 font-semibold">
                    Speaker
                  </th>
                  <th className="px-6 py-3 border-b text-gray-600 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {modules.map((module) => (
                  <tr key={module.id} className="odd:bg-gray-50 even:bg-white">
                    <td className="px-6 py-3 border-b text-center">
                      {module.id}
                    </td>
                    <td className="px-6 py-3 border-b">{module.name}</td>
                    <td className="px-6 py-3 border-b">{module.description}</td>
                    <td className="px-6 py-3 border-b">
                      {module.speaker ? (
                        <div>
                          <p className="font-medium">{module.speaker.name}</p>
                          <p className="text-sm text-blue-600">
                            {module.speaker.contact}
                          </p>
                        </div>
                      ) : (
                        <span className="text-gray-500 italic">
                          No speaker assigned
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3 border-b text-center">
                      <button
                        onClick={() => navigate(`/modules/${module.id}/edit`)}
                        className="text-blue-500 hover:underline mr-2"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDelete(module.id)}
                        className="text-red-500 hover:underline"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500"
                  : "bg-gray-200 hover:bg-gray-300"
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
