const ItemList = ({ items, onSelect, accessor, identifier }) => {

    const handleItemClick = (item) => {
        onSelect(item);
    };

    return (
        <ul>
            {items.map((item) => (
                <li key={item[identifier]} onClick={() => handleItemClick(item)} className="cursor-pointer">
                    {item[accessor]}
                </li>
            ))}
        </ul>
    );
}
export default ItemList;