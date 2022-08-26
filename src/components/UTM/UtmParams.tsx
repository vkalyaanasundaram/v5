/* eslint-disable @next/next/no-img-element */

export default function UtmParams(url) {
  return url &&  url.includes(`?`) ? `?`+ url.split(`?`)[1] : ``
}