export const reservationForm = [
  {
    name: "price",
    label: "Vælg prisklasse",
    type: "radio",
    options: [
      { value: 0, label: "Normal" },
      { value: 1, label: "Flex" },
    ],
    validation: {
      required: "Svar er påkrævet",
    },
  },
];

export const reservationForm2 = [
  {
    name: "checkin",
    type: "date",
    label: "Check-in dato",
    validation: {
      required: "Check-in dato er påkrævet",
    },
  },
  {
    name: "checkout",
    label: "Check-out dato",
    type: "date",
    validation: {
      required: "Check-out dato er påkrævet",
    },
  },
];

export const reservationForm3 = [
  {
    name: "firstname",
    placeholder: "Fornavn",
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
    placeholder: "Efternavn(e)",
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
];

export const reservationForm4 = [
  {
    name: "email",
    placeholder: "Email",
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
    name: "phone",
    placeholder: "Telefon",
    validation: {
      required: "Telefonnummer er påkrævet",
      pattern: {
        value: /^[0-9]{8}$/,
        message: "Telefonnummer skal være 8 tal",
      },
    },
  },
];

export const reservationForm5 = [
  {
    name: "comment",
    placeholder: "Kommentarer",
    type: "textarea",
    validation: {
      maxLength: {
        value: 500,
        message: "Kommentaren må ikke være mere end 500 tegn",
      },
    },
  },
];
