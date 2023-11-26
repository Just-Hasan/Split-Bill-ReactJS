import { Friend } from "./Friend";

export function FriendsList({
  friends,
  onDeleteFriend,
  setSelectedFriend,
  checkCurrentFriend,
  selectedFriend,
  resetSplitBill,
}) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onDeleteFriend={onDeleteFriend}
          setSelectedFriend={setSelectedFriend}
          checkCurrentFriend={checkCurrentFriend}
          selectedFriend={selectedFriend}
          resetSplitBill={resetSplitBill}
        />
      ))}
    </ul>
  );
}
