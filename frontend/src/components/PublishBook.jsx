/* eslint-disable react/prop-types */
import { useState } from "react";
import { useActiveAccount, useSendAndConfirmTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { contract1, contract2 } from "../App.jsx";
import BookList from "./BookList";
import Status from "./Status";
import Submit from "./Submit";

const PublishBook = ({ author }) => {
  const { mutate: sendAndConfirmTx, data: transactReceipt } =
    useSendAndConfirmTransaction();
  const [formData, setFormData] = useState({
    title_: "",
    content_: "",
    authorname_: "",
    date_: "",
    purchase_counter_: 10,
    price_: 0,
    bookstatus_: 0,
  });
  const account = useActiveAccount();
  const isAuthor = account?.address === author;


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData before submission", formData);
    let status = 0;
    if (formData.bookstatus_ !== "NotAvailable") {
      status = 1;
    }
    console.log("Contract1", contract1);
    console.log("Contract2", contract2);
    const transaction = prepareContractCall({
      contract: contract1,
      method: "publishBook",
      params: [
        formData.title_,
        formData.content_,
        formData.authorname_,
        formData.date_.toString(),
        Number.parseInt(formData.purchase_counter_),
        Number.parseInt(formData.price_),
        status,
      ],
    });
    sendAndConfirmTx(transaction);
    setFormData({
      title_: "",
      content_: "",
      authorname_: "",
      date_: "",
      purchase_counter_: 10,
      price_: 0,
      bookstatus_: 0,
    });
  };

  if (!isAuthor) {
    return (
      <>
        <h1>Welcome to my humble abode!</h1>
        <BookList isPublishTransacted={true} account={account} />
      </>
    );
  }

  return (
    <>
      {/* <BookList isPublishTransacted={transactReceipt?.status === "success"} /> */}
      <h1>Publishing a new book? Go here!</h1>
      <h2>🥴 Requires author-ization. No pun intended 🤣</h2>
      <h2>
        Last Transaction Status: <Status status={transactReceipt} />
      </h2>
      {transactReceipt ? <h3>From: {transactReceipt.from}</h3> : ""}
      {transactReceipt ? <h3>To: {transactReceipt.to}</h3> : ""}
      {transactReceipt ? (
        <h3>Transaction Hash: {transactReceipt.transactionHash}</h3>
      ) : (
        ""
      )}
      {transactReceipt ? <h3>Block Hash: {transactReceipt.blockHash}</h3> : ""}
      <form
        className="form-container"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label>
          Title:
          <input
            type="text"
            value={formData.title_}
            onChange={(e) =>
              setFormData({ ...formData, title_: e.target.value })
            }
            required
          />
        </label>
        <label>
          Author name:
          <input
            type="text"
            value={formData.authorname_}
            onChange={(e) =>
              setFormData({ ...formData, authorname_: e.target.value })
            }
            required
          />
        </label>
        <label>
          Date published:
          <input
            type="date"
            value={formData.date_}
            onChange={(e) =>
              setFormData({ ...formData, date_: e.target.value })
            }
            required
          />
        </label>
        <label>
          Price in USD:
          <input
            type="number"
            value={formData.price_}
            onChange={(e) =>
              setFormData({ ...formData, price_: e.target.value })
            }
            required
          />
        </label>
        <label>
          Number of copies:
          <input
            type="number"
            value={formData.purchase_counter_}
            onChange={(e) =>
              setFormData({ ...formData, purchase_counter_: e.target.value })
            }
            required
          />
        </label>
        <label>Set Availability</label>
        <select
          value={formData.bookstatus_}
          onChange={(e) =>
            setFormData({ ...formData, bookstatus_: e.target.value })
          }
          required
        >
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>
        <label>Content</label>
        <label>
          <textarea
            value={formData.content_}
            onChange={(e) =>
              setFormData({ ...formData, content_: e.target.value })
            }
            rows={20}
            cols={100}
            required
          />
        </label>
        <Submit isPending={transactReceipt} />
      </form>
    </>
  );
};

export default PublishBook;