"use client";
import { useEffect, useState } from "react";
import styles from "./drivers.module.scss";
import api from "@/app/api";
import { AnimatedPage } from "@/app/components/animated-page";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
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

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this driver?"
    );
    if (confirmDelete) {
      try {
        await api.delete(`/drivers/${id}`);

        const response = await api.get<driverData[]>("/drivers");
        setData(response.data);
      } catch (error) {
        console.log(error);
        alert("Error deleting driver");
      }
    }
  };

  /**
   * Navigates to the driver details page.
   * @param id - The ID of the driver.
   */
  const navigateToDriverDetails = (id: number) => {
    router.push(`/lm/driver/${id}`);
  };

  return (
    <AnimatedPage>
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
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {driverData.map((driver) => (
              <tr
                key={driver.id}
                onClick={() => navigateToDriverDetails(driver.id)}
              >
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
                <td>
                  <button onClick={() => handleDelete(driver.id)}>
                    Delete
                  </button>
                </td>
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
              title="Name"
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
              title="Contact Number"
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
              title="License Number"
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
              title="Availability"
            />

            <label>Email:</label>
            <input
              type="text"
              value={newDriverData.email || ""}
              onChange={(e) =>
                setNewDriverData({ ...newDriverData, email: e.target.value })
              }
              title="Email"
            />

            <label>Password:</label>
            <input
              type="text"
              value={newDriverData.password || ""}
              onChange={(e) =>
                setNewDriverData({ ...newDriverData, password: e.target.value })
              }
              title="Password"
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
              title="Vehicle ID"
            />

            <label>Notes:</label>
            <input
              type="text"
              value={newDriverData.notes || ""}
              onChange={(e) =>
                setNewDriverData({ ...newDriverData, notes: e.target.value })
              }
              title="Notes"
            />

            <label>Photo:</label>
            <input
              type="text"
              value={newDriverData.photo || ""}
              onChange={(e) =>
                setNewDriverData({ ...newDriverData, photo: e.target.value })
              }
              title="Photo"
            />

            <label>Address:</label>
            <input
              type="text"
              value={newDriverData.address || ""}
              onChange={(e) =>
                setNewDriverData({ ...newDriverData, address: e.target.value })
              }
              title="Address"
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
              title="ID"
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
    </AnimatedPage>
  );
}
