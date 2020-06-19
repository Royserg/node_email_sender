
const createMessage = (username, password) => (`
<div>
  <h2>${username}</h2>
  <h2>${password}</h2>
</div>
`)

module.exports = createMessage;