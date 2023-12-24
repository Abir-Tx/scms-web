"use client";
import { useEffect, useState } from "react";
import styles from "./drivers.module.scss";
import api from "@/app/api";

interface driverData {
  name: string;
  contactNumber: string;
  licenseNumber: string;
  availability: boolean;
  email: string;
  password: string;
  vehicleId: number;
  notes: string;
  photo: string;
  address: string;
  id: number;
}

export default function Drivers() {
  const [driverData, setData] = useState<driverData[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDriverData, setNewDriverData] = useState<Partial<driverData>>({
    name: "",
    contactNumber: "",
    licenseNumber: "",
    availability: false,
    address: "",
    email: "",
    password: "",
    vehicleId: 0,
    notes: "",
    photo: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<driverData[]>("/drivers");
        setData(response.data);
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
      await api.post("/drivers", newDriverData);

      // Fetch updated data after adding the new driver
      const response = await api.get<driverData[]>("/drivers");
      setData(response.data);

      // Reset the new driver form and hide it
      setNewDriverData({
        name: "",
        contactNumber: "",
        licenseNumber: "",
        availability: false,
        address: "",
        email: "",
        password: "",
        vehicleId: 0,
        notes: "",
        photo: "",
      });
      setShowAddForm(false);
    } catch (error) {
      alert("Error adding new driver");
      console.log(error);
    }
  };

  return (
    <div className={styles.driverManCon}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact Number</th>
            <th>License Number</th>
            <th>Available</th>
            <th>Email</th>
            <th>Vehicle ID</th>
            <th>Notes</th>
            <th>Photo</th>
            <th>Address</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {driverData.map((driver) => (
            <tr key={driver.id}>
              <td>{driver.name}</td>
              <td>{driver.contactNumber}</td>
              <td>{driver.licenseNumber}</td>
              <td>{driver.availability ? "Yes" : "No"}</td>
              <td>{driver.email}</td>
              <td>{driver.vehicleId}</td>
              <td>{driver.notes}</td>
              <td>{driver.photo}</td>
              <td>{driver.address}</td>
              <td>{driver.id}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddForm && (
        <form onSubmit={handleFormSubmit}>
          <label>Name:</label>
          <input
            type="text"
            value={newDriverData.name || ""}
            onChange={(e) =>
              setNewDriverData({ ...newDriverData, name: e.target.value })
            }
          />

          <label>Contact Number:</label>
          <input
            type="text"
            value={newDriverData.contactNumber || ""}
            onChange={(e) =>
              setNewDriverData({
                ...newDriverData,
                contactNumber: e.target.value,
              })
            }
          />

          <label>License Number:</label>
          <input
            type="text"
            value={newDriverData.licenseNumber || ""}
            onChange={(e) =>
              setNewDriverData({
                ...newDriverData,
                licenseNumber: e.target.value,
              })
            }
          />

          <label>Availability:</label>
          <input
            type="checkbox"
            checked={newDriverData.availability || false}
            onChange={(e) =>
              setNewDriverData({
                ...newDriverData,
                availability: e.target.checked,
              })
            }
          />

          <label>Email:</label>
          <input
            type="text"
            value={newDriverData.email || ""}
            onChange={(e) =>
              setNewDriverData({ ...newDriverData, email: e.target.value })
            }
          />

          <label>Password:</label>
          <input
            type="text"
            value={newDriverData.password || ""}
            onChange={(e) =>
              setNewDriverData({ ...newDriverData, password: e.target.value })
            }
          />

          <label>Vehicle ID:</label>
          <input
            type="number"
            value={newDriverData.vehicleId || 0}
            onChange={(e) =>
              setNewDriverData({
                ...newDriverData,
                vehicleId: parseInt(e.target.value, 10) || 0,
              })
            }
          />

          <label>Notes:</label>
          <input
            type="text"
            value={newDriverData.notes || ""}
            onChange={(e) =>
              setNewDriverData({ ...newDriverData, notes: e.target.value })
            }
          />

          <label>Photo:</label>
          <input
            type="text"
            value={newDriverData.photo || ""}
            onChange={(e) =>
              setNewDriverData({ ...newDriverData, photo: e.target.value })
            }
          />

          <label>Address:</label>
          <input
            type="text"
            value={newDriverData.address || ""}
            onChange={(e) =>
              setNewDriverData({ ...newDriverData, address: e.target.value })
            }
          />

          <label>ID:</label>
          <input
            type="number"
            value={newDriverData.id || 0}
            onChange={(e) =>
              setNewDriverData({
                ...newDriverData,
                id: parseInt(e.target.value, 10) || 0,
              })
            }
          />

          <button type="submit">Submit</button>
        </form>
      )}

      <button className={styles.addNewButton} onClick={handleAddButtonClick}>
        Add New Driver
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
