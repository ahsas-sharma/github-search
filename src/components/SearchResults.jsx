import PropTypes from "prop-types";
import UserCard from "./UserCard";

function SearchResults(props) {
  return (
    <div className="mb-10">
      <ul
        role="list"
        className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 "
      >
        {props.users.map((item) => {
          return <UserCard key={item.id} user={item} />;
        })}
      </ul>
    </div>
  );
}

SearchResults.propTypes = {
  users: PropTypes.array.isRequired,
};

export default SearchResults;
