export const signupForm = [
    {
        name: "firstname",
        label: "Fornavn",
        validation: {
          required: "Fornavn er påkrævet",
          minLength: { value: 2, message: "Fornavn skal være mindst 2 bogstaver" },
          maxLength: {
            value: 15,
            message: "Fornavn må ikke være mere end 15 tegn",
          },
          pattern: {
            value: /^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)*$/,
            message: "Fornavn må ikke indeholde bogstaver",
          },
        },
      },
      {
        name: "lastname",
        label: "Efternavn",
        validation: {
          required: "Efternavn er påkrævet",
          minLength: {
            value: 2,
            message: "Efternavn skal være mindst 2 bogstaver",
          },
          maxLength: {
            value: 20,
            message: "Efternavn må ikke være mere end 20 tegn",
          },
          pattern: {
            value: /^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)*$/,
            message: "Efternavn må ikke indeholde bogstaver",
          },
        },
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        validation: {
          required: "Email er påkrævet",
          pattern: {
            value: /^[a-zAZ0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Email skal være en rigtig email",
          },
        },
      },
      {
        name: "password",
        label: "Password",
        type: "password",
        validation: {
          required: "Password er påkrævet",
          minLength: { value: 8, message: "Password skal være minimum 8 tegn" },
        },
      },
    
      //Custom function der kommer fra React-Hook-form, som sammenligner value af feltet med value af et andet felt, i dette tilfælde password feltet. Context er her alle values for alle felter, og vi specificerer at det er password feltet vi vil sammenligne med
      {
        name: "repeatPassword",
        label: "Gentag Password",
        placeholder: "Gentag password",
        type: "password",
        validation: {
          required: "Gentag venligst password",
          validate: (value, context) => {
            if (value !== context.password) {
              return "Passwords skal være ens";
            }
            return true;
          },
        },
      },
]