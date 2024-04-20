import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  padding: 20px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #1d9bf0;
    width: 10px;
  }
  th:nth-child(1) {
    width: 10px;
  }
  th:nth-child(2) {
    width: 20px;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0px;

  button {
    border: none;
    border-radius: 20px;
    background-color: #1d9bf0;
    padding: 8px 16px;
    margin: 0 4px;
    cursor: pointer;
  }
`;
const Title = styled.h1`
  color: white;
  font-size: 24px;
  text-align: center;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const ScoreButton = styled.button`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  &:hover {
    background-color: #107ab0;
  }
`;
interface Score {
  _id: string;
  Processor: string;
  Details: string;
  Score: string;
}

export default function BenchChart() {
  const [scores, setScores] = useState<Score[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [scoreType, setScoreType] = useState("single_scores");

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get(
          `https://social-server-xjch.onrender.com/api/${scoreType}`
        );
        setScores(response.data);
      } catch (error) {
        console.error("Failed to fetch scores:", error);
      }
    };

    fetchScores();
  }, [scoreType]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = scores.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: React.SetStateAction<number>) =>
    setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(scores.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const maxPageNumberLimit = 5;
  const pageNumberLimit =
    pageNumbers.length > maxPageNumberLimit
      ? maxPageNumberLimit
      : pageNumbers.length;
  const currentLimit = Math.ceil(currentPage / pageNumberLimit);

  const visiblePages = pageNumbers.slice(
    (currentLimit - 1) * pageNumberLimit,
    currentLimit * pageNumberLimit
  );

  return (
    <Wrapper>
      <Title>Bench Chart</Title>
      <ButtonContainer>
        <ScoreButton onClick={() => setScoreType("single_scores")}>
          Single Scores
        </ScoreButton>
        <ScoreButton onClick={() => setScoreType("multi_scores")}>
          Multi Scores
        </ScoreButton>
      </ButtonContainer>
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
          <button onClick={() => paginate(currentPage - 1)}>&laquo;</button>
        )}
        {visiblePages.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={currentPage === number ? "active" : ""}
          >
            {number}
          </button>
        ))}
        {currentPage < pageNumbers.length && (
          <button onClick={() => paginate(currentPage + 1)}>&raquo;</button>
        )}
        {currentPage < pageNumbers.length && (
          <button onClick={() => paginate(pageNumbers.length)}>
            {pageNumbers.length}
          </button>
        )}
      </Pagination>
    </Wrapper>
  );
}
