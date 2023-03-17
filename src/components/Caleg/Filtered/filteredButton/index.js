import React from 'react';
import { useDispatch } from 'react-redux';

const FilteredButton = ({ filtered }) => {
  // const filterActive = useSelector((state) => state.filter.show);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Filter berdasarkan: </p>
      <button className="btn btn-warning me-3 btn-sm" onClick={(e) => { filtered('province'); dispatch({ type: "PROVINCE" }) }}>Provinsi</button>
      <button className="btn btn-warning me-3 btn-sm" onClick={(e) => { filtered('regency'); dispatch({ type: "REGENCY" }) }}>Kabupaten</button>
      <button className="btn btn-warning me-3 btn-sm" onClick={(e) => { filtered('district'); dispatch({ type: "DISTRICT" }) }}>Kecamatan</button>
      <button className="btn btn-warning me-3 btn-sm" onClick={(e) => { filtered('village'); dispatch({ type: "VILLAGE" }) }}>Desa</button>
    </div>
  );
}

export default FilteredButton;