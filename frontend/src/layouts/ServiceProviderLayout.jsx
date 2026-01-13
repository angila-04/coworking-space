import { Link, Outlet } from "react-router-dom";

const ServiceProviderLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      <aside style={{ width: "250px", background: "#1e293b", color: "#fff", padding: "20px" }}>
        <h2>Service Provider</h2>
        <nav>
          <Link to="/service-provider/dashboard">Dashboard</Link><br />
          <Link to="/service-provider/add-space">Add Space</Link><br />
          <Link to="/service-provider/tasks">Tasks</Link><br />
          <Link to="/service-provider/payments">Payments</Link><br />
          <Link to="/service-provider/reports">Reports</Link><br />
          <Link to="/service-provider/notifications">Notifications</Link>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default ServiceProviderLayout;
