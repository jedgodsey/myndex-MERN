import MyndexModel from '../models/myndex';

const IndexCard = (props) => {
  const onDelete = (index) => {
    MyndexModel.delete(index)
  }
  return(
    <div className="index-card">
      ID#: {props.index._id}
      <p>{props.index.holdings}</p>
      <button onClick={() => onDelete(props.index._id)}>delete the above index</button>
    </div>
  )
}

export default IndexCard;
