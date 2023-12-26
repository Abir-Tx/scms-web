"use client";
// pages/driver/[id].tsx
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/app/api";
import styles from "./driver.module.scss";

interface DriverData {
  id: string;
  name: string;
  contactNumber: string;
  licenseNumber: string;
  availability: boolean;
  address: string;
  email: string;
  password: string;
  vehicleId: number;
  notes: string;
  photo: string;
}

interface pageProps {
  id: string;
}

export default function DriverDetails({ params }: { params: pageProps }) {
  const { id } = params;
  const router = useRouter();

  const [driverData, setDriverData] = useState<DriverData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<DriverData>(`/drivers/${id}`);
        setDriverData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div>
      {driverData ? (
        <div className={styles.detCon}>
          <h1>{driverData.name}</h1>
          <div className={styles.driverDetailsCon}>
            <div className={styles.driverDetails}>
              <p>
                <span>Address:</span> {driverData.address}
              </p>
              <p>
                <span>Contact Number:</span> {driverData.contactNumber}
              </p>
              <p>
                <span>License Number:</span> {driverData.licenseNumber}
              </p>
              <p>
                <span>Availability:</span> {driverData.availability}
              </p>
              <p>
                <span>Vehicle ID:</span> {driverData.vehicleId}
              </p>
              <p>
                <span>Notes:</span> {driverData.notes}
              </p>
            </div>
            <div className={styles.driverDetails}>
              <p>
                <span>Email:</span> {driverData.email}
              </p>
              <p>
                <span>Password:</span> {driverData.password}
              </p>
              <p>
                <span>Photo:</span> {driverData.photo}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h1>Driver not found</h1>
          <button onClick={() => router.push("/lm/drivers")}>Back</button>
        </>
      )}
    </div>
  );
}
