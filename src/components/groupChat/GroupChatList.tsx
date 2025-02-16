import React, { useEffect, useState } from "react";
import axios from "axios";

interface Module {
  id: number;
  name: string;
  description: string;
  group_link: string;
  schedule: string;
}

const GroupChatList: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchGroupLinks();
  }, []);

  const fetchGroupLinks = async () => {
    setLoading(true);
    try {
      const response = await axios.get<{ data: Module[] }>(
        "http://localhost:8000/api/get-all-modules-group-link",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setModules(response.data.data);
    } catch (error) {
      console.error("Failed to fetch group links:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Group Chats</h1>
      {loading ? (
        <p>Loading group chats...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <div
              key={module.id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h2 className="text-xl font-semibold mb-2">{module.name}</h2>
              <p className="text-gray-600 text-sm mb-2">{module.description}</p>
              <p className="text-gray-500 text-sm mb-4">
                Schedule: {new Date(module.schedule).toLocaleDateString()}
              </p>
              <a
                href={module.group_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                Join Group Chat
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupChatList;
