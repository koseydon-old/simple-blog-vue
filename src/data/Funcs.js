//Funcs.js
import Messages from "./Messages";

//login popup switch case
export function errorCase(errorType) {
  switch (errorType) {
    case "ratelimit":
      return Messages.ratelimit;
    case "email":
      return Messages.email;
    case "stringMin":
      return Messages.stringMin;
    case "recaptcha":
      return Messages.recaptcha;
    case "exist":
      return Messages.exist;
    case "disposable":
      return Messages.disposable;
    case "somethingWrong":
      return Messages.somethingWrong;
  }
}

//signup popup switch case
export function successCase(statusType) {
  switch (statusType) {
    case "queued":
      return Messages.queued;
    case "emailed":
      return Messages.emailed;
  }
}

// blogViewAll component sort functyion switch case
export function sortBlogKeyword(prop) {
  switch (prop) {
    case 1:
      return "blogTitle";
    case 2:
      return "author";
    case 3:
      return "date";
  }
}

// todoViewAll component sort functyion switch case
export function sortTodoKeyword(prop) {
  switch (prop) {
    case 1:
      return "todoTitle";
    case 2:
      return "person";
    case 3:
      return "newDate";
    case 4:
      return "status";
  }
}
