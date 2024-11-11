export function TotalMoney({ items, type }) {
  let totalPrice = 0;

  if (type === "basics") {
    totalPrice = items
      .filter((item) => item.category === "basics")
      .reduce((total, item) => total + parseFloat(item.price), 0);
  } else if (type === "other") {
    totalPrice = items
      .filter((item) => item.category === "other")
      .reduce((total, item) => total + parseFloat(item.price), 0);
  }

  return <p> {totalPrice.toFixed(2)} (Spent)</p>;
}
