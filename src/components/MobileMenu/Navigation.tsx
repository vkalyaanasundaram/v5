import * as React from "react";
import { motion, Variants } from "framer-motion";
import { client, MenuLocationEnum } from 'client';
import { MenuItem } from "./MenuItem";
import styles from 'scss/components/Header.module.scss';
import Link from "next/link";

const variants: Variants = {
  open: {
    transition: { staggerChildren: 2.22, delayChildren: 0.4 }
  },
  closed: {
    transition: { staggerChildren: 3.44, staggerDirection: -1 }
  }
};

interface Props { 
  i?: number;
  MenuLink?: Array<string>  | undefined;
  
}

export const Navigation = ({ toggle }) => {
  const { menuItems } = client.useQuery();
  // const links = menuItems({
  //   where: { location: MenuLocationEnum.PRIMARY },
  // }).nodes;

  
  const itemIds = [0, 1, 2, 3, 4];

  return (
    <motion.ul variants={variants} onClick={toggle}>

      <MenuItem i={``} MenuLink={``} />
      {/*itemIds.map(i => (
        <MenuItem i={i} key={i} MenuLink={links} />
      ))*/}
      
    </motion.ul>
  ) 
}

