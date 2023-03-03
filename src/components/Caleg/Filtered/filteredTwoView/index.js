import React from "react";
import FilteredOneView from "../filteredOneView";

const FilteredTwoView = () => {
  return (
    <>
      <div className="content-election py-2">
        <div className="row">
          <div className="col-md-6">
            <div className="table-election text-center">
              <FilteredOneView />
            </div>
          </div>
          <div className="col-md-6">
            <div className="table-election text-center">
              <FilteredOneView />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FilteredTwoView