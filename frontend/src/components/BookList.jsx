/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { readContract, prepareContractCall } from "thirdweb";
import { Buffer } from "buffer";
import { contract1 } from "../App.jsx";
import { useSendTransaction } from "thirdweb/react";
import OwnedBooks from "./OwnedBooks.jsx";

const BookList = ({ isPublishTransacted, account }) => {
  const [bookList, setBookList] = useState([]);
  const { mutate: sendTransaction } = useSendTransaction();
  const [bookPurchased, setBookPurchased] = useState(0);


  useEffect(() => {
    if (isPublishTransacted) {
      const cleanBookList = [];
      const handleBookList = async () => {
        try {
          const books = await readContract({
            contract: contract1,
            method: "getAuthorBooks",
          });
          for (let book = 0; book < books.length; book++) {
            const title = Buffer.from(books[book].title.slice(2), "hex").toString();
            const content = Buffer.from(books[book].content.slice(2), "hex").toString();
            const date = Buffer.from(books[book].published_date.slice(2), "hex").toString();
            const price = books[book].price;
            cleanBookList.push(
              <li key={book} id="card-book">
                <h2 id="title-book">{title}</h2>
                <details>
                  <summary id="summary-book">Content</summary>
                  <time dateTime={date} id="time-book">Published on {date}</time>
                  <label htmlFor="pricing-book">Pricing:</label>
                  <p id="pricing-book"> ${price}</p>
                  <p id="content-book">{content}</p>
                </details>
                <button id="cta-book" onClick={async () => await handleBuyBook(book)}>Buy</button>
              </li>,
            );
          }
          setBookList(cleanBookList);
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      };
      handleBookList();
    }
  }, [isPublishTransacted]);

  const handleBuyBook = async (bookIndex) => {
    try {
        const books = await readContract({
            contract: contract1,
            method: "getAuthorBooks",
        });
        const book = books[bookIndex];
        console.log("Contract ABI:", contract1.abi);
        console.log("Available methods in ABI:", contract1.abi.map(item => item.name));
        console.log("Book details:", book);

        // Ensure price is a BigInt, even if it's 0
        const price = BigInt(book.price);

        const transaction = await prepareContractCall({
            contract: contract1,
            method: "buyBook",
            params: [book.bookId],
            value: price, // Ensure price is a BigInt
            gasLimit: 3000000, // Set a higher gas limit
        });
        console.log("Prepared transaction:", transaction);

        // Check if the transaction is prepared correctly
        if (transaction) {
            sendTransaction(transaction);
            setBookPurchased(prevState => !prevState);
        } else {
            console.error("Transaction preparation failed.");
        }

    } catch (error) {
        console.error("Error preparing or sending transaction:", error);
    }
};

  return (
    <>
      <div>
        {account &&
          (<>        <h1>Author&rsquo;s Published Titles</h1>
                      <ul className="books">{bookList ? bookList : ""}</ul>
          </>)
        }
      </div>
      <OwnedBooks account={account} bookPurchased={bookPurchased} setBookPurchased={setBookPurchased} />
    </>
  );
};

export default BookList;
