function Stats({ items }) {
  // an early return
  if (!items.length)
    return <p className="stats">start adding items to your list ✈</p>;

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <p>
        {percentage === 100
          ? "everything's packed! 🌴"
          : `you have ${numItems} ${
              numItems === 1 ? "item" : "items"
            } on your list, and you already have packed
        ${percentage}%.`}
      </p>
    </footer>
  );
}

export default Stats;
