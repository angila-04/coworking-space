import React, { useState,useEffect, useRef } from "react";
import { NavLink, Outlet, useParams, useNavigate  } from "react-router-dom";
import { LayoutDashboard, Building2, Calendar, CreditCard, User, Menu, X,  Bell, Search } from "lucide-react";

const ServiceProviderLayout = () => {
  const { providerId } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (profileRef.current && !profileRef.current.contains(e.target)) {
      setIsProfileMenuOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);



  const navItems = [
    {
      path: `/service-provider/${providerId}/dashboard`,
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      path: `/service-provider/${providerId}/my-spaces`,
      label: "My Spaces",
      icon: Building2,
    },
    {
      path: `/service-provider/${providerId}/bookings`,
      label: "Bookings",
      icon: Calendar,
    },
    {
      path: `/service-provider/${providerId}/payments`,
      label: "Payments",
      icon: CreditCard,
    },
    {
    path: `/service-provider/${providerId}/notifications`,
    label: "Notifications",
    icon: Bell,
  },
    {
      path: `/service-provider/${providerId}/profile`,
      label: "Profile",
      icon: User,
    },
  ];

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }

        .layout-container {
          display: flex;
          min-height: 100vh;
          background: #f8fafc;
        }

        /* Sidebar Styles */
        .sidebar {
          width: 260px;
          background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
          color: #ffffff;
          padding: 0;
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
          left: 0;
          top: 0;
          transition: transform 0.3s ease;
          z-index: 1000;
          box-shadow: 4px 0 12px rgba(0, 0, 0, 0.1);
        }

        .sidebar-header {
          padding: 24px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .logo {
          font-size: 24px;
          font-weight: 700;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo::before {
          content: "◆";
          font-size: 20px;
          -webkit-text-fill-color: #3b82f6;
        }

        .sidebar-nav {
          flex: 1;
          padding: 20px 12px;
          overflow-y: auto;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          color: #94a3b8;
          text-decoration: none;
          border-radius: 8px;
          margin-bottom: 6px;
          transition: all 0.2s ease;
          font-size: 14px;
          font-weight: 500;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          transform: translateX(4px);
        }

        .nav-item.active {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .nav-item svg {
          flex-shrink: 0;
        }

        .sidebar-footer {
          padding: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: rgba(239, 68, 68, 0.1);
          color: #f87171;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          width: 100%;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.2);
        }

        /* Main Content */
        .layout-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-left: 260px;
          transition: margin-left 0.3s ease;
        }

        /* Header */
        .layout-header {
          background: #ffffff;
          padding: 16px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          color: #64748b;
          transition: all 0.2s ease;
        }

        .menu-btn:hover {
          background: #f1f5f9;
        }

        .header-title {
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f8fafc;
          padding: 8px 16px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          flex: 1;
          max-width: 600px;
        }

        .search-bar input {
          border: none;
          background: none;
          outline: none;
          flex: 1;
          font-size: 14px;
          color: #1e293b;
        }

        .search-bar input::placeholder {
          color: #94a3b8;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .icon-btn {
          background: #f8fafc;
          border: none;
          padding: 10px;
          border-radius: 8px;
          cursor: pointer;
          color: #64748b;
          transition: all 0.2s ease;
          position: relative;
        }

        .icon-btn:hover {
          background: #e2e8f0;
          color: #1e293b;
        }

        .icon-btn .badge {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 8px;
          height: 8px;
          background: #ef4444;
          border-radius: 50%;
          border: 2px solid #ffffff;
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .user-avatar:hover {
          transform: scale(1.05);
        }

        /* ===============================
            PROFILE DROPDOWN (SP MENU)
          =============================== */

        .profile-wrapper {
        position: relative;
        }

        /* Dropdown container */
        .profile-dropdown {
        position: absolute;
        top: 48px;
        right: 0;
        background: white;
        border-radius: 10px;
        min-width: 180px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        border: 1px solid #e2e8f0;
        overflow: hidden;
        z-index: 200;
        }

        /* Dropdown items */
        .dropdown-item {
         display: block;
        width: 100%;
        padding: 12px 16px;
        font-size: 14px;
        color: #1e293b;
        text-decoration: none;
        background: none;
        border: none;
        text-align: left;
        cursor: pointer;
        transition: background 0.2s ease;
        }

        .dropdown-item:hover {
        background: #f1f5f9;
        }

        /* Logout special style */
        .dropdown-item.logout {
        color: #dc2626;
        font-weight: 500;
        } 

        .dropdown-item.logout:hover {
        background: #fee2e2;
        }

        /* Page Content */
        .page-content {
          padding: 32px;
          flex: 1;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(-100%);
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .layout-content {
            margin-left: 0;
          }

          .menu-btn {
            display: block;
          }

          .search-bar {
            display: none;
          }

          .header-title {
            font-size: 16px;
          }

          .page-content {
            padding: 20px;
          }
        }

        .overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }

        .overlay.active {
          display: block;
        }
      `}</style>

      <div className="layout-container">
        {/* Overlay for mobile */}
        <div 
          className={`overlay ${isSidebarOpen ? 'active' : ''}`}
          onClick={() => setIsSidebarOpen(false)}
        />

        {/* Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h2 className="logo">SpaceTRIX</h2>
          </div>

          <nav className="sidebar-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? "nav-item active" : "nav-item"
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          
        </aside>

        {/* Main Content */}
        <main className="layout-content">
          <header className="layout-header">
            <div className="header-left">
              <button 
                className="menu-btn" 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <span className="header-title">Service Provider Dashboard</span>
            </div>

            <div className="search-bar">
              <Search size={18} color="#94a3b8" />
              <input type="text" placeholder="Search spaces, bookings..." />
            </div>

            <div className="header-actions">
              <NavLink
                to={`/service-provider/${providerId}/notifications`}
                className="icon-btn"
              >
                <Bell size={20} />
                <span className="badge"></span>
              </NavLink>

              <div className="profile-wrapper" ref={profileRef}>
                <button
                  className="user-avatar"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProfileMenuOpen(prev => !prev);
                  }}
                >
                  SP
              </button>

                {isProfileMenuOpen && (
                  <div className="profile-dropdown" onClick={(e) => e.stopPropagation()}>
                    <NavLink
                      to={`/service-provider/${providerId}/profile`}
                      className="dropdown-item"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Manage Profile
                    </NavLink>

                    <button
                      className="dropdown-item logout"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        // add logout logic later
                        console.log("Logout clicked");
                        navigate("/login");

                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          <div className="page-content">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default ServiceProviderLayout;