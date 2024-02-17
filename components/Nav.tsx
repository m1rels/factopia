"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = (props: {}) => {
  const { data: session } = useSession();
  console.log(session)

  const [providers, setProvidersData] = useState(Object);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const setProviders = async () => {
        const response = await getProviders();

        setProvidersData(response);
    }

    setProviders();
  }, [])

  useEffect(() => {
    // Check if the user is logged in and update the UI accordingly
    setIsLoggedIn(!!session?.user);
  }, [session]);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/book-logo.png"
          width={30}
          height={30}
          alt="Logo Image"
          className="object-contain"
        />
        <p className="logo_text">Factopia</p>
      </Link>
      <div className="sm:flex hidden">
        {isLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-funfact" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={() => signOut()} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
                <Image src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="Profile" />
            </Link>
          </div>
        ) : (
          <>
          {providers && !session &&
            Object.values(providers).map((provider: any) => (
                <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="black_btn">
                    Sign In
                </button>
            ))}
          </>
        )}
      </div>

      <div className="sm:hidden flex relative">
        {isLoggedIn ? (
            <div className="flex">
                <Image src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="Profile"
                onClick={() => {
                    setToggleDropdown((prev) => !prev)
                }} />

                {toggleDropdown && (
                    <div className="dropdown">
                        <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false) }>My Profile</Link>
                        <Link href="/create-funfact" className="dropdown_link" onClick={() => setToggleDropdown(false) }>Create Fun Fact</Link>
                        <button type="button" className="mt-5 w-full black_btn" onClick={() => {
                            setToggleDropdown(false);
                            signOut();
                        }}>Sign Out</button>
                    </div>
                )}
            </div>
        ): (
            <>
          {providers && !session &&
            Object.values(providers).map((provider: any) => (
                <button
                type="button"
                key={provider.name}
                onClick={() => {signIn(provider.id)}}
                className="black_btn">
                    Sign In
                </button>
            ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
