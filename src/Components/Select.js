import { FixedSizeList as List } from "react-window";
import Select from "react-select";
import { useContext } from "react";
import { AppContext } from "../AppContext";

export const CustomSelect = (props) => {
  const { setYear, setType } = useContext(AppContext);
  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      value={props.value}
      isDisabled={props.disabled}
      isLoading={false}
      isClearable={true}
      isRtl={false}
      isSearchable={true}
      components={{ MenuList }}
      placeholder={props.title}
      options={props.list}
      maxMenuHeight={200}
      styles={colourStyles}
      getOptionLabel={(val) => val[props.keyName]}
      onChange={(val) => {
        if (props.title === "Make") {
          setType({});
          setYear({});
        }
        if (val) {
          props.handleChange(props.title === "Year" ? val : val);
        } else {
          props.handleChange("");
        }
      }}
    />
  );
};

const colourStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isFocused ? "#999999" : "#ffffff",
      color: isFocused ? "#ffffff" : "#333333",
    };
  },
};

const height = 35;

const MenuList = (props) => {
  const { options, children, maxHeight, getValue } = props;
  const [value] = getValue();
  const initialOffset = options.indexOf(value) * height;

  return (
    <List
      height={maxHeight}
      itemCount={children.length}
      itemSize={height}
      initialScrollOffset={initialOffset}
    >
      {({ index, style }) => <div style={style}>{children[index]}</div>}
    </List>
  );
};
