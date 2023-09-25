module.exports = {
  formatDate: function(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
};











// module.exports = {
//   formatDate: function(date) {
//     const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
//     return new Date(date).toLocaleDateString('en-US', options);
//   }
// };