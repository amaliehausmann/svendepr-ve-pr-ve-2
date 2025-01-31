import style from "./InputField.module.scss";

export const InputField = ({
  name,
  label,
  type = "text",
  placeholder,
  register,
  validation,
  error,
  options = [],
}) => {
  const defaultPlaceholder = placeholder || `Indtast ${label}`;


  if (type !== "radio" && type !== "select" && type !== "textarea") {
    return (
      <span
        className={style.InputStyling}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          placeholder={defaultPlaceholder}
          type={type}
          {...register(name, validation)}
          style={{
            border: error ? "1px solid orange" : "1px solid #ccc",
          }}
        />
        {error && <h6 style={{ color: "orange" }}>{error.message}</h6>}
      </span>
    );
  }

  if (type === "textarea") {
    return (
      <span
        className={style.InputStyling}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label htmlFor={name}>{label}</label>
        <textarea
          id={name}
          placeholder={defaultPlaceholder}
          {...register(name, validation)}
          style={{
            border: error ? "1px solid orange" : "1px solid #ccc",
            minHeight: "100px", 
          }}
        />
        {error && <h6 style={{ color: "orange" }}>{error.message}</h6>}
      </span>
    );
  }

  if (type === "radio") {
    return (
      <div
        className={style.InputStyling}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label>{label}</label>
        {options.map((option) => (
          <div
            key={option.value}
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              id={option.value}
              type="radio"
              name={name}
              value={option.value}
              {...register(name, validation)}
            />
            <label htmlFor={option.value} style={{ marginLeft: "0.5vw" }}>
              {option.label}
            </label>
          </div>
        ))}
        {error && <h6 style={{ color: "orange" }}>{error.message}</h6>}
      </div>
    );
  }

  if (type === "select") {
    return (
      <div
        className={style.InputStyling}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label htmlFor={name}>{label}</label>
        <select
          id={name}
          {...register(name, validation)}
          style={{
            border: error ? "1px solid orange" : "1px solid #ccc",
          }}
        >
          <option value="">Vælg {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <h6 style={{ color: "orange" }}>{error.message}</h6>}
      </div>
    );
  }
};
