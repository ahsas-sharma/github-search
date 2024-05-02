import PropTypes from "prop-types";
import { Link } from "react-router-dom";
function UserCard(props) {
  return (
    <Link
      className="mt-1 col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center border border-indigo-300 hover:bg-indigo-50 shadow"
      to={props.user.login}
    >
      <div className="flex flex-1 flex-col p-8">
        <img
          className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
          src={props.user.avatar_url}
          alt=""
        />

        <h1 className="mt-2 rounded px-2 py-1 text-lg font-semibold text-indigo-900 ">
          {props.user.login}
        </h1>
      </div>
    </Link>
  );
}
UserCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserCard;
