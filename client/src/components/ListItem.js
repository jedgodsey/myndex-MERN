const ListItem = (props) => {
  return(
    <li onClick={() => {props.pickTicker(props.stock.symbol)}}>{`${props.stock.symbol}: ${props.stock.description}`}</li>
  )
}

export default ListItem;
