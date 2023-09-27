import { StylesConfig } from 'react-select';

export const reactSelectStyles: StylesConfig = {
  control: (base, state) => ({
    ...base,
    borderRadius: '0.375rem',
    padding: '2px 5px',
    width: '100%',
    border: `1px solid rgba(105, 19, 216, 0.5)`,
    transition: 'all ease-in-out .08s',
    boxShadow: state.isFocused
      ? '0 0 0 .4px rgb(105, 19, 216, 0.9)'
      : '0 0 0 .4px transparent',
    '&:hover': {
      cursor: 'pointer',
      borderColor: 'rgb(105, 19, 216, 0.9)',
      outline: 'rgb(105, 19, 216, 0.9)',
    },
    '&:active': {
      border: '1px solid rgb(105, 19, 216, 0.1)',
      outline: 'rgb(105, 19, 216, 0.1)',
    },
    '&:focus': {
      border: '1px solid transparent',
      outline: 'rgb(105, 19, 216, 0.1)',
    },
    '@media only screen and (max-width: 767px)': {
      width: '100%',
    },
  }),
  option: (base, state) => ({
    ...base,
    fontSize: '14px',
    textTransform: 'capitalize',
    color: state.isSelected ? 'white' : 'black',
    // eslint-disable-next-line no-nested-ternary
    backgroundColor: state.isSelected
      ? 'rgba(105, 19, 216, 0.9)'
      : state.isFocused
      ? 'rgba(105, 19, 216, 0.1)'
      : 'white',
    transition: 'all ease-in-out .08s',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: state.isSelected
        ? 'rgba(105, 19, 216, 0.9)'
        : 'rgba(105, 19, 216, 0.1)',
    },
    '&:active': {
      color: 'white',
      backgroundColor: 'rgba(105, 19, 216, 0.7)',
    },
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused
      ? 'rgb(105, 19, 216, 0.1)'
      : 'rgba(105, 19, 216, 0.9)',
    '&:hover': {
      color: 'rgba(105, 19, 216, 0.5)',
    },
    '&active': {
      color: 'rgb(105, 19, 216, 0.1)',
    },
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: 'white',
    textTransform: 'capitalize',
    backgroundColor: 'rgba(105, 19, 216, 0.9)',
    borderRadius: '.275rem',
  }),
  multiValue: (base) => ({
    ...base,
    color: 'white',
    backgroundColor: 'rgba(105, 19, 216, 0.9)',
    borderRadius: '.275rem',
  }),
  clearIndicator: (base) => ({
    ...base,
    color: 'rgba(105, 19, 216, .5)',
    ':hover': {
      color: 'rgba(105, 19, 216, .9)',
    },
  }),
  valueContainer: (base) => ({
    ...base,
    flexWrap: 'nowrap',
  }),
};
