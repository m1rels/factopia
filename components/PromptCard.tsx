"use client";

import { MouseEventHandler, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

function PromptCard(props: {
  post: any;
  handleTagClick: Function;
  handleEdit: MouseEventHandler<HTMLParagraphElement>;
  handleDelete: MouseEventHandler<HTMLParagraphElement>;
}) {
  const [copied, setCopied] = useState("");

  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleProfileClick = () => {

    if (props.post.creator._id === session?.user?.id) return router.push("/profile");

    router.push(`/profile/${props.post.creator._id}?name=${props.post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(props.post.prompt);
    navigator.clipboard.writeText(props.post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer" onClick={handleProfileClick}>
          <Image
            src={props.post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {props.post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {props.post.creator.email}
            </p>
          </div>
        </div>
        <div
          className="copy_btn"
          onClick={() => {
            handleCopy();
          }}
        >
          <Image
            src={
              copied === props.post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="Copy Icon"
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">
        {props.post.prompt}
      </p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() =>
          props.handleTagClick && props.handleTagClick(props.post.tag)
        }
      >
        {props.post.tag}
      </p>

      {session?.user?.id === props.post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={props.handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={props.handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
}

export default PromptCard;
