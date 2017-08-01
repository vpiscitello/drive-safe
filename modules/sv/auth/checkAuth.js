module.exports = function checkAuth(request, response, next) {
    // Check for session variables
    if (request.user){
        console.log('== Auth success\n');
        return next();
    }

    console.log('== Auth Failed\n');

    //Redirect user to login page if not logged in
    response.status(401).redirect('/access');
}
