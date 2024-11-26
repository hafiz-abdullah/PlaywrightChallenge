export let firstTest = {
    firstTestButton: "//*[@href='/challenge1.html']",
    email: "#email",
    password: "#password",
    submitButton:"#submitButton",
    successMessage:"#successMessage",
  };

  export let secondTest = {
    secondTestButton: "//*[@href='/challenge2.html']",
    submitButton:"#submitButton",
    successMessage:"#successMessage",
    menuButton: "//button[text()='My Account' and @data-initialized='true']",
    logoutOption:'#logoutOption',
  };

  export let thirdTest = {
    thirdTestButton: "//*[@href='/challenge3.html']",
    resetPasswordButton: "//button[text()='Reset Password']",
    forgotPasswordButton: "//button[text()='Forgot Password?']",
    successMessage:"//div[@class='success-message']",
  }

  export let fourthdTest = {
    fourthTestButton: "//*[@href='/challenge4.html']",
    profileButton: "#profileButton",
    logout: "//*[text()='Logout']",
    logo:"//div[@class='logo']",

  }