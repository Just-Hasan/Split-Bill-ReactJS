import { useState } from "react";
import { FriendsList } from "./component/FriendsList";
import { Button } from "./component/Button";
import { FormAddFriend } from "./component/FormAddFriend";
import { FormSplitBill } from "./component/FormSplitBill";

const friendsData = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  /////////////////////////////////////[For showing & displaying Add Friend Form]
  const [showAddFriend, setShowAddFriend] = useState(false);

  function handleShowFriend() {
    setShowAddFriend(() => !showAddFriend);
  }

  /////////////////////////////////////[Add Friend]
  const [friendsName, setFriendsName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [friends, setFriends] = useState(friendsData);

  function AddFriend(friendObj) {
    setFriends((currentFriendData) => [...currentFriendData, friendObj]);
  }

  function handleAddFriend(e) {
    e.preventDefault();
    if (!friendsName || !imageUrl) return;
    const newFriend = {
      id: Date.now(),
      name: friendsName,
      image: imageUrl,
      balance: 0,
    };
    setFriendsName("");
    setImageUrl("");
    AddFriend(newFriend);
    setShowAddFriend(() => !showAddFriend);
  }

  /////////////////////////////////////[Delete Friend]
  function handleDeleteFriend(friendsToDelete) {
    setFriends((currentFriends) =>
      currentFriends.filter((friend) => friend.id !== friendsToDelete.id)
    );
  }

  /*
  /////////////////////////////////////[Selected Friend] Logic : 
  1. Buat state dengan nilai awal null
  2. Ketika kita click select, maka object tersebut yang akan tampil sebagai yang terpilih
  3. Kita melakukan derived state terhadap 'selectedFriend' yang merupakan sebuah ID, dan mencari
     teman dengan id yang serupa
  4. splitBillWith adalah variable yang berisi object yang memiliki id sama dengan 
     selectedFriend.
  */
  const [selectedFriend, setSelectedFriend] = useState(null);
  const splitBillWith = friends.find((friend) => friend.id === selectedFriend);
  console.log(splitBillWith);
  console.log(selectedFriend);
  /*
  /////////////////////////////////////[checkCurrentFriend] Logic :
  1. Function ini menerima satu argumen / paramater yang merupakan
     friendId / id teman yang di klik
  2. Di dalamnya kita menggunakan setter function setSelectedFriend
  3. setSelectedFriend memiliki nilai awal null
  4. Logika dari setSelectedFriend adalah, jika state variable selectedFriend
     sama dengan paramater / argument yang diterima oleh function ini maka
     buat value dari selectedFriend menjadi null
  5. Jika tidak sama, maka jadikan id yang diterima oleh function ini sebagai
     value dari state variable selected friend
  */
  function checkCurrentFriend(friendId) {
    setSelectedFriend((currentFriend) =>
      currentFriend === friendId ? null : friendId
    );
    setShowAddFriend(false);
    resetSplitBill();
  }

  /*
  /////////////////////////////////////[Update the balance]
  1. KIta ngepass id ke function kita dan apa yng ingin diupdate
  2. selanjutnya kita menggunakan map method untuk mengupdate value
  */
  function updateBalance(id, newBalance) {
    setFriends((currentFriends) =>
      currentFriends.map((friendsData) => {
        if (friendsData.id === id) {
          const addedBalance = friendsData.balance + newBalance;
          return { ...friendsData, balance: addedBalance };
        } else {
          return friendsData;
        }
      })
    );
    setSelectedFriend(false);
  }

  /*
  /////////////////////////////////////[Split bill states and reset]
  */
  const [bill, setBill] = useState(0);
  const [myBill, setMyBill] = useState(0);
  const [whosPaying, setWhosPaying] = useState("user");

  function resetSplitBill() {
    setBill(() => 0);
    setMyBill(() => 0);
    setWhosPaying("user");
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onDeleteFriend={handleDeleteFriend}
          setSelectedFriend={setSelectedFriend}
          checkCurrentFriend={checkCurrentFriend}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && (
          <FormAddFriend
            friendsName={friendsName}
            setFriendsName={setFriendsName}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            onHandleAddFriend={handleAddFriend}
          />
        )}
        <Button eventHandlerFunction={handleShowFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill
        splitBillWith={splitBillWith}
        updateBalance={updateBalance}
        bill={bill}
        selectedFriend={selectedFriend}
        setBill={setBill}
        myBill={myBill}
        setMyBill={setMyBill}
        whosPaying={whosPaying}
        setWhosPaying={setWhosPaying}
      />
    </div>
  );
}
