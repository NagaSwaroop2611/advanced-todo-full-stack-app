import CustomDatepicker from "./CustomDatepicker";
import clsx from "clsx";

const InputField = ({
  name,
  label,
  type,
  inputImg,
  placeholder,
  className,
  value,
  onChange,
}) => {
  return (
    <div className={clsx("input-field-container", className)}>
      <p className="input-label">{label}</p>
      <div
        className={clsx(
          "input-wrapper",
          type === "textarea" && "textarea-wrapper"
        )}
      >
        <img src={inputImg} className="input-field-img" alt={`${label} icon`} />
        {type === "date" ? (
          <CustomDatepicker name={name} date={value} onDateChange={onChange} />
        ) : type === "textarea" ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="textarea-field-input"
            rows={3}
          />
        ) : (
          <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            className="input-field-input"
            placeholder={placeholder}
          />
        )}
      </div>
    </div>
  );
};

export default InputField;
