import React, { useEffect, useState } from "react";
import axios from "axios";

interface Participant {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
}

const ParticipantList: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    setLoading(true);
    try {
      const response = await axios.get<{ data: Participant[] }>(
        "http://localhost:8000/api/get-all-users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setParticipants(response.data.data);
    } catch (error) {
      console.error("Failed to fetch participants:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Participants</h1>
      {loading ? (
        <p>Loading participants...</p>
      ) : (
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
                  Email
                </th>
                <th className="px-6 py-3 border-b text-gray-600 font-semibold">
                  Registered Date
                </th>
              </tr>
            </thead>
            <tbody>
              {participants.map((participant) => (
                <tr
                  key={participant.id}
                  className="odd:bg-gray-50 even:bg-white"
                >
                  <td className="px-6 py-3 border-b text-center">
                    {participant.id}
                  </td>
                  <td className="px-6 py-3 border-b">{participant.name}</td>
                  <td className="px-6 py-3 border-b">{participant.email}</td>
                  <td className="px-6 py-3 border-b">
                    {new Date(participant.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ParticipantList;
