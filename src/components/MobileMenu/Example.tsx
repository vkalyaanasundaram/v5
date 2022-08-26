import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "./use-dimensions";
import styles from 'scss/components/Header.module.scss';
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";
import Logo from "../icons/KapitusRLogoNotagWhite";
import LogoMobile from "../icons/KapitusRBugWhite";
import Link from "next/link";
import UtmParams from "../UTM/UtmParams"
import { useRouter } from "next/router";

//CIRCLE ANIM AND OPEN SPEED
const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      delay: .3,
      type: "spring",
      stiffness: 10,
      damping:  10,
      restDelta: 0
    }
  }),
  closed: {
    clipPath: "circle(30px at 465px 40px)",
    transition: {
      delay: .2,
      type: "spring",
      stiffness: 500,
      damping:  40
    }
  }
};

export const Example = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const LogoImg = "/images/_Kapitus_Logo_white.webp";

  let { asPath } = useRouter();
  let params = UtmParams(asPath)

  return (
    <motion.div
    initial={false}
    animate={isOpen ? "open" : "closed"}
    custom={height}
    ref={containerRef}
    className={`mobile_nav ${isOpen?`expand`:`collapse`}`}
    >
      <div className={styles.logoContainer}>
        <motion.div className="background" variants={sidebar} />
        <Link href={`/${params}`} passHref>
          <a>
            <LogoMobile 
              params={params} 
              width={60} 
              height={90} 
              viewBox="0 -100 140 480"
            />
          </a>
        </Link>
        <div className={styles.mobileBtn}>
          <Link href="/fast-application" passHref>
            <a>APPLY NOW</a>
          </Link>
        </div>
      </div>
      <MenuToggle toggle={() => toggleOpen()} />
      <Navigation toggle={() => toggleOpen()} />
    </motion.div>    
  );
};
