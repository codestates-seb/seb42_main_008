interface inputTypes {
  nickname?: string | undefined;
  content?: string | undefined;
  password?: string;
  passwordCheck?: string;
  memberNickname: string;
}

export const editValidationCheck = ({
  nickname,
  content,
  password,
  passwordCheck,
  memberNickname,
}: inputTypes) => {
  let nicknameValid = true;
  let contentValid = true;
  let passwordValid = true;
  let passwordCheckValid = true;

  // * nickname
  if (nickname) {
    if (nickname.length >= 2 && nickname.length <= 10) {
      nicknameValid = true;
    } else if (nickname === memberNickname) {
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
    } else if (password === '' || password === undefined) {
      passwordValid = true;
    } else {
      passwordValid = false;
    }
  }

  // * passwordCheck
  if (passwordCheck) {
    if (passwordCheck === password) {
      passwordCheckValid = true;
    } else if (passwordCheck === '' || passwordCheck === undefined) {
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
