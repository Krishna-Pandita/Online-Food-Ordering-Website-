const RestaurantCategory = ({ item }) => {
  const { title } = item.card.card;

  return (
    <div className="border-b py-4">
      <h2 className="text-xl font-bold">{title}</h2>
      
    </div>
  );
};

export default RestaurantCategory;
