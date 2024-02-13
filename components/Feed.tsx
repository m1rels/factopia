"use client";

import { useState, useEffect } from "react";

import PromptCard from "@components/PromptCard";

const PromptCardList = (props: { data: never[], handleTagClick: Function }) => {
    return (
        <div className="mt-16 prompt-layout">
            {props.data.map((post: { _id: number; }) => (
                <PromptCard 
                    key={post._id}
                    post={post}
                    handleTagClick={props.handleTagClick} 
                    handleEdit={undefined} 
                    handleDelete={undefined}                />
            ))}
        </div>
    )
}

const Feed = () => {
    const [searchText, setSearchText] = useState("");
    const [posts, setPosts] = useState([]);

    const handleSearchChange = (e) => {

    }

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch("/api/prompt");
            const data = await response.json();

            setPosts(data);
        }

        fetchPosts();
    }, [])

    return (
    <section className="feed">
        <form className="relative w-full flex-center">
            <input 
            type="text"
            placeholder="Search for a tag or a username"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer"/>
        </form>
        <PromptCardList 
        data={posts}
        handleTagClick={() => {}}
        />
    </section>
    )
}

export default Feed;