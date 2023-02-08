import React from "react";
import "./showElectionData.css";
import DataTable from "react-data-table-component";

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
    name: "Kecamatan",
    selector: (row) => row.region,
    sortable: true,
  },
  {
    name: "Desa",
    selector: (row) => row.village,
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
    selector: (row) => row.dpt,
    sortable: true,
    width: "100px",
  },
  {
    name: "Nama Caleg",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Nama Partai",
    selector: (row) => row.party,
    sortable: true,
  },
  {
    name: "Suara",
    selector: (row) => row.totalVote,
    sortable: true,
    width: "100px",
  },
];

const data = [
  {
    id: 1,
    region: "Kemranjen",
    village: "Alasmalang",
    tps: "TPS 01",
    dpt: 150,
    name: "ABDUL KHOLIK, SH., M.Si.",
    party: "Demokrat",
    totalVote: 20,
  },
  {
    id: 2,
    region: "Kemranjen",
    village: "Sibalung",
    tps: "TPS 02",
    dpt: 114,
    name: "AGUS MUJAYANTO",
    party: "Gerindra",
    totalVote: 8,
  },
  {
    id: 3,
    region: "Banyumas",
    village: "Kedunggede",
    tps: "TPS 01",
    dpt: 200,
    name: "AGUNG SUGIANTO",
    party: "Demokrat",
    totalVote: 5,
  },
  {
    id: 4,
    region: "Banyumas",
    village: "Papringan",
    tps: "TPS 06",
    dpt: 270,
    name: "SAMSON, S.H.",
    party: "Bulan Bintang",
    totalVote: 18,
  },
  {
    id: 5,
    region: "Kemranjen",
    village: "Alasmalang",
    tps: "TPS 04",
    dpt: 165,
    name: "M. HAMZAH, S.Pd., M.Si.",
    party: "PPP",
    totalVote: 11,
  },
  {
    id: 6,
    region: "Somagede",
    village: "Piasa Kulon",
    tps: "TPS 03",
    dpt: 227,
    name: "KHOLISON, S.H.",
    party: "PDI Perjuangan",
    totalVote: 60,
  },
  {
    id: 7,
    region: "Kalibagor",
    village: "Kalibagor",
    tps: "TPS 01",
    dpt: 200,
    name: "AGUNG SUGIANTO",
    party: "Demokrat",
    totalVote: 5,
  },
  {
    id: 8,
    region: "Kalibagor",
    village: "Kaliori",
    tps: "TPS 06",
    dpt: 270,
    name: "SAMSON, S.H.",
    party: "Bulan Bintang",
    totalVote: 18,
  },
  {
    id: 9,
    region: "Sokaraja",
    village: "Wiradadi",
    tps: "TPS 04",
    dpt: 165,
    name: "M. HAMZAH, S.Pd., M.Si.",
    party: "PPP",
    totalVote: 11,
  },
  {
    id: 10,
    region: "Sokaraja",
    village: "Klahang",
    tps: "TPS 03",
    dpt: 227,
    name: "KHOLISON, S.H.",
    party: "PDI Perjuangan",
    totalVote: 60,
  },
  {
    id: 11,
    region: "Tambak",
    village: "Tambak Sogra",
    tps: "TPS 06",
    dpt: 165,
    name: "M. HAMZAH, S.Pd., M.Si.",
    party: "PPP",
    totalVote: 11,
  },
  {
    id: 12,
    region: "Tambak",
    village: "Tambak Kulon",
    tps: "TPS 07",
    dpt: 227,
    name: "KHOLISON, S.H.",
    party: "PDI Perjuangan",
    totalVote: 60,
  },
];

const ShowElectionData = () => {
  return (
    <>
      <div className="content-election mx-5 my-5 px-2 py-2">
        <div className="table-election text-center">
          <DataTable title="Perolehan Suara 2019" columns={columns} data={data} customStyles={customStyles} pagination />;
        </div>
      </div>
    </>
  );
};

export default ShowElectionData;
