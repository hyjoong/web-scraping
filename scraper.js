import * as cheerio from "cheerio";

const getBooksData = async () => {
  const response = await fetch("url");
  const text = await response.text();

  const booksData = [];

  const $ = cheerio.load(text);
  $("#yesBestList > li").each((index, element) => {
    const title = $(element)
      .find("div > div.item_info > div.info_row.info_name > a.gd_name")
      .text();

    const author = $(element)
      .find(
        "div > div.item_info > div.info_row.info_pubGrp > span.authPub.info_auth > a:nth-child(1)"
      )
      .text();
    const price = $(element)
      .find("div > div.item_info > div.info_row.info_price > strong > em")
      .text();

    booksData.push({
      title,
      author,
      price,
    });
  });
};

getBooksData();
