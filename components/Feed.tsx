"use client";

import { useState, useEffect, useRef } from "react";
import PromptCard from "@components/PromptCard";

const PromptCardList = (props: { data: never[]; handleTagClick: Function }) => {
  return (
    <div className="mt-16 prompt_layout">
      {props.data.map((post: { _id: number }) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={props.handleTagClick}
          handleEdit={() => {}}
          handleDelete={() => {}}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(Object);
  const [searchedResults, setSearchedResults] = useState([]);
  const [posts, setPosts] = useState([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const filterPrompts = (searchtext: string) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item: any) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e: any) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName: any) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault(); // Prevent the default form submission

    const searchResult = filterPrompts(searchText);
    setSearchedResults(searchResult);

    // Remove focus from the input field
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      if (response) {
        const data = await response.json();
        setPosts(data);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
          ref={inputRef}
        />
      </form>
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
