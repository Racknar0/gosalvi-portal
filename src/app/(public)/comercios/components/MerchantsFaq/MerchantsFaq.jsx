'use client';

import { Icon } from '@iconify/react/offline';
import chevronDownIcon from '@iconify-icons/lucide/chevron-down';
import './MerchantsFaq.scss';
import { useCountry } from '@/helpers/countryPreference';
import { merchantsFaqCopy } from './MerchantsFaq.copy';

export default function MerchantsFaq() {
  const copy = merchantsFaqCopy[useCountry()];
  return (
    <section
      className="merchants-faq"
      id="faq"
      aria-labelledby="merchants-faq-title"
    >
      <div className="merchants-faq__inner">
        <div className="merchants-faq__heading">
          <span>{copy.eyebrow}</span>
          <h2 id="merchants-faq-title">{copy.title}</h2>
        </div>
        {copy.questions.map(([question, answer], index) => (
          <details
            className="merchants-faq__item"
            name="merchants-faq"
            key={question}
          >
            <summary>
              {question}
              <Icon icon={chevronDownIcon} aria-hidden="true" />
            </summary>
            <p>
              {index === 7 && copy.contactHref ? (
                <>
                  {copy.contactPrefix}
                  <a
                    href={copy.contactHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {copy.contactText}
                  </a>
                  {copy.contactSuffix}
                </>
              ) : (
                answer
              )}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
