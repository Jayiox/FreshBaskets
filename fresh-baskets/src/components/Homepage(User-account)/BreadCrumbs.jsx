// src/components/Breadcrumbs.js
import React from 'react';
import { Link } from 'react-router-dom';

const BreadCrumbs = ({ productName }) => {
  return (
    <nav className="text-gray-500 mb-6">
      <ul className="flex space-x-2">
        <li>
          <span className="text-gray-400">Home</span> {/* Grayed-out, non-clickable Home */}
        </li>
        <li>/</li>
        <li>
          <Link to="/user-account" className="hover:underline text-green-500">Products</Link>
        </li>
        <li>/</li>
        <li>{productName}</li>
      </ul>
    </nav>
  );
};

export default BreadCrumbs;