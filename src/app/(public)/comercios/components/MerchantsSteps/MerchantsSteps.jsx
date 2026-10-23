'use client';

import './MerchantsSteps.scss';
import { useCountry } from '@/helpers/countryPreference';
import { merchantsStepsCopy } from './MerchantsSteps.copy';

export default function MerchantsSteps() {
  const copy = merchantsStepsCopy[useCountry()];
  return (
    <section className="merchants-steps" id="como-funciona" aria-labelledby="merchants-steps-title">
      <div className="merchants-steps__inner">
        <div className="merchants-steps__heading">
          <span className="merchants-steps__eyebrow">{copy.eyebrow}</span>
          <h2 id="merchants-steps-title">{copy.title}</h2>
          <p>{copy.description}</p>
        </div>
        <ol className="merchants-steps__grid">
          {copy.steps.map(({ title, description }, index) => (
            <li className="merchants-steps__card" key={title}>
              <span className="merchants-steps__number" aria-hidden="true">{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
