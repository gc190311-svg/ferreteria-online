"use client";

import { FaSearch } from "react-icons/fa";

export default function SearchInput({
  value,
  onChange,
  onSearch,
  placeholder = "Buscar productos..."
}) {

  return (

    <div className="flex w-full">

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {

          if (e.key === "Enter") {

            onSearch();

          }

        }}
        className="
          flex-1
          h-12
          lg:h-14
          px-4
          lg:px-6
          text-base
          lg:text-lg
          bg-white
          text-black
          rounded-l-xl
          outline-none
        "
      />

      <button
        onClick={onSearch}
        className="
          bg-yellow-500
          hover:bg-yellow-400
          text-black
          font-bold
          px-5
          lg:px-8
          rounded-r-xl
          flex
          items-center
          gap-2
          transition
        "
      >

        <FaSearch />

        <span className="hidden md:block">

          Buscar

        </span>

      </button>

    </div>

  );

}
