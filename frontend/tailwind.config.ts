import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary':                   'var(--primary)',
        'on-primary':                'var(--on-primary)',
        'primary-container':         'var(--primary-container)',
        'on-primary-container':      'var(--on-primary-container)',
        'primary-fixed':             'var(--primary-fixed)',
        'primary-fixed-dim':         'var(--primary-fixed-dim)',
        'inverse-primary':           'var(--inverse-primary)',

        'secondary':                 'var(--secondary)',
        'on-secondary':              'var(--on-secondary)',
        'secondary-container':       'var(--secondary-container)',
        'on-secondary-container':    'var(--on-secondary-container)',

        'tertiary':                  'var(--tertiary)',
        'on-tertiary':               'var(--on-tertiary)',
        'tertiary-container':        'var(--tertiary-container)',
        'on-tertiary-container':     'var(--on-tertiary-container)',

        'error':                     'var(--error)',
        'on-error':                  'var(--on-error)',
        'error-container':           'var(--error-container)',
        'on-error-container':        'var(--on-error-container)',

        'background':                'var(--background)',
        'on-background':             'var(--on-background)',
        'surface':                   'var(--surface)',
        'on-surface':                'var(--on-surface)',
        'surface-variant':           'var(--surface-variant)',
        'on-surface-variant':        'var(--on-surface-variant)',

        'surface-container-lowest':  'var(--surface-container-lowest)',
        'surface-container-low':     'var(--surface-container-low)',
        'surface-container':         'var(--surface-container)',
        'surface-container-high':    'var(--surface-container-high)',
        'surface-container-highest': 'var(--surface-container-highest)',

        'outline':                   'var(--outline)',
        'outline-variant':           'var(--outline-variant)',
        'inverse-surface':           'var(--inverse-surface)',
        'inverse-on-surface':        'var(--inverse-on-surface)',
      },
      spacing: {
        'gutter': '1.5rem',
        'md': '2rem',
      },
      borderRadius: {
        'xl':  '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
