import React, {useState}from "react";

import { Navbar, SelectedButton, ShowElectionDataSplit, ShowElectionData, ShowElectionDataSplitFour } from "../../components";

const ShowElection = () => {
  const [electionOpen, setElectionOpen] = useState('one')
  const handleComponent = (e) => {
    setElectionOpen(e)
  }
  return (
    <>
      <Navbar />
      <div className="container-fluid">
          <SelectedButton election={handleComponent} />
          {electionOpen === 'one' && <ShowElectionData />}
          {electionOpen === 'two' && <ShowElectionDataSplit />}
          {electionOpen === 'four' && <ShowElectionDataSplitFour />}
      </div>
      
    </>
  );
}

export default ShowElection;