userUniqId = () => {
    var userUniqId = localStorage.getItem('userUniqId');
    if(!userUniqId) {
        userUniqId = Meteor.uuid();
        localStorage.setItem('userUniqId', userUniqId);
    }
    return userUniqId;
};
