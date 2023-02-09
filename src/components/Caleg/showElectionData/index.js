import React, { useEffect, useState } from "react";
import "./showElectionData.css";
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
    selector: (row) => row.tps.desa.kecamatan.kabupaten.provinsi.name,
    sortable: true,
  },
  {
    name: "Kabupaten",
    selector: (row) => row.tps.desa.kecamatan.kabupaten.name,
    sortable: true,
  },
  {
    name: "Kecamatan",
    selector: (row) => row.tps.desa.kecamatan.name,
    sortable: true,
  },
  {
    name: "Desa",
    selector: (row) => row.tps.desa.name,
    sortable: true,
  },
  {
    name: "TPS",
    selector: (row) => row.tps.name,
    sortable: true,
    width: "150px",
  },
  {
    name: "DPT",
    // selector: (row) => row.dpt,
    sortable: true,
    width: "100px",
  },
  {
    name: "Nama Caleg",
    selector: (row) => row.caleg.name,
    sortable: true,
  },
  {
    name: "Nama Partai",
    selector: (row) => row.caleg.political_party.name,
    sortable: true,
  },
  {
    name: "Suara",
    // selector: (row) => row.totalVote,
    sortable: true,
    width: "100px",
  },
];



const ShowElectionData = () => {
  const [update, setUpdate] = useState(false);
  const [election, setElection] = React.useState([]);

  useEffect(() => {
    VoteService.getAllVote().then((res) => {
      setElection(res.data.data.result);
    });
  }, [update]);

  
  
  return (
    <>
      <div className="content-election mx-5 my-5 px-2 py-2">
        <div className="table-election text-center">
          <DataTable title="Perolehan Suara 2019" columns={columns} data={election} customStyles={customStyles} pagination />
        </div>
      </div>
    </>
  );
};

export default ShowElectionData;
