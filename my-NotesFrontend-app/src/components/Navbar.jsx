import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-4 flex flex-col sm:flex-row justify-between items-center">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <Link to="/note" className="hover:text-gray-300">Notes</Link>
        <Link to="/addnote" className="hover:text-gray-300">Add Notes</Link>
        {/* <Link to="/updatenote/:noteId" className="hover:text-gray-300">Edit Notes</Link> */}
      </div>
    </nav>
  );
}

export default Navbar;
