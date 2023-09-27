import { formatPrice } from '../../utils/formatPrice';

type CurrencyInputPropsType = {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

const CurrencyInput: React.FC<CurrencyInputPropsType> = ({
  id,
  name,
  label,
  placeholder,
  onChange,
  value,
}) => {
  return (
    <article className="flex flex-col gap-2">
      <label htmlFor="min" className="text-sm font-medium -text--primary">
        {label}
      </label>

      <input
        id={id}
        name={name}
        type="text"
        placeholder={placeholder}
        min={0}
        inputMode="numeric"
        onChange={onChange}
        value={formatPrice(+value)}
        className="p-2 border rounded-md outline-none -border--primary-50 hover:-border--primary-90 active:-border--primary focus:-border--primary"
      />
    </article>
  );
};

export default CurrencyInput;
