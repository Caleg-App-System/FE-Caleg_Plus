import React from 'react'
import "./selectedButton.css"
import { useSelector, useDispatch } from 'react-redux';
import { Square, LayoutSplit, Grid } from 'react-bootstrap-icons'

const SelectedButton = ({ election }) => {
  const splitActive = useSelector((state) => state.split.split);
  const dispatch = useDispatch();

  return (
    <>
      <div className='text-end me-5'>
        <button className={splitActive === "one" ? "btn btn-sm btn-warning" : "btn btn-sm"} onClick={(e) => { election('one'); dispatch({ type: "SPLIT_ONE" }) }}>
          <Square color="black" size={20} />
        </button>
        <button className={splitActive === "two" ? "btn btn-sm btn-warning" : "btn btn-sm"} onClick={(e) => { election('two'); dispatch({ type: "SPLIT_TWO" }) }}>
          <LayoutSplit color="black" size={20} />
        </button>
        <button className={splitActive === "four" ? "btn btn-sm btn-warning" : "btn btn-sm"} onClick={(e) => { election('four'); dispatch({ type: "SPLIT_FOUR" }) }}>
          <Grid color="black" size={20} />
        </button>
      </div>
    </>
  )
}

export default SelectedButton