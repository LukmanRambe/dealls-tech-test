import Select, { SingleValue } from 'react-select';

import { reactSelectStyles } from '../../libs/reactSelectStyles';
import { DataLimitEnum } from '../../ts/types/enum/DataLimit';
import { Option } from '../../ts/types/main/Option';

type DataLimitPropsType = {
  instanceId: string;
  placeholder: number;
  options: Option<DataLimitEnum>[];
  onChange: (option: unknown | SingleValue<Option<DataLimitEnum>>) => void;
};

const DataLimit: React.FC<DataLimitPropsType> = ({
  instanceId,
  placeholder,
  options,
  onChange,
}) => {
  return (
    <article className="flex items-center gap-5">
      <span>Rows per page</span>

      <Select
        instanceId={instanceId}
        options={options}
        isClearable={false}
        isSearchable={false}
        placeholder={placeholder}
        onChange={onChange}
        styles={reactSelectStyles}
        menuPosition="fixed"
      />
    </article>
  );
};

export default DataLimit;
