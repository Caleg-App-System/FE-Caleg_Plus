import React, { useState } from "react";
import FilteredButton from "../filteredButton";
import FilteredByDistrict from "../filteredByDistrict";
import FilteredByProvince from "../filteredByProvince";
import FilteredByRegency from "../filteredByRegency";
import FilteredByVillage from "../filteredByVillage";

const FilteredOneView = () => {
  const [filteredOpen, setFilteredOpen] = useState('')
  const handleComponent = (e) => {
    setFilteredOpen(e)
  }

  return (
    <>
      <div className="container-fluid">
        <FilteredButton filtered={handleComponent} />
        {filteredOpen === 'province' && <FilteredByProvince />}
        {filteredOpen === 'regency' && <FilteredByRegency />}
        {filteredOpen === 'district' && <FilteredByDistrict />}
        {filteredOpen === 'village' && <FilteredByVillage />}
      </div>
    </>
  )
}

export default FilteredOneView