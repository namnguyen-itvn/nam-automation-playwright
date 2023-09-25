const LoginSauceDemoAccount={

}

const StandardAccountTest={
    admin_account: {
        username: 'standard_user',
        password: 'secret_sauce',
        firstname: 'harry',
        lastname: 'tester',
        passcode: 'zipcode'
    }
}

export const loginTestData = () => {
    if (process.env.test_env === 'testdemo') {
        return StandardAccountTest;
    } else {
        return StandardAccountTest;
    }
}