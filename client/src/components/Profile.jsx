import React from "react";

const Profile = ({ img, name, role }) => {
  return (
    <div className="bg-gray rounded-lg py-5 px-5 flex flex-col h-64 justify-center items-center text-white">
      <img src={img} alt={name} className="rounded-full h-24 w-24" />
      <h2 className="font-bold text-xl mt-4">{name}</h2>
      {role.length < 8 ? (
        <p className="font-thin text-lg mt-1">{role}</p>
      ) : (
        role
          .split(" ")
          .map((r) => <p className="font-thin text-lg mt-1">{r}</p>)
      )}
    </div>
  );
};

export default Profile;
