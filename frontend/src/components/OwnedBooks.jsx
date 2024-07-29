/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { readContract } from "thirdweb";

import { Buffer } from "buffer";
import { contract1 } from '../App';
import { useReadContract } from 'thirdweb/react';

const OwnedBooks = ({ account, bookPurchased, setBookPurchased }) => {
    const [ownedBooks, setOwnedBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const contract = contract1;

    useEffect(() => {
        const fetchOwnedBooks = async () => {
            try {
                const books = await readContract({
                    contract,
                    method: "getOwnedBooks",
                    params: [account?.address]
                });


                console.log("Fetched books:", books);

                const cleanOwnedBooks = books.map((book, index) => {
                    const title = Buffer.from(book.title.slice(2), "hex").toString();
                    const content = Buffer.from(book.content.slice(2), "hex").toString();
                    const date = Buffer.from(book.published_date.slice(2), "hex").toString();
                    const authorName = Buffer.from(book.author_name.slice(2), "hex").toString();

                    return (
                        <li key={index} id="card-book">
                            <h2 id="title">{title}</h2>
                            <details>
                                <summary id="summary-book">Content</summary>
                                <p>Author: {authorName}</p>
                                <p id="time-book">Published on {date}</p>
                                {/* <p id="pricing-book"> ${price}</p> */}
                                <p>{content}</p>
                            </details>
                        </li>
                    );
                });
                setOwnedBooks(cleanOwnedBooks);
            } catch (error) {
                console.error("Error fetching owned books:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOwnedBooks();
    }, [account?.address, bookPurchased, setBookPurchased, contract]);


    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="books">
            <h1>Owned Books</h1>
            <ul id="card-books">
                {ownedBooks.length == 0 ? 'None' : ownedBooks}
            </ul>
        </div>
    );
};

export default OwnedBooks;