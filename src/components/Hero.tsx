import React, { useState, useEffect } from 'react';
import styles from 'scss/components/Hero.module.scss';
import Images from "next/image"
import PopUpGetStarted from "./PopUpGetStarted";
import PopUpPartner from "./PopUpPartner";
import ContactForm from "./Forms/ContactForm";

interface Props { 
  // indexTitle: string;
  title: string;
  subtitle?: string;
  advtitle?: string;
  id?: string;
  bgImage?: string;
  alt?:string;
  type?:string;
  buttonText?: string;
  buttonURL?: string;
  button2Text?: string;
  button2URL?: string;
  children?: React.ReactNode;
  slug?: string;
//  phone: string;
  username?: string;
  password?: string;
}

function Hero({
  // indexTitle,
  title,
  subtitle,
  advtitle,
  alt,
  type,
// phone,
  id,
  bgImage,
  buttonText,
  buttonURL,
  button2Text,
  button2URL,
  children,
  slug,
  username,
  password
}: Props): JSX.Element {

  const [popuppartner, setPopUpPartner] = useState(false)
  const [popupgetstarted, setPopUpGetStarted] = useState(false)
  const [mediacenter, setMediaCenter] = useState(false)

  const togglePop = (e) => {
    e.preventDefault();
    if(slug == 'partner'){
      setPopUpPartner((prevState) => !prevState)
    }
    else if(['problems-we-solve', 'home'].indexOf(slug) !== -1) {
      setPopUpGetStarted((prevState) => !prevState)
    }
    else if(slug == 'media-center') {
      setMediaCenter((prevState) => !prevState)
    }
  }

  useEffect(() => {
    let partner = document.getElementsByClassName("partners")
    if(Object.keys(partner).length > 0)
      partner[0].addEventListener('click', function(e) {
        e.preventDefault();
        var class1 = this.getAttribute("class");
        if(class1.includes('partners')){
          setPopUpPartner((prevState) => !prevState)
        }
      });
  })

  return (
    <section
      {...(id && { id })}
      className={`${styles.bgImage} ${type=="cobrand" ? styles.cobrandhero : styles.hero}`}>
        {bgImage && <Images src={bgImage} layout="fill" objectFit="cover" alt={alt} priority blurDataURL={bgImage} placeholder="blur" />}
       <div className={styles.wrap}>
        <div className={type=="cobrand" ? styles.htag : ``} 
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: title ?? '' }}
          />
          {/* <h1>{indexTitle}</h1> */}
        <div className={styles.intro}>
          <div className={styles.children}>{children}</div>
          {buttonText && buttonURL && (
            <p>
              <a href={buttonURL} onClick={togglePop} className="button">
                {buttonText}
              </a>
            </p>
          )}
          {button2Text && button2URL && (
            <p>
              <a href={button2URL} className="button button-secondary">
                {button2Text}
              </a>
            </p>
          )}
        </div>
      </div>
      {popupgetstarted ? <PopUpGetStarted toggle={setPopUpGetStarted} username={username} password={password} /> : null}
      {popuppartner ? <PopUpPartner toggle={setPopUpPartner} username={username} password={password} /> : null}
      {mediacenter ? <ContactForm toggle={setMediaCenter} username={username} password={password} popup={true} state={''} connect={''} message={''} first_name={''} last_name={''} email_address={''} phone_number={0} industry={''} annual_revenue={''} about_us={''} describe={''} terms_condition={''} company={''} /> : null}
    </section>
    
  );
}

export default Hero;