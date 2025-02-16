import React, { useEffect, useState } from "react";
import axios from "axios";

interface Speaker {
  id: number;
  name: string;
  bio: string;
  contact: string;
}

const SpeakerList: React.FC = () => {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const fetchSpeakers = async () => {
    setLoading(true);
    try {
      const response = await axios.get<{ data: Speaker[] }>(
        "http://localhost:8000/api/get-speaker-modules",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSpeakers(response.data.data);
    } catch (error) {
      console.error("Failed to fetch speakers:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Speakers</h1>
      {loading ? (
        <p>Loading speakers...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {speakers.map((speaker) => (
            <div
              key={speaker.id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h2 className="text-xl font-semibold mb-2">{speaker.name}</h2>
              <p className="text-gray-600 text-sm mb-2">{speaker.bio}</p>
              <p className="text-gray-500 text-sm">
                Contact:{" "}
                <span className="text-blue-600">{speaker.contact}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpeakerList;
