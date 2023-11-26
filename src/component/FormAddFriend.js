import { Button } from "./Button";

export function FormAddFriend({
  friendsName,
  setFriendsName,
  imageUrl,
  setImageUrl,
  onHandleAddFriend,
}) {
  return (
    <form className="form-add-friend" onSubmit={onHandleAddFriend}>
      <label>Friend name</label>
      <input
        type="text"
        value={friendsName}
        onChange={(e) => setFriendsName(e.target.value)}
      ></input>

      <label>Image URL</label>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      ></input>
      <Button eventHandlerFunction={onHandleAddFriend}>Add</Button>
    </form>
  );
}
