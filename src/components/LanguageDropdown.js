import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { AiOutlineGlobal } from 'react-icons/ai';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

export default function LanguageDropdown() {
  const { t } = useTranslation();
  const languages = [
    {
      code: 'en',
      name: 'English',
      country_code: 'us',
    },
    {
      code: 'es',
      name: 'Español',
      country_code: 'ar',
    },
    {
      code: 'pt',
      name: 'Português',
      country_code: 'br',
    },
    {
      code: 'ru',
      name: 'Русский',
      country_code: 'ru',
    },
  ];

  return (
    <Dropdown>
      <Dropdown.Toggle
        style={{ backgroundColor: '#020122', border: 'none' }}
        id="dropdown-basic"
        size="lg"
      >
        <AiOutlineGlobal
          style={{
            fontSize: '1.8rem',
            marginRight: '0.250rem',
          }}
        ></AiOutlineGlobal>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.ItemText>{t('language')}</Dropdown.ItemText>
        {languages.map(({ code, name, country_code }) => (
          <Dropdown.Item
            disabled={code === i18next.language}
            key={country_code}
            onClick={() => i18next.changeLanguage(code)}
            style={{ fontSize: '1.425rem' }}
          >
            <span
              className={`flag-icon flag-icon-${country_code} mx-2`}
              style={{ opacity: code === i18next.language ? '0.5' : '1' }}
            ></span>
            {name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
