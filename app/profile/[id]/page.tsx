"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

function UserProfile(props: { params: any }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${props.params.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (props.params?.id) fetchPosts();
  }, [props.params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={posts}
      handleEdit={() => {}}
      handleDelete={() => {}}
    />
  );
}

export default UserProfile;
