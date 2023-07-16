import React, { useCallback, useState } from "react";
import Report from "./containers/Report";
import { useCustomerListApi } from "./api";
import "./styles.css";
import Spinner from "./components/Spinner";

export default function App() {
  const [status, response = [], error = null] = useCustomerListApi();
  const [customerId, setCustomerId] = useState();

  const handleCustomerChange = useCallback((e) => {
    setCustomerId(e.currentTarget.value);
  }, []);

  if (status === "ERROR") {
    return (
      <div className="App">
        <p>Failed to get Customers</p>
      </div>
    );
  }

  if (status === "LOADING") {
    return (
      <div className="App">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="App">
      <div
        style={{
          textAlign: "left"
        }}
      >
        <label htmlFor="customers">Customer:</label>
        <br />
        <select
          name="customers"
          onChange={handleCustomerChange}
          defaultValue={""}
        >
          <option value="" disabled hidden>
            Select Customer
          </option>
          {response?.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>

      <Report customerId={customerId} />
    </div>
  );
}
