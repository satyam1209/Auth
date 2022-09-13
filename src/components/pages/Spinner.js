import React from 'react'


// export class Spinner extends Component {
  const Spinner=(props)=>{
  // render() {
    return (
      <div className='text-center my-3'>
        <img style={props.style} src={props.image} alt="loading"></img>
      </div>
    )
  }
// }

export default Spinner

