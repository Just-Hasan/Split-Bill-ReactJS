import { useState } from "react";
import { TiDelete } from "react-icons/ti";

export function Friend({
  friend,
  onDeleteFriend,
  checkCurrentFriend,
  selectedFriend,
  resetSplitBill,
}) {
  const [showDelete, setShowDelete] = useState(false);
  return (
    <li
      onMouseEnter={() => setShowDelete(() => !showDelete)}
      onMouseLeave={() => setShowDelete(() => !showDelete)}
      className="friend-item"
    >
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 ? (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      ) : friend.balance === 0 ? (
        <p>You and {friend.name} are even</p>
      ) : (
        <p className="green">
          {friend.name} owe you {friend.balance}$
        </p>
      )}
      <button
        className="button"
        onClick={() => {
          checkCurrentFriend(friend.id);
          resetSplitBill();
        }}
      >
        {friend.id === selectedFriend ? "Close" : "Select"}
      </button>
      {showDelete && (
        <TiDelete
          className="delete-icon"
          onClick={() => onDeleteFriend(friend)}
        />
      )}
    </li>
  );
}
