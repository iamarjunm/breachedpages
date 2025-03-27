import React from "react";

const Error505Page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-6xl font-bold">505</h1>
      <p className="text-2xl mt-4">HTTP Version Not Supported</p>
      <p className="mt-2 text-gray-400">The server does not support the HTTP protocol version used in the request.</p>
      <a href="/" className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Go Back Home
      </a>
    </div>
  );
};

export default Error505Page;