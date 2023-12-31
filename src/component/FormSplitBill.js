import { Button } from "./Button";

/*
/////////////////////////////////////[SPlIT LOGIC BILL]
1. Bill value adalah constant, yang artinya dia adalah individu
2. JIka kita yang bayar, teman ngutang ke kita berdasarkan bill value - pengeluaran kita
3. JIka temen yang bayar, kita ngutang ke temen berdasarkan bill value - pengeluaran teman
4. JIka kita yang bayar maka kita menambahkan pengeluaran teman ke balance mereka, membuat
   seolah mereka ngutang
5. Jika teman yang bayar maka kita mengurangkan balance mereka berdasarkan pengeluaran kita

/////////////////////////////////////[Keterangan PROP]
1. splitBillWith adalah prop yang berisi object dari teman yang kita pilih
*/
export function FormSplitBill({
  splitBillWith,
  updateBalance,
  bill,
  setBill,
  myBill,
  setMyBill,
  whosPaying,
  selectedFriend,
  setWhosPaying,
}) {
  function resetSplitBillFunction() {
    setWhosPaying("user");
  }

  const friendsExpenses = bill - myBill; //friend expenses
  let totalExpenses;
  // yourExpenses = bill - friendsExpenses
  whosPaying === "user"
    ? (totalExpenses = bill - myBill)
    : (totalExpenses = -(bill - friendsExpenses));

  if (splitBillWith) {
    return (
      <form
        className="form-split-bill"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        key={selectedFriend}
      >
        <h2>Split a bill with {splitBillWith.name}</h2>
        <label>Bill Value</label>
        <input
          type="number"
          value={bill}
          onChange={(e) =>
            setBill(+e.target.value < 0 ? bill : +e.target.value)
          }
        ></input>

        <label>Your Expenses</label>
        <input
          type="number"
          value={myBill}
          onChange={(e) => {
            if (e.target.value < 0) return;
            setMyBill(+e.target.value > bill ? myBill : +e.target.value);
          }}
        ></input>

        <label>{splitBillWith.name} Expenses</label>
        <input type="text" disabled value={friendsExpenses}></input>

        <label>Who is paying the bill</label>
        <select
          value={whosPaying}
          onChange={(e) => setWhosPaying(e.target.value)}
        >
          <option value="user">You</option>
          <option value={splitBillWith.name}>{splitBillWith.name}</option>
        </select>
        <Button
          eventHandlerFunction={() => {
            updateBalance(splitBillWith.id, totalExpenses);
            resetSplitBillFunction();
          }}
        >
          Split Bill
        </Button>
      </form>
    );
  }
}
