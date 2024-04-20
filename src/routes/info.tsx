import { styled } from "styled-components";

const Wrapper = styled.div`
  display: grid;
  gap: 50px;
  grid-template-rows: 1fr 5fr;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Form = styled.form`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const TextArea = styled.div`
  text-align: center;
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  height: 300px;
  border-color: #1d9bf0;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  p {
    margin-bottom: 15px;
    line-height: 1.5;
  }

  p:first-child {
    color: #1d9bf0;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  p:nth-child(2) {
    font-style: italic;
  }

  p:nth-child(4) {
    font-weight: bold;
  }

  p:last-child {
    margin-top: 20px;
    font-style: italic;
  }
`;
export default function Information() {
  return (
    <Wrapper>
      <Form>
        <TextArea>
          <p>Welcome to our community!</p>
          <p>
            Here, you can freely share and discuss anything related to
            computers, whether it's about gaming setups, optimizing your
            workstation, or improving performance.
          </p>
          <p>
            Looking for advice on which computer suits your favorite games? Want
            to share your latest tech acquisitions or review peripherals? You're
            in the right place!
          </p>
          <p>
            Join us in exploring the world of computers, exchanging knowledge,
            and fostering meaningful discussions!
          </p>
        </TextArea>
      </Form>
    </Wrapper>
  );
}
