import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

interface Speaker {
  id: number;
  name: string;
}

const ModuleForm: React.FC = () => {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [speakerId, setSpeakerId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [groupLink, setGroupLink] = useState("");
  const [schedule, setSchedule] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchSpeakers();
    if (id) fetchModule();
  }, [id]);

  const fetchSpeakers = async () => {
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
    }
  };

  const fetchModule = async () => {
    setLoading(true);
    try {
      const response = await axios.get<{
        data: {
          speaker_id: number;
          name: string;
          description: string;
          group_link: string;
          schedule: string;
        };
      }>(`http://localhost:8000/api/modules/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { speaker_id, name, description, group_link, schedule } =
        response.data.data;
      setSpeakerId(speaker_id);
      setName(name);
      setDescription(description);
      setGroupLink(group_link);
      setSchedule(schedule);
    } catch (error) {
      console.error("Failed to fetch module:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        speaker_id: speakerId,
        name,
        description,
        group_link: groupLink,
        schedule,
      };

      if (id) {
        await axios.put(`http://localhost:8000/api/modules/${id}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Module updated successfully!");
      } else {
        await axios.post("http://localhost:8000/api/modules", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Module created successfully!");
      }

      navigate("/modules");
    } catch (error) {
      console.error("Failed to save module:", error);
      alert("Failed to save module. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {id ? "Edit Module" : "Create Module"}
      </h1>
      {loading ? (
        <p className="text-gray-600">Loading module details...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Module Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="groupLink"
              className="block text-sm font-medium mb-1"
            >
              Group Link
            </label>
            <input
              id="groupLink"
              type="url"
              value={groupLink}
              onChange={(e) => setGroupLink(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="schedule"
              className="block text-sm font-medium mb-1"
            >
              Schedule (YYYY-MM-DD)
            </label>
            <input
              id="schedule"
              type="date"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="speaker" className="block text-sm font-medium mb-1">
              Speaker
            </label>
            <select
              id="speaker"
              value={speakerId || ""}
              onChange={(e) => setSpeakerId(Number(e.target.value))}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Select a Speaker</option>
              {speakers.map((speaker) => (
                <option key={speaker.id} value={speaker.id}>
                  {speaker.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default ModuleForm;
