module.exports = {
    pickRandom: function(myData) {
      let i;
      i = Math.floor(Math.random() * myData.length);
      return (myData[i]);
    }
};
