const UserAvatarGroup = ({ members }) => {
  return (
    <div className="flex -space-x-2 border-t border-t-gray-300 pt-2">
      {members?.map((user) => (
        <div
          key={user._id}
          className="w-8 h-8 rounded-full overflow-hidden text-blue-600 bg-gray-300 border-2 border-white grid place-items-center font-bold text-sm leading-none"
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="members"
              className="w-full h-full object-cover"
            />
          ) : (
            user?.fullName?.charAt(0)
          )}
        </div>
      ))}
    </div>
  );
};

export default UserAvatarGroup;