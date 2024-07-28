/* eslint-disable react/prop-types */
import AdditionalInfo from "./AdditionalInfo";

const AppBase = ({  author }) => {
  return (
    <>
      <h1>BookShelf</h1>
      <AdditionalInfo author={author} />
    </>
  );
};

export default AppBase;