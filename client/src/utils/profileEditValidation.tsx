interface inputTypes {
  nickname?: string | undefined;
  content?: string | undefined;
  password?: string;
  passwordCheck?: string;
}

export const editValidationCheck = ({
  nickname,
  content,
  password,
  passwordCheck,
}: inputTypes) => {
  let nicknameValid, contentValid, passwordValid, passwordCheckValid;

  // * nickname
  if (nickname) {
    if (nickname.length >= 2 && nickname.length < 10) {
      nicknameValid = true;
    } else {
      nicknameValid = false;
    }
  }

  // * content
  if (content) {
    if (content.length <= 100) {
      contentValid = true;
    } else {
      contentValid = false;
    }
  }

  // * password 유효성
  if (password) {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    if (passwordRegex.test(password)) {
      passwordValid = true;
    } else {
      passwordValid = false;
    }
  }

  // * passwordCheck
  if (passwordCheck) {
    if (passwordCheck === password) {
      passwordCheckValid = true;
    } else {
      passwordCheckValid = false;
    }
  }

  const totalValid =
    nicknameValid && contentValid && passwordValid && passwordCheckValid;

  return {
    nicknameValid,
    contentValid,
    passwordValid,
    passwordCheckValid,
    totalValid,
  };
};
