const LoginSauceDemoAccount={

}

const StandardAccountTest={
    admin_account: {
        email: 'standard_user',
        password: 'secret_sauce'
    }
}

const LockedAccountTest={
    admin_account: {
        email: 'locked_out_user',
        password: 'secret_sauce'
    }
}

const ProblemAccountTest={
    admin_account: {
        email: 'problem_user',
        password: 'secret_sauce'
    }
}

const PerformanceGlitchAccountTest={
    admin_account: {
        email: 'performance_glitch_user',
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