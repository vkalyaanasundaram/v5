import React, { useState } from 'react';
import styles from 'scss/components/Header.module.scss';
import Link from 'next/link';
import { client, MenuLocationEnum } from 'client';
import Logo from '../components/icons/KapitusRLogoNotagWhite'
 import CTA from '../components/CTA'
 import { useTheme } from 'next-themes'
import { useEffect } from 'react';
import UtmParams from './UTM/UtmParams'; 
import Router, { useRouter } from 'next/router';
import { Example } from './MobileMenu/Example';
import Facebook from './icons/Facebook'
import Twitter from './icons/Twitter'

import Linkedin from './icons/Facebook'
import Youtube from './icons/Twitter'
import Instagram from './icons/Facebook'
 
import Head from 'next/head';
 
  
const ThemeChanger = () => {
  const { theme, setTheme } = useTheme()
 
  return (
    <div>
      {/* The current theme is: {theme} */}
      <button style={{ background: "none", border: "none"}} onClick={() => setTheme('light')}><svg width={20} height={20}  xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="white" viewBox="0 0 24 24" stroke="white" strokeWidth={2} >
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
</svg></button>


      <button style={{ background: "none", border: "none"}} onClick={() => setTheme('dark')}><svg  width={20} height={20} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="white" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
</svg></button>
    </div>
  )
}



interface Props {
  title?: string;
  description?: string;
}

function Header({
  title = 'Headless by WP Engine',
  description,
}: Props): JSX.Element {


  let { asPath } = useRouter();
const [transparent, setTransparent] = useState(false)

useEffect(()=>{
  setTransparent(()=>{
    if(asPath == '/success-stories')
      return true
  })
}, [asPath])

let params = UtmParams(asPath)

  const { menuItems } = client.useQuery()
  const links = menuItems({
    where: { location: MenuLocationEnum.PRIMARY },
  }).nodes;

  return (
    <>
     <div className={`${styles.topHeader} flex items-center`}>
          <ul className={styles.topList}>
            <li >
              <Link href="https://twitter.com/KapitusFinance">
              <a>
                <Twitter />
              </a>
              </Link>
            </li>
            <li>
              <Link href="https://www.linkedin.com/company/kapitus/">
              <a>
              <Linkedin />
              </a>
              </Link>
            </li>
            <li >
              <Link href="https://twitter.com/KapitusFinance">
              <a>
                <Facebook />
              </a>
              </Link>
            </li>
            <li >
              <Link href="https://www.instagram.com/kapitus_financing/">
                <a>
                  <Instagram />
                </a>
              </Link>
            </li>
            <li >
              <Link href="https://www.youtube.com/channel/UCvZ5ahnMH9jCnN0lP4rRROA"><a>
              <Youtube />
              </a>
              </Link>
            </li>
          </ul>
          <div className="phone-info ml-auto text-sm text-white">
            <span><a className="header-login text-sm text-white" href="https://portal.kapitus.com/">Login </a>| Call now: <a href="tel:+18007807133" className='text-sm text-white'> (800) 780-7133</a></span></div>
      </div>
      <header className={`${transparent ? styles.transparent : styles.bghead }`}>
        <div className={styles.wrap}>
          <div className={styles['title-wrap']}> 
              <div className={styles['site-title']}>
                <div className={styles.logoContainer}>  
                  <div className={styles.desktopLogo}>
                  <Link href={`/${params}`} passHref>
                    <a>
                      {/* {title} */}
                      <Logo params={params} width={200} height={50} viewBox="300 150 300 180" />
                    </a>
                  </Link>
                    {/* <Logo LogoImg={LogoImg} Params={Params} /> */}
                  </div>
                </div>
              </div>
            </div>
            {/* DESKTOP MENU ITEMS */}
            <div className={`${styles.menu}`}>
              <ul>
                {/* {links?.map((link) => (
                  <li key={`${link.label}$-menu`}>
                    <Link href={link.url ?? ''}>
                      <a href={`${link.url}${params}`}>{link.label}</a>
                    </Link>
                  </li>
                ))} */}
                <li>
                  <Link href={`/problems-we-solve${params}`} passHref>
                    <a>
                      Problems We Solve
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={`/products-we-offer${params}`} passHref>
                      <a>
                        Products We Offer
                      </a>
                  </Link>
                </li>
                <li>
                  <Link href={`/partner${params}`} passHref>
                      <a>
                        Partner
                      </a>
                  </Link>
                </li>          
                <li>
                  <Link href={`/blog${params}`} passHref>
                      <a>
                        Blog
                      </a>
                  </Link>
                </li>    
                <li>
                  <Link href={`/the-kapitus-difference${params}`} passHref>
                      <a className="button">
                        Difference
                      </a>
                  </Link>
                </li>                                    
                <li>
                  <span id="headeroll apply-now">
                    <Link href={`/fast-application${params}`} passHref>
                      <a className="button">
                        APPLY NOW
                      </a>
                    </Link>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          {/* MOBILE MENU ITEMS */}
      </header>
      <Example /> 
      </>
  );
}

export default Header;
