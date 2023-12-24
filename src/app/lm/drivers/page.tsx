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
  vehicleId: number;
  notes: string;
  photo: string;
  address: string;
  id: number;
}

export default function Drivers() {
  const [driverData, setData] = useState<driverData[]>([]);

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
  return (
    <div>
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
              <td>
                {/* if availability is true then show yes else no */}
                {driver.availability ? "Yes" : "No"}
              </td>
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
    </div>
  );
}
