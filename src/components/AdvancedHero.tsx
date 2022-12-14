/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import styles from 'scss/components/Advancedhero.module.scss';
import Images from "next/image"
import PopUpGetStarted from "./PopUpGetStarted";
import PopUpPartner from "./PopUpPartner";
import CommonShortForm from './Forms/CommonShortForm'
import EquipShortForm from './Forms/EquipShortForm'
import InvoiceShortForm from './Forms/InvoiceShortForm'
 
interface Props { 
  title: string;
  indexTitle: string;
  id?: string;
  bgImage?: string;
  column?: string;
  slug?: string;
  children?: React.ReactNode;
  buttonText?: string;
  buttonURL?: string;
}

function Advancedhero({
  title,
  indexTitle,
  id,
  bgImage,
  column,
  slug,
  children,
  buttonText,
  buttonURL
}: Props): JSX.Element {

  const [popupgetstarted, setPopUpGetStarted] = useState(false)
  const [popuppartner, setPopUpPartner] = useState(false)

  const togglePop = (e) => {
    e.preventDefault();
    if(slug == 'partner'){
      setPopUpPartner((prevState) => !prevState)
    }
    else if(['problems-we-solve','home'].indexOf(slug) !== -1) {
      setPopUpGetStarted((prevState) => !prevState)
    }
  }

  useEffect(() => {
    
    //console.log(document.referrer.split('/')[2])
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
      // eslint-disable-next-line react/jsx-props-no-spreading
      
      {...(id && { id })}
      className={`${styles.bgImage} ${styles.hero} ${column==`one` ? styles.extendPadding : styles.padding }`}>
        {bgImage && <Images src={bgImage} layout="fill"  objectFit="cover" priority blurDataURL={bgImage} placeholder="blur" />
          }

        {column == 'one'? <div className={styles.wrap}>
          <div className="" 
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: title ?? '' }}
          />
        <h1>{indexTitle}</h1>
        <div className={styles.intro}>
          <div className={styles.children}>{children}</div>
          {buttonText && buttonURL && (
            <p>
              <a href={buttonURL} onClick={togglePop} className="button">
                {buttonText}
              </a>
            </p>
          )}
        </div>
      </div> : (<div className={styles.wrap}>
        <div className={styles.col}>
         <div
            className=""
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: title ?? '' }}
          />
        </div>
        <div className={styles.col}>      
        {( ['business-loans','helix-healthcare-financing', 'line-of-credit', 'purchase-order-financing', 'revenue-based-financing', 'sba-loans', 'products-we-offer', 'concierge-services'].indexOf(slug) !== -1) && (
          <CommonShortForm />
        )}
          {slug == 'equipment-financing' && <EquipShortForm />}
          {slug == 'invoice-factoring' && <InvoiceShortForm />}
        </div>
      </div>)}
      {popupgetstarted ? <PopUpGetStarted toggle={setPopUpGetStarted} /> : null}
      {popuppartner ? <PopUpPartner toggle={setPopUpPartner} /> : null}
    </section>
  );
}

export default Advancedhero;
