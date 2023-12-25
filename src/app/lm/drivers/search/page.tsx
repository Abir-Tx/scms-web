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
                {/* Add other relevant table data */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected driver details */}
      {selectedDriver && (
        <div className={styles.driverDetails}>
          <h2>Driver Details</h2>
          <p>ID: {selectedDriver.id}</p>
          <p>Name: {selectedDriver.name}</p>
          <p>Contact Number: {selectedDriver.contactNumber}</p>
          <p>Email: {selectedDriver.email}</p>
          <p>License Number: {selectedDriver.licenseNumber}</p>
          <p>Vehicle ID: {selectedDriver.vehicleId}</p>
          <p>Notes: {selectedDriver.notes}</p>
          <p>Address: {selectedDriver.address}</p>
          <p>Availability: {selectedDriver.availability ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
};

export default DriverSearch;
