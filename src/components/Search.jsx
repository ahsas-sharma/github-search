import { useState } from "react";
import PropTypes from "prop-types";
import {
  UsersIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/20/solid";

function Search(props) {
  const [username, setUsername] = useState("");

  const onUsernameChangeHandler = (event) => {
    setUsername(event.target.value.trim());
  };

  return (
    <div>
      <div className="mt-5 flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <UsersIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            name="username"
            id="username"
            className="block w-full rounded-none rounded-l-md border border-indigo-300 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter keywords to search github usernames ..."
            onChange={onUsernameChangeHandler}
            value={username}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                props.fetchDataFromGithub(username);
              }
            }}
          />
        </div>
        <button
          type="button"
          className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm text-white bg-indigo-800 ring-1 ring-inset ring-gray-300 hover:bg-indigo-800 border border-indigo-600  disabled:border disabled:bg-gray-400  disabled:border-indigo-300"
          onClick={() => props.fetchDataFromGithub(username)}
          disabled={!username}
        >
          <MagnifyingGlassCircleIcon
            className="-ml-0.5 h-10 w-10 text-white "
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
}

Search.propTypes = {
  fetchDataFromGithub: PropTypes.func.isRequired,
};

export default Search;
