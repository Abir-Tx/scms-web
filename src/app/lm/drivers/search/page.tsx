// DriverSearch.jsx

"use client";
import { useEffect, useState } from "react";
import api from "@/app/api";
import styles from "./search.module.scss"; // Import SCSS styles

interface DriverData {
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

const DriverSearch: React.FC = () => {
  const [drivers, setDrivers] = useState<DriverData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDriver, setSelectedDriver] = useState<DriverData | null>(null);
  const [filteredDrivers, setFilteredDrivers] = useState<DriverData[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDriver, setEditedDriver] = useState<DriverData | null>(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await api.get("/drivers");
        setDrivers(response.data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
        alert("Error fetching drivers");
      }
    };

    fetchDrivers();
  }, []);

  const handleSearch = () => {
    const filteredDrivers = drivers.filter((driver) =>
      driver.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDrivers(filteredDrivers);
  };

  const handleDriverClick = async (driverId: number) => {
    try {
      const response = await api.get<DriverData>(`/drivers/${driverId}`);
      setSelectedDriver(response.data);
    } catch (error) {
      console.error("Error fetching driver details:", error);
      alert("Error fetching driver details");
    }
  };

  const handleDeleteDriver = async () => {
    if (!selectedDriver) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedDriver.name}?`
    );
    if (confirmDelete) {
      try {
        // Make a DELETE request to your API to delete the selected driver
        await api.delete(`/drivers/${selectedDriver.id}`);
        // refresh the list of drivers after deletion
        const updatedDrivers = drivers.filter(
          (driver) => driver.id !== selectedDriver.id
        );
        setDrivers(updatedDrivers);
        setSelectedDriver(null); // Clear the selected driver after deletion
      } catch (error) {
        console.error("Error deleting driver:", error);
        alert("Error deleting driver");
      }
    }
  };

  const handleEditDriver = () => {
    setIsEditing(true);
    setEditedDriver({ ...selectedDriver }); // Create a copy of the selected driver for editing
  };

  const handleSaveEdit = async () => {
    if (!editedDriver) return;

    try {
      // Make a PUT or PATCH request to update the selected driver
      await api.put(`/drivers/${editedDriver.id}`, editedDriver);
      // Optionally, you can also refresh the list of drivers after editing
      const updatedDrivers = drivers.map((driver) =>
        driver.id === editedDriver.id ? editedDriver : driver
      );
      setDrivers(updatedDrivers);
      setSelectedDriver(editedDriver); // Update the selected driver in the UI
      setIsEditing(false);
    } catch (error) {
      console.error("Error editing driver:", error);
      alert("Error editing driver");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedDriver(null);
  };

  const handleInputChange = (field: keyof DriverData, value: string) => {
    if (editedDriver) {
      setEditedDriver({
        ...editedDriver,
        [field]: value,
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1>Driver Search</h1>
      <div className={styles.inputContainer}>
        {/* Search input and button */}
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className={styles.button} onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Table of drivers */}
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Number</th>
              {/* Add other relevant table headers */}
            </tr>
          </thead>
          <tbody>
            {filteredDrivers.map((driver) => (
              <tr
                key={driver.id}
                onClick={() => handleDriverClick(driver.id)}
                className={styles.row} // Add a row class for styling
              >
                <td>{driver.name}</td>
                <td>{driver.contactNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected driver details */}
      {selectedDriver && (
        <div className={styles.driverDetails}>
          <h2>Driver Details</h2>
          {isEditing ? (
            <>
              {/* Editable fields */}
              <div className={styles.editDetCon}>
                <label>Name:</label>
                <input
                  type="text"
                  value={editedDriver?.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
                {/* Email */}
                <label>Email:</label>
                <input
                  type="text"
                  value={editedDriver?.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
                <label>Contact Number:</label>
                <input
                  type="text"
                  value={editedDriver?.contactNumber || ""}
                  onChange={(e) =>
                    handleInputChange("contactNumber", e.target.value)
                  }
                />
                <label>License Number:</label>
                <input
                  type="text"
                  value={editedDriver?.licenseNumber || ""}
                  onChange={(e) =>
                    handleInputChange("licenseNumber", e.target.value)
                  }
                />
                <label>Vehicle ID:</label>
                <input
                  type="text"
                  value={editedDriver?.vehicleId || ""}
                  onChange={(e) =>
                    handleInputChange("vehicleId", e.target.value)
                  }
                />
                <label>Notes:</label>
                <input
                  type="text"
                  value={editedDriver?.notes || ""}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                />
                <label>Address:</label>
                <input
                  type="text"
                  value={editedDriver?.address || ""}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
                <label>Availability:</label>
                <input
                  type="checkbox"
                  checked={editedDriver?.availability || false}
                  onChange={(e) =>
                    handleInputChange(
                      "availability",
                      e.target.checked.toString()
                    )
                  }
                />

                {/* Save and Cancel buttons */}
                <button className={styles.saveButton} onClick={handleSaveEdit}>
                  Save
                </button>
                <button
                  className={styles.cancelButton}
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Display details */}
              <p>ID: {selectedDriver.id}</p>
              <p>Name: {selectedDriver.name}</p>
              <p>Contact Number: {selectedDriver.contactNumber}</p>
              <p>Email: {selectedDriver.email}</p>
              <p>License Number: {selectedDriver.licenseNumber}</p>
              <p>Vehicle ID: {selectedDriver.vehicleId}</p>
              <p>Notes: {selectedDriver.notes}</p>
              <p>Address: {selectedDriver.address}</p>
              <p>Availability: {selectedDriver.availability ? "Yes" : "No"}</p>

              {/* Delete button */}
              <button
                className={styles.deleteButton}
                onClick={handleDeleteDriver}
              >
                Delete
              </button>
              {/* Edit button */}
              <button className={styles.editButton} onClick={handleEditDriver}>
                Edit
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DriverSearch;
