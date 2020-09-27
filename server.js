const cheerio = require('cheerio');
//  thư viện hỗ trợ parse DOM giống như Jquery.
const fs = require('fs');
const request = require('request-promise');
// đây là một thư viện nâng cấp của thư viện request, nó hỗ trợ thêm promise, được dùng hỗ trợ lấy thông tin trang cần lấy dữ liệu.
request('https://123job.vn/tuyen-dung', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    const data = [];
    $('.job__list-item').each((index, el) => {
      const job = $(el).find('.job__list-item-title a').text();
      const company = $(el).find('.job__list-item-company span').text();
      const address = $(el).find('.job__list-item-info').find('.address').text();
      const salary = $(el).find('.job__list-item-info').find('.salary').text();

      data.push({
        job,
        salary,
        address,
        company,
      });
      console.log(job);
    });
    fs.writeFileSync('dump/data.json', JSON.stringify(data, null, 2));
  } else {
    console.log(error);
  }
});
