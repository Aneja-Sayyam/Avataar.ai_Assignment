import React, { useState,useEffect, useRef } from "react";
import styles from "./styles.module.css";

interface Props {
  navItems: string[];
}

export const Navbar = ({ navItems }: Props) => {
  const [numOfItems, setNumOfItems] = useState(0);
  const visibleItemsRef = useRef<HTMLUListElement>(null);
  const breakWidths = useRef<number[]>([])

  useEffect(() => {
    const handleResize = () => {

      const width = visibleItemsRef.current?.getBoundingClientRect().width;
      const availableSpace = width
      console.log("available space " + availableSpace)
      console.log(breakWidths)

      let requiredSpace = 0;
      let visibleItems = 0;
      for (let i = 0; i < breakWidths.current.length; i++) {
        requiredSpace += breakWidths.current[i];
        console.log(requiredSpace,availableSpace)
        if (requiredSpace <= availableSpace!) {
          visibleItems = i + 1;
        } else {
          break;
        }
        requiredSpace+=44
      }
      
      console.log("visible items " + visibleItems)
      setNumOfItems(visibleItems);
    };

    const links = visibleItemsRef.current!.getElementsByTagName("li")
    let widths = []
    for(const link of links!){
      widths.push(link.offsetWidth)
    }
    console.log(widths)
      breakWidths.current = widths
    window.addEventListener('resize', handleResize);
    
    handleResize();

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
          {navItems.map((item,index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      </div>
      <div className={styles.more}>
          <button>
            MORE <img src="chevron-down.svg" alt="" />{" "}
          </button>
          {
            <ul className={styles.hiddenItems}>
              {numOfItems &&
                navItems.slice(numOfItems).map((item,index) => {
                  return <li key={index}>{item}</li>;
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
