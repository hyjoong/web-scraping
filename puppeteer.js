import puppeteer from "puppeteer";

const getBooksData = async () => {
  let browser;
  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({
      width: 1000,
      height: 800,
    });

    page.setDefaultNavigationTimeout(2 * 60 * 1000);
    await page.goto("url");

    const booksData = [];

    const bookElement = await page.$$("#yesBestList > li");
    bookElement.forEach(async (element, index) => {
      const title = await element.$eval(
        "div > div.item_info > div.info_row.info_name > a.gd_name",
        (node) => node.textContent
      );
      const author = await element.$eval(
        "div > div.item_info > div.info_row.info_pubGrp > span.authPub.info_auth > a:nth-child(1)",
        (node) => node.textContent
      );
      const price = await element.$eval(
        "div > div.item_info > div.info_row.info_price > strong > em",
        (node) => node.textContent
      );
      booksData.push({
        title,
        author,
        price,
      });

      if (index === bookElement.length - 1) {
        console.log(booksData);
        await browser?.close();
      }
    });
  } catch (error) {
    console.log(error);
    await browser?.close();
  } finally {
  }
};

getBooksData();
