const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
const fs = require("fs");
const randomName = require("./random-name");
const chromePaths = require("chrome-paths");
const moment = require("moment");
const chalk = require("chalk");
const readlineSync = require("readline-sync");
const fetch = require("node-fetch");
const delay = require("delay");

(async () => {
  while (true) {
    try {
      const indoName = await randomName.getName();
      const generate = await randomName.generate(4);
      const username = indoName.firstName.toLowerCase() + generate;
      const name = indoName.firstName + " " + indoName.lastName;
      const nomer = readlineSync.question(
        `[ ${moment().format("HH:mm:ss")} ] Masukan no hp, format 8xxxx : `
      );
      const target = readlineSync.question(
        `[ ${moment().format("HH:mm:ss")} ] target follow : `
      );
      const password = readlineSync.question(
        `[ ${moment().format("HH:mm:ss")} ] password : `
      );
      const bioFile = await fs.readFileSync("./bio.txt", "utf-8");
      const bioArray = bioFile.toString().split("\n");
      const bioFinal = bioArray[Math.floor(Math.random() * bioArray.length)];

      const args = [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-infobars",
        "--ignore-certifcate-errors",
        "--ignore-certifcate-errors-spki-list",
        "--disable-accelerated-2d-canvas",
        "--no-zygote",
        "--no-first-run",
        "--disable-dev-shm-usage",
        // '--window-size=1920x1080'
      ];

      const browser = await puppeteer.launch({
        // userDataDir: './tmp_'+usernameTwitter,
        headless: false,
        ignoreHTTPSErrors: true,
        executablePath: chromePaths.chrome,
        defaultViewport: {
          width: 375,
          height: 667,
          isMobile: true,
        },
        slowMo: 0,
        devtools: false,
        args,
      });

      const context = browser.defaultBrowserContext();
      context.overridePermissions("https://twitter.com/", ["clipboard-read"]);

      const pages = await browser.pages();
      const page = pages[0];
      await page.setDefaultNavigationTimeout(0);
      await page.goto("https://twitter.com/", {
        waitUntil: "domcontentloaded",
      });
      //click singup with email
      await page.waitForSelector(
        "#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div.css-1dbjc4n.r-tv6buo > div.css-1dbjc4n.r-1777fci.r-1qmwkkh.r-1oqcu8e > div > div.css-1dbjc4n > a > div > span > span"
      );
      await page.evaluate(() => {
        document
          .querySelector(
            "#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div.css-1dbjc4n.r-tv6buo > div.css-1dbjc4n.r-1777fci.r-1qmwkkh.r-1oqcu8e > div > div.css-1dbjc4n > a > div > span > span"
          )
          .click();
      });

      await delay(3000);
      //type full name
      await page.keyboard.type(name);

      console.log(
        chalk.green(
          `[ ${moment().format(
            "HH:mm:ss"
          )} ] Register with username ${username}`
        )
      );

      console.log(
        chalk.yellow(
          `[ ${moment().format("HH:mm:ss")} ] masukan no otp : ${nomer}`
        )
      );
      await page.keyboard.press("Tab");
      await page.keyboard.type(nomer);

      //change birthday
      await page.waitForSelector("#SELECTOR_1");
      let optionValueSELECTOR_1 = await page.$$eval(
        "option",
        (options) => options.find((o) => o.innerText === "April")?.value
      );
      await page.select("#SELECTOR_1", optionValueSELECTOR_1);

      await page.waitForSelector("#SELECTOR_2");
      let optionValueSELECTOR_2 = await page.$$eval(
        "option",
        (options) => options.find((o) => o.innerText === "6")?.value
      );
      await page.select("#SELECTOR_2", optionValueSELECTOR_2);

      await page.waitForSelector("#SELECTOR_3");
      let optionValueSELECTOR_3 = await page.$$eval(
        "option",
        (options) => options.find((o) => o.innerText === "2000")?.value
      );
      await page.select("#SELECTOR_3", optionValueSELECTOR_3);

      await delay(2000);

      //click button next create account
      await page.waitForSelector(
        "#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-6koalj.r-16y2uox > div.css-1dbjc4n.r-16y2uox.r-1jgb5lz.r-13qz1uu > div.css-1dbjc4n.r-kemksi.r-1p0dtai.r-1d2f490.r-1xcajam.r-zchlnj > div > div > div > div > div"
      );
      await page.evaluate(() => {
        document
          .querySelector(
            "#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-6koalj.r-16y2uox > div.css-1dbjc4n.r-16y2uox.r-1jgb5lz.r-13qz1uu > div.css-1dbjc4n.r-kemksi.r-1p0dtai.r-1d2f490.r-1xcajam.r-zchlnj > div > div > div > div > div"
          )
          .click();
      });

      await delay(2000);

      //click button next Customize your experience
      await page.waitForSelector(
        "#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-6koalj.r-16y2uox > div.css-1dbjc4n.r-16y2uox.r-1jgb5lz.r-13qz1uu > div.css-1dbjc4n.r-kemksi.r-1p0dtai.r-1d2f490.r-1xcajam.r-zchlnj > div > div > div > div"
      );
      await page.evaluate(() => {
        document
          .querySelector(
            "#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-6koalj.r-16y2uox > div.css-1dbjc4n.r-16y2uox.r-1jgb5lz.r-13qz1uu > div.css-1dbjc4n.r-kemksi.r-1p0dtai.r-1d2f490.r-1xcajam.r-zchlnj > div > div > div > div"
          )
          .click();
      });

      await delay(2000);

      //button sing up
      await page.waitForSelector(
        "#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-6koalj.r-16y2uox > div.css-1dbjc4n.r-16y2uox.r-1jgb5lz.r-13qz1uu > div.css-1dbjc4n.r-kemksi.r-1p0dtai.r-1d2f490.r-1xcajam.r-zchlnj > div > div > div.css-1dbjc4n.r-1dr4o1q > div"
      );
      await page.evaluate(() => {
        document
          .querySelector(
            "#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-6koalj.r-16y2uox > div.css-1dbjc4n.r-16y2uox.r-1jgb5lz.r-13qz1uu > div.css-1dbjc4n.r-kemksi.r-1p0dtai.r-1d2f490.r-1xcajam.r-zchlnj > div > div > div.css-1dbjc4n.r-1dr4o1q > div"
          )
          .click();
      });

      await delay(2000);

      //button verify phone
      await page.waitForSelector(
        "#layers > div:nth-child(2) > div > div > div > div > div > div.css-1dbjc4n.r-1awozwy.r-1kihuf0.r-18u37iz.r-1pi2tsx.r-1777fci.r-1pjcn9w.r-sqn304.r-1xcajam.r-ipm5af.r-9dcw1g > div.css-1dbjc4n.r-z6ln5t.r-kemksi.r-1867qdf.r-1jgb5lz.r-pm9dpa.r-1rnoaur.r-13d04cj.r-13qz1uu > div.css-1dbjc4n.r-eqz5dr.r-1fraz6h.r-aqklyj.r-81iisv.r-13qz1uu > div:nth-child(1)"
      );
      await page.evaluate(() => {
        document
          .querySelector(
            "#layers > div:nth-child(2) > div > div > div > div > div > div.css-1dbjc4n.r-1awozwy.r-1kihuf0.r-18u37iz.r-1pi2tsx.r-1777fci.r-1pjcn9w.r-sqn304.r-1xcajam.r-ipm5af.r-9dcw1g > div.css-1dbjc4n.r-z6ln5t.r-kemksi.r-1867qdf.r-1jgb5lz.r-pm9dpa.r-1rnoaur.r-13d04cj.r-13qz1uu > div.css-1dbjc4n.r-eqz5dr.r-1fraz6h.r-aqklyj.r-81iisv.r-13qz1uu > div:nth-child(1)"
          )
          .click();
      });

      await delay(2000);

      const codeOtp = await readlineSync.question(
        `[ ${moment().format("HH:mm:ss")} ] Masukan kode otp : `
      );

      //memasukan code otp
      await page.keyboard.type(codeOtp);

      //button click otp
      await page.waitForSelector(
        "#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-6koalj.r-16y2uox > div.css-1dbjc4n.r-16y2uox.r-1jgb5lz.r-13qz1uu > div.css-1dbjc4n.r-kemksi.r-1p0dtai.r-1d2f490.r-1xcajam.r-zchlnj > div > div > div > div"
      );

      await page.evaluate(() => {
        document
          .querySelector(
            "#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-6koalj.r-16y2uox > div.css-1dbjc4n.r-16y2uox.r-1jgb5lz.r-13qz1uu > div.css-1dbjc4n.r-kemksi.r-1p0dtai.r-1d2f490.r-1xcajam.r-zchlnj > div > div > div > div"
          )
          .click();
      });

      await delay(2000);

      //type password
      await page.keyboard.type(password);

      await delay(2000);

      // click next
      await page.waitForSelector(
        "#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-6koalj.r-16y2uox > div.css-1dbjc4n.r-16y2uox.r-1jgb5lz.r-13qz1uu > div.css-1dbjc4n.r-kemksi.r-1p0dtai.r-1d2f490.r-1xcajam.r-zchlnj > div > div > div > div > div"
      );

      await page.evaluate(() => {
        document
          .querySelector(
            "#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-6koalj.r-16y2uox > div.css-1dbjc4n.r-16y2uox.r-1jgb5lz.r-13qz1uu > div.css-1dbjc4n.r-kemksi.r-1p0dtai.r-1d2f490.r-1xcajam.r-zchlnj > div > div > div > div > div"
          )
          .click();
      });

      await delay(2000);

      // skip photo
      await page.waitForSelector(
        "#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-6koalj.r-16y2uox > div.css-1dbjc4n.r-16y2uox.r-1jgb5lz.r-13qz1uu > div.css-1dbjc4n.r-kemksi.r-1p0dtai.r-1d2f490.r-1xcajam.r-zchlnj > div > div > div > div"
      );

      await page.evaluate(() => {
        document
          .querySelector(
            "#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-6koalj.r-16y2uox > div.css-1dbjc4n.r-16y2uox.r-1jgb5lz.r-13qz1uu > div.css-1dbjc4n.r-kemksi.r-1p0dtai.r-1d2f490.r-1xcajam.r-zchlnj > div > div > div > div"
          )
          .click();
      });

      await delay(2000);

      //type bio
      await page.keyboard.type(bioFinal);

      await delay(2000);

      // next bio
      await page.waitForSelector(
        "#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-6koalj.r-16y2uox > div.css-1dbjc4n.r-16y2uox.r-1jgb5lz.r-13qz1uu > div.css-1dbjc4n.r-kemksi.r-1p0dtai.r-1d2f490.r-1xcajam.r-zchlnj > div > div > div > div"
      );

      await page.evaluate(() => {
        document
          .querySelector(
            "#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-6koalj.r-16y2uox > div.css-1dbjc4n.r-16y2uox.r-1jgb5lz.r-13qz1uu > div.css-1dbjc4n.r-kemksi.r-1p0dtai.r-1d2f490.r-1xcajam.r-zchlnj > div > div > div > div"
          )
          .click();
      });

      await delay(2000);

      //change username
      for (let index = 0; index < 30; index++) {
        await page.keyboard.press("Backspace");
      }

      await page.keyboard.type(username);

      await delay(2000);

      // next proccess What should we call you
      await page.waitForSelector(
        "#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-6koalj.r-16y2uox > div.css-1dbjc4n.r-16y2uox.r-1jgb5lz.r-13qz1uu > div.css-1dbjc4n.r-kemksi.r-1p0dtai.r-1d2f490.r-1xcajam.r-zchlnj > div > div > div > div"
      );

      await page.evaluate(() => {
        document
          .querySelector(
            "#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-6koalj.r-16y2uox > div.css-1dbjc4n.r-16y2uox.r-1jgb5lz.r-13qz1uu > div.css-1dbjc4n.r-kemksi.r-1p0dtai.r-1d2f490.r-1xcajam.r-zchlnj > div > div > div > div"
          )
          .click();
      });

      await delay(2000);

      //next bahasa
      await page.waitForSelector(
        "#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-6koalj.r-16y2uox > div.css-1dbjc4n.r-16y2uox.r-1jgb5lz.r-13qz1uu > div.css-1dbjc4n.r-kemksi.r-1p0dtai.r-1d2f490.r-1xcajam.r-zchlnj > div > div > div > div"
      );

      await page.evaluate(() => {
        document
          .querySelector(
            "#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-6koalj.r-16y2uox > div.css-1dbjc4n.r-16y2uox.r-1jgb5lz.r-13qz1uu > div.css-1dbjc4n.r-kemksi.r-1p0dtai.r-1d2f490.r-1xcajam.r-zchlnj > div > div > div > div"
          )
          .click();
      });

      await fs.appendFileSync("user.txt", `${username}|${password}` + "\n");
      console.log(" ");
      console.log(
        chalk.green(
          `[ ${moment().format(
            "HH:mm:ss"
          )} ] Success register with username ${username} saving to text`
        )
      );

      await page.goto("https://twitter.com/" + target, {
        waitUntil: "domcontentloaded",
      });

      
      //button follow
      await page.waitForSelector(
        "#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div > div > div > div > div > div > div > div.css-1dbjc4n.r-ku1wi2.r-1j3t67a.r-1b3ntt7 > div.css-1dbjc4n.r-1habvwh.r-18u37iz.r-1w6e6rj.r-1wtj0ep > div.css-1dbjc4n.r-obd0qt.r-18u37iz.r-1w6e6rj.r-1h0z5md.r-dnmrzs > div:nth-child(2) > div.css-1dbjc4n.r-1a8r3js > div"
      );

      await page.evaluate(() => {
        document
          .querySelector(
            "#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div > div > div > div > div > div > div > div.css-1dbjc4n.r-ku1wi2.r-1j3t67a.r-1b3ntt7 > div.css-1dbjc4n.r-1habvwh.r-18u37iz.r-1w6e6rj.r-1wtj0ep > div.css-1dbjc4n.r-obd0qt.r-18u37iz.r-1w6e6rj.r-1h0z5md.r-dnmrzs > div:nth-child(2) > div.css-1dbjc4n.r-1a8r3js > div"
          )
          .click();
      });
      
      console.log(
        chalk.green(
          `[ ${moment().format("HH:mm:ss")} ] Success follow ${target}`
        )
      );

      //button tweet
      await page.waitForSelector(
        "#layers > div > div:nth-child(1) > div > aside > div > a > div"
      );

      await page.evaluate(() => {
        document
          .querySelector(
            "#layers > div > div:nth-child(1) > div > aside > div > a > div"
          )
          .click();
      });

      await page.keyboard.type(bioFinal);

      await delay(3000);
      
      //button tweet
      await page.waitForSelector(
        "#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div.css-1dbjc4n.r-136ojw6 > div > div > div > div > div.css-1dbjc4n.r-obd0qt.r-1pz39u2.r-1777fci.r-1vsu8ta.r-2j7rtt > div"
      );

      await page.evaluate(() => {
        document
          .querySelector(
            "#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div.css-1dbjc4n.r-136ojw6 > div > div > div > div > div.css-1dbjc4n.r-obd0qt.r-1pz39u2.r-1777fci.r-1vsu8ta.r-2j7rtt > div"
          )
          .click();
      });

      console.log(
        chalk.green(
          `[ ${moment().format("HH:mm:ss")} ] Success tweet`
        )
      );

      // await browser.close();
    } catch (error) {
      console.log(error.message);
      console.log(`Failed Register , Update your selector`);
    }
  }
})();
