"use client";
import api from "@/app/api";
import styles from "./dashboard.module.scss";
import { useEffect, useState } from "react";

interface driverData {
  name: string;
}

interface vehicleData {
  status: string;
}

interface shipmentData {
  status: string;
}

export default function Dashboard() {
  const [driverData, setData] = useState<driverData[]>([]);
  const [vehicleData, setVehicleData] = useState<vehicleData[]>([]);
  const [shipmentData, setShipmentData] = useState<shipmentData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<driverData[]>("/drivers");
        const vehicleResponse = await api.get<vehicleData[]>("/transports");
        const shipmentResponse = await api.get<shipmentData[]>("/shipments");
        setData(response.data);
        setVehicleData(vehicleResponse.data);
        setShipmentData(shipmentResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.dashCon}>
      <div className={styles.quickviewContainer}>
        <div className={styles.statCon}>
          <div className={styles.statHeader}>
            <span>Drivers</span>
          </div>
          <div className={styles.statConBody}>
            <span>{driverData.length}</span>
          </div>
        </div>

        <div className={styles.statCon}>
          <div className={styles.statHeader}>
            <span>Vehicles</span>
          </div>
          <div className={styles.statConBody}>
            <span>{vehicleData.length}</span>
          </div>
        </div>

        <div className={styles.statCon}>
          <div className={styles.statHeader}>
            <span>Shipments</span>
          </div>
          <div className={styles.statConBody}>
            <span>{shipmentData.length}</span>
          </div>
        </div>
      </div>

      <div className={styles.welcomeCon}>
        <h1>Welcome {driverData[0]?.name.toUpperCase()}</h1>
      </div>
    </div>
  );
}
