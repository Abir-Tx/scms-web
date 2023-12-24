"use client";
import api from "@/app/api";
import styles from "./dashboard.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";

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
  const [deliveredShipments, setDeliveredShipments] = useState<shipmentData[]>(
    []
  );
  const [onTransitShipments, setOnTransitShipments] = useState<shipmentData[]>(
    []
  );
  const [cancelledShipments, setCancelledShipments] = useState<shipmentData[]>(
    []
  );
  const [pendingTransports, setPendingTransports] = useState<vehicleData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<driverData[]>("/drivers");
        const vehicleResponse = await api.get<vehicleData[]>("/transports");
        const shipmentResponse = await api.get<shipmentData[]>("/shipments");
        setData(response.data);
        setVehicleData(vehicleResponse.data);
        setShipmentData(shipmentResponse.data);

        // get only the pending shipments
        const result = shipmentResponse.data.filter(
          (shipment) => shipment.status === "Delivered"
        );
        setDeliveredShipments(result);

        const onTransitResult = shipmentResponse.data.filter(
          (shipment) => shipment.status === "In Transit"
        );
        setOnTransitShipments(onTransitResult);

        const cancelledResult = shipmentResponse.data.filter(
          (shipment) => shipment.status === "Cancelled"
        );
        setCancelledShipments(cancelledResult);

        // Get pending transports
        const pendingTransports = vehicleResponse.data.filter(
          (vehicle) => vehicle.status === "pending"
        );
        setPendingTransports(pendingTransports);
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

      <div className={styles.getAllCon}>
        <div className={styles.buttonCon}>
          <Link href="/lm/drivers">
            <button className={styles.button}>Get All Drivers</button>
          </Link>
        </div>
      </div>

      <div className={styles.shipmentDetCon}>
        <div className={styles.shipmentDetHeader}>
          <h2>Shipments</h2>
        </div>

        {/* cards showing quick snippets about shipment details */}
        <div className={styles.shipmentDetCards}>
          <div className={styles.shipmentDetCard}>
            <div className={styles.shipmentDetCardHeader}>
              <h3>Delivered</h3>
            </div>
            <div className={styles.shipmentDetCardBody}>
              <span>{deliveredShipments.length}</span>
            </div>
          </div>

          <div className={styles.shipmentDetCard}>
            <div className={styles.shipmentDetCardHeader}>
              <h3>On Transit</h3>
            </div>
            <div className={styles.shipmentDetCardBody}>
              <span>{onTransitShipments.length}</span>
            </div>
          </div>

          <div className={styles.shipmentDetCard}>
            <div className={styles.shipmentDetCardHeader}>
              <h3>Cancelled</h3>
            </div>
            <div className={styles.shipmentDetCardBody}>
              <span>{cancelledShipments.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.transportDetCon}>
        <div className={styles.transportDetHeader}>
          <h2>Transport Details</h2>
        </div>

        <div className={styles.transportDetBody}>
          <div className={styles.transportDetCard}>
            <div className={styles.transportDetCardHeader}>
              {/* <h3>Vehicle</h3> */}
            </div>
            <div className={styles.transportDetCardBody}>
              <span>
                You have {pendingTransports.length} pending transports
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
