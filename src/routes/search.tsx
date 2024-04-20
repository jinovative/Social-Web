import React, { useState } from "react";
import { styled } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  overflow-y: auto;
`;

const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const SearchInput = styled.input`
  padding: 8px 16px;
  font-size: 16px;
  border: 2px solid #1d9bf0;
  border-right: none;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  flex-grow: 1;
  max-width: 400px;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #1d9bf0;
  color: white;
  border: 2px solid #1d9bf0;
  border-left: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #107ab0;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #1d9bf0;
  }
`;
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    border: none;
    border-radius: 20px;
    background-color: #1d9bf0;
    color: white;
    padding: 8px 16px;
    margin: 0 4px;
    cursor: pointer;

    &:hover {
      background-color: #107ab0;
    }

    &.active {
      background-color: #0a5795; // Darker blue for active page
    }

    &.ellipsis {
      background: none;
      border: none;
      cursor: default;
      color: #333;
    }
  }
`;
interface Score {
  _id: string;
  Processor: string;
  Details: string;
  Score: string;
}
export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Score[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://social-server-xjch.onrender.com/api/single_scores?processor=${query}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch scores");
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Failed to fetch scores");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: React.SetStateAction<number>) =>
    setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(results.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / itemsPerPage) * itemsPerPage;
    return new Array(itemsPerPage).fill(null).map((_, idx) => start + idx + 1);
  };

  return (
    <Wrapper>
      <h1>Search by Processor</h1>
      <SearchBox>
        <SearchInput
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter processor name..."
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </SearchBox>
      <Table>
        <thead>
          <tr>
            <th>Processor</th>
            <th>Details</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((score) => (
            <tr key={score._id}>
              <td>{score.Processor}</td>
              <td>{score.Details}</td>
              <td>{score.Score}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {currentPage > 1 && <button onClick={() => paginate(1)}>1</button>}
        {currentPage > 1 && (
          <button
            className="ellipsis"
            onClick={() => paginate(currentPage - 1)}
          >
            &hellip;
          </button>
        )}
        {getPaginationGroup().map((number) =>
          number < currentPage + 3 &&
          number > currentPage - 3 &&
          number <= Math.ceil(results.length / itemsPerPage) ? (
            <button
              key={number}
              className={currentPage === number ? "active" : ""}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          ) : null
        )}
        {currentPage < Math.ceil(results.length / itemsPerPage) && (
          <button
            className="ellipsis"
            onClick={() => paginate(currentPage + 1)}
          >
            &hellip;
          </button>
        )}
        {currentPage < Math.ceil(results.length / itemsPerPage) && (
          <button
            onClick={() => paginate(Math.ceil(results.length / itemsPerPage))}
          >
            {Math.ceil(results.length / itemsPerPage)}
          </button>
        )}
      </Pagination>
    </Wrapper>
  );
}
