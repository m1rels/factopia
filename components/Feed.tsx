"use client";

import { useState, useEffect } from "react";

import PromptCard from "@components/PromptCard";

const PromptCardList = (props: { data: never[]; handleTagClick: Function }) => {
  return (
    <div className="mt-16 prompt_layout">
      {props.data.map((post: { _id: number }) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={props.handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const filteredPosts = posts.filter(
    (item: any) =>
      item.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
      item.tag.toLowerCase().includes(searchText.toLowerCase()) ||
      item.creator.userName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
      console.log(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={filteredPosts}
        handleTagClick={() =>
          filteredPosts.map((post: any) => {
            setSearchText(post.tag);
          })
        }
      />
    </section>
  );
};

export default Feed;
