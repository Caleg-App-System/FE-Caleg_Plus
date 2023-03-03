import React from "react";
import { useState, useEffect } from "react";
import { VoteService } from "../../../../services/voteServices";
import DataTable from "react-data-table-component";
import FilterDropdown from "../../filterDropdown";
import { ValueFiltering } from "../../../../services/valueFiltering";
import FadeLoader from "react-spinners/FadeLoader";

const customStyles = {
  rows: {
    style: {
      fontSize: "14px", // override the row height
    },
  },
  headCells: {
    style: {
      fontSize: "16px",
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      backgroundColor: "#d3d3d3",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
};

const columns = [
  {
    name: "NO",
    cell: (row, index) => index + 1,
    width: "80px", //RDT provides index by default
  },
  {
    name: "Desa",
    selector: (row) => row.desa,
    sortable: true,
  },
  {
    name: "TPS",
    selector: (row) => row.tps,
    sortable: true,
    width: "150px",
  },
  {
    name: "DPT",
    selector: (row) => row.TotalDpt,
    sortable: true,
    width: "70px",
    conditionalCellStyles: [
      {
        when: (row) => row.TotalDpt === undefined,
        style: {
          backgroundColor: "#d3d3d3",
        },
      },
    ],
  },
  {
    name: "Nama Caleg",
    selector: (row) => row.caleg,
    sortable: true,
  },
  {
    name: "Nama Partai",
    selector: (row) => row.partai,
    sortable: true,
  },
  {
    name: "Suara",
    selector: (row) => row.TotalVote,
    sortable: true,
    conditionalCellStyles: [
      {
        when: (row) => row.TotalVote === undefined,
        style: {
          backgroundColor: "#d3d3d3",
        },
      },
    ],
  },
];

const FilteredByDistrict = () => {
  const [election, setElection] = useState([]);
  const [pending, setPending] = useState(true);
  const [filterOption, setFilterOption] = useState("")
  const [valueDistrict, setValueDistrict] = useState([])

  const filterDistrict = valueDistrict.map((item) => item.name);

  useEffect(() => {
    VoteService.getAllVote().then((res) => {
      setElection(res.data.data.arr);
    });
    const timeout = setTimeout(() => {
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    ValueFiltering.getValueDistrict().then((res) => {
      setValueDistrict(res.data.data);
    });
  }, []);

  return (
    <>
      <div className="content-election px-2 py-2">
        <div className="table-election text-center">


          <DataTable
            title={`Perolehan suara 2019 Kecamatan ${filterOption}`}
            columns={columns}
            data={election.filter((row) => {
              if (!filterOption) return row
              return row.kecamatan === filterOption
            })}
            progressPending={pending}
            progressComponent={
              <FadeLoader color={'#e49011'}
                size={150} />}
            filterOption={filterOption}
            subHeader
            subHeaderComponent={
              <>
                Cari Kecamatan: &nbsp;
                <FilterDropdown
                  options={filterDistrict}
                  selectedOption={filterOption}
                  onOptionSelect={setFilterOption}
                />
              </>
            }
            customStyles={customStyles}
            pagination
          />
        </div>
      </div>
    </>
  );
}

export default FilteredByDistrict;