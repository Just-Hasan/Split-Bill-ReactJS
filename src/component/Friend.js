import { useState } from "react";
import { TiDelete } from "react-icons/ti";

export function Friend({
  friend,
  onDeleteFriend,
  checkCurrentFriend,
  selectedFriend,
}) {
  const [showDelete, setShowDelete] = useState(false);
  return (
    <li
      style={
        selectedFriend === friend.id
          ? { backgroundColor: "#fff4e6" }
          : { backgroundColor: "" }
      }
      onMouseEnter={() => setShowDelete(() => !showDelete)}
      onMouseLeave={() => setShowDelete(() => !showDelete)}
      className={`friend-item`}
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
      {/*
      /////////////////////////////////////[Select / Close button Logic]
      1. Ketika di klik button ini akan memanggil function checkCurrentFriend()
      2. Kita memasukan id dari teman yang sedang kita click dengan menggunakan
         property id (friend.id)
      
      Reminder : 'friend' adalah object yang kita dapat hasil dari rendered list
      */}
      <button
        className="button"
        onClick={() => {
          checkCurrentFriend(friend.id);
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
