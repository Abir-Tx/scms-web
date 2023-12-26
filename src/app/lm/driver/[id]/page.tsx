"use client";
// pages/driver/[id].tsx
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/app/api";

interface DriverData {
  name: string;
}

interface pageProps {
  id: string;
}

export default function DriverDetails(pageProps: pageProps) {
  const router = useRouter();

  const [driverData, setDriverData] = useState<DriverData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<DriverData>(`/drivers/${pageProps.id}`);
        setDriverData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (pageProps.id) {
      fetchData();
    }
  }, [pageProps.id]);

  // Render the driver details
  return (
    <div>
      {driverData ? (
        <div>
          <h1>{driverData.name}</h1>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
