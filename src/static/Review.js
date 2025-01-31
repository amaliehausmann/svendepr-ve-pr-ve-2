export const reviewForm = [
    {
        name: "title",
        placeholder: 'Titel',
        validation: {
          required: "Titel er påkrævet",
          minLength: {
            value: 3,
            message: "Titel skal være mindst 3 tegn",
          },
          maxLength: {
            value: 100,
            message: "Titel må ikke være mere end 100 tegn",
          },
        },
      },
    {
        name: "comment",
        placeholder: 'Kommentarer',
        type: "textarea",
        validation: {
          required: "Kommentar er påkrævet",
          maxLength: {
            value: 500,
            message: "Kommentaren må ikke være mere end 500 tegn",
          },
        },
      },
      {
        name: "stars",
        label: "Antal stjerner",
        type: "radio",
        options: [
          { value: 1, label: "1" },
          { value: 2, label: "2" },
          { value: 3, label: "3" },
          { value: 4, label: "4" },
          { value: 5, label: "5" },
        ],
        validation: {
          required: "Svar er påkrævet",
        },
      },
]