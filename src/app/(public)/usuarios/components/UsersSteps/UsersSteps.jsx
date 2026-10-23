'use client';

import './UsersSteps.scss';
import { useCountry } from '@/helpers/countryPreference';
import { usersStepsCopy } from './UsersSteps.copy';

export default function UsersSteps() {
  const copy = usersStepsCopy[useCountry()];
  return (
    <section
      className="users-steps"
      id="como-funciona"
      aria-labelledby="users-steps-title"
    >
      <div className="users-steps__inner">
        <div className="users-steps__heading">
          <span className="users-steps__eyebrow">{copy.eyebrow}</span>
          <h2 id="users-steps-title">{copy.title}</h2>
          <p>{copy.description}</p>
        </div>

        <ol className="users-steps__cards">
          {copy.steps.map(({ title, description, detail }, index) => (
            <li className="users-steps__card" key={title}>
              <span className="users-steps__number" aria-hidden="true">
                {index + 1}
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
              <span className="users-steps__detail">{detail}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
