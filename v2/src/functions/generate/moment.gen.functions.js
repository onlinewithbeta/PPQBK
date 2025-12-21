const timeFunc = {
 // 1. Get current day and time
 now: function () {
  return new Date();
 },

 // 2. Get date X minutes from now
 future: function (away) {
  return new Date(Date.now() + away * 60 * 1000);
 },

 // 3. Get difference in minutes between two dates
 diff: function (expires, now) {
  console.log(now, "-", expires);
  console.log("currentTime", "-", "Expiretime");
  const diffInMs = now - expires;
  return Math.floor(diffInMs / (1000 * 60));
  //if greater than zero then has expired
 }
};

export default timeFunc;
