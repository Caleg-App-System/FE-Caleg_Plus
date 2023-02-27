import React from 'react'
import "./selectedButton.css"
import { Square, LayoutSplit, Grid } from 'react-bootstrap-icons'

const SelectedButton = ({election}) => {
  return (
    <>
    <div className='text-end me-5'>
    <button className="btn" onClick={(e)=>election('one')}>
      <Square color="black" size={25} />
    </button>
    <button className="btn" onClick={(e)=>election('two')}>
      <LayoutSplit color="black" size={25} />
      </button>
      <button className="btn" onClick={(e)=>election('four')}>
      <Grid color="black" size={25} />
      </button>
    </div>
    </>
  )
}

export default SelectedButton