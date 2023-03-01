import React from "react";

import { Navbar, SuccessVerification } from "../../components";
import { useLocation } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const SuccessVerificationPage = () => {
  let query = useQuery();
  let tokenVerify = query.get("token");

  return (
    <div>
      <Navbar />
      <SuccessVerification tokenVerify={tokenVerify} />
    </div>
  );
}

export default SuccessVerificationPage;