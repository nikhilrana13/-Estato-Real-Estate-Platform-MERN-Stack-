export const UserMapper = (user)=>({
    username:user.username,
    email:user.email,
    mylistings:user.mylistings,
    mywishlists:user.mywishlists,
    plan:user.userplan,
    phoneNumber:user.phoneNumber,
    phonesuffix:user.phonesuffix,
    createat:user.created_at,
    profilepic:user.profilepic
})