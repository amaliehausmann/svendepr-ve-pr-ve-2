export const NewsletterForm = [
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
];
