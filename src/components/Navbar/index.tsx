import React, { useState,useEffect, useRef } from "react";
import styles from "./styles.module.css";

interface Props {
  navItems: string[];
}

export const Navbar = ({ navItems }: Props) => {
  // const [visibleItems, setVisibleItems] = useState<number | null>(4);
  const [showHidden, setShowHidden] = useState(false);
  const [numOfItems, setNumOfItems] = useState(0);
  const [totalSpace, setTotalSpace] = useState(0);
  const [breakWidths, setBreakWidths] = useState<number[]>([]);
  const visibleItemsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleResize = () => {
      // Calculate the available space for links
      // const left = visibleItemsRef.current?.getBoundingClientRect().left;
      const width = visibleItemsRef.current?.getBoundingClientRect().width;
      const availableSpace = width
      console.log("available space " + availableSpace)
      console.log(initialBreakWidths)

      // Calculate which links to move to the hidden menu
      let requiredSpace = 0;
      let visibleItems = 0;
      for (let i = 0; i < breakWidths.length; i++) {
        requiredSpace += breakWidths[i];
        console.log(requiredSpace,availableSpace)
        if (requiredSpace <= availableSpace!) {
          visibleItems = i + 1;
        } else {
          break;
        }
      }
      
      console.log("visible items " + visibleItems)
      // Update the state
      setNumOfItems(visibleItems);
    };

    // Get the initial state
    const links = visibleItemsRef.current?.getElementsByTagName("li")
    console.log()
    let widths = []
    for(const link of links!){
      widths.push(link.offsetWidth + 44)
    }
    // const widths = links!.map((link) => {
    //   console.log(link)
    //   return 0
    // });
    const initialBreakWidths = [...widths];
    // setTotalSpace(widths.reduce((acc, width) => acc + width + 44, 0));
    setBreakWidths(initialBreakWidths);

    // Attach the resize event listener
    window.addEventListener('resize', handleResize);

    // Initial call to handleResize
    handleResize();

    // Remove the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className={styles.container}>
      <div className={styles.heading}>
        <img src="logo.svg" alt="" />
        <h1>E-COMM</h1>
      </div>
      <div className={styles.navOptions}>
        <ul ref={visibleItemsRef} className={styles.visibleItems}>
          {navItems.map((item) => {
            return <li>{item}</li>;
          })}
        </ul>
      </div>
      <div className={styles.more}>
          <button>
            More <img src="chevron-down.svg" alt="" />{" "}
          </button>
          {
            <ul className={styles.hiddenItems}>
              {numOfItems &&
                navItems.slice(numOfItems).map((item) => {
                  return <li>{item}</li>;
                })}
            </ul>
          }
        </div>
      <div className={styles.inputContainer}>
          <img src="search.svg" alt="" />
          <input type="text" placeholder="Search something" />
        </div>
    </nav>
  );
};
