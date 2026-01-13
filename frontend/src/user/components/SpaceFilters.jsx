function SpaceFilters({ filters, setFilters }) {
  return (
    <div className="awfis-filter-bar">
      <select
        onChange={(e) =>
          setFilters({ ...filters, city: e.target.value })
        }
      >
        <option value="">All Locations</option>
        <option value="MG Road">MG Road</option>
        <option value="Puzhakkal">Puzhakkal</option>
        <option value="Round North">Round North</option>
      </select>

      <select
        onChange={(e) =>
          setFilters({ ...filters, type: e.target.value })
        }
      >
        <option value="">Workspace Type</option>
        <option value="Private">Private Office</option>
        <option value="Dedicated">Dedicated Desk</option>
        <option value="Hot">Hot Desk</option>
      </select>

      <select
        onChange={(e) =>
          setFilters({ ...filters, price: e.target.value })
        }
      >
        <option value="">Any Price</option>
        <option value="500">Under ₹500</option>
        <option value="700">Under ₹700</option>
      </select>
    </div>
  );
}

export default SpaceFilters;
