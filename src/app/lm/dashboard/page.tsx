"use client";
import api from "@/app/api";
import styles from "./dashboard.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatedPage } from "@/app/components/animated-page";
import Modal from "react-modal";
import { color } from "framer-motion";
interface driverData {
  name: string;
}

interface vehicleData {
  id: number;
  source: string;
  destination: string;
  requestedDate: string;
  status: string;
}

interface shipmentData {
  status: string;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    color: "black",
    borderRadius: "30px",
  },
};

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
    <AnimatedPage>
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

          <div className={styles.buttonCon}>
            <Link href="/lm/drivers/search">
              <button className={styles.button}>Driver Search</button>
            </Link>
          </div>

          <div className={styles.buttonCon}>
            <Link href="/lm/transports">
              <button className={styles.button}>Get All Vehicles</button>
            </Link>
          </div>

          <div className={styles.buttonCon}>
            <Link href="/lm/shipments">
              <button className={styles.button}>Get All Shipments</button>
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
              <div
                className={styles.transportDetCardBody}
                onClick={handleOpenModal}
              >
                <span>
                  You have {pendingTransports.length} pending transports
                </span>
              </div>

              <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Pending Transports"
                style={customStyles}
              >
                <h2>Pending Transports</h2>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Source</th>
                      <th>Destination</th>
                      <th>Requested Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingTransports.map((transport) => (
                      <tr key={transport.id}>
                        <td>{transport.id}</td>
                        <td>{transport.source}</td>
                        <td>{transport.destination}</td>
                        <td>{transport.requestedDate}</td>
                        <td>{transport.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  onClick={handleCloseModal}
                  className={styles.closeButton}
                >
                  Close
                </button>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
