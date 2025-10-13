export function validateRegistration(registrationUser) {
  let newErrors = {};

  switch (true) {
    case !registrationUser.login:
      newErrors.login = "login не заполнен";
      break;
    case registrationUser.login.length < 3:
      newErrors.login = "login должен быть минимум 3 символа";
      break;
    case !/^[^А-Яа-яЁё]*$/.test(registrationUser.login):
      newErrors.login = "login введён неверно";
      break;
  }

  switch (true) {
    case !registrationUser.email:
      newErrors.email = "email не заполнен";
      break;
    case registrationUser.email.length < 5:
      newErrors.email = "email слишком короткий";
      break;
    case !/\S+@\S+\.\S+/.test(registrationUser.email):
      newErrors.email = "email введён неверно";
      break;
  }

  switch (true) {
    case !registrationUser.password:
      newErrors.password = "password не заполнен";
      break;
    case registrationUser.password.length < 3:
      newErrors.password = "password должен быть минимум 3 символа";
      break;
  }

  switch (true) {
    case !registrationUser.repassword:
      newErrors.repassword = "repassword не заполнен";
      break;
    case registrationUser.repassword !== registrationUser.password:
      newErrors.repassword = "repassword не совпадает с паролем";
      break;
  }

  return newErrors;
}

export function validateAuth(authUser) {
  let newErrors = {};

  switch(true) {
    case !authUser.email:
      newErrors.LogEmail = "email не заполнен";
      break;
    case authUser.email.length < 5:
      newErrors.LogEmail = "email слишком короткий";
      break;
    case !/\S+@\S+\.\S+/.test(authUser.email):
      newErrors.LogEmail = "email введён неверно";
      break;
  }

  switch(true) {
    case !authUser.password:
      newErrors.logPassword = "password не заполнен";
      break;
    case authUser.password.length < 3:
      newErrors.logPassword = "password должен быть минимум 3 символа";
      break;
  }

  return newErrors;
}