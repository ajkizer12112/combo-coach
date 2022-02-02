import React, { useContext } from 'react';
import { AccountContext } from '../../context/AccountContext';

const UserInfo = () => {
    const { account, userStats } = useContext(AccountContext)
    return (
        <div>
            <p>{account.currentUser.username}</p>
            <p>Lifetime Rounds Completed: {userStats.roundsCompleted}</p>
        </div>
    )
};

export default UserInfo;
