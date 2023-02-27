import React, { useEffect, useState } from "react";
import "../showElectionData/showElectionData.css"
import DataTable from "react-data-table-component";
import { VoteService } from "../../../services/voteServices";

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
    name: "Provinsi",
    selector: (row) => row.provinsi,
    sortable: true,
  },
  {
    name: "Kabupaten",
    selector: (row) => row.kabupaten,
    sortable: true,
  },
  {
    name: "Kecamatan",
    selector: (row) => row.kecamatan,
    sortable: true,
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

const ShowElectionDataSplitFour = () => {
  const [election, setElection] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    VoteService.getAllVote().then((res) => {
      setElection(res.data.data.arr);
    });
  }, []);

  return (
    <>
      <div className="content-election mx-5 px-2 py-2">
        <div className="row">
          <div className="col-md-6">
        <div className="table-election text-center">
          <DataTable
            title="Perolehan Suara 2019"
            columns={columns}
            data={election.filter((row) => {
              const values = Object.values(row).join(" ").toLowerCase();
              return values.includes(searchValue.toLowerCase());
            })}
            subHeader
            subHeaderComponent={
              <div className="box-filter">
                Search
                <input className="input-search ms-2" type="search" placeholder="Cari... " value={searchValue} onChange={handleSearch} />
              </div>
            }
            customStyles={customStyles}
            pagination
          />
        </div>
        </div>
        <div className="col-md-6">
        <div className="table-election text-center">
          <DataTable
            title="Perolehan Suara 2019"
            columns={columns}
            data={election.filter((row) => {
              const values = Object.values(row).join(" ").toLowerCase();
              return values.includes(searchValue.toLowerCase());
            })}
            subHeader
            subHeaderComponent={
              <div className="box-filter">
                Search
                <input className="input-search ms-2" type="search" placeholder="Cari... " value={searchValue} onChange={handleSearch} />
              </div>
            }
            customStyles={customStyles}
            pagination
          />
        </div>
        </div>
        <div className="col-md-6">
        <div className="table-election text-center">
          <DataTable
            title="Perolehan Suara 2019"
            columns={columns}
            data={election.filter((row) => {
              const values = Object.values(row).join(" ").toLowerCase();
              return values.includes(searchValue.toLowerCase());
            })}
            subHeader
            subHeaderComponent={
              <div className="box-filter">
                Search
                <input className="input-search ms-2" type="search" placeholder="Cari... " value={searchValue} onChange={handleSearch} />
              </div>
            }
            customStyles={customStyles}
            pagination
          />
        </div>
        </div>
        <div className="col-md-6">
        <div className="table-election text-center">
          <DataTable
            title="Perolehan Suara 2019"
            columns={columns}
            data={election.filter((row) => {
              const values = Object.values(row).join(" ").toLowerCase();
              return values.includes(searchValue.toLowerCase());
            })}
            subHeader
            subHeaderComponent={
              <div className="box-filter">
                Search
                <input className="input-search ms-2" type="search" placeholder="Cari... " value={searchValue} onChange={handleSearch} />
              </div>
            }
            customStyles={customStyles}
            pagination
          />
        </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default ShowElectionDataSplitFour;
