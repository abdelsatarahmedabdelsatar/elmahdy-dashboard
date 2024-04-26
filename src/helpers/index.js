const arabicRegex = /^[\u0600-\u06FF\s]+[0-9]*$/;
const englishRegex = /^[a-zA-Z\s]+[0-9]*$/;

const handleInputNameChange = (event, lng) => {
  if (lng == "ar") {
    if (!arabicRegex.test(event.target.value)) {
      event.target.value = "";
      return "";
    } else {
      return event.target.value;
    }
  } else {
    if (!englishRegex.test(event.target.value)) {
      event.target.value = "";
      return "";
    } else {
      return event.target.value;
    }
  }
};

export default handleInputNameChange;
