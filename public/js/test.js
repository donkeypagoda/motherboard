function testRoutes() {

    const test = {
      contentType: 'application/json',
      type: 'GET',
      url: '/users'
    };
    $.ajax(test)
      .then((stuff) => {
        console.log(stuff);
      })
      .catch(($xhr) => {
        console.log($xhr);
      });

}
testRoutes();
