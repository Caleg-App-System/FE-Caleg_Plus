import React, { useState } from "react";

import { Navbar, SelectedButton, FilteredOneView, FilteredTwoView, FilteredFourView } from "../../components";

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
        {electionOpen === 'one' && <FilteredOneView />}
        {electionOpen === 'two' && <FilteredTwoView />}
        {electionOpen === 'four' && <FilteredFourView />}
      </div>

    </>
  );
}

export default ShowElection;