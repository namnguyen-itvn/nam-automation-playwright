const LoginSauceDemoAccount={

}

const StandardAccountTest={
    admin_account: {
        username: 'standard_user',
        password: 'secret_sauce'
    }
}

export const loginTestData = () => {
    if (process.env.test_env === 'testdemo') {
        return StandardAccountTest;
    } else {
        return StandardAccountTest;
    }
}