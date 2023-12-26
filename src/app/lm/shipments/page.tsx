"use client";

import styles from "./shipments.module.scss";
import api from "@/app/api";
import { useEffect, useState } from "react";
import { AnimatedPage } from "@/app/components/animated-page";

/* 
Sample data
   {
        "id": 1,
        "status": "In Transit",
        "shipmentDate": "2023-09-12",
        "description": "Random description 21",
        "weight": 50,
        "destination": "Random destination 6",
        "specialInstructions": "No special instructions",
        "estimatedArrivalDate": "2023-08-21"
    },
*/
interface shipmentData {
  id: number;
  status: string;
  shipmentDate: string;
  description: string;
  weight: number;
  destination: string;
  specialInstructions: string;
  estimatedArrivalDate: string;
}

export default function Shipments() {
  const [shipmentData, setData] = useState<shipmentData[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newShipmentData, setNewShipmentData] = useState<Partial<shipmentData>>(
    {
      status: "",
      shipmentDate: "",
      description: "",
      weight: 0,
      destination: "",
      specialInstructions: "",
      estimatedArrivalDate: "",
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<shipmentData[]>("/shipments");
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
      await api.post("/shipments", newShipmentData);

      // Fetch updated data after adding the new driver
      const response = await api.get<shipmentData[]>("/shipments");
      setData(response.data);
      setShowAddForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewShipmentData({ ...newShipmentData, [name]: value });
  };

  return (
    <AnimatedPage>
      <div className={styles.container}>
        <h1>Shipments</h1>
        <button className="btn btn-primary" onClick={handleAddButtonClick}>
          Add Shipment
        </button>
        {showAddForm && (
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <input
                type="text"
                className="form-control"
                id="status"
                name="status"
                value={newShipmentData.status}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="shipmentDate">Shipment Date</label>
              <input
                type="text"
                className="form-control"
                id="shipmentDate"
                name="shipmentDate"
                value={newShipmentData.shipmentDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={newShipmentData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="weight">Weight</label>
              <input
                type="number"
                className="form-control"
                id="weight"
                name="weight"
                value={newShipmentData.weight}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="destination">Destination</label>
              <input
                type="text"
                className="form-control"
                id="destination"
                name="destination"
                value={newShipmentData.destination}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="specialInstructions">Special Instructions</label>
              <input
                type="text"
                className="form-control"
                id="specialInstructions"
                name="specialInstructions"
                value={newShipmentData.specialInstructions}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="estimatedArrivalDate">
                Estimated Arrival Date
              </label>
              <input
                type="text"
                className="form-control"
                id="estimatedArrivalDate"
                name="estimatedArrivalDate"
                value={newShipmentData.estimatedArrivalDate}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        )}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Status</th>
              <th scope="col">Shipment Date</th>
              <th scope="col">Description</th>
              <th scope="col">Weight</th>
              <th scope="col">Destination</th>
              <th scope="col">Special Instructions</th>
              <th scope="col">Estimated Arrival Date</th>
            </tr>
          </thead>
          <tbody>
            {shipmentData.map((shipment) => (
              <tr key={shipment.id}>
                <td>{shipment.status}</td>
                <td>{shipment.shipmentDate}</td>
                <td>{shipment.description}</td>
                <td>{shipment.weight}</td>
                <td>{shipment.destination}</td>
                <td>{shipment.specialInstructions}</td>
                <td>{shipment.estimatedArrivalDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AnimatedPage>
  );
}
