function ListGroup() {
  // const items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];
  const items: string[] = [];
  const display = (items.length !== 0);
  console.log(display)

  return (
    <>
      <h1>List</h1>
      {display ? (
        <ul className="list-group">
          {items.map((item) => (
            <li key={item} className="list-group-item">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p>Helper</p>
      )}
    </>
  );
}

export default ListGroup;
