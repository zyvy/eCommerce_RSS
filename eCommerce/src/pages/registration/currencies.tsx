const currencies = [
    {
      value: 'Italy',
      label: 'Italy',
      reg: '/^\d{5}$/',
      error: 'Must contain only 5 digits',
    },
    {
      value: 'Belgium',
      label: 'Belgium',
      reg: '/^(?:(?:[1-9])(?:\d{3}))$/',
      error: 'Must contain only 4 digits',
    },
    {
      value: 'Germany',
      label: 'Germany',
      reg: '/^\d{5}$/',
      error: 'Must contain only 5 digits',
    },
    {
      value: 'Spain',
      label: 'Spain',
      reg: '/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/',
      error: 'Must contain 5 digits',
    },
  ];
  export default currencies