const fetch = require("node-fetch");
const cheerio = require("cheerio");

function generate(n) {
  var add = 1,
    max = 12 - add; // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.
  if (n > max) {
    return generate(max) + generate(n - max);
  }
  max = Math.pow(10, n + add);
  var min = max / 10; // Math.pow(10, n) basically
  var number = Math.floor(Math.random() * (max - min + 1)) + min;
  return ("" + number).substring(add);
}

async function getName() {
  const signature = await generate(5);

  const data = await fetch(
    `https://www.random-name-generator.com/indonesia?gender=male&n=1&s=${signature}`,
    {
      method: "GET",
    }
  );
  const response = await data.text();
  const $ = cheerio.load(response);
  const result = $("dd.h4.col-12").text();
  const firstName = result.split(" ")[0];
  const lastName = result.split(" ")[1];

  const user = {
    firstName,
    lastName,
  };
  return user;
}

module.exports = {
  getName,
  generate,
};
