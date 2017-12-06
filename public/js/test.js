function testRoutes() {

    const test = {
      contentType: 'application/json',
      type: 'GET',
      url: '/token'
    };
    $.ajax(test)
      .then((stuff) => {
        console.log("token route" + stuff);
      })
      .catch(($xhr) => {
        console.log($xhr);
      });

}
testRoutes();
