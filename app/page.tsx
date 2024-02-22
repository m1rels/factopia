import Feed from "@components/Feed";
import Link from "next/link";

export default function Home() {
  return (
    <section className="w-full flex-center flex-col mb-10">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> Fun Facts</span>
      </h1>
      <p className="desc text-center">
      Factopia is a platform that enables users to effortlessly share and explore fascinating and entertaining facts.
      </p>
      <Feed />
      <div>
        <Link href="/privacy-policy" className="text-xs text-gray-700" >Privacy Policy</Link>
        <span className="text-xs text-gray-700"> | </span>
        <Link href="/terms-of-use" className="text-xs text-gray-700">Terms of Use</Link>
      </div>
    </section>
  );
}
