import { Link } from "react-router-dom";

function Home({ accountData, updateAccount }) {
  return (
    <main className="Home">
      {accountData ? (
        <p>
          Hi
          <span style={{ fontStyle: "italic", color: "grey" }}>
            {accountData.user}
          </span>
          , you are logged now. Do not forget to
          <br />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              updateAccount("");
            }}
          >
            Logout
          </button>
        </p>
      ) : (
        <p>
          <Link to="/login">Please login first</Link>
        </p>
      )}
    </main>
  );
}

export default Home;
