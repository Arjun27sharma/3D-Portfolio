import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { styles } from '../style'
// import { navLinks } from '../constants'
import { logo, menu, close } from '../assets'
import { CopyToClipboard } from "react-copy-to-clipboard";


export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];
export const publicNavLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  }
];


const Navbar = ({ userName, logo, publicProfile, publicLink }) => {

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    // Optionally, you can show a notification or do something else to indicate that the link has been copied.
    // For example, you can use a toast library like "react-toastify" to show a toast message:
    // import { toast } from "react-toastify";
    // toast.success("Link copied to clipboard!", { position: "top-right" });
  };

  const NavtoMap = publicProfile ? publicNavLinks : navLinks

  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <nav className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0)
          }}
        >
          <img src={logo} alt="logo" className='w-9 h-9 object-contain' />
          <p className='text-white text-[18px] font-bold cursor-pointer'>{userName}</p>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {NavtoMap.map((link) => (
            <li>
              <a
                href={`#${link.id}`}
                className={`${active === link.title ? 'text-white' : 'text-secondary'} hover:text-white text-[18px] font-medium cursor-pointer`}
                onClick={() => setActive(link.title)}
              >
                {link.title}
              </a>
            </li>
          ))}

{!publicProfile && (
  <>
  <li className="cursor-pointer text-secondary text-[18px] font-medium">
    <a href="/update">
    Update Profile
    </a>
    
    </li>
        <CopyToClipboard text={"http://localhost:5173/"+publicLink} onCopy={handleCopy}>
          <li className={copied ? "text-green-500 cursor-pointer text-[18px] font-medium" : "text-secondary cursor-pointer text-[18px] font-medium"}>
            {copied ? "Link Copied!" : "Copy Portfolio Link"}
          </li>
        </CopyToClipboard>

        


        </>
      )}
        </ul>

        {/* {!publicProfile &&
          <a class="" href={publicLink}>Portfolio Link</a>} */}





        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className='w-[28px] h-[28px] object-contain cursor-pointer'
            onClick={() => setToggle(!toggle)}
          />
          <div
            className={`${!toggle ? 'hidden' : 'flex'} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl z-10`}
          >
            <ul className="list-none flex flex-col gap-4 justify-end items-start">
              {navLinks.map((link) => (
                <li>
                  <a
                    href={`#${link.id}`}
                    className={`${active === link.title ? 'text-white' : 'text-secondary'} font-poppins font-medium cursor-pointer text-[16px]`}
                    onClick={() => {
                      setActive(link.title)
                      setToggle(!toggle)
                    }
                    }
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar