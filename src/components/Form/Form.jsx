import { useForm } from "react-hook-form";
import { InputField } from "../InputField/InputField";
import style from "./Form.module.scss";

export const Form = ({ formArray, callback, buttonText }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  function submit(data) {
    callback(data);
  }

  return (
    <form className={style.formStyling} onSubmit={handleSubmit(submit)}>
      {formArray.map((item) => (
        <InputField
          key={item.name}
          name={item.name}
          label={item.label}
          type={item.type}
          placeholder={item.placeholder}
          register={register}
          validation={item.validation}
          error={errors[item.name]}
          options={item.options}
        />
      ))}
      <input type="submit" value={buttonText} />
    </form>
  );
};
