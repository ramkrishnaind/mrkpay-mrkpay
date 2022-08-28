import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";

// Example items, to simulate fetching from another resources.
// const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

export default function PaginatedItems({
  itemsPerPage,
  children,
  category,
  categoryPosts,
  initialPage,
}) {
  // We start with an empty list of items.
  const donotshow = itemsPerPage >= categoryPosts.length;
  const [currentItems, setCurrentItems] = useState(null);
  // console.log("startPage", startPage);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        more: false,
        category,
        categoryPosts: currentItems ? currentItems : categoryPosts,
      });
    }
    return child;
  });
  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(categoryPosts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(categoryPosts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % categoryPosts.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      {/* <Items currentItems={currentItems} /> */}
      <div className="min-h-[400px]">{childrenWithProps}</div>
      {/* {children} */}
      {!donotshow && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">>"
          className="pagination"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<<"
          initialPage={initialPage - 1}
          activeLinkClassName="active"
          renderOnZeroPageCount={null}
        />
      )}
    </>
  );
}

// // Add a <div id="container"> to your HTML to see the componend rendered.
// ReactDOM.render(
//   <PaginatedItems itemsPerPage={4} />,
//   document.getElementById("container")
// );
