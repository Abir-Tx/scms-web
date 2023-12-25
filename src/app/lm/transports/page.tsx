"use client";
import { useEffect, useState } from "react";
import styles from "./transport.module.scss";
import api from "@/app/api";

interface transportData {
  id: number;
  source: string;
  destination: string;
  requestedDate: string;
  status: string;
}

export default function Transports() {
  const [transportData, setTransportData] = useState<transportData[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTransportData, setNewTransportData] = useState<
    Partial<transportData>
  >({
    source: "",
    destination: "",
    requestedDate: "",
    status: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<transportData[]>("/transports");
        setTransportData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleAddButtonClick = () => {
    setShowAddForm(true);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await api.post("/transports", newTransportData);

      // Fetch updated data after adding the new transport
      const response = await api.get<transportData[]>("/transports");
      setTransportData(response.data);

      // Reset the new transport form and hide it
      setNewTransportData({
        source: "",
        destination: "",
        requestedDate: "",
        status: "",
      });
      setShowAddForm(false);
    } catch (error) {
      alert("Error adding new transport");
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Transports</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Source</th>
            <th>Destination</th>
            <th>Requested Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transportData.map((transport) => (
            <tr key={transport.id}>
              <td>{transport.source}</td>
              <td>{transport.destination}</td>
              <td>{transport.requestedDate}</td>
              <td>{transport.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddForm && (
        <form className={styles.addForm} onSubmit={handleFormSubmit}>
          <label>Source:</label>
          <input
            type="text"
            value={newTransportData.source || ""}
            onChange={(e) =>
              setNewTransportData({
                ...newTransportData,
                source: e.target.value,
              })
            }
          />

          <label>Destination:</label>
          <input
            type="text"
            value={newTransportData.destination || ""}
            onChange={(e) =>
              setNewTransportData({
                ...newTransportData,
                destination: e.target.value,
              })
            }
          />

          <label>Requested Date:</label>
          <input
            type="text"
            value={newTransportData.requestedDate || ""}
            onChange={(e) =>
              setNewTransportData({
                ...newTransportData,
                requestedDate: e.target.value,
              })
            }
          />

          <label>Status:</label>
          <input
            type="text"
            value={newTransportData.status || ""}
            onChange={(e) =>
              setNewTransportData({
                ...newTransportData,
                status: e.target.value,
              })
            }
          />

          <button type="submit">Submit</button>
        </form>
      )}

      <button className={styles.addNewButton} onClick={handleAddButtonClick}>
        Add New Transport
      </button>

      {/* Show a cancel button when showAddForm is true */}
      {showAddForm && (
        <button
          className={styles.cancelButton}
          onClick={() => setShowAddForm(false)}
        >
          Cancel
        </button>
      )}
    </div>
  );
}
