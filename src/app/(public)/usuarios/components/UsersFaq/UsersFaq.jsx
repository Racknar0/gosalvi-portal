'use client';

import { Icon } from '@iconify/react/offline';
import chevronDownIcon from '@iconify-icons/lucide/chevron-down';
import './UsersFaq.scss';
import { useCountry } from '@/helpers/countryPreference';
import { usersFaqCopy } from './UsersFaq.copy';

export default function UsersFaq() {
  const copy = usersFaqCopy[useCountry()];
  return (
    <section className="users-faq" id="faq" aria-labelledby="users-faq-title">
      <div className="users-faq__inner">
        <div className="users-faq__heading">
          <span>{copy.eyebrow}</span>
          <h2 id="users-faq-title">{copy.title}</h2>
        </div>
        {copy.questions.map(({ question, answer }) => (
          <details className="users-faq__item" name="users-faq" key={question}>
            <summary>
              {question}
              <Icon icon={chevronDownIcon} aria-hidden="true" />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
