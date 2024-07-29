import Link from "next/link";
import { Dispatch, FormEventHandler, SetStateAction } from "react";

function Form(props: {
  type: string;
  post: any;
  setPost: Dispatch<SetStateAction<{ prompt: string; tag: string }>> | FormEventHandler<HTMLFormElement>;
  submitting: boolean;
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined; 
}) {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{props.type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {props.type} and share amazing fun facts with the world, and let your
        knowledge run wild.
      </p>

      <form
        onSubmit={props.handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-gray-400">
            Your Fun Fact
          </span>

          <textarea 
            value={props.post.prompt}
            onChange={(e) => props.setPost({ ...props.post,
            prompt: e.target.value})}
            placeholder="Write your Fun Fact here..."
            required
            className="form_textarea"
          />

        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-gray-400">
            Tag {" "}
            <span>(#curiousfacts, #didyouknow, #mindblown)</span>
          </span>

          <textarea 
            value={props.post.tag}
            onChange={(e) => props.setPost({ ...props.post,
            tag: e.target.value})}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
            <Link href="/" className="text-gray-500 text-sm">
                Cancel
            </Link>

            <button
                type="submit"
                disabled={props.submitting}
                className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
                >
                    {props.submitting ? `${props.type}...` : props.type}
            </button>
        </div>
      </form>
    </section>
  );
}

export default Form;
