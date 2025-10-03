import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

import AdminDashboard from "./admindashboard";
import AdminBooks from "./adminbooks";
import AdminUsers from "./adminusers";


import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

export default function AdminHome() {
  const { state } = useContext(AuthContext);
  console.table(state.user);

return (
    <center className="flex justify-center align-center p-6 m-5">
        <div className="flex  flex-col pt-5">
            <Tabs aria-label="Options" variant="solid" color="secondary">
                <Tab key="Transactions" title="Transactions" color="primary">
                    <AdminDashboard />
                </Tab>
                <Tab key="books" title="Books">
                    <AdminBooks />
                </Tab>
                <Tab key="users" title="users">
                    <AdminUsers />
                </Tab>
            </Tabs>
        </div>
    </center>
);
}
